const express = require('express');
const axios = require('axios');
const cors = require('cors');
const dotenv = require('dotenv');
const fs = require('fs');
const path = require('path');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors({
  origin: [
    'http://localhost:3000',
    'http://localhost:8000',
    'http://localhost:8888',
    process.env.NETLIFY_SITE_URL || 'https://casais-teste-tamy.netlify.app'
  ],
  credentials: true
}));
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

// Data directory
const DATA_DIR = process.env.DATA_DIR || '/tmp/casais-data';
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

// ==========================================
// ENDPOINTS
// ==========================================

// Health check
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    server: 'casais-backend-v1'
  });
});

// Submit test responses
app.post('/api/test/submit', async (req, res) => {
  try {
    const { respondent_id, name, responses, questions } = req.body;

    if (!respondent_id || !name || !responses) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // Save to file
    const filePath = path.join(DATA_DIR, `${respondent_id}.json`);
    const data = {
      respondent_id,
      name,
      responses,
      questions,
      submitted_at: new Date().toISOString()
    };

    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));

    res.json({
      success: true,
      message: 'Responses saved',
      respondent_id
    });
  } catch (error) {
    console.error('Error in /api/test/submit:', error);
    res.status(500).json({ error: error.message });
  }
});

// Get test status
app.get('/api/test/status/:id', (req, res) => {
  try {
    const filePath = path.join(DATA_DIR, `${req.params.id}.json`);
    
    if (fs.existsSync(filePath)) {
      const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
      res.json({
        status: 'submitted',
        respondent_id: req.params.id,
        name: data.name,
        submitted_at: data.submitted_at
      });
    } else {
      res.json({ status: 'not_found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Process both responses (Agente 2)
app.post('/api/test/process', async (req, res) => {
  try {
    const { respondent_id_1, respondent_id_2 } = req.body;

    const file1 = path.join(DATA_DIR, `${respondent_id_1}.json`);
    const file2 = path.join(DATA_DIR, `${respondent_id_2}.json`);

    if (!fs.existsSync(file1) || !fs.existsSync(file2)) {
      return res.status(400).json({ error: 'One or both respondents not found' });
    }

    const data1 = JSON.parse(fs.readFileSync(file1, 'utf8'));
    const data2 = JSON.parse(fs.readFileSync(file2, 'utf8'));

    // Call Claude API (Agente 2) to generate tips
    const tips = await generateTips(data1, data2);

    // Save tips
    const tipsPath = path.join(DATA_DIR, `result-${respondent_id_1}-${respondent_id_2}.json`);
    fs.writeFileSync(tipsPath, JSON.stringify(tips, null, 2));

    res.json({
      success: true,
      message: 'Tips generated',
      tips_count: tips.length,
      tips
    });
  } catch (error) {
    console.error('Error in /api/test/process:', error);
    res.status(500).json({ error: error.message });
  }
});

// Get generated tips
app.get('/api/tips/:id1/:id2', (req, res) => {
  try {
    const tipsPath = path.join(DATA_DIR, `result-${req.params.id1}-${req.params.id2}.json`);
    
    if (fs.existsSync(tipsPath)) {
      const tips = JSON.parse(fs.readFileSync(tipsPath, 'utf8'));
      res.json({ success: true, tips });
    } else {
      res.status(404).json({ error: 'Tips not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ==========================================
// AGENTE 2: GENERATE TIPS
// ==========================================

async function generateTips(data1, data2) {
  try {
    const apiKey = process.env.CLAUDE_API_KEY;
    if (!apiKey) {
      console.error('CLAUDE_API_KEY not set');
      return generateMockTips(data1, data2);
    }

    const prompt = buildPrompt(data1, data2);

    const response = await axios.post('https://api.anthropic.com/v1/messages', {
      model: 'claude-opus-4-1',
      max_tokens: 4000,
      messages: [
        {
          role: 'user',
          content: prompt
        }
      ]
    }, {
      headers: {
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01'
      }
    });

    const content = response.data.content[0].text;
    return parseTips(content);
  } catch (error) {
    console.error('Error calling Claude API:', error.message);
    return generateMockTips(data1, data2);
  }
}

function buildPrompt(data1, data2) {
  return `Você é um especialista em relacionamentos e casais (Agente 2 do sistema Criança Ferida).

DADOS DE ${data1.name.toUpperCase()}:
${JSON.stringify(data1.responses, null, 2)}

DADOS DE ${data2.name.toUpperCase()}:
${JSON.stringify(data2.responses, null, 2)}

TAREFA:
Analise os dados de ambos e gere 4 dicas PERSONALIZADAS para este casal:
- 2 dicas para ${data1.name}
- 2 dicas para ${data2.name}

FORMATO DA RESPOSTA:
Dica 1 (para ${data1.name}): [dica aqui]
Dica 2 (para ${data1.name}): [dica aqui]
Dica 3 (para ${data2.name}): [dica aqui]
Dica 4 (para ${data2.name}): [dica aqui]

IMPORTANTE:
- Seja específico baseado nos dados deles
- Identifique padrões de attachment
- Sugira ações concretas
- Seja compassivo e prático`;
}

function parseTips(content) {
  const lines = content.split('\n').filter(line => line.trim().startsWith('Dica'));
  return lines.map((line, idx) => ({
    id: idx + 1,
    content: line.replace(/^Dica \d+.*?:/, '').trim(),
    week: Math.ceil((idx + 1) / 2)
  }));
}

function generateMockTips(data1, data2) {
  return [
    { id: 1, content: `${data1.name}, esta semana: pratique dizer "Te amo" sem esperar resposta.`, week: 1 },
    { id: 2, content: `${data1.name}, identifique quando você persegue e pause por 24h.`, week: 1 },
    { id: 3, content: `${data2.name}, esta semana: iniciar uma conversa vulnerável sobre seus sentimentos.`, week: 1 },
    { id: 4, content: `${data2.name}, quando ela se aproximar, receba com braços abertos.`, week: 1 }
  ];
}

// ==========================================
// START SERVER
// ==========================================

app.listen(PORT, () => {
  console.log(`✅ Servidor Casais rodando em http://localhost:${PORT}`);
  console.log(`📊 Data directory: ${DATA_DIR}`);
  console.log(`🤖 Agente 2 pronto para processar`);
});
