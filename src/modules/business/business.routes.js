const express = require('express');
const { validationMiddleware } = require('../../middlewares');
const { authRoute } = require('../user/user.controller');
const {
    getPhoneType,
    getUserAssociationTypes,
    getInvestorType,
    getCountry,
    getZipcodes,
    getAllStates,
    getLicenseType,
    getLicenseCategory,
    getEntityType,
    getUserEditableBusiness,
    getAllBusinessList,
    updateUserPreferences,
    registerBusiness,
    getBusinessDetails,
} = require('./business.controller');
const { businessSchema } = require('./business.validation');

const router = express.Router();

// get
router.get('/getAllBusinessList', validationMiddleware(businessSchema.allBusinessList), getAllBusinessList);
router.get('/getBusiness/:id', validationMiddleware(businessSchema.findBusiness), getBusinessDetails);
router.get('/getUserEditableBusiness', authRoute, validationMiddleware(businessSchema.editableBusinessList), getUserEditableBusiness);
router.get('/phoneType', getPhoneType);
router.get('/country', getCountry);
router.get('/states', getAllStates);
router.get('/zipcodes', getZipcodes);
router.get('/userAssociationTypes', getUserAssociationTypes);
router.get('/investorType', getInvestorType);
router.get('/entityType', getEntityType);
router.get('/licenseType', getLicenseType);
router.get('/licenseCategory', getLicenseCategory);

// register business
router.post('/register', authRoute, validationMiddleware(businessSchema.newBusiness), registerBusiness);

// preferences
router.patch('/updatePreference', validationMiddleware(businessSchema.preferences), updateUserPreferences);

module.exports = router;
