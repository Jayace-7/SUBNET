import { AppError } from '../utils/AppError.js';

// Runs only when no route matched the request.
// It creates a 404 error and hands it to the error handler.
export function notFound(req, res, next) {
  next(new AppError(404, 'Route not found'));
}
