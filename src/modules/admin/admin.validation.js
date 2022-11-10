const Joi = require('joi');


const adminSchema = {
    invite: {
        body: Joi.object().keys({
            email: Joi.string().trim().email().required(),
        }),
    },

    list: {
        query: Joi.object().keys({
            page: Joi.number().integer().allow('',null).default(1),
            size: Joi.number().integer().allow('',null).default(3),
            sort_column : Joi.string().valid("UserId","firstName","lastName","email","phone").allow('',null),
            sort_order : Joi.string().valid("ASC","DESC",'').default("ASC").optional(),
            query: Joi.string().allow(''),
        }),
    },

    login: {
        body: Joi.object().keys({
            email: Joi.string().trim().email().required(),
            password: Joi.string().trim().min(3).max(50).trim().required(),
        }),
    },
};



module.exports = { adminSchema };
