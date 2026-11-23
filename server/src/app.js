import express from 'express';
import { requestLogger } from './middleware/requestLogger.js';
import { notFound } from './middleware/notFound.js';
import { errorHandler } from './middleware/errorHandler.js';

const app = express();

// Logs every incoming request and its final response status.
app.use(requestLogger);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

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
