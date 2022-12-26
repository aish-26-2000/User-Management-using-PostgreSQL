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

    cannabisBusiness: {
        body: Joi.object().keys({
            basic_details: {
                name: Joi.string().trim().min(3).max(50).trim().required(),
                dba: Joi.string().trim().min(3).max(50).trim().required(),
                creator_email: Joi.string().email().required(),
            },
            cannabis_related_details: {
                license_type: Joi.string()
                    .valid(
                        'Retailer',
                        'Retailer Nonstorefront',
                        'Distributor',
                        'Distributor-Transport Only',
                        'Microbusiness',
                        'Event Organizer',
                        'Adult-Use Cannabis Cultivation License',
                        'Adult-Use Cannabis Cultivation Provisional License',
                        'Medicinal Cannabis Cultivation License',
                        'Medicinal Cannabis Cultivation Provisional License',
                        'Temporary Cannabis Cultivation License',
                        'Other',
                        'Adult and Medicinal',
                        'Adult Use',
                        'Medicinal',
                        'Testing Laboratory',
                        'Manufacturer',
                        'Cultivation',
                        'Vertically Integrated',
                        'Testing',
                        'Retail/Dispensary',
                        'Manufacturer/Processor',
                        'Owner/Investor',
                        'Wholesale/Distribution',
                        'Unknown',
                        'Delivery/Transporter',
                        'Research',
                        'Storage',
                        'Management Company',
                        'Social Use Club',
                        'Senior Manager',
                        'Corporate Officer'
                    )
                    .required(),
                country: Joi.string().valid('Canada', 'United States of America').required(),
            },
            contact_details: {
                legal_address: {
                    edit_state_county_details: Joi.string().valid('Y', 'N').required(),
                    country: Joi.string().valid('United States of America').required(),
                    zipcode: Joi.string().trim().max(8).required(),
                    county: Joi.when('edit_state_county_details', {
                        is: 'Y',
                        then: Joi.string().max(20).required(),
                    }),
                    state: Joi.when('edit_state_county_details', {
                        is: 'Y',
                        then: Joi.string().max(20).required(),
                    }),
                    street_no: Joi.string().max(5).required(),
                    street_name: Joi.string().trim().min(3).max(50).trim().required(),
                    phone_number: Joi.string().trim().max(12).trim().required(),
                    phone_type: Joi.string().required().valid('Mobile', 'Landline'),
                },
                business_location: {
                    is_primary_business_location_same_as_legal_address: Joi.string().valid('Y', 'N').required(),
                    edit_state_county_details: Joi.when('is_primary_business_location_same_as_legal_address', {
                        is: 'N',
                        then: Joi.string().valid('Y', 'N').required(),
                    }),
                    country: Joi.when('is_primary_business_location_same_as_legal_address', {
                        is: 'N',
                        then: Joi.string().valid('United States of America').required(),
                    }),
                    zipcode: Joi.when('is_primary_business_location_same_as_legal_address', {
                        is: 'N',
                        then: Joi.string().trim().max(8).required(),
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
                        then: Joi.string().required().valid('Mobile', 'Landline'),
                    }),
                },
            },
            key_person_registration: {
                add_user: Joi.string().valid('Y', 'N').required(),
                user_type: Joi.when('add_user', {
                    is: 'Y',
                    then: Joi.string().valid('Beneficial owner', 'Investor', 'Controlling Managers & Operators').required(),
                }),
                name: Joi.when('add_user', {
                    is: 'Y',
                    then: Joi.string().trim().min(3).max(50).trim().required(),
                }),
                email: Joi.when('add_user', {
                    is: 'Y',
                    then: Joi.string().trim().email().required(),
                }),
                ownership_percentage: Joi.when('add_user', {
                    is: 'Y',
                    then: Joi.when('user_type', {
                        is: 'B',
                        then: Joi.number().min(20).max(100).required(),
                    }),
                }),
                investor_type: Joi.when('add_user', {
                    is: 'Y',
                    then: Joi.when('user_type', {
                        is: 'C',
                        then: Joi.string()
                            .valid('Angel/Individual', 'Fund', 'Friends and Family', 'Venture Capital/Institutional')
                            .required(),
                    }),
                }),
                access_type: Joi.when('add_user', {
                    is: 'Y',
                    then: Joi.string().valid('Admin', 'Advanced', 'Limited', 'No access').required(),
                }),
                set_as_contact_person: Joi.when('add_user', {
                    is: 'Y',
                    then: Joi.string().valid('Y', 'N'),
                }),
            },
        }),
    },

    nonCannabisBusiness: {
        body: Joi.object().keys({
            basic_details: {
                name: Joi.string().trim().min(3).max(50).trim().required(),
                dba: Joi.string().trim().min(3).max(50).trim().required(),
                creator_email: Joi.string().email().required(),
            },
            contact_details: {
                legal_address: {
                    edit_state_county_details: Joi.string().valid('Y', 'N').required(),
                    country: Joi.string().valid('United States of America').required(),
                    zipcode: Joi.string().trim().max(8).required(),
                    county: Joi.when('edit_state_county_details', {
                        is: 'Y',
                        then: Joi.string().max(20).required(),
                    }),
                    state: Joi.when('edit_state_county_details', {
                        is: 'Y',
                        then: Joi.string().max(20).required(),
                    }),
                    street_no: Joi.string().max(5).required(),
                    street_name: Joi.string().trim().min(3).max(50).trim().required(),
                    phone_number: Joi.string().trim().max(12).trim().required(),
                    phone_type: Joi.string().required().valid('Mobile', 'Landline'),
                },
                business_location: {
                    is_primary_business_location_same_as_legal_address: Joi.string().valid('Y', 'N').required(),
                    edit_state_county_details: Joi.string().valid('Y', 'N').required(),
                    country: Joi.when('is_primary_business_location_same_as_legal_address', {
                        is: 'N',
                        then: Joi.string().valid('United States of America').required(),
                    }),
                    zipcode: Joi.when('is_primary_business_location_same_as_legal_address', {
                        is: 'N',
                        then: Joi.string().trim().max(8).required(),
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
                        then: Joi.string().required().valid('Mobile', 'Landline'),
                    }),
                },
            },
            key_person_registration: {
                add_user: Joi.string().valid('Y', 'N').required(),
                user_type: Joi.when('add_user', {
                    is: 'Y',
                    then: Joi.string().valid('Beneficial owner', 'Investor', 'Controlling Managers & Operators').required(),
                }),
                name: Joi.when('add_user', {
                    is: 'Y',
                    then: Joi.string().trim().min(3).max(50).trim().required(),
                }),
                email: Joi.when('add_user', {
                    is: 'Y',
                    then: Joi.string().trim().email().required(),
                }),
                ownership_percentage: Joi.when('add_user', {
                    is: 'Y',
                    then: Joi.when('user_type', {
                        is: 'B',
                        then: Joi.number().min(20).max(100).required(),
                    }),
                }),
                investor_type: Joi.when('add_user', {
                    is: 'Y',
                    then: Joi.when('user_type', {
                        is: 'C',
                        then: Joi.string()
                            .valid('Angel/Individual', 'Fund', 'Friends and Family', 'Venture Capital/Institutional')
                            .required(),
                    }),
                }),
                access_type: Joi.when('add_user', {
                    is: 'Y',
                    then: Joi.string().valid('Admin', 'Advanced', 'Limited', 'No access').required(),
                }),
                set_as_contact_person: Joi.when('add_user', {
                    is: 'Y',
                    then: Joi.string().valid('Y', 'N'),
                }),
            },
        }),
    },
};

module.exports = { businessSchema };
