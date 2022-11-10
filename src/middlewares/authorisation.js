const { UnauthorizedException } = require('../helpers/errorResponse');
const { jwt } = require('../utils');

module.exports =
    (allowedRoles = []) =>
    async (req, res, next) => {
        try {
            if (!req.headers.authorization) throw new UnauthorizedException('Token header not found');

            const token = req.headers.authorization.split(' ')[1]; // Extracting Bearer token from header.

            if (!token) throw new UnauthorizedException('Token not found');

            const decoded = await jwt.verifyToken(token);

            if (allowedRoles.includes(decoded.role)) {
                req.user = decoded;
                next();
            } else {
                throw new UnauthorizedException('Oops! Unauthorised access');
            }
        } catch (error) {
            next(error);
        }
    };
