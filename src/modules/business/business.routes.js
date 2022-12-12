const express = require('express');
const { validationMiddleware } = require('../../middlewares');
const { basicAuth } = require('../admin/admin.controller');
const { getAllBusinessList, addNewBusiness } = require('./business.controller');
const { businessSchema } = require('./business.validation');

const router = express.Router();

router.use(basicAuth);

// get
router.get('/getAllBusinessList', validationMiddleware(businessSchema.allBusinessList), getAllBusinessList);

// add
router.post('/addBusiness', validationMiddleware(businessSchema.newBusiness), addNewBusiness);

module.exports = router;
