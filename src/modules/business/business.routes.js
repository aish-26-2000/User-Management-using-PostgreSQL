const express = require('express');
const { validationMiddleware } = require('../../middlewares');
const { getAllBusinessList, registerCannabisBusiness, registerNonCannabisBusiness } = require('./business.controller');
const { businessSchema } = require('./business.validation');

const router = express.Router();

// get
router.get('/getAllBusinessList', validationMiddleware(businessSchema.allBusinessList), getAllBusinessList);

// add
router.post('/regCannabisBusiness', validationMiddleware(businessSchema.newBusiness), registerCannabisBusiness);
router.post('/regNonCannabisBusiness', validationMiddleware(businessSchema.newBusiness), registerNonCannabisBusiness);

module.exports = router;
