const crypto = require('crypto');
const { sequelize } = require('../../database/models');
const db = require('../../database/models');
const Op = db.Sequelize.Op;

exports.getEditableBusiness = async (page, size) => {
    const Pagination = (page, size) => {
        const limit = size ? +size : 3;
        const offset = page ? page * limit : 0;
        return { limit, offset };
    };
    const getPagingData = (data, page, limit) => {
        const { count: total, rows: Business } = data;
        const currentPage = page ? +page : 0;
        const totalPages = Math.ceil(total / limit);
        return { total, Business, totalPages, currentPage };
    };

    const { limit, offset } = Pagination(page, size);
    const list = await db.Business.findAndCountAll({
        attributes: ['bp_business_id', 'name', 'dba', 'is_active'],
        limit,
        offset,
    });

    const response = getPagingData(list, page, limit);
    return response;
};

exports.getAllBusiness = async (page, size, sort_column, sort_order, filterby, query) => {
    const Pagination = (page, size) => {
        const limit = size ? +size : 3;
        const offset = page ? page * limit : 0;
        return { limit, offset };
    };
    const getPagingData = (data, page, limit) => {
        const { count: totalItems, rows: list } = data;
        const currentPage = page ? +page : 0;
        const totalPages = Math.ceil(totalItems / limit);
        return { totalItems, list, totalPages, currentPage };
    };

    const { limit, offset } = Pagination(page, size);

    if (filterby === 'Cannabis Business') {
        const business = await db.Business.findAndCountAll({
            attributes: [
                'business_id',
                'bp_business_id',
                'name',
                'dba',
                'bp_group_shortcode',
                'createdAt',
                'is_approved',
                'is_approved_vendor',
                'is_cannabis_business',
                'is_createdby_stdc',
            ],
            where: {
                [Op.and]: [
                    { is_cannabis_business: 'Y' },
                    { [Op.or]: [{ name: { [Op.like]: '%' + query + '%' } }, { dba: { [Op.like]: '%' + query + '%' } }] },
                ],
            },
            include: [{ model: db.Business_Stage_Status, attributes: ['bp_onboard_stage_status_id', 'stage', 'status'] }],
            order: [[sort_column || 'business_id', sort_order || 'ASC']],
            limit,
            offset,
        });

        const response = getPagingData(business, page, limit);
        if (response) return response;
    }

    if (filterby === 'Non-Cannabis Business') {
        const business = await db.Business.findAndCountAll({
            attributes: [
                'business_id',
                'bp_business_id',
                'name',
                'dba',
                'bp_group_shortcode',
                'createdAt',
                'is_approved',
                'is_approved_vendor',
                'is_cannabis_business',
                'is_createdby_stdc',
            ],
            where: {
                [Op.and]: [
                    { is_cannabis_business: 'N' },
                    { [Op.or]: [{ name: { [Op.like]: '%' + query + '%' } }, { dba: { [Op.like]: '%' + query + '%' } }] },
                ],
            },
            include: [{ model: db.Business_Stage_Status, attributes: ['bp_onboard_stage_status_id', 'stage', 'status'] }],
            order: [[sort_column || 'business_id', sort_order || 'ASC']],
            limit,
            offset,
        });

        const response = getPagingData(business, page, limit);
        if (response) return response;
    }

    if (filterby === 'Approved Vendor') {
        const business = await db.Business.findAndCountAll({
            attributes: [
                'business_id',
                'bp_business_id',
                'name',
                'dba',
                'bp_group_shortcode',
                'createdAt',
                'is_approved',
                'is_approved_vendor',
                'is_cannabis_business',
                'is_createdby_stdc',
            ],
            where: {
                [Op.and]: [
                    { is_approved_vendor: 'Y' },
                    { [Op.or]: [{ name: { [Op.like]: '%' + query + '%' } }, { dba: { [Op.like]: '%' + query + '%' } }] },
                ],
            },
            include: [{ model: db.Business_Stage_Status, attributes: ['bp_onboard_stage_status_id', 'stage', 'status'] }],
            order: [[sort_column || 'business_id', sort_order || 'ASC']],
            limit,
            offset,
        });

        const response = getPagingData(business, page, limit);
        if (response) return response;
    }

    if (filterby === 'Member Banks') {
        const business = await db.Business.findAndCountAll({
            attributes: [
                'business_id',
                'bp_business_id',
                'name',
                'dba',
                'bp_group_shortcode',
                'createdAt',
                'is_approved',
                'is_approved_vendor',
                'is_cannabis_business',
                'is_createdby_stdc',
            ],
            where: {
                [Op.and]: [
                    { bp_group_shortcode: 'MEMFI' },
                    { [Op.or]: [{ name: { [Op.like]: '%' + query + '%' } }, { dba: { [Op.like]: '%' + query + '%' } }] },
                ],
            },
            include: [{ model: db.Business_Stage_Status, attributes: ['bp_onboard_stage_status_id', 'stage', 'status'] }],
            order: [[sort_column || 'business_id', sort_order || 'ASC']],
            limit,
            offset,
        });

        const response = getPagingData(business, page, limit);
        if (response) return response;
    }

    const business = await db.Business.findAndCountAll({
        attributes: [
            'business_id',
            'bp_business_id',
            'name',
            'dba',
            'bp_group_shortcode',
            'createdAt',
            'is_approved',
            'is_approved_vendor',
            'is_cannabis_business',
            'is_createdby_stdc',
        ],
        where: {
            [Op.or]: [{ name: { [Op.like]: '%' + query + '%' } }, { dba: { [Op.like]: '%' + query + '%' } }],
        },
        include: [{ model: db.Business_Stage_Status, attributes: ['bp_onboard_stage_status_id', 'stage', 'status'] }],
        order: [[sort_column || 'business_id', sort_order || 'ASC']],
        limit,
        offset,
    });

    const response = getPagingData(business, page, limit);
    if (response) return response;
};

