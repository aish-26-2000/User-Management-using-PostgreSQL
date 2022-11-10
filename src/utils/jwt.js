const { BadRequestException } = require('../helpers/errorResponse');
const jwt = require('jsonwebtoken');
const { CONSTANTS } = require('../config');


exports.verifyToken = (token) => {
    // eslint-disable-next-line no-unused-vars
    return new Promise((resolve, reject) => {
        jwt.verify(token, CONSTANTS.JWT.JWT_SECRET, (err, decoded) => {
            if (err) throw new BadRequestException('Invalid Token');
            resolve(decoded);
        });
    });
};

exports.generateAccessToken = (email) => {
    return jwt.sign({email}, CONSTANTS.JWT.JWT_SECRET,{
        expiresIn :  CONSTANTS.JWT.JWT_EXPIRES_IN
    });
};

exports.parseToken = (token) => {
    const decoded = jwt.decode(token);
    return decoded.email;
};
