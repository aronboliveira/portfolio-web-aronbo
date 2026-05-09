#!/usr/bin/env node
import { createReadStream, existsSync, statSync } from 'node:fs';
import { createServer } from 'node:http';
import { extname, join, resolve, sep } from 'node:path';

const root = resolve(process.cwd(), 'dist/portfolio-web-aronbo-ng/browser');
const fallback = join(root, 'index.csr.html');
const host = process.env.HOST ?? '127.0.0.1';
const port = Number(process.env.PORT ?? readArg('--port') ?? 4200);

const contentTypes = new Map([
  ['.css', 'text/css; charset=utf-8'],
  ['.html', 'text/html; charset=utf-8'],
  ['.ico', 'image/x-icon'],
  ['.jpeg', 'image/jpeg'],
  ['.jpg', 'image/jpeg'],
  ['.js', 'text/javascript; charset=utf-8'],
  ['.json', 'application/json; charset=utf-8'],
  ['.pdf', 'application/pdf'],
  ['.png', 'image/png'],
  ['.svg', 'image/svg+xml; charset=utf-8'],
  ['.txt', 'text/plain; charset=utf-8'],
  ['.webp', 'image/webp'],
  ['.woff2', 'font/woff2'],
  ['.xml', 'application/xml; charset=utf-8'],
]);

function readArg(name) {
  const equalsArg = process.argv.find(arg => arg.startsWith(`${name}=`));
  if (equalsArg) return equalsArg.slice(name.length + 1);

  const index = process.argv.indexOf(name);
  return index >= 0 ? process.argv[index + 1] : undefined;
}

function getStaticPath(requestUrl) {
  const pathname = decodeURIComponent(new URL(requestUrl, `http://${host}`).pathname);
  const candidate = resolve(root, `.${pathname}`);

  if (candidate !== root && !candidate.startsWith(`${root}${sep}`)) {
    return { status: 403 };
  }

  if (existsSync(candidate)) {
    const stat = statSync(candidate);
    if (stat.isDirectory()) return { path: join(candidate, 'index.html') };
    if (stat.isFile()) return { path: candidate };
  }

  const acceptsHtml = extname(candidate) === '' || extname(candidate) === '.html';
  return acceptsHtml ? { path: fallback } : { status: 404 };
}

function sendFile(req, res, filePath) {
  if (!existsSync(filePath)) {
    res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
    res.end('Not found');
    return;
  }

  const contentType = contentTypes.get(extname(filePath)) ?? 'application/octet-stream';
  res.writeHead(200, { 'Content-Type': contentType });

  if (req.method === 'HEAD') {
    res.end();
    return;
  }

  createReadStream(filePath).pipe(res);
}

const server = createServer((req, res) => {
  if (!['GET', 'HEAD'].includes(req.method ?? '')) {
    res.writeHead(405, { 'Content-Type': 'text/plain; charset=utf-8' });
    res.end('Method not allowed');
    return;
  }

  if (new URL(req.url ?? '/', `http://${host}`).pathname === '/') {
    res.writeHead(301, { Location: '/en/' });
    res.end();
    return;
  }

  const result = getStaticPath(req.url ?? '/');
  if (result.status) {
    res.writeHead(result.status, { 'Content-Type': 'text/plain; charset=utf-8' });
    res.end(result.status === 403 ? 'Forbidden' : 'Not found');
    return;
  }

  sendFile(req, res, result.path);
});

server.listen(port, host, () => {
  console.log(`Serving ${root} at http://${host}:${port}`);
});