exports.addBusiness = async (data) => {
    // unmanaged transaction
    const t = await sequelize.transaction();

    try {
        const user = await db.User.findOne({ where: { email: data.basic_details.creator_email } });
        const region = await db.bt_region.findOne({ where: { bt_region_id: data.basic_details.state } });
        // basic details
        const basic_data = {
            name: data.basic_details.name,
            dba: data.basic_details.dba,
            bp_group_shortcode: 'MEMBZ',
            createdBy: user.fullName,
            updatedBy: user.fullName,
            incorp_state_bt_region_id: region.id,
            is_createdby_stdc: 'Y',
            is_cannabis_business: data.is_cannabis_business,
        };
        const basic_details = await db.Business.create(basic_data, { transaction: t });

        if (data.is_cannabis_business === 'Y') {
            // cannabis details
            const license = await db.bp_license_type.findOne({ where: { bp_license_type_id: data.cannabis_related_details.license_type } });
            const licensed_state = await db.bt_region.findOne({ where: { bt_region_id: data.cannabis_related_details.licensed_state } });
            const license_data = {
                is_active: 'Y',
                createdBy: user.fullName,
                updatedBy: user.fullName,
                business_id: basic_details.business_id,
                license_no: data.cannabis_related_details.license_no,
                license_type_id: license.id,
                license_type_comment: data.cannabis_related_details.license_type,
                bp_license_state_bt_region_id: licensed_state.id,
            };
            await db.Business_License.create(license_data, { transaction: t });
        }

        // contact details
        // legal address
        const contact_details = await this.addLegalAddress(data, t);

        const phone_type = await db.bt_phone_type.findOne({ where: { bt_phonetype_id: data.contact_details.legal_address.phone_type } });
        await db.Business_Phone.create(
            {
                is_active: 'Y',
                createdBy: user.fullName,
                updatedBy: user.fullName,
                phone: data.contact_details.legal_address.phone_number,
                phone_type_id: phone_type.id,
                business_id: basic_details.business_id,
            },
            { transaction: t }
        );

        // business location
        if (data.contact_details.business_location.is_primary_business_location_same_as_legal_address === 'N') {
            const business_loc = await this.addBusinessLocation(data, t);

            const phone_type = await db.bt_phone_type.findOne({
                where: { bt_phonetype_id: data.contact_details.legal_address.phone_type },
            });
            await db.Business_Phone.create(
                {
                    is_active: 'Y',
                    createdBy: user.fullName,
                    updatedBy: user.fullName,
                    phone: data.contact_details.legal_address.phone_number,
                    phone_type_id: phone_type.id,
                    business_id: basic_details.business_id,
                },
                { transaction: t }
            );

            await db.Business_Other_Addr.create(
                {
                    is_active: 'Y',
                    createdBy: user.fullName,
                    updatedBy: user.fullName,
                    name: 'Business-Premise-Address',
                    business_id: basic_details.business_id,
                    address_id: business_loc.address_id,
                },
                { transaction: t }
            );
        }

        // key person registration
        await db.Business_User_Assoc.create(
            {
                is_active: 'Y',
                createdBy: user.fullName,
                updatedBy: user.fullName,
                description: 'Controlling Managers & Operators',
                ownership_percent: 0,
                UserId: user.UserId,
                business_id: basic_details.business_id,
                user_assoc_id: 3,
                is_contact_person: 'Y',
            },
            { transaction: t }
        );
        await db.User_Role.create(
            {
                um_user_role_id: crypto.randomUUID(),
                is_active: 'Y',
                created: new Date(),
                updated: new Date(),
                createdby: user.fullName,
                updatedby: user.fullName,
                role_comment: 'Admin',
                role_id: 1,
                user_id: user.UserId,
                business_id: basic_details.business_id,
            },
            { transaction: t }
        );

        if (data.key_person_registration.add_user === 'Y') {
            const user = await db.User.findOne({ where: { email: data.key_person_registration.email } });
            const user_assoc = await db.bp_user_association.findOne({
                where: { bp_user_association_id: data.key_person_registration.user_type },
            });
            const user_role = await db.Roles.findOne({ where: { um_role_id: data.key_person_registration.access_type } });

            if (data.key_person_registration.user_type === '7cf77242-181c-45a2-94a5-2728974e8805') {
                await db.Business_User_Assoc.create(
                    {
                        is_active: 'Y',
                        createdBy: user.fullName,
                        updatedBy: user.fullName,
                        description: 'Beneficial owner',
                        ownership_percent: data.key_person_registration.ownership_percentage,
                        UserId: user.UserId,
                        business_id: basic_details.business_id,
                        user_assoc_id: user_assoc.id,
                        is_contact_person: data.key_person_registration.set_as_contact_person,
                    },
                    { transaction: t }
                );
                await db.User_Role.create(
                    {
                        um_user_role_id: crypto.randomUUID(),
                        is_active: 'Y',
                        created: new Date(),
                        updated: new Date(),
                        createdby: user.fullName,
                        updatedby: user.fullName,
                        role_comment: user_role.name,
                        role_id: user_role.id,
                        user_id: user.UserId,
                        business_id: basic_details.business_id,
                    },
                    { transaction: t }
                );
            }

            if (data.key_person_registration.user_type === 'ca51143d-9486-478b-a1cd-8051d682b7e0') {
                await db.Business_User_Assoc.create(
                    {
                        is_active: 'Y',
                        createdBy: user.fullName,
                        updatedBy: user.fullName,
                        description: 'Controlling Managers & Operators',
                        ownership_percent: 0,
                        UserId: user.UserId,
                        business_id: basic_details.business_id,
                        user_assoc_id: user_assoc.id,
                        is_contact_person: data.key_person_registration.set_as_contact_person,
                    },
                    { transaction: t }
                );
                await db.User_Role.create(
                    {
                        um_user_role_id: crypto.randomUUID(),
                        is_active: 'Y',
                        created: new Date(),
                        updated: new Date(),
                        createdby: user.fullName,
                        updatedby: user.fullName,
                        role_comment: user_role.name,
                        role_id: user_role.id,
                        user_id: user.UserId,
                        business_id: basic_details.business_id,
                    },
                    { transaction: t }
                );
            }

            if (data.key_person_registration.user_type === 'f63eda23-26fc-4594-b398-813c82f3e33b') {
                const investor_type = await db.bp_investor_type.findOne({
                    where: { bp_investor_type_id: data.key_person_registration.investor_type },
                });
                await db.Business_User_Assoc.create(
                    {
                        is_active: 'Y',
                        createdBy: user.fullName,
                        updatedBy: user.fullName,
                        description: 'Investor',
                        ownership_percent: 0,
                        UserId: user.UserId,
                        business_id: basic_details.business_id,
                        investor_type_id: investor_type.id,
                        user_assoc_id: user_assoc.id,
                        is_contact_person: data.key_person_registration.set_as_contact_person,
                    },
                    { transaction: t }
                );
            }
        }

        await db.Business_Stage_Status.create(
            {
                createdBy: user.fullName,
                updatedBy: user.fullName,
                stage: 'Membership',
                status: 'Inactive',
                bp_business_id: basic_details.bp_business_id,
                business_id: basic_details.business_id,
            },
            { transaction: t }
        );

        await t.commit();

        return {
            id: basic_details.bp_business_id,
            name: basic_details.name,
            dba: basic_details.dba,
            legal_address: contact_details.address1,
        };
    } catch (err) {
        await t.rollback();
        throw err;
    }
};

