import { describe, it, before, after } from 'node:test';
import assert from 'node:assert/strict';
import express from 'express';
import { z } from 'zod';
import { validate } from '../src/middleware/validate.js';
import { errorHandler } from '../src/middleware/errorHandler.js';
import { startTestServer, request } from './helpers/testServer.js';

// These tests use a THROWAWAY app built inside this file, so no demo code
// is needed in the real project. It uses the REAL validate and errorHandler.
const schemas = {
  query: z.strictObject({
    page: z.coerce.number().int().min(1).max(100).optional(),
  }),
  body: z.strictObject({
    title: z.string().trim().min(1).max(100),
    rating: z.number().int().min(1).max(10),
  }),
};

function buildTestApp() {
  const app = express();
  app.use(express.json());
  app.post('/validate', validate(schemas), (req, res) => {
    res.status(200).json({ status: 'success', data: req.validated });
  });
  app.use(errorHandler);
  return app;
}

describe('request validation', () => {
  let server;
  before(async () => {
    server = await startTestServer(buildTestApp());
  });
  after(async () => {
    await server.close();
  });

  const post = (path, payload) =>
    request(server.baseUrl, path, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

  it('accepts valid data, converts the query to a number and trims text', async () => {
    const res = await post('/validate?page=2', { title: '  Test  ', rating: 8 });
    assert.equal(res.status, 200);
    assert.deepEqual(res.json.data, { query: { page: 2 }, body: { title: 'Test', rating: 8 } });
  });

  it('rejects a rating that is too high', async () => {
    const res = await post('/validate', { title: 'Test', rating: 99 });
    assert.equal(res.status, 400);
    assert.equal(res.json.message, 'Validation failed');
    assert.ok(res.json.details.some((d) => d.in === 'body' && d.field === 'rating'));
  });

  it('rejects a missing required field', async () => {
    const res = await post('/validate', { rating: 5 });
    assert.equal(res.status, 400);
    assert.ok(res.json.details.some((d) => d.in === 'body' && d.field === 'title'));
  });

  it('rejects a wrong type (injection-style text) without echoing it back', async () => {
    const res = await post('/validate', { title: 'x', rating: '10; DROP TABLE users' });
    assert.equal(res.status, 400);
    assert.ok(res.json.details.some((d) => d.field === 'rating'));
    assert.ok(!res.text.includes('DROP TABLE'), 'the submitted value must never be echoed back');
  });

  it('rejects bad query values', async () => {
    for (const bad of ['abc', '9999']) {
      const res = await post(`/validate?page=${bad}`, { title: 'Test', rating: 8 });
      assert.equal(res.status, 400, `page=${bad} should be rejected`);
      assert.ok(res.json.details.some((d) => d.in === 'query' && d.field === 'page'));
    }
  });

  it('reports problems from the query AND the body together', async () => {
    const res = await post('/validate?page=abc', { title: 'Test', rating: 99 });
    assert.equal(res.status, 400);
    assert.ok(res.json.details.some((d) => d.in === 'query'));
    assert.ok(res.json.details.some((d) => d.in === 'body'));
  });

  it('only returns in, field and message for each problem (no submitted values)', async () => {
    const res = await post('/validate', { title: '', rating: 'abc' });
    assert.equal(res.status, 400);
    for (const d of res.json.details) {
      assert.deepEqual(Object.keys(d).sort(), ['field', 'in', 'message']);
    }
  });

  // THIS is the test-first test. It describes the CORRECT behaviour for the
  // known issue: an unexpected field must be named in "field".
  it('rejects an unexpected field and names it in "field"', async () => {
    const res = await post('/validate', { title: 'T', rating: 5, isAdmin: true });
    assert.equal(res.status, 400);
    assert.deepEqual(res.json.details, [
      { in: 'body', field: 'isAdmin', message: 'Unexpected field' },
    ]);
  });

  it('does not write submitted values or details to the logs', async (t) => {
    const errorSpy = t.mock.method(console, 'error', () => {});
    const logSpy = t.mock.method(console, 'log', () => {});
    await post('/validate', { title: 'x', rating: '10; DROP TABLE users' });
    await new Promise((resolve) => setTimeout(resolve, 50)); // let the response finish
    const logged = [...errorSpy.mock.calls, ...logSpy.mock.calls]
      .map((call) => call.arguments.join(' '))
      .join('\n');
    assert.ok(logged.includes('POST /validate -> 400 (Validation failed)'));
    assert.ok(!logged.includes('DROP TABLE'));
    assert.ok(!logged.includes('"field"'));
  });
});
