import { describe, it, before, after } from 'node:test';
import assert from 'node:assert/strict';
import { startTestServer, request } from './helpers/testServer.js';

// Checks standard error responses and ensures logs omit untrusted request data.
describe('error handling and logging', () => {
  let server;
  before(async () => {
    server = await startTestServer();
  });
  after(async () => {
    await server.close();
  });

  it('returns a JSON 404 for an unknown route', async () => {
    const res = await request(server.baseUrl, '/does-not-exist');
    assert.equal(res.status, 404);
    assert.deepEqual(res.json, { status: 'error', message: 'Route not found' });
  });

  it('returns a JSON 404 for an unknown route under /api/v1', async () => {
    const res = await request(server.baseUrl, '/api/v1/does-not-exist');
    assert.equal(res.status, 404);
    assert.deepEqual(res.json, { status: 'error', message: 'Route not found' });
  });

  it('returns 400 for malformed JSON without leaking internals', async () => {
    const res = await request(server.baseUrl, '/health', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: '{bad',
    });
    assert.equal(res.status, 400);
    assert.deepEqual(res.json, { status: 'error', message: 'Bad request' });
    for (const secret of ['SyntaxError', 'node_modules', 'stack', '{bad']) {
      assert.ok(!res.text.includes(secret), `response must not contain "${secret}"`);
    }
  });

  it('does not write the malformed request body to the logs', async (t) => {
    const errorSpy = t.mock.method(console, 'error', () => {});
    const logSpy = t.mock.method(console, 'log', () => {});
    await request(server.baseUrl, '/health', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: '{bad',
    });
    await new Promise((resolve) => setTimeout(resolve, 50)); // let the response finish
    const logged = [...errorSpy.mock.calls, ...logSpy.mock.calls]
      .map((call) => call.arguments.join(' '))
      .join('\n');
    assert.ok(logged.includes('POST /health -> 400'));
    assert.ok(!logged.includes('{bad'));
  });

  it('logs the FULL path of API requests and never the query string', async (t) => {
    const logSpy = t.mock.method(console, 'log', () => {});
    await request(server.baseUrl, '/api/v1/health?token=secret123');
    await new Promise((resolve) => setTimeout(resolve, 50));
    const logged = logSpy.mock.calls.map((call) => call.arguments.join(' ')).join('\n');
    assert.ok(logged.includes('GET /api/v1/health 200'), 'full path must be logged');
    assert.ok(!logged.includes('secret123'), 'query string must never be logged');
  });
});
