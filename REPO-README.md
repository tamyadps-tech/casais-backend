# Casais Backend

App pessoal de autoconhecimento e casal — feito só para Tamyris e Saulo. 98 perguntas, testes de personalidade/temperamento/apego, feridas da infância, linguagem do amor, valores e vida a dois, e perguntas pra se conhecerem melhor. No final, dicas quinzenais personalizadas até janeiro de 2027, pelo app ou pelo Google Agenda.

## Como o sistema pensa (a "equipe de agentes")

Não existem robôs autônomos rodando sozinhos por aí — é uma orquestração de chamadas à Claude API, organizada em módulos que espelham a estrutura que vocês pediram. O **agente gerente** é `src/lib/pipeline.js`: ele chama cada agente na hora certa e só libera o resultado depois que o **coordenador de qualidade** (`src/lib/qualityCoordinator.js`) aprovar — um loop *limitado* (até 4 tentativas, nunca infinito) em que a IA gera, um "coordenador" nota de 0 a 10 com uma rubrica (tom informal, nada de diagnóstico, personalização real, emojis com naturalidade) e devolve feedback pra próxima tentativa. Se não aprovar em 4 tentativas, libera o melhor candidato marcado como `melhor_esforco` — nunca trava o app. Se a própria geração falhar (créditos insuficientes, rede, modelo indisponível etc.), o loop não propaga o erro pra quem está usando: registra a falha como tentativa reprovada e, se todas falharem, cai automaticamente no texto mock — a pessoa sempre vê algum resultado/dica, nunca uma tela de erro.

| Agente pedido | Onde vive no código |
|---|---|
| Especialista em português informal | Embutido na rubrica de todo `qualityCoordinator` (tom, informalidade, não ser diagnóstico) |
| Agente de humanidade (simplicidade, amor, respeito) | `HUMANITY_RUBRIC` em `src/lib/qualityCoordinator.js` — critérios que todo agente de texto (resultado e dicas) herda na própria rubrica, cobrados pelo coordenador em toda revisão |
| Testes de personalidade / temperamento / apego | `src/data/questions.js` (perguntas) + `src/lib/scoring.js` (pontuação) |
| Feridas da infância | idem |
| Valores, condutas, sonhos, filhos, moradia, cuidado com idosos | `src/data/questions.js` (categoria `valores_vida`) |
| Perguntas pra se conhecerem melhor | `src/data/questions.js` (categoria `conhecer_melhor`) |
| Linguagem do amor | `src/data/questions.js` (categoria `linguagem_amor`) |
| Resultado + dica de autoconhecimento | `src/lib/agents/resultAgent.js` — sempre cobre 4 partes: perfil geral, personalidade/temperamento, forma de amar (apego + linguagem do amor) e uma dica prática |
| Cruzamento de dados do casal | `src/lib/agents/crossAnalysisAgent.js` |
| Dicas quinzenais personalizadas | `src/lib/agents/tipsAgent.js` |
| Comunicação automática 2x/semana | `node-cron` em `server.js` + feed `.ics` |
| Agente gerente | `src/lib/pipeline.js` |
| Coordenadores de qualidade (looping) | `src/lib/qualityCoordinator.js` |

Sem `CLAUDE_API_KEY` configurada, tudo roda em **modo mock** (textos simples baseados nos dados, sem chamar IA) — assim dá pra testar o fluxo inteiro de graça antes de ligar a chave de verdade.

## Como o cruzamento de dados vira dica assertiva

Essa é a parte mais importante do sistema, então ela é **determinística** — regras fixas em `src/lib/crossRules.js`, sem IA inventando fato nenhum. A IA (`tipsAgent.js`) só entra depois, pra escrever a mensagem em cima dos fatos já verificados. O motor roda 6 lentes de cruzamento e devolve uma lista de *findings* (fato + ação sugerida + confiança):

