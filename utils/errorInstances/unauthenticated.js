class UnauthenticatedtError extends Error {
    statusCode
    errors
    constructor(
      message,
      statusCode = 401,
      errors
    ) {
      super(message);
      this.statusCode = statusCode;
      this.errors = errors;
    }
  }
  
  module.exports = UnauthenticatedtError