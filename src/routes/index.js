const express = require('express');
const { adminRoutes } = require('../modules/admin');
const { userRoutes } = require('../modules/user');
const { businessRoutes } = require('../modules/business')



const router = express.Router();

router.use('/admin', adminRoutes);
router.use('/user', userRoutes);
router.use('/business',businessRoutes)


module.exports = router;
