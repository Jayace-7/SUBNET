// Reads environment variables once and exports a single config object.
// The rest of the app imports this file instead of touching process.env,
// so every setting has one source of truth.

export const env = {
  nodeEnv: process.env.NODE_ENV || 'development',
  port: Number(process.env.PORT) || 4000,

  // The only website allowed to call this API from a browser (CORS).
  clientOrigin: process.env.CLIENT_ORIGIN || 'http://localhost:5173',

  // Rate limiting: at most `max` requests per visitor per `windowMs` milliseconds.
  rateLimit: {
    windowMs: Number(process.env.RATE_LIMIT_WINDOW_MS) || 15 * 60 * 1000,
    max: Number(process.env.RATE_LIMIT_MAX) || 100,
  },

  // Maximum size of a JSON or form request body.
  bodyLimit: process.env.BODY_LIMIT || '10kb',
};
