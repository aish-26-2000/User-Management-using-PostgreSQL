const express = require('express');
const upload = require('express-fileupload');
const rateLimit = require('express-rate-limit');
const { validationMiddleware } = require('../../middlewares');
const { userSchema } = require('./user.validation');
const userController = require('./user.controller');
const { responseHelper } = require('../../helpers');
const { updateUserConsent } = require('../agreements/agr.controller');
const { testPasswordStrength } = require('../../utils/owasp');

const router = express.Router();

// test password strength
router.use('/register/:token',testPasswordStrength);
// limit image size
router.use('/register/:token',upload({
    limits : { fileSize : 1024*1024},
    limitHandler: function (req, res, next) {
        responseHelper.fail(res,"File size limit has been exceeded");
    },
}));
router.post('/register/:token',validationMiddleware(userSchema.register),userController.Register);

// Each IP can only send limited login requests in 10 minutes
router.use('/login',rateLimit({
    max : 5,
    windowsMS : 1000*60*10 
}));
router.post('/login',validationMiddleware(userSchema.login),userController.login);

router.post('/forgotpassword',validationMiddleware(userSchema.forgotPassword),userController.forgotPassword);
router.patch('/resetpassword/:resetToken',validationMiddleware(userSchema.resetPassword),userController.resetPassword);

router.use('/changepassword/:resetToken',testPasswordStrength);
router.post('/changepassword/:resetToken',validationMiddleware(userSchema.changePassword),userController.changePassword);


router.post('/consent',updateUserConsent);


module.exports = router;
