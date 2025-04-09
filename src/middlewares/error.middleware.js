// middlewares/error.middleware.js
const httpStatus = require('http-status-codes');

const errorHandler = (err, req, res, next) => {
    console.log(err)
    const statusCode = err.statusCode || httpStatus.INTERNAL_SERVER_ERROR;
    const message = err.message || 'Đã xảy ra lỗi không xác định.';
    res.status(statusCode).json({
        statusCode,
        message,
    });
};

module.exports = errorHandler;

