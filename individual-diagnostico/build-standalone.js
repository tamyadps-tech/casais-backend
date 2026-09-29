// Gera um único arquivo .html com tudo embutido (CSS + JS inline), pra
// poder ser publicado sozinho em qualquer host — inclusive arrastando só
// esse arquivo pro Netlify, sem precisar subir index.html/app.js/data.js/
// styles.css separados. Rode `node build-standalone.js` sempre que
// index.html, app.js, data.js ou styles.css mudarem.
const fs = require('fs');
const path = require('path');

const dir = __dirname;
const html = fs.readFileSync(path.join(dir, 'index.html'), 'utf8');
const css = fs.readFileSync(path.join(dir, 'styles.css'), 'utf8');
const dataJs = fs.readFileSync(path.join(dir, 'data.js'), 'utf8');
const appJs = fs.readFileSync(path.join(dir, 'app.js'), 'utf8');

let out = html
  .replace(
    '<link rel="stylesheet" href="/styles.css" />',
    `<style>\n${css}\n</style>`
  )
  .replace(
    '<script src="/data.js"></script>\n  <script src="/app.js"></script>',
    `<script>\n${dataJs}\n</script>\n  <script>\n${appJs}\n</script>`
  );

if (out.includes('/styles.css') || out.includes('/data.js') || out.includes('/app.js')) {
  throw new Error('Sobrou referência a arquivo externo — build incompleto.');
}

fs.writeFileSync(path.join(dir, 'espelho-standalone.html'), out);
console.log('Gerado: espelho-standalone.html (' + (out.length / 1024).toFixed(0) + ' KB)');
