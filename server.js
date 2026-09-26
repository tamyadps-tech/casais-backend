const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const cron = require('node-cron');
const path = require('path');

dotenv.config();

const pipeline = require('./src/lib/pipeline');
const store = require('./src/lib/store');
const questionsRouter = require('./src/routes/questions');
const testsRouter = require('./src/routes/tests');
const tipsRouter = require('./src/routes/tips');
const calendarRouter = require('./src/routes/calendar');
const adminRouter = require('./src/routes/admin');
const pushRouter = require('./src/routes/push');
const journalRouter = require('./src/routes/journal');
const missionsRouter = require('./src/routes/missions');
const devotionalRouter = require('./src/routes/devotional');
const invitesRouter = require('./src/routes/invites');
const { DELIVERY_HOUR, START_DATE, END_DATE } = require('./src/lib/scheduler');

const app = express();
const PORT = process.env.PORT || 3000;

// IDs fixos do casal (uso pessoal — Tamyris e Saulo)
const PERSON_1_ID = process.env.COUPLE_PERSON_1_ID || 'tamyris';
const PERSON_2_ID = process.env.COUPLE_PERSON_2_ID || 'saulo';

// Middleware
app.use(
  cors({
    origin: [
      'http://localhost:3000',
      'http://localhost:8000',
      'http://localhost:8888',
      process.env.NETLIFY_SITE_URL || 'https://casais-teste-tamy.netlify.app'
    ],
    credentials: true
  })
);
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

// Frontend estático (o próprio Railway serve a UI, sem precisar de Netlify)
app.use(express.static(path.join(__dirname, 'public')));

// ==========================================
// ROTAS
// ==========================================

app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    server: 'casais-backend-v2',
    dicas: { inicio: START_DATE, fim: END_DATE, horario_entrega: `${DELIVERY_HOUR}h` }
  });
});

app.use('/api/questions', questionsRouter);
app.use('/api/test', testsRouter);
app.use('/api/tips', tipsRouter);
app.use('/api/calendar', calendarRouter);
app.use('/api/admin', adminRouter);
app.use('/api/push', pushRouter);
app.use('/api/journal', journalRouter);
app.use('/api/missions', missionsRouter);
app.use('/api/devotional', devotionalRouter);
app.use('/api/invites', invitesRouter);

// ==========================================
// AGENDAMENTO AUTOMÁTICO DAS DICAS (segunda, quinta e sábado até jan/2027)
// ==========================================
// Roda todo dia no horário configurado, pro casal original fixo e pra todo
// casal que entrou depois por convite (ver src/routes/invites.js); o
// próprio pipeline decide se hoje é dia de entrega e se ainda não foi
// gerado. Cada casal roda isolado — um erro num não trava os outros.
function todosOsCasais() {
  const convidados = store.listActivatedInvites().map((invite) => [invite.pessoa1.id, invite.pessoa2.id]);
  return [[PERSON_1_ID, PERSON_2_ID], ...convidados];
}

cron.schedule(`0 ${DELIVERY_HOUR} * * *`, async () => {
  for (const [id1, id2] of todosOsCasais()) {
    try {
      const result = await pipeline.generateDueTips(id1, id2);
      if (result.generated) {
        console.log(`Dicas geradas e aprovadas para ${id1}/${id2} em ${result.date}`);
      }
    } catch (error) {
      console.error(`Erro ao gerar dicas automáticas pra ${id1}/${id2}:`, error.message);
    }
  }
});

// ==========================================
// START SERVER
// ==========================================

app.listen(PORT, () => {
  console.log(`Servidor Casais rodando em http://localhost:${PORT}`);
  console.log(`Entregas de dica: ${START_DATE} até ${END_DATE}, seg/qui/sáb às ${DELIVERY_HOUR}h`);
});

module.exports = app;
