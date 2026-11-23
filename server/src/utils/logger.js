// A tiny logger so every log line looks the same and has a timestamp.
// All logging goes through this file, so it can be swapped for a
// production logging package later without changing the rest of the app.
const timestamp = () => new Date().toISOString();

export const logger = {
  info: (message) => console.log(`[${timestamp()}] INFO  ${message}`),
  error: (message, error) =>
    console.error(`[${timestamp()}] ERROR ${message}`, error ?? ''),
};
