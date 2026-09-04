# 💜 Casais Backend

App pessoal de autoconhecimento e casal — feito só para Tamyris e Saulo. 90 perguntas, testes de personalidade/temperamento/apego, feridas da infância, linguagem do amor, valores e vida a dois, e perguntas pra se conhecerem melhor. No final, dicas quinzenais personalizadas até janeiro de 2027, pelo app ou pelo Google Agenda.

## Como o sistema pensa (a "equipe de agentes")

Não existem robôs autônomos rodando sozinhos por aí — é uma orquestração de chamadas à Claude API, organizada em módulos que espelham a estrutura que vocês pediram. O **agente gerente** é `src/lib/pipeline.js`: ele chama cada agente na hora certa e só libera o resultado depois que o **coordenador de qualidade** (`src/lib/qualityCoordinator.js`) aprovar — um loop *limitado* (até 4 tentativas, nunca infinito) em que a IA gera, um "coordenador" nota de 0 a 10 com uma rubrica (tom informal, nada de diagnóstico, personalização real, emojis com naturalidade) e devolve feedback pra próxima tentativa. Se não aprovar em 4 tentativas, libera o melhor candidato marcado como `melhor_esforco` — nunca trava o app.

| Agente pedido | Onde vive no código |
|---|---|
| Especialista em português informal | Embutido na rubrica de todo `qualityCoordinator` (tom, informalidade, não ser diagnóstico) |
| Testes de personalidade / temperamento / apego | `src/data/questions.js` (perguntas) + `src/lib/scoring.js` (pontuação) |
| Feridas da infância | idem |
| Valores, condutas, sonhos, filhos, moradia, cuidado com idosos | `src/data/questions.js` (categoria `valores_vida`) |
| Perguntas pra se conhecerem melhor | `src/data/questions.js` (categoria `conhecer_melhor`) |
| Linguagem do amor | `src/data/questions.js` (categoria `linguagem_amor`) |
| Resultado + dica de autoconhecimento | `src/lib/agents/resultAgent.js` |
| Cruzamento de dados do casal | `src/lib/agents/crossAnalysisAgent.js` |
| Dicas quinzenais personalizadas | `src/lib/agents/tipsAgent.js` |
| Comunicação automática 2x/semana | `node-cron` em `server.js` + feed `.ics` |
| Agente gerente | `src/lib/pipeline.js` |
| Coordenadores de qualidade (looping) | `src/lib/qualityCoordinator.js` |

Sem `CLAUDE_API_KEY` configurada, tudo roda em **modo mock** (textos simples baseados nos dados, sem chamar IA) — assim dá pra testar o fluxo inteiro de graça antes de ligar a chave de verdade.

## Banco de perguntas (90 no total)

- **68 múltipla escolha** (6 a 10 opções cada) — ~75%
- **13 de escala 1 a 5** (cada uma explica o que o 1 e o 5 significam) — ~14%
- **9 abertas** — 10%

Categorias: `personalidade` (12), `temperamento` (12), `apego` (14), `feridas_infancia` (13), `linguagem_amor` (12), `valores_vida` (12), `conhecer_melhor` (15).

As perguntas foram escritas de forma contextualizada (cenários do dia a dia, nunca "você é ansioso(a)?") pra não entregar o que está sendo medido nem soar como diagnóstico.

## Endpoints

### Perguntas
- `GET /api/questions` — banco completo (sem as tags internas de pontuação)
- `GET /api/questions/:categoria` — só uma categoria

### Testes
- `POST /api/test/submit` — `{ respondent_id, name, responses: { "PER01": "...", ... } }`
- `GET /api/test/status/:id`
- `GET /api/test/result/:id` — resultado individual + dica (roda o agente + coordenador na primeira vez, depois fica em cache; `?refresh=true` regenera)
- `POST /api/test/process` — `{ respondent_id_1, respondent_id_2 }` → gera (ou lê do cache) a análise cruzada do casal

### Dicas quinzenais
- `GET /api/tips/schedule/:id1/:id2` — calendário completo de datas de entrega
- `GET /api/tips/:id1/:id2` — todas as dicas já entregues
- `GET /api/tips/:id1/:id2/mine/:target` — só as dicas de uma pessoa
- `POST /api/tips/generate/:id1/:id2` — gera a dica do dia na mão (o cron já faz isso sozinho todo dia, no horário configurado, mas só entrega de fato se hoje for segunda ou quinta)

### Google Agenda
- `GET /api/calendar/:id1/:id2/:target.ics` — feed assinável. No Google Agenda: **Outras agendas → Adicionar por URL** e colar o link (ex.: `https://seu-servidor/api/calendar/tamyris/saulo/tamyris.ics` pra Tamyris ver as dicas sobre o Saulo, e trocando o `target` pra `saulo` no link dele). Não precisa configurar nada no Google, só assinar a URL — por isso essa foi a rota mais simples, sem depender de OAuth.

### Outros
- `GET /api/health`

## Variáveis de ambiente

Veja `env.example`. As principais novas:
- `COUPLE_PERSON_1_ID` / `COUPLE_PERSON_2_ID` — ids fixos usados pelo cron automático (padrão: `tamyris` / `saulo`)
- `TIPS_START_DATE` / `TIPS_END_DATE` — janela de entrega (padrão: hoje até 2027-01-31)
- `TIPS_DELIVERY_HOUR` — horário do cron (padrão 9h)
- `CLAUDE_API_KEY` — liga os agentes de verdade; sem ela, tudo roda em modo mock

## Deploy no Railway

1. Conecte o repositório GitHub
2. Configure as variáveis de ambiente no Railway (principalmente `CLAUDE_API_KEY`)
3. Railway faz deploy automático — o `node-cron` roda dentro do próprio processo do servidor, então ele precisa ficar sempre ativo (não use plano com sleep automático)

## Local (desenvolvimento)

```bash
npm install
npm start
```
