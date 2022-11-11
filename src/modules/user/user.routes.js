const express = require('express');
const upload = require('express-fileupload');
const { validationMiddleware } = require('../../middlewares');
const { userSchema } = require('./user.validation');
const userController = require('./user.controller');
const { responseHelper } = require('../../helpers');

const router = express.Router();

router.use('/register/:token',upload({
    limits : { fileSize : 1024*1024},
    limitHandler: function (req, res, next) {
        responseHelper.fail(res,"File size limit has been exceeded");
    },
}));
router.post('/register/:token',validationMiddleware(userSchema.register),userController.Register);
router.post('/login',validationMiddleware(userSchema.login),userController.login);

module.exports = router;
