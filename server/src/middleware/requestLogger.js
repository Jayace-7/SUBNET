import { logger } from '../utils/logger.js';

// Middleware that logs every request, for example: GET /health 200 3ms
export function requestLogger(req, res, next) {
  const start = Date.now();

  // 'finish' fires after the response has been sent, so we can log
  // the final status code and how long the request took.
  // We log req.path (not req.originalUrl) so query strings such as
  // ?token=... never end up in the logs.
  res.on('finish', () => {
    logger.info(
      `${req.method} ${req.path} ${res.statusCode} ${Date.now() - start}ms`
    );
  });

  // Pass the request on to the next middleware or route.
  next();
}
