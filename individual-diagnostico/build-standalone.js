// Gera um único arquivo .html com tudo embutido (CSS + JS inline), pra
// poder ser publicado sozinho em qualquer host — inclusive arrastando só
// esse arquivo pro Netlify, sem precisar subir index.html/app.js/data.js/
// styles.css separados.
//
// Uso:
//   node build-standalone.js        -> versão PT: espelho-standalone.html
//   node build-standalone.js en     -> versão EN: espelho-standalone-en.html
//
// Rode de novo sempre que os arquivos-fonte da versão correspondente
// mudarem (index.html/app.js/data.js ou index.en.html/app.en.js/data.en.js).
// styles.css é compartilhado pelas duas versões (não tem texto).
const fs = require('fs');
const path = require('path');

const dir = __dirname;
const lang = process.argv[2] === 'en' ? 'en' : 'pt';

const suffix = lang === 'en' ? '.en' : '';
const html = fs.readFileSync(path.join(dir, `index${suffix}.html`), 'utf8');
const css = fs.readFileSync(path.join(dir, 'styles.css'), 'utf8');
const dataJs = fs.readFileSync(path.join(dir, `data${suffix}.js`), 'utf8');
const appJs = fs.readFileSync(path.join(dir, `app${suffix}.js`), 'utf8');

const scriptTag = lang === 'en'
  ? '<script src="/data.en.js"></script>\n  <script src="/app.en.js"></script>'
  : '<script src="/data.js"></script>\n  <script src="/app.js"></script>';

let out = html
  .replace(
    '<link rel="stylesheet" href="/styles.css" />',
    `<style>\n${css}\n</style>`
  )
  .replace(
    scriptTag,
    `<script>\n${dataJs}\n</script>\n  <script>\n${appJs}\n</script>`
  );

if (out.includes('/styles.css') || out.includes('/data.js') || out.includes('/app.js') || out.includes('/data.en.js') || out.includes('/app.en.js')) {
  throw new Error('Sobrou referência a arquivo externo — build incompleto.');
}

const outName = lang === 'en' ? 'espelho-standalone-en.html' : 'espelho-standalone.html';
fs.writeFileSync(path.join(dir, outName), out);
console.log('Gerado: ' + outName + ' (' + (out.length / 1024).toFixed(0) + ' KB)');
