const express = require('express');
const { validationMiddleware } = require('../../middlewares');
const { adminSchema } = require('./admin.validation');
const { agrController } = require('./../agreements');
const adminController = require('./admin.controller');

const router = express.Router();

router.use(adminController.basicAuth);

//get
router.get('/getAllUsers', validationMiddleware(adminSchema.userList), adminController.userList);
router.get('/getAllInvites', validationMiddleware(adminSchema.inviteList), adminController.invitesList);
router.get('/getUserDetails', adminController.userDetails);
router.get('/getUserHistory', adminController.getUserHistory);

//invites and verification
router.post('/invite', validationMiddleware(adminSchema.invite), adminController.sendInvite);
router.post('/resendInvite', validationMiddleware(adminSchema.invite), adminController.resendInvite);
router.post('/verify', adminController.idVerification);

//restrict
router.post('/restrict', adminController.restrictUser);
router.post('/unrestrict', adminController.unrestrictUser);

//terms and conditions
router.post('/addAgreement', agrController.addAgreement);
router.post('/updateAgreement', agrController.updateAgreement);
router.get('/getAgreements', agrController.getAgreements);
router.get('/getBusinessAgreements', agrController.getAllBusinessAgreements);
router.get('/getUserAgreements', agrController.getAllUserAgreements);

module.exports = router;
