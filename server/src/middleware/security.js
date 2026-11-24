import helmet from 'helmet';
import cors from 'cors';
import { rateLimit } from 'express-rate-limit';
import { env } from '../config/env.js';
import { AppError } from '../utils/AppError.js';

// 1. SECURITY HEADERS
// helmet adds protective HTTP headers to every response (for example
// X-Content-Type-Options and Strict-Transport-Security) and removes the
// X-Powered-By header so we do not advertise that we use Express.
export const securityHeaders = helmet();

// 2. CORS
// Browsers block a website from calling an API on a different address unless
// the API allows it. We allow ONLY our own frontend (env.clientOrigin).
// Note: CORS is enforced by the BROWSER. It does not stop tools like curl,
// so it is not a replacement for authentication (added in a later stage).
// credentials (cookies) stay off for now; that is decided in the Keycloak stage.
export const corsPolicy = cors({
  origin: env.clientOrigin,
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
});

// 3. RATE LIMITING
// Limits how many requests one visitor (by IP address) can make in a time window.
// Over the limit, we pass a 429 AppError to the central error handler so the
// response has the same JSON shape and logging as every other error.
export const rateLimiter = rateLimit({
  windowMs: env.rateLimit.windowMs,
  limit: env.rateLimit.max,
  standardHeaders: true, // send standard RateLimit headers
  legacyHeaders: false, // do not send the old X-RateLimit-* headers
  handler: (req, res, next) => next(new AppError(429, 'Too many requests')),
});
