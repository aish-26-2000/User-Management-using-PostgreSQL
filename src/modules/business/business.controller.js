const { responseHelper } = require('../../helpers');
const { getAllBusiness, addBusiness } = require('./business.service');

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

exports.addNewBusiness = async (req, res, next) => {
    try {
        const { name, dba, code, creator } = req.body;
        const data = {
            name: name,
            dba: dba,
            bp_group_shortcode: code,
            createdBy: creator,
            updatedBy: creator,
            is_createdby_stdc: 'Y',
        };

        const response = await addBusiness(data);

        if (!response) {
            responseHelper.fail(res, 'Error, Business not added.');
        }

        responseHelper.success(res, response, 'Business added successfully.');
    } catch (err) {
        next(err);
    }
};
