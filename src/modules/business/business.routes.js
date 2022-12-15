const express = require('express');
const { validationMiddleware } = require('../../middlewares');
const {
    getAllBusinessList,
    registerCannabisBusiness,
    registerNonCannabisBusiness,
    getPhoneType,
    getUserAssociationTypes,
    getInvestorType,
    getCountry,
    getZipcodes,
    getAllStates,
    getLicenseType,
    getLicenseCategory,
    getEntityType,
} = require('./business.controller');
const { businessSchema } = require('./business.validation');

const router = express.Router();

// get
router.get('/getAllBusinessList', validationMiddleware(businessSchema.allBusinessList), getAllBusinessList);
router.get('/phoneType', getPhoneType);
router.get('/country', getCountry);
router.get('/states', getAllStates);
router.get('/zipcodes', getZipcodes);
router.get('/userAssociationTypes', getUserAssociationTypes);
router.get('/investorType', getInvestorType);
router.get('/entityType', getEntityType);
router.get('/licenseType', getLicenseType);
router.get('/licenseCategory', getLicenseCategory);

// add
router.post('/regCannabisBusiness', validationMiddleware(businessSchema.newBusiness), registerCannabisBusiness);
router.post('/regNonCannabisBusiness', validationMiddleware(businessSchema.newBusiness), registerNonCannabisBusiness);

module.exports = router;
