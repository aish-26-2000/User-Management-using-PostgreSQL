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
} = require('./business.controller');
const { businessSchema } = require('./business.validation');

const router = express.Router();

// get
router.get('/getAllBusinessList', validationMiddleware(businessSchema.allBusinessList), getAllBusinessList);
router.get('/phoneType', getPhoneType);
router.get('/country', getCountry);
router.get('/zipcodes', getZipcodes);
router.get('/userAssociationTypes', getUserAssociationTypes);
router.get('/investorType', getInvestorType);

// add
router.post('/regCannabisBusiness', validationMiddleware(businessSchema.newBusiness), registerCannabisBusiness);
router.post('/regNonCannabisBusiness', validationMiddleware(businessSchema.newBusiness), registerNonCannabisBusiness);

module.exports = router;
