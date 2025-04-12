const httpStatus = require('http-status-codes');

class ApiError extends Error {
  constructor(statusCode = httpStatus.BAD_REQUEST, message = '') {
    super(message);
    this.statusCode = statusCode;
  }
}

module.exports = ApiError;
