const { responseHelper } = require('../helpers');
const { UnHandledException } = require('../helpers/errorResponse');

const options = {
    basic: {
        abortEarly: false,
        convert: true,
    },
    array: {
        abortEarly: false,
        convert: true,
    },
};

module.exports = (schema) => (req, res, next) => {
    try {
        Object.keys(schema).forEach((key) => {
            const { error } = schema[key].validate(req[key], options);
            if (error) {
                const message = error.details[0].message || 'Invalid Inputs';
                // throw new PreconditionException(message);
                responseHelper.fail(res, message);
            }
        });

        next();
    } catch (error) {
        throw new UnHandledException(error);
    }
};