exports.allPhoneTypes = async () => {
    const data = await db.bt_phone_type.findAndCountAll({
        attributes: ['bt_phonetype_id', 'name'],
    });
    return data;
};

exports.allZipcodes = async () => {
    const data = await db.bt_zipcodes.findAndCountAll({
        attributes: ['bt_zipcodes_id', 'zipcode', 'city', 'county'],
    });
    return data;
};

exports.allCountry = async () => {
    const data = await db.bt_country.findAll({
        where: {
            name: 'United States of America',
        },
        attributes: ['bt_country_id', 'name'],
    });
    return data;
};

exports.allStates = async () => {
    const data = await db.bt_region.findAndCountAll({
        attributes: ['bt_region_id', 'bt_country_id', 'name'],
        order: [['name', 'ASC']],
    });
    return data;
};

exports.user_association_types = async () => {
    const data = await db.bp_user_association.findAndCountAll({
        attributes: ['bp_user_association_id', 'name'],
    });
    return data;
};

exports.investor_type = async () => {
    const data = await db.bp_investor_type.findAndCountAll({
        attributes: ['bp_investor_type_id', 'name'],
    });
    return data;
};

exports.entity_type = async () => {
    const data = await db.bp_entity_type.findAndCountAll({
        attributes: ['bp_entity_type_id', 'name'],
    });
    return data;
};

