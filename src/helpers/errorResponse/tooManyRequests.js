const { HTTP_CODES } = require('../../config');

class MaxRequestsException extends Error {
    constructor(message) {
        super(message);
        this.type = 'Too Many Requests';
        this.statusCode = HTTP_CODES.TOO_MANY_REQUESTS;
    }
}

module.exports = MaxRequestsException;
 