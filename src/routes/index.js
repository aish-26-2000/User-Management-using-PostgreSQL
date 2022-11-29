const express = require('express');
const { adminRoutes } = require('../modules/admin');
const { userRoutes } = require('../modules/user');



const router = express.Router();

router.use('/admin', adminRoutes);
router.use('/user', userRoutes);


module.exports = router;
