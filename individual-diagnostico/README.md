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

- `index.html` — as três telas (nome → questionário → resultado).
- `styles.css` — visual (mesma identidade do app de casais).
- `data.js` — as 50 perguntas e todo o conteúdo do resultado.
- `app.js` — a lógica: navegação, pontuação e montagem do texto final.

## Como publicar no Netlify

1. Entre em [netlify.com](https://netlify.com) e faça login (ou crie uma conta).
2. Clique em **"Add new site" → "Import an existing project"**.
3. Conecte com o GitHub e escolha o repositório `casais-backend`.
4. Quando pedir as configurações de build:
   - **Base directory**: `individual-diagnostico`
   - **Build command**: deixe em branco
   - **Publish directory**: deixe `.` (um ponto) — o Netlify geralmente já acerta isso sozinho ao detectar o `netlify.toml` dessa pasta.
5. Clique em **"Deploy"**. Em menos de um minuto o link já fica pronto (algo como `nome-aleatorio.netlify.app`).
6. Se quiser, depois dá pra trocar esse nome em **"Site settings" → "Change site name"**.

Esse deploy é completamente independente do app de casais no Railway —
os dois podem viver ao mesmo tempo, sem interferir um no outro.