exports.license_type = async () => {
    const data = await db.bp_license_type.findAndCountAll({
        attributes: ['bp_license_type_id', 'is_accredited', 'name'],
    });
    return data;
};

exports.license_category = async () => {
    const data = await db.bp_license_type_desig.findAndCountAll();
    return data;
};

exports.checkZipcode = async (zipcode) => {
    const code = await db.bt_zipcodes.findOne({ where: { bt_zipcodes_id: zipcode } });
    if (code) {
        return code;
    }
};

exports.addLegalAddress = async (data, t) => {
    const zipcodeData = await db.bt_zipcodes.findOne({ where: { bt_zipcodes_id: data.contact_details.legal_address.zipcode } });
    const user = await db.User.findOne({ where: { email: data.basic_details.creator_email } });

    if (data.contact_details.legal_address.edit_state_county_details === 'N') {
        const address1 = `${data.basic_details.name},${data.contact_details.legal_address.street_no} ${data.contact_details.legal_address.street_name},${zipcodeData.city},${zipcodeData.county},${zipcodeData.zipcode}`;
        const addr_data = {
            is_active: 'Y',
            createdBy: user.fullName,
            updatedBy: user.fullName,
            zipcodes_id: zipcodeData.id,
            street_no: data.contact_details.legal_address.street_no,
            address1: address1,
        };
        const contact_details = await db.Business_Address.create(addr_data, { transaction: t });
        return contact_details;
    }

    if (data.contact_details.legal_address.edit_state_county_details === 'Y') {
        const address1 = `${data.basic_details.name},${data.contact_details.legal_address.street_no} ${data.contact_details.legal_address.street_name},${data.contact_details.legal_address.city},${data.contact_details.legal_address.county},${zipcodeData.zipcode}`;
        const add_data = {
            is_active: 'Y',
            createdBy: user.fullName,
            updatedBy: user.fullName,
            zipcodes_id: zipcodeData.id,
            street_no: data.contact_details.legal_address.street_no,
            address1: address1,
        };
        const contact_details = await db.Business_Address.create(add_data, { transaction: t });
        return contact_details;
    }
};

exports.addBusinessLocation = async (data, t) => {
    const zipcodeData = await db.bt_zipcodes.findOne({ where: { bt_zipcodes_id: data.contact_details.business_location.zipcode } });
    const user = await db.User.findOne({ where: { email: data.basic_details.creator_email } });

    if (data.contact_details.business_location.edit_state_county_details === 'N') {
        const address1 = `${data.basic_details.name},${data.contact_details.business_location.street_no} ${
            data.contact_details.business_location.street_name
        },${await zipcodeData.city},${await zipcodeData.county},${await zipcodeData.zipcode}`;
        const loc_data = {
            is_active: 'Y',
            createdBy: user.fullName,
            updatedBy: user.fullName,
            zipcodes_id: zipcodeData.id,
            street_no: data.contact_details.business_location.street_no,
            address1: address1,
        };

        const business_loc = await db.Business_Address.create(loc_data, { transaction: t });
        return business_loc;
    }

    if (data.contact_details.business_location.edit_state_county_details === 'Y') {
        const address1 = `${data.basic_details.name},${data.contact_details.business_location.street_no} ${
            data.contact_details.business_location.street_name
        },${await data.contact_details.business_location.city},${await data.contact_details.business_location.county},${await data
            .contact_details.business_location.zipcode}`;
        const loc_data = {
            is_active: 'Y',
            createdBy: user.fullName,
            updatedBy: user.fullName,
            zipcodes_id: zipcodeData.id,
            street_no: data.contact_details.business_location.street_no,
            address1: address1,
        };

        const business_loc = await db.Business_Address.create(loc_data, { transaction: t });
        return business_loc;
    }
};

exports.updatePreferences = async (user_id, pref_id, pref_value) => {
    const pref = await db.User_Preference.findOne({ where: { user_preferences_id: pref_id } });
    if (pref) {
        const user = await db.User.findOne({ where: { UserId: user_id } });
        const response = await db.User_Preference.update(
            {
                updatedBy: user.fullName,
                pref_value: pref_value,
            },
            { where: { user_preferences_id: pref_id } }
        );

        return response;
    }
};
