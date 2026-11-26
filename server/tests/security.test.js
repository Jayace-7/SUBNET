import { describe, it, before, after } from 'node:test';
import assert from 'node:assert/strict';
import { startTestServer, request } from './helpers/testServer.js';

// Verifies the configured security headers, CORS policy, and body-size limit.
const ALLOWED_ORIGIN = 'http://localhost:5173';

describe('security protections', () => {
  let server;
  before(async () => {
    server = await startTestServer();
  });
  after(async () => {
    await server.close();
  });

  it('sends security headers and hides X-Powered-By', async () => {
    const res = await request(server.baseUrl, '/health');
    assert.equal(res.headers['x-powered-by'], undefined);
    assert.equal(res.headers['x-content-type-options'], 'nosniff');
    assert.ok(res.headers['strict-transport-security']);
    assert.ok(res.headers['x-frame-options']);
    assert.ok(res.headers['content-security-policy']);
  });

  it('allows the configured frontend origin (CORS)', async () => {
    const res = await request(server.baseUrl, '/health', { headers: { Origin: ALLOWED_ORIGIN } });
    assert.equal(res.headers['access-control-allow-origin'], ALLOWED_ORIGIN);
  });

  it('never allows a foreign origin (CORS)', async () => {
    const res = await request(server.baseUrl, '/health', {
      headers: { Origin: 'http://evil.example' },
    });
    // The header must be absent or the allowed frontend: never the foreign site, never "*".
    assert.ok(
      [undefined, ALLOWED_ORIGIN].includes(res.headers['access-control-allow-origin']),
      `unexpected Access-Control-Allow-Origin: ${res.headers['access-control-allow-origin']}`
    );
  });

  it('answers a CORS preflight request for the allowed origin', async () => {
    const res = await request(server.baseUrl, '/health', {
      method: 'OPTIONS',
      headers: { Origin: ALLOWED_ORIGIN, 'Access-Control-Request-Method': 'POST' },
    });
    assert.equal(res.status, 204);
    assert.equal(res.headers['access-control-allow-origin'], ALLOWED_ORIGIN);
    assert.ok(res.headers['access-control-allow-methods'].includes('POST'));
  });

  it('rejects an oversized request body with 413 and does not echo it', async () => {
    const body = JSON.stringify({ x: 'A'.repeat(20000) });
    const res = await request(server.baseUrl, '/health', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body,
    });
    assert.equal(res.status, 413);
    assert.equal(res.json.status, 'error');
    assert.ok(!res.text.includes('AAAA'));
  });
});
