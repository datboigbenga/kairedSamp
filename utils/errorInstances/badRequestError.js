class BadRequestError extends Error {
  statusCode
  errors
  constructor(
    message,
    statusCode = 400,
    errors
  ) {
    super(message);
    this.statusCode = statusCode;
    this.errors = errors;
  }
}

module.exports = BadRequestError