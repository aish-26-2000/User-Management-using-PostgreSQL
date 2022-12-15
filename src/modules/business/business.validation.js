const Joi = require('joi');

const businessSchema = {
    allBusinessList: {
        query: Joi.object().keys({
            page: Joi.number().integer().allow('', null).default(1),
            size: Joi.number().integer().allow('', null).default(3),
            sort_column: Joi.string().valid('name', 'createdAt').allow('', null),
            sort_order: Joi.string().valid('ASC', 'DESC', '').default('ASC').optional(),
            filterby: Joi.string()
                .valid('All', 'Cannabis Business', 'Non-Canabiss Business', 'Approved Vendor', 'Member Banks', '')
                .default('All')
                .optional(),
            query: Joi.string().allow(''),
        }),
    },

    newBusiness: {
        body: Joi.object().keys({
            name: Joi.string().trim().min(3).max(50).trim().required(),
            dba: Joi.string().trim().min(3).max(50).trim().required(),
            creator: Joi.string().trim().min(3).max(50).trim().required(),
        }),
    },
};

module.exports = { businessSchema };
