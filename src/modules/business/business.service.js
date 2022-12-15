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
    const response = await db.Business.create(data);

    if (response) {
        await db.Business_Stage_Status.create({
            createdBy: data.createdBy,
            updatedBy: data.updatedBy,
            stage: 'Membership',
            status: 'Inactive',
            bp_business_id: response.bp_business_id,
            business_id: response.business_id,
        });

        return {
            id: response.bp_business_id,
            name: response.name,
            dba: response.dba,
            code: response.bp_group_shortcode,
        };
    }
};

exports.addNonCannabisBusiness = async (data) => {
    const response = await db.Business.create(data);

    if (response) {
        await db.Business_Stage_Status.create({
            createdBy: data.createdBy,
            updatedBy: data.updatedBy,
            stage: 'Membership',
            status: 'Inactive',
            bp_business_id: response.bp_business_id,
            business_id: response.business_id,
        });

        return {
            id: response.bp_business_id,
            name: response.name,
            dba: response.dba,
            code: response.bp_group_shortcode,
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
