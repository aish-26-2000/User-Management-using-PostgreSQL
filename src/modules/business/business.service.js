const db = require('../../database/models');
const Op = db.Sequelize.Op;

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

exports.addCannabisBusiness = async (data) => {
    // basic details
    const basic_data = {
        name: data.basic_details.name,
        dba: data.basic_details.dba,
        bp_group_shortcode: 'MEMBZ',
        createdBy: data.basic_details.creator,
        updatedBy: data.basic_details.creator,
        is_createdby_stdc: 'Y',
        is_cannabis_business: 'Y',
    };
    const basic_details = await db.Business.create(basic_data);

    // cannabis details
    const license = await db.bp_license_type.findOne({ where: { name: data.cannabis_related_details.license_type } });
    const license_data = {
        is_active: 'Y',
        createdBy: data.basic_details.creator,
        updatedBy: data.basic_details.creator,
        business_id: basic_details.business_id,
        license_type_id: license.id,
        license_type_comment: data.cannabis_related_details.license_type,
    };
    const cannabis_details = await db.Business_License.create(license_data);

    // contact details
    // legal address
    const contact_details = await this.addLegalAddress(data);

    const phone_type = await db.bt_phone_type.findOne({ where: { name: data.contact_details.legal_address.phone_type } });
    await db.Business_Phone.create({
        is_active: 'Y',
        createdBy: data.basic_details.creator,
        updatedBy: data.basic_details.creator,
        phone: data.contact_details.legal_address.phone_number,
        phone_type_id: phone_type.id,
        business_id: basic_details.business_id,
    });

    // business location
    if (data.contact_details.business_location.is_primary_business_location_same_as_Legal_address === 'N') {
        const business_loc = await this.addBusinessLocation(data);

        const phone_type = await db.bt_phone_type.findOne({ where: { name: data.contact_details.legal_address.phone_type } });
        await db.Business_Phone.create({
            is_active: 'Y',
            createdBy: data.basic_details.creator,
            updatedBy: data.basic_details.creator,
            phone: data.contact_details.legal_address.phone_number,
            phone_type_id: phone_type.id,
            business_id: basic_details.business_id,
        });

        await db.Business_Other_Addr.create({
            is_active: 'Y',
            createdBy: data.basic_details.creator,
            updatedBy: data.basic_details.creator,
            name: 'Business-Premise-Address',
            business_id: basic_details.business_id,
            address_id: business_loc.address_id,
        });
    }

    // key person registration

    if (basic_details && cannabis_details && contact_details) {
        await db.Business_Stage_Status.create({
            createdBy: basic_details.createdBy,
            updatedBy: basic_details.updatedBy,
            stage: 'Membership',
            status: 'Inactive',
            bp_business_id: basic_details.bp_business_id,
            business_id: basic_details.business_id,
        });

        return {
            id: basic_details.bp_business_id,
            name: basic_details.name,
            dba: basic_details.dba,
            legal_address: contact_details.address1,
        };
    }
};

