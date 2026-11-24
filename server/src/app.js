import express from 'express';
import { requestLogger } from './middleware/requestLogger.js';
import { notFound } from './middleware/notFound.js';
import { errorHandler } from './middleware/errorHandler.js';
import { securityHeaders, corsPolicy, rateLimiter } from './middleware/security.js';
import { env } from './config/env.js';

const app = express();

// Logs every incoming request and its final response status.
app.use(requestLogger);

// Adds protective HTTP security headers to every response.
app.use(securityHeaders);

// Allows browser requests only from the configured frontend origin.
app.use(corsPolicy);

// Limits repeated requests from one visitor within a time window.
app.use(rateLimiter);

// Rejects JSON or form request bodies that exceed the configured size limit.
app.use(express.json({ limit: env.bodyLimit }));
app.use(express.urlencoded({ extended: true, limit: env.bodyLimit }));

app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'ok',
    service: 'subnet-server',
    message: 'Backend structure initialized.',
  });
});

// Handles requests to URLs that do not match any registered route.
app.use(notFound);

// MUST be registered last so it catches errors from all middleware and routes above it.
app.use(errorHandler);

export default app;