0. **Introdução — a própria linguagem do amor.** Só entra na primeiríssima dica de cada pessoa (`tipo: 'intro_linguagem'`): antes de qualquer conselho específico, ensina o princípio central — qual é a linguagem do amor dela(e), qual é a do parceiro(a), e por que amar bem é amar na língua do outro, não na própria.
1. **Linguagem do amor — com 3 sinais, não 1.** Cruza o ranking do teste de 10 perguntas com a resposta direta "o que te faz sentir amado" (CON03) e com "o que seu parceiro já faz que você gosta" (CON01). Se os 3 sinais concordam → confiança **alta**. Também calcula o **gap**: se o parceiro já demonstra a linguagem certa (via CON01), vira dica de **reforço** ("continue assim"); se não, vira dica de **gesto de amor** com uma ação concreta pra aquela linguagem específica.
2. **Dinâmica de apego.** Tabela fixa por estilo do parceiro (seguro/ansioso/evitativo/desorganizado) com o cuidado certo pra cada um. Detecta especificamente o padrão perseguidor-distanciador (ansioso + evitativo) e gera uma orientação diferente pra cada lado da dupla.
3. **Cuidados por ferida da infância.** Dicionário fixo (rejeição, abandono, humilhação, traição, injustiça) do que evitar e o que fazer — cruzado com o temperamento de quem recebe a dica (se a pessoa é mais direta/colérica, o texto ganha um adendo sobre cuidar do tom).
4. **Valores e vida a dois.** Compara literalmente as 14 respostas de cada um. Sobreposição total → nível **alta** compatibilidade. Sobreposição parcial → nível **boa**. Nenhuma opção em comum → nível **atenção** (convite tranquilo pra conversar, nunca alarme).
5. **Autorreflexão — a dica extra sobre a própria vida.** A partir da segunda dica, toda mensagem ganha uma segunda parte que não é sobre o parceiro(a): é sobre a própria pessoa — como ela tende a viver o apego e qual ferida da infância pesa mais pra ela, traduzido em reflexão sobre o próprio jeito de ver o mundo e a própria dificuldade em relacionamentos, não em rótulo técnico.

Cada dica final, então, mistura **dois findings principais** (de lentes/tipos diferentes quando possível — ex: um papo de valores + um gesto de amor) emendados com naturalidade logo no início, sem repetir o nome da pessoa a cada um, **+ uma reflexão sobre a própria vida** (lente 5) — exceto a primeira de cada pessoa, que é só a introdução (lente 0).

**Anti-repetição (do fato):** cada finding tem um id estável, e o sistema guarda (por pessoa, por casal) quando cada um foi usado pela última vez. Toda vez que uma dica precisa ser gerada, o agente gerente escolhe o finding aplicável àquela pessoa que está há mais tempo sem ser usado (ou nunca foi usado), com um cooldown de 6 semanas antes de repetir o mesmo fato — isso garante variedade e rotação entre os 5 tipos de dica ao longo das ~21 semanas de entrega.

**Anti-repetição (do conselho — banco de frases, `src/lib/phraseBank.js`):** cada finding carrega um `variant_key` (ex: `valores_alta`, `ferida_rejeicao`, `gesto_tempo_qualidade`) que aponta pra um banco de 3 a 20 variações escritas à mão do "conselho" final. Toda vez que um finding é usado, o sistema roda pra próxima variação daquela categoria (round-robin, por casal, guardado em `tips/<couple_id>/phrase-index.json`) — assim o mesmo fato nunca repete a mesma frase de conselho em sequência. Isso funciona **independente de ter `CLAUDE_API_KEY` configurada ou não**: com IA, ela reescreve o fato + a variação escolhida com calor humano; sem IA (modo mock), a variação já sai pronta e humanizada, sem custo de token nenhum. Os 129 textos foram calibrados pra cobrir ~3 meses de entregas (2x/semana) sem repetição perceptível.

## Banco de perguntas (98 ativas no total)

- **múltipla escolha** (6 a 10 opções, escolhe 1)
- **seleção múltipla** (6 a 10 opções, escolhe até `max_selecoes` — usado em `valores_vida` e `conhecer_melhor`, onde faz sentido marcar mais de uma coisa)
- **escala 1 a 5** (cada uma explica o que o 1 e o 5 significam)
- **abertas**

