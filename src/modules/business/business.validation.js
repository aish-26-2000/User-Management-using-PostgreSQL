const Joi = require('joi');

const businessSchema = {
    editableBusinessList: {
        query: Joi.object().keys({
            page: Joi.number().integer().allow('', null).default(1),
            size: Joi.number().integer().allow('', null).default(3),
        }),
    },

    findBusiness: {
        params: Joi.object().keys({
            id: Joi.string().uuid().required(),
        }),
    },

    allBusinessList: {
        query: Joi.object().keys({
            page: Joi.number().integer().allow('', null).default(1),
            size: Joi.number().integer().allow('', null).default(3),
            sort_column: Joi.string().valid('name', 'createdAt').allow('', null),
            sort_order: Joi.string().valid('ASC', 'DESC', '').default('ASC').optional(),
            filterby: Joi.string()
                .valid('All', 'Cannabis Business', 'Non-Cannabis Business', 'Approved Vendor', 'Member Banks', '')
                .default('All')
                .optional(),
            query: Joi.string().allow(''),
        }),
    },

    newBusiness: {
        body: Joi.object().keys({
            is_cannabis_business: Joi.string().valid('Y', 'N'),
            basic_details: {
                name: Joi.string().trim().min(3).max(50).trim().required(),
                dba: Joi.string().trim().min(3).max(50).trim().required(),
                state: Joi.string().uuid().required(),
            },
            cannabis_related_details: {
                license_type: Joi.when(
                    'is_cannabis_business',
                    {
                        is: 'Y',
                        then: Joi.string().uuid().required(),
                    },
                    {
                        otherwise: Joi.forbidden(),
                    }
                ),
                license_no: Joi.when(
                    'is_cannabisbusiness',
                    {
                        is: 'Y',
                        then: Joi.string().min(3).max(50).required(),
                    },
                    {
                        otherwise: Joi.forbidden(),
                    }
                ),
                licensed_country: Joi.when(
                    'is_cannabisbusiness',
                    {
                        is: 'Y',
                        then: Joi.string().uuid().required(),
                    },
                    {
                        otherwise: Joi.forbidden(),
                    }
                ),
                licensed_state: Joi.when(
                    'is_cannabis_business',
                    {
                        is: 'Y',
                        then: Joi.string().uuid().required(),
                    },
                    {
                        otherwise: Joi.forbidden(),
                    }
                ),
            },
            contact_details: {
                legal_address: {
                    edit_state_county_details: Joi.string().valid('Y', 'N').required(),
                    country: Joi.string().uuid().valid('7b1ba6e8-cefe-48fb-9c9f-98eac87517b2').required(),
                    zipcode: Joi.string().uuid().required(),
                    county: Joi.when('edit_state_county_details', {
                        is: 'Y',
                        then: Joi.string().max(20).required(),
                    }),
                    state: Joi.when('edit_state_county_details', {
                        is: 'Y',
                        then: Joi.string().max(20).required(),
                    }),
                    city: Joi.when('edit_state_county_details', {
                        is: 'Y',
                        then: Joi.string().max(20).required(),
                    }),
                    street_no: Joi.string().max(5).required(),
                    street_name: Joi.string().trim().min(3).max(50).trim().required(),
                    phone_number: Joi.string().trim().max(12).trim().required(),
                    phone_type: Joi.string().uuid().required(),
                },
                business_location: {
                    is_primary_business_location_same_as_legal_address: Joi.string().valid('Y', 'N').required(),
                    edit_state_county_details: Joi.when('is_primary_business_location_same_as_legal_address', {
                        is: 'N',
                        then: Joi.string().valid('Y', 'N').required(),
                    }),
                    country: Joi.when('is_primary_business_location_same_as_legal_address', {
                        is: 'N',
                        then: Joi.string().uuid().valid('7b1ba6e8-cefe-48fb-9c9f-98eac87517b2').required(),
                    }),
                    zipcode: Joi.when('is_primary_business_location_same_as_legal_address', {
                        is: 'N',
                        then: Joi.string().uuid().required(),
                    }),
                    county: Joi.when('edit_state_county_details', {
                        is: 'Y',
                        then: Joi.string().max(20).required(),
                    }),
                    state: Joi.when('edit_state_county_details', {
                        is: 'Y',
                        then: Joi.string().max(20).required(),
                    }),
                    street_no: Joi.when('is_primary_business_location_same_as_legal_address', {
                        is: 'N',
                        then: Joi.string().max(5).required(),
                    }),
                    street_name: Joi.when('is_primary_business_location_same_as_legal_address', {
                        is: 'N',
                        then: Joi.string().trim().min(3).max(50).trim().required(),
                    }),
                    phone_number: Joi.when('is_primary_business_location_same_as_legal_address', {
                        is: 'N',
                        then: Joi.string().trim().max(12).trim().required(),
                    }),
                    phone_type: Joi.when('is_primary_business_location_same_as_legal_address', {
                        is: 'N',
                        then: Joi.string().uuid().required(),
                    }),
                },
            },
            key_person_registration: {
                add_user: Joi.string().valid('Y', 'N').required(),
                users: Joi.when('add_user', {
                    is: 'Y',
                    then: Joi.array().items(
                        Joi.object({
                            user_type: Joi.string()
                                .uuid()
                                .valid(
                                    '7cf77242-181c-45a2-94a5-2728974e8805', // beneficial owner
                                    'f63eda23-26fc-4594-b398-813c82f3e33b', // investor
                                    'ca51143d-9486-478b-a1cd-8051d682b7e0' // controlling managers
                                )
                                .required(),
                            name: Joi.string().trim().min(3).max(50).trim().required(),
                            email: Joi.string().trim().email().required(),
                            ownership_percentage: Joi.when('user_type', {
                                is: '7cf77242-181c-45a2-94a5-2728974e8805',
                                then: Joi.number().min(20).max(100).required(),
                            }),
                            investor_type: Joi.when('user_type', {
                                is: 'f63eda23-26fc-4594-b398-813c82f3e33b',
                                then: Joi.string()
                                    .uuid()
                                    .valid(
                                        '8c9783b7-614c-4447-9178-cb4f3165da5b', // angel/individual
                                        'f3bacea4-41a4-4873-ae42-b8089d3956a0', // fund
                                        '919a3f56-77e5-4691-80fc-bfe1ab9a90b4', // friends and family
                                        '3fe33de6-a9b2-46a7-8571-9a633820840e' // venture capital
                                    )
                                    .required(),
                            }),
                            access_type: Joi.string()
                                .valid(
                                    'd169c927-034d-4e74-997a-50f4fee899ba', // admin
                                    '0cbd8cd0-5925-4968-b4d3-4bc538254d70', // advanced
                                    'c6b1ff96-9ee5-4dec-a87f-432abe5b91e0', // limited
                                    'c5ee4167-630c-40e4-9ec9-1e7c4bb4965b' // no access
                                )
                                .required(),
                            set_as_contact_person: Joi.string().valid('Y', 'N'),
                        })
                    ),
                }),
            },
        }),
    },

    preferences: {
        body: Joi.object().keys({
            user_id: Joi.number().required(),
            pref_value: Joi.array().items(Joi.string().valid('name', 'dba', 'type', 'license_no')),
        }),
    },
};

module.exports = { businessSchema };

/* .custom((value, helpers) => {
                        // console.log(value);
                        const arr = value.map(ele => { return ele.ownership_percentage; });
                        // console.log(arr);
                        const total = arr.reduce((a, b) => { return a + b; });
                        // console.log(total);
                        if (total > 100) return helpers.message("Ownership Percentage should not exceed 100 %");
                        return value;
                    },'custom validation') */