exports.addNonCannabisBusiness = async (data) => {
    // basic details
    const basic_data = {
        name: data.basic_details.name,
        dba: data.basic_details.dba,
        bp_group_shortcode: 'MEMBZ',
        createdBy: data.basic_details.creator,
        updatedBy: data.basic_details.creator,
        is_createdby_stdc: 'Y',
        is_cannabis_business: 'Y',
    };
    const basic_details = await db.Business.create(basic_data);

    // contact details
    // legal address
    const contact_details = await this.addLegalAddress(data);

    const phone_type = await db.bt_phone_type.findOne({ where: { name: data.contact_details.legal_address.phone_type } });
    await db.Business_Phone.create({
        is_active: 'Y',
        createdBy: data.basic_details.creator,
        updatedBy: data.basic_details.creator,
        phone: data.contact_details.legal_address.phone_number,
        phone_type_id: phone_type.id,
        business_id: basic_details.business_id,
    });

    // business location
    if (data.contact_details.business_location.is_primary_business_location_same_as_Legal_address === 'N') {
        const business_loc = await this.addBusinessLocation(data);

        const phone_type = await db.bt_phone_type.findOne({ where: { name: data.contact_details.legal_address.phone_type } });
        await db.Business_Phone.create({
            is_active: 'Y',
            createdBy: data.basic_details.creator,
            updatedBy: data.basic_details.creator,
            phone: data.contact_details.legal_address.phone_number,
            phone_type_id: phone_type.id,
            business_id: basic_details.business_id,
        });

        await db.Business_Other_Addr.create({
            is_active: 'Y',
            createdBy: data.basic_details.creator,
            updatedBy: data.basic_details.creator,
            name: 'Business-Premise-Address',
            business_id: basic_details.business_id,
            address_id: business_loc.address_id,
        });
    }

    // key person registration
    if (data.key_person_registration.edit_details === 'N') {
        const user = await db.User.findOne({ where: { fullName: data.basic_details.name } });
        await db.Business_User_Assoc.create({
            is_active: 'Y',
            createdBy: data.basic_details.creator,
            updatedBy: data.basic_details.creator,
            description: 'Controlling Managers & Operators',
            UserId: user.UserId,
            business_id: basic_details.business_id,
            user_assoc_id: 3,
        });
    }

    if (data.key_person_registration.edit_details === 'Y') {
        const user = await db.User.findOne({ where: { fullName: data.basic_details.name } });
        const user_assoc = await db.bp_user_association.findOne({ where: { name: data.key_person_registration.user_type } });
        await db.Business_User_Assoc.create({
            is_active: 'Y',
            createdBy: data.basic_details.creator,
            updatedBy: data.basic_details.creator,
            description: data.key_person_registration.user_type,
            UserId: user.UserId,
            business_id: basic_details.business_id,
            user_assoc_id: user_assoc.id,
        });
    }

    if (basic_details && contact_details) {
        await db.Business_Stage_Status.create({
            createdBy: basic_details.createdBy,
            updatedBy: basic_details.updatedBy,
            stage: 'Membership',
            status: 'Inactive',
            bp_business_id: basic_details.bp_business_id,
            business_id: basic_details.business_id,
        });

        return {
            id: basic_details.bp_business_id,
            name: basic_details.name,
            dba: basic_details.dba,
            legal_address: contact_details.address1,
        };
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
    const code = await db.bt_zipcodes.findOne({ where: { zipcode: zipcode } });
    if (code) {
        return code;
    }
};

exports.addLegalAddress = async (data) => {
    const zipcodeData = await db.bt_zipcodes.findOne({ where: { zipcode: data.contact_details.legal_address.zipcode } });

    if (data.contact_details.legal_address.edit_state_county_details === 'N') {
        const address1 = `${data.basic_details.name},${data.contact_details.legal_address.street_no} ${data.contact_details.legal_address.street_name},${zipcodeData.city},${zipcodeData.county},${zipcodeData.zipcode}`;
        const add_data = {
            is_active: 'Y',
            createdBy: data.basic_details.creator,
            updatedBy: data.basic_details.creator,
            zipcodes_id: zipcodeData.id,
            street_no: data.contact_details.legal_address.street_no,
            address1: address1,
        };
        const contact_details = await db.Business_Address.create(add_data);
        return contact_details;
    }

    if (data.contact_details.legal_address.edit_state_county_details === 'Y') {
        const address1 = `${data.basic_details.name},${data.contact_details.legal_address.street_no} ${data.contact_details.legal_address.street_name},${data.contact_details.legal_address.city},${data.contact_details.legal_address.county},${zipcodeData.zipcode}`;
        const add_data = {
            is_active: 'Y',
            createdBy: data.basic_details.creator,
            updatedBy: data.basic_details.creator,
            zipcodes_id: zipcodeData.id,
            street_no: data.contact_details.legal_address.street_no,
            address1: address1,
        };
        const contact_details = await db.Business_Address.create(add_data);
        return contact_details;
    }
};

exports.addBusinessLocation = async (data) => {
    const zipcodeData = await db.bt_zipcodes.findOne({ where: { zipcode: data.contact_details.business_location.zipcode } });

    if (data.contact_details.business_location.edit_state_county_details === 'N') {
        const address1 = `${data.basic_details.name},${data.contact_details.business_location.street_no} ${
            data.Contact_Details.Business_Location.street_name
        },${await zipcodeData.city},${await zipcodeData.county},${await zipcodeData.zipcode}`;
        const loc_data = {
            is_active: 'Y',
            createdBy: data.basic_details.creator,
            updatedBy: data.basic_details.creator,
            zipcodes_id: zipcodeData.id,
            street_no: data.contact_details.business_location.street_no,
            address1: address1,
        };

        const business_loc = await db.Business_Address.create(loc_data);
        return business_loc;
    }

    if (data.contact_details.business_location.edit_state_county_details === 'Y') {
        const address1 = `${data.basic_details.name},${data.contact_details.business_location.street_no} ${
            data.contact_details.business_location.street_name
        },${await data.contact_details.business_location.city},${await data.contact_details.business_location.county},${await data
            .contact_details.business_location.zipcode}`;
        const loc_data = {
            is_active: 'Y',
            createdBy: data.basic_details.creator,
            updatedBy: data.basic_details.creator,
            zipcodes_id: zipcodeData.id,
            street_no: data.contact_details.business_location.street_no,
            address1: address1,
        };

        const business_loc = await db.Business_Address.create(loc_data);
        return business_loc;
    }
};
