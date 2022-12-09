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
router.use('/register/:token', testPasswordStrength);

// limit image size
router.use(
    '/register/:token',
    upload({
        limits: { fileSize: 1024 * 1024 },
        limitHandler: function (req, res, next) {
            responseHelper.fail(res, 'File size limit has been exceeded');
        },
    }),
    rateLimit({
        windowMs: 60 * 60 * 1000, // 1 hour
        max: 5, // Limit each IP to 5 register requests per window
        message: 'Too many accounts created from this IP, please try again after an hour',
    })
);

router.post('/register/:token', validationMiddleware(userSchema.register), userController.Register);

router.post('/login', validationMiddleware(userSchema.login), userController.login);

router.post('/forgotpassword', validationMiddleware(userSchema.forgotPassword), userController.forgotPassword);
router.patch('/resetpassword/:resetToken', validationMiddleware(userSchema.resetPassword), userController.resetPassword);

router.use('/changepassword/:resetToken', testPasswordStrength);
router.post('/changepassword/:resetToken', validationMiddleware(userSchema.changePassword), userController.changePassword);

router.post('/consent', updateUserConsent);

module.exports = router;
