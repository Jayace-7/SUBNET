import http from 'node:http';
import app from '../../src/app.js';

// Starts an Express app on a RANDOM free port so tests never clash with a
// running dev server. Returns the base URL and a function to shut it down.
export function startTestServer(expressApp = app) {
  return new Promise((resolve) => {
    const server = expressApp.listen(0, '127.0.0.1', () => {
      const { port } = server.address();
      resolve({
        baseUrl: `http://127.0.0.1:${port}`,
        close: () =>
          new Promise((done) => {
            server.close(() => done());
            // Do not wait for idle connections, or the test process would hang.
            server.closeAllConnections();
          }),
      });
    });
  });
}

// A small HTTP client built on node:http (instead of fetch) so tests can set
// ANY header, including Origin, which browser-style fetch rules may block.
// Returns { status, headers, text, json } where json is null if the body is not JSON.
export function request(baseUrl, path, { method = 'GET', headers = {}, body } = {}) {
  return new Promise((resolve, reject) => {
    const url = new URL(path, baseUrl);
    const finalHeaders = { ...headers };
    if (body !== undefined) finalHeaders['Content-Length'] = Buffer.byteLength(body);

    // agent:false = a fresh connection per request, closed afterwards.
    const req = http.request(url, { method, headers: finalHeaders, agent: false }, (res) => {
      let text = '';
      res.setEncoding('utf8');
      res.on('data', (chunk) => (text += chunk));
      res.on('end', () => {
        let json = null;
        try {
          json = JSON.parse(text);
        } catch {
          // not JSON; leave json as null
        }
        resolve({ status: res.statusCode, headers: res.headers, text, json });
      });
    });
    req.on('error', reject);
    if (body !== undefined) req.write(body);
    req.end();
  });
}