Categorias: `personalidade` (12), `temperamento` (12), `apego` (14), `feridas_infancia` (13), `linguagem_amor` (12), `valores_vida` (19 ativas), `conhecer_melhor` (16).

As perguntas foram escritas de forma contextualizada (cenários do dia a dia, nunca "você é ansioso(a)?") pra não entregar o que está sendo medido nem soar como diagnóstico.

Uma pergunta (`VAL10`, tempo entre noivado e casamento) fica marcada `ativa: false` em `src/data/questions.js` — não faz sentido pro uso pessoal de hoje, mas continua no código, reservada pra uma futura versão comercial/multi-casal do app. `require('./src/data/questions')` já devolve só as ativas; `questions.all` traz o banco completo, inativas incluídas.

`VAL13`/`VAL14`/`VAL15` (juntar patrimônio, regime de bens do casamento, papel de cada um na vida financeira) e `VAL16`-`VAL20` (suporte financeiro, cuidado com filhos, provimento, tarefas mais pesadas, cuidados da casa e da própria aparência — todas sobre a ideia de papel de homem e mulher no casal) foram adicionadas depois que Tamyris já tinha respondido tudo — ver "Completar pergunta(s) nova(s)" abaixo pra como isso funciona sem perder nenhuma resposta anterior.

### Completar pergunta(s) nova(s) sem perder respostas antigas

Quando uma pergunta é adicionada ao banco depois que alguém já respondeu tudo, ninguém precisa refazer o questionário: `GET /api/test/status/:id` passa a incluir `pending: [ids das perguntas ainda sem resposta]`. O app detecta isso no painel e mostra um card "tem pergunta nova pra responder" — ao responder, só aquela(s) pergunta(s) vai(ão) pra `POST /api/test/complete`, que soma ao que já existia (nunca sobrescreve respostas antigas) e invalida o resultado individual (e a análise do casal, se `partner_id` for informado) em cache, pra recalcular incorporando o dado novo.

## Endpoints

### Perguntas
- `GET /api/questions` — banco completo (sem as tags internas de pontuação)
- `GET /api/questions/:categoria` — só uma categoria

### Testes
- `POST /api/test/submit` — `{ respondent_id, name, responses: { "PER01": "...", ... } }`
- `GET /api/test/status/:id` — inclui `pending: [ids]` com as perguntas ativas ainda sem resposta
- `POST /api/test/complete` — `{ respondent_id, responses: { "VAL13": [...], ... }, partner_id? }` → soma resposta(s) de pergunta(s) nova(s) às já salvas (nunca sobrescreve), invalida resultado (e análise do casal, se `partner_id` vier) em cache
- `GET /api/test/result/:id` — resultado individual + dica (roda o agente + coordenador na primeira vez, depois fica em cache; `?refresh=true` regenera)
- `POST /api/test/process` — `{ respondent_id_1, respondent_id_2 }` → gera (ou lê do cache) a análise cruzada do casal

### Dicas quinzenais
- `GET /api/tips/schedule/:id1/:id2` — calendário completo de datas de entrega
- `GET /api/tips/:id1/:id2` — todas as dicas já entregues
- `GET /api/tips/:id1/:id2/mine/:target` — só as dicas de uma pessoa
- `GET`/`POST /api/tips/generate/:id1/:id2` — gera a dica do dia na mão (o cron já faz isso sozinho todo dia, no horário configurado, mas só entrega de fato se hoje for segunda ou quinta). Com `?force=true&key=SUA_ADMIN_RESET_KEY` ignora o calendário e gera uma dica na hora, útil pra testar o cruzamento sem esperar o próximo dia programado — não conta como a entrega oficial do dia, então a entrega automática de verdade continua acontecendo normalmente depois.

