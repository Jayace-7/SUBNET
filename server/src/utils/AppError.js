// A custom error we throw ON PURPOSE when something is wrong in a route,
// for example: throw new AppError(404, 'Movie not found').
// It carries an HTTP status code and a message that is safe to show to the user.
export class AppError extends Error {
  constructor(statusCode, message) {
    super(message);
    this.statusCode = statusCode;
    // Marks this as an expected error, so its message may be shown to the user.
    // Unexpected errors (bugs) never get this flag and are hidden from users.
    this.isOperational = true;
  }
}
