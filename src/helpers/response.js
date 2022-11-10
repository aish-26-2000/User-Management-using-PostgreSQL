const { HTTP_CODES } = require('../config');

const formatResponse = (res, statusCode, message = 'Success', data) =>
    res.status(statusCode).json({
        message,
        data,
    });

exports.success = (res, data, message) => formatResponse(res, HTTP_CODES.OK, message, data);
exports.created = (res, data, message) => formatResponse(res, HTTP_CODES.CREATED, message, data);
exports.noContent = (res) => res.status(HTTP_CODES.NO_CONTENT).send();
exports.fail = (res,message) => formatResponse(res,HTTP_CODES.BAD_REQUEST,message);