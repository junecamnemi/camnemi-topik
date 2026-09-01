// Link & asset integrity check — hits the local server for every local reference
const fs = require('fs');
const path = require('path');
const http = require('http');

const PORT = 8731;
const ROOT = __dirname;
const pages = ['index.html','login.html','curriculum.html','level-test.html','lesson.html','practice.html','topik-practice.html','drama.html','topik-info.html','book.html','contact.html'];

const errors = [];
const checked = new Set();

function resolveLocal(href) {
  if (!href) return null;
  if (/^(https?:|mailto:|tel:|javascript:|#)/.test(href)) return null;
  const clean = href.split('#')[0].split('?')[0];
  if (!clean) return null;
  return path.join(ROOT, clean);
}

function httpGet(url) {
  return new Promise((res, rej) => {
    const req = http.get(url, r => {
      res(r.statusCode);
      r.resume();
    });
    req.on('error', rej);
    req.setTimeout(4000, () => { req.destroy(new Error('timeout')); });
  });
}

async function check() {
  for (const p of pages) {
    const html = fs.readFileSync(path.join(ROOT, p), 'utf8');
    const re = /(?:src|href)\s*=\s*["']([^"']+)["']/g;
    let m;
    while ((m = re.exec(html))) {
      const local = resolveLocal(m[1]);
      if (!local) continue;
      const rel = path.relative(ROOT, local).replace(/\\/g, '/');
      if (checked.has(rel)) continue;
      checked.add(rel);
      if (!fs.existsSync(local)) {
        errors.push(`${p} -> MISSING ${m[1]}`);
      } else {
        const url = `http://127.0.0.1:${PORT}/${rel}`;
        const status = await httpGet(url);
        if (status !== 200) errors.push(`${p} -> HTTP ${status} ${m[1]}`);
      }
    }
  }
  console.log('Referenced local assets checked:', checked.size);
  console.log(errors.length ? `ERRORS:\n - ${errors.join('\n - ')}` : 'ALL LOCAL LINKS & ASSETS RESOLVE (200)');
}
check();

