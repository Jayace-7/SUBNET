import { describe, it, before, after } from 'node:test';
import assert from 'node:assert/strict';
import { startTestServer, request } from './helpers/testServer.js';

// Confirms both the original health endpoint and the versioned API response.
describe('health routes', () => {
  let server;
  before(async () => {
    server = await startTestServer();
  });
  after(async () => {
    await server.close();
  });

  it('GET /health returns the original health response', async () => {
    const res = await request(server.baseUrl, '/health');
    assert.equal(res.status, 200);
    assert.deepEqual(res.json, {
      status: 'ok',
      service: 'subnet-server',
      message: 'Backend structure initialized.',
    });
  });

  it('GET /api/v1/health returns the standard success shape', async () => {
    const res = await request(server.baseUrl, '/api/v1/health');
    assert.equal(res.status, 200);
    assert.deepEqual(res.json, {
      status: 'success',
      data: { service: 'subnet-server', apiVersion: 'v1' },
    });
  });
});
