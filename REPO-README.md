# 💜 Casais Backend - Agente 2

Backend do sistema Casais com Claude API.

Processa respostas de casais e gera dicas personalizadas.

## Endpoints

- `POST /api/test/submit` - Submeter respostas
- `GET /api/test/status/:id` - Verificar status
- `POST /api/test/process` - Processar ambos respondentes
- `GET /api/tips/:id1/:id2` - Obter dicas geradas
- `GET /api/health` - Health check

## Variáveis de Ambiente

```
CLAUDE_API_KEY=sk-ant-v0-seu-chave
NETLIFY_SITE_URL=https://seu-site.netlify.app
PORT=3000
DATA_DIR=/tmp/casais-data
NODE_ENV=production
```

## Deploy no Railway

1. Conecte seu repositório GitHub
2. Configure as variáveis de ambiente no Railway
3. Railway faz deploy automático

## Local (desenvolvimento)

```bash
npm install
npm start
```
