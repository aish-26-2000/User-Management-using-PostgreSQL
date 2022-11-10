const { HTTP_CODES } = require('../config');
const { ErrorResponse } = require('../helpers/errorResponse');
const { logger } = require('../utils');

// eslint-disable-next-line no-unused-vars
const errorHandler = (err, req, res, next) => {
    let error = { ...err };

    error.message = err.message;

    if (err.code === HTTP_CODES.INTERNAL_SERVER_ERROR || (!err.code && !err.type)) logger.error(err);

    if (err.type === 'TypeError') {
        const message = `TypeError ${err.value}`;
        error = new ErrorResponse(message, HTTP_CODES.BAD_REQUEST);
    }

    if (err.name === 'CastError') {
        const message = `Resource not found with ID of ${err.value}`;
        error = new ErrorResponse(message, HTTP_CODES.NOT_FOUND);
    }

    if (err.code === 11000) {
        const message = 'Duplicate field value entered';
        error = new ErrorResponse(message, HTTP_CODES.BAD_REQUEST);
    }

    res.status(error.statusCode || 500).json({
        success: false,
        code: error.statusCode || 500,
        type: error.type || 'Internal Server Error',
        msg: error.message || 'Something went wrong. Please try again later.',
        data: error.err || {},
    });
};

module.exports = errorHandler;
