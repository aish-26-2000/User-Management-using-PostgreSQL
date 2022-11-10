const express = require('express');
const { validationMiddleware } = require('../../middlewares');
const { adminSchema } = require('./admin.validation');
const adminController = require('./admin.controller');

const router = express.Router();

router.use(adminController.basicAuth);

router.get('/getAllUsers',validationMiddleware(adminSchema.list),adminController.userList);
router.get('/getUserDetails',adminController.userDetails);
router.get('/getUserHistory',adminController.userHistory);


router.post('/invite',validationMiddleware(adminSchema.invite),adminController.sendInvite);
router.post('/resendInvite',validationMiddleware(adminSchema.invite),adminController.resendInvite);

router.post('/restrict',adminController.restrictUser);
router.post('/unrestrict',adminController.unrestrictUser);



module.exports = router;
