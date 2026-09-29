# Espelho — diagnóstico individual

Ferramenta individual, separada do app de casais: qualquer pessoa responde
sozinha (sem precisar de parceiro(a)) e recebe um texto pessoal sobre como
se relaciona — temperamento, apego, feridas de infância e o tipo de
parceiro(a) que tende a combinar com o estilo de vida dela.

100% estática — roda inteira no navegador, sem servidor, sem banco de
dados, sem custo de IA. Nada é salvo em lugar nenhum além da tela da
própria pessoa durante o uso; ao fechar ou recarregar a página, tudo se
perde (por isso não é preciso se preocupar com dados pessoais).

## Arquivos

- `index.html` — as quatro telas (nome → orientação → questionário → resultado).
- `styles.css` — visual (mesma identidade do app de casais).
- `data.js` — as 50 perguntas e todo o conteúdo do resultado.
- `app.js` — a lógica: navegação, pontuação e montagem do texto final.
- `espelho-standalone.html` — **os quatro arquivos acima juntos em um só**
  (CSS e JS embutidos inline). Gerado por `build-standalone.js`. Use esse
  arquivo pra publicar em qualquer lugar que só aceite subir **um único
  arquivo .html** (por exemplo, a tela de "solte um arquivo aqui" de
  alguns hosts) — se os 4 arquivos separados forem enviados sem os outros
  três juntos, a página carrega sem estilo nenhum (feia, sem cor, sem
  fonte), porque falta o CSS e o JS.
- `build-standalone.js` — roda `node build-standalone.js` sempre que
  `index.html`, `styles.css`, `data.js` ou `app.js` mudarem, pra
  regenerar o `espelho-standalone.html` atualizado.

## Como publicar no Netlify (mais simples — arquivo único)

1. Entre em [app.netlify.com/drop](https://app.netlify.com/drop) (crie uma conta grátis se ainda não tiver).
2. Arraste **só o arquivo `espelho-standalone.html`** pra dentro da área indicada.
3. Em segundos o Netlify gera um link ao vivo (tipo `nome-aleatorio.netlify.app`), já com todo o visual certo.
4. Se quiser, troque esse nome em **"Site settings" → "Change site name"**.

Esse deploy é completamente independente do app de casais no Railway —
os dois podem viver ao mesmo tempo, sem interferir um no outro.

## Alternativa: os arquivos separados (para quem for conectar via GitHub)

Só use isso se for publicar via **"Import an existing project"** conectando
o repositório do GitHub (não o drag-and-drop) — nesse caso o Netlify sobe
a pasta inteira de uma vez, então os arquivos separados funcionam:

1. Entre em [netlify.com](https://netlify.com) e faça login.
2. Clique em **"Add new site" → "Import an existing project"**.
3. Conecte com o GitHub e escolha o repositório `casais-backend`.
4. Configurações de build:
   - **Base directory**: `individual-diagnostico`
   - **Build command**: deixe em branco
   - **Publish directory**: `.` (um ponto)
5. Clique em **"Deploy"**.
