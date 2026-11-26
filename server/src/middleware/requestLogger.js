import { logger } from '../utils/logger.js';

// Middleware that logs every request, for example: GET /health 200 3ms
export function requestLogger(req, res, next) {
  const start = Date.now();
  // Capture the path before mounted routers temporarily strip their prefix from
  // req.path. Keep using req.path so query strings are never logged.
  const path = req.path;

  // 'finish' fires after the response has been sent, so we can log
  // the final status code and how long the request took.
  res.on('finish', () => {
    logger.info(
      `${req.method} ${path} ${res.statusCode} ${Date.now() - start}ms`
    );
  });

  // Pass the request on to the next middleware or route.
  next();
}
