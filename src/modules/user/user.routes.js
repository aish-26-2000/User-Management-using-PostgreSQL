const express = require('express');
const upload = require('express-fileupload');
const { validationMiddleware } = require('../../middlewares');
const { userSchema } = require('./user.validation');
const userController = require('./user.controller');
const { responseHelper } = require('../../helpers');
const { updateUserConsent } = require('../agreements/agr.controller');

const router = express.Router();

router.use('/register/:token',upload({
    limits : { fileSize : 1024*1024},
    limitHandler: function (req, res, next) {
        responseHelper.fail(res,"File size limit has been exceeded");
    },
}));

router.post('/register/:token',validationMiddleware(userSchema.register),userController.Register);
router.post('/login',validationMiddleware(userSchema.login),userController.login);

router.post('/forgotpassword',validationMiddleware(userSchema.forgotPassword),userController.forgotPassword);
router.patch('/resetpassword/:resetToken',validationMiddleware(userSchema.resetPassword),userController.resetPassword);
router.post('/changepassword/:resetToken',validationMiddleware(userSchema.changePassword),userController.changePassword);


router.post('/consent',updateUserConsent);


module.exports = router;
