// Reads environment variables once and exports a single config object.
// The rest of the app imports this file instead of touching process.env,
// so every setting has one source of truth.

export const env = {
  nodeEnv: process.env.NODE_ENV || 'development',
  port: Number(process.env.PORT) || 4000,
};
