import { describe, it, before, after } from 'node:test';
import assert from 'node:assert/strict';
import { env } from '../src/config/env.js';
import { startTestServer, request } from './helpers/testServer.js';

// Checks the configured request allowance and standard 429 error response.
describe('rate limiting', () => {
  let server;
  before(async () => {
    server = await startTestServer();
  });
  after(async () => {
    await server.close();
  });

  it('allows requests up to the limit, then returns 429 in the standard error shape', async () => {
    for (let i = 1; i <= env.rateLimit.max; i++) {
      const res = await request(server.baseUrl, '/health');
      assert.equal(res.status, 200, `request ${i} should be allowed`);
    }
    const blocked = await request(server.baseUrl, '/health');
    assert.equal(blocked.status, 429);
    assert.deepEqual(blocked.json, { status: 'error', message: 'Too many requests' });
  });
});
