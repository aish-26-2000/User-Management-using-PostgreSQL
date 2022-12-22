const { responseHelper } = require('../../helpers');
const {
    getAllBusiness,
    addNonCannabisBusiness,
    addCannabisBusiness,
    allPhoneTypes,
    user_association_types,
    investor_type,
    allZipcodes,
    allCountry,
    allStates,
    license_type,
    license_category,
    entity_type,
    checkZipcode,
} = require('./business.service');

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
        const data = req.body;

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
        const data = req.body;

        const response = await addNonCannabisBusiness(data);

        if (!response) {
            responseHelper.fail(res, 'Error, Business not added.');
        }

        responseHelper.success(res, response, 'Non-Cannabis Business added successfully.');
    } catch (err) {
        next(err);
    }
};

exports.getPhoneType = async (req, res, next) => {
    try {
        const response = await allPhoneTypes();

        if (!response) {
            responseHelper.fail(res, 'No response to show');
        }

        responseHelper.success(res, response, 'Success');
    } catch (err) {
        next(err);
    }
};

exports.getCountry = async (req, res, next) => {
    try {
        const response = await allCountry();

        if (!response) {
            responseHelper.fail(res, 'No response to show');
        }

        responseHelper.success(res, response, 'Success');
    } catch (err) {
        next(err);
    }
};

exports.getAllStates = async (req, res, next) => {
    try {
        const response = await allStates();

        if (!response) {
            responseHelper.fail(res, 'No response to show');
        }

        responseHelper.success(res, response, 'Success');
    } catch (err) {
        next(err);
    }
};

exports.getZipcodes = async (req, res, next) => {
    try {
        const response = await allZipcodes();

        if (!response) {
            responseHelper.fail(res, 'No response to show');
        }

        responseHelper.success(res, response, 'Success');
    } catch (err) {
        next(err);
    }
};

exports.getUserAssociationTypes = async (req, res, next) => {
    try {
        const response = await user_association_types();

        if (!response) {
            responseHelper.fail(res, 'No response to show');
        }

        responseHelper.success(res, response, 'Success');
    } catch (err) {
        next(err);
    }
};

exports.getInvestorType = async (req, res, next) => {
    try {
        const response = await investor_type();

        if (!response) {
            responseHelper.fail(res, 'No response to show');
        }

        responseHelper.success(res, response, 'Success');
    } catch (err) {
        next(err);
    }
};

exports.getEntityType = async (req, res, next) => {
    try {
        const response = await entity_type();

        if (!response) {
            responseHelper.fail(res, 'No response to show');
        }

        responseHelper.success(res, response, 'Success');
    } catch (err) {
        next(err);
    }
};

exports.getLicenseType = async (req, res, next) => {
    try {
        const response = await license_type();

        if (!response) {
            responseHelper.fail(res, 'No response to show');
        }

        responseHelper.success(res, response, 'Success');
    } catch (err) {
        next(err);
    }
};

exports.getLicenseCategory = async (req, res, next) => {
    try {
        const response = await license_category();

        if (!response) {
            responseHelper.fail(res, 'No response to show');
        }

        responseHelper.success(res, response, 'Success');
    } catch (err) {
        next(err);
    }
};

exports.findZip = async (req, res, next) => {
    const data = req.body;

    const zipcode = data.contact_details.legal_address.zipcode;

    const isValid = await checkZipcode(zipcode);

    if (!isValid || isValid === 'undefined') {
        return responseHelper.fail(res, 'Invalid Zipcode');
    }

    next();
};
