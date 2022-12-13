const Joi = require('joi');

const userSchema = {
    register: {
        body: Joi.object().keys({
            firstName: Joi.string().trim().min(3).max(50).trim().required(),
            lastName: Joi.string().default('-'),
            password: Joi.string().alphanum().trim().min(3).max(50).trim().required(),
            phone: Joi.number(),
        }),
    },

    login: {
        body: Joi.object().keys({
            email: Joi.string().trim().email().required(),
            password: Joi.string().trim().min(3).max(50).trim().required(),
        }),
    },

    forgotPassword: {
        body: Joi.object().keys({
            email: Joi.string().trim().email().required(),
        }),
    },

    resetPassword: {
        body: Joi.object().keys({
            newPassword: Joi.string().trim().min(3).max(50).trim().required(),
        }),
    },

    changePassword: {
        body: Joi.object().keys({
            email: Joi.string().trim().email().required(),
            oldPassword: Joi.string().trim().min(3).max(50).trim().required(),
            newPassword: Joi.string().trim().min(3).max(50).trim().required(),
        }),
    },
};

module.exports = { userSchema };
