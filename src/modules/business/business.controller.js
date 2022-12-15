const { responseHelper } = require('../../helpers');
const { getAllBusiness, addNonCannabisBusiness, addCannabisBusiness } = require('./business.service');

exports.getAllBusinessList = async (req, res, next) => {
    try {
        const { page, size, sort_column, sort_order, filterby, query } = req.query;

        const response = await getAllBusiness(page, size, sort_column, sort_order, filterby, query);

        if (!response) {
            responseHelper.fail(res, 'Error, Data not found');
        }

        responseHelper.success(res, response, 'Business List');
    } catch (err) {
        next(err);
    }
};

exports.registerCannabisBusiness = async (req, res, next) => {
    try {
        const { name, dba, creator } = req.body;
        const data = {
            name: name,
            dba: dba,
            bp_group_shortcode: 'MEMBZ',
            createdBy: creator,
            updatedBy: creator,
            is_createdby_stdc: 'Y',
            is_cannabis_business: 'Y',
        };

        const response = await addCannabisBusiness(data);

        if (!response) {
            responseHelper.fail(res, 'Error, Business not added.');
        }

        responseHelper.success(res, response, 'Cannabis Business added successfully.');
    } catch (err) {
        next(err);
    }
};

exports.registerNonCannabisBusiness = async (req, res, next) => {
    try {
        const { name, dba, creator } = req.body;
        const data = {
            name: name,
            dba: dba,
            bp_group_shortcode: 'MEMBZ',
            createdBy: creator,
            updatedBy: creator,
            is_createdby_stdc: 'Y',
            is_cannabis_business: 'N',
        };

        const response = await addNonCannabisBusiness(data);

        if (!response) {
            responseHelper.fail(res, 'Error, Business not added.');
        }

        responseHelper.success(res, response, 'Non-Cannabis Business added successfully.');
    } catch (err) {
        next(err);
    }
};