### Google Agenda
- `GET /api/calendar/:id1/:id2/:target.ics` — feed assinável. No Google Agenda: **Outras agendas → Adicionar por URL** e colar o link (ex.: `https://seu-servidor/api/calendar/tamyris/saulo/tamyris.ics` pra Tamyris ver as dicas sobre o Saulo, e trocando o `target` pra `saulo` no link dele). Não precisa configurar nada no Google, só assinar a URL — por isso essa foi a rota mais simples, sem depender de OAuth.

### Admin
- `GET /api/admin/reset/:id1/:id2?key=SUA_CHAVE&confirm=SIM` — apaga respostas, resultado, análise cruzada e dicas de um casal (pra zerar dados de teste antes da rodada de verdade). Só funciona se `ADMIN_RESET_KEY` estiver configurada no servidor; sem essa variável, o endpoint fica sempre desligado (403). Pensado pra colar direto na barra de endereço do navegador.

### Notificações push
- `GET /api/push/public-key` — chave pública VAPID (o app usa isso no navegador; não é segredo)
- `POST /api/push/subscribe` — `{ personId, subscription }`, salva a inscrição desse aparelho
- `POST /api/push/unsubscribe` — `{ personId, endpoint }`

### Outros
- `GET /api/health`

## Frontend

`public/` é servido direto pelo Express (sem build step, sem Netlify). Visual clean e neutro, sem emojis — paleta em tons de cinza com um único acento, mobile-first, com suporte a tema escuro via `prefers-color-scheme`.

### App instalável + notificações push

O app é um PWA (`manifest.json` + `sw.js`): dá pra instalar na tela de início do celular e, uma vez instalado, ativar notificações de verdade (card "Notificações no aparelho" no painel) — chegam via Web Push, sem depender do Google Agenda.

- **Android/Chrome**: funciona direto no navegador, nem precisa instalar pra notificar (mas instalar dá a experiência de app).
- **iPhone/Safari**: a Apple só libera notificação push pra apps **instalados** (Compartilhar → Adicionar à Tela de Início) — a UI já detecta isso e mostra essa instrução antes de deixar ativar.
- Requer `VAPID_PUBLIC_KEY` e `VAPID_PRIVATE_KEY` configuradas (veja `env.example` — já vem um par pronto pra usar, ou gere o seu com `npx web-push generate-vapid-keys`). Sem essas variáveis, essa parte fica desligada e o resto do app funciona igual.
- Inscrições inválidas/expiradas (ex.: app desinstalado) são detectadas e removidas automaticamente na próxima tentativa de envio.
- Três notificações automáticas: **dica nova** (a cada entrega quinzenal), **resultado pronto** (assim que o resultado individual é gerado pela primeira vez, seja porque a própria pessoa abriu o painel ou porque o resultado dela precisou ser calculado como parte da análise cruzada do casal) e **parceiro(a) respondeu** (assim que uma pessoa termina o questionário, a outra é avisada — usa `COUPLE_PERSON_1_ID`/`COUPLE_PERSON_2_ID` do `env.example` pra saber quem é quem).

## Variáveis de ambiente

Veja `env.example`. As principais novas:
- `COUPLE_PERSON_1_ID` / `COUPLE_PERSON_2_ID` — ids fixos usados pelo cron automático (padrão: `tamyris` / `saulo`)
- `TIPS_START_DATE` / `TIPS_END_DATE` — janela de entrega (padrão: hoje até 2027-01-31)
- `TIPS_DELIVERY_HOUR` — horário do cron (padrão 9h)
- `CLAUDE_API_KEY` — liga os agentes de verdade; sem ela, tudo roda em modo mock
- `ADMIN_RESET_KEY` — opcional, liga o endpoint de reset de dados de teste (veja acima)

## Deploy no Railway

1. Conecte o repositório GitHub
2. Configure as variáveis de ambiente no Railway (principalmente `CLAUDE_API_KEY`)
3. Railway faz deploy automático — o `node-cron` roda dentro do próprio processo do servidor, então ele precisa ficar sempre ativo (não use plano com sleep automático)

## Local (desenvolvimento)

```bash
npm install
npm start
```
