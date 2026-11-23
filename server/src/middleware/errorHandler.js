import { logger } from '../utils/logger.js';

// The single place where ALL errors in the app end up.
// Express recognises an error handler by its FOUR parameters,
// so 'next' must stay in the list even though we do not use it.
// eslint-disable-next-line no-unused-vars
export function errorHandler(err, req, res, next) {
  const statusCode = err.statusCode || err.status || 500;

  // Unexpected server errors (5xx) are logged in full for debugging.
  // For client errors (4xx) we log a short line only, because the error
  // object from a malformed request can contain a copy of the request body.
  if (statusCode >= 500) {
    logger.error(`${req.method} ${req.path} -> ${statusCode}`, err);
  } else {
    const reason = err.isOperational ? err.message : 'client error';
    logger.error(`${req.method} ${req.path} -> ${statusCode} (${reason})`);
  }

  // Only our own AppErrors may show their message to the user.
  // Everything else gets a generic message so we never leak internals.
  let message = 'Internal server error';
  if (err.isOperational) message = err.message;
  else if (statusCode < 500) message = 'Bad request';

  res.status(statusCode).json({ status: 'error', message });
}
