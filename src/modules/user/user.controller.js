const { responseHelper } = require('../../helpers');
const { bcrypt, jwt } = require('../../utils');
const userService = require('./user.service');
const bucket = require('../../utils/s3helper');
const sendEmail = require('../../utils/email');
const { createUserConsent } = require('../agreements/agr.service');
const { passwordExpiryNotification, changePasswordNotification } = require('../autoGeneratedEmails/notification.controller');
const { BadRequestException } = require('../../helpers/errorResponse');
const { MESSAGES } = require('../../config');

exports.Register = async (req, res, next) => {
    try {
        const token = req.params.token;
        const email = jwt.parseToken(token);
        // verify token
        await jwt.verifyToken(token);

        // find user
        const user = await userService.findUser(email);

        if (!user) {
            responseHelper.fail(res, 'User not found');
        }

        if (user) {
            // user reg pending
            // hash password
            req.body.password = await bcrypt.hashPassword(req.body.password);

            // user details
            const data = {
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                password: req.body.password,
                phone: req.body.phone,
            };

            await userService.addUser(email, data);

            // upload profile image
            if (req.files) {
                // check img params
                const img = req.files.image;
                const key = email.substring(0, email.lastIndexOf('@'));

                if (img.mimetype === 'image/jpeg') {
                    await bucket.upload(img, key);
                    await userService.addImageKey(email, key);
                } else {
                    responseHelper.fail(res, 'Check content type of the file');
                }
            }

            await createUserConsent(email);

            // get response
            const userData = await userService.getResponse(email);
            responseHelper.success(res, userData, 'User registered successfully');
        }
    } catch (error) {
        next(error);
    }
};

exports.login = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        const response = await userService.login(email, password);

        if (response === 'password expired') {
            await passwordExpiryNotification(req, res, email);
            throw new BadRequestException(MESSAGES.USER.LOGIN.PASS_EXPIRATION);
        }

        if (response.passChangeInterval > 4 && response.passChangeInterval < 7) {
            const passResetEmail = await changePasswordNotification(req, res, email);
            const message = 'Your Password will be expiring soon. Update your password to prevent expiration.';
            const data = `${passResetEmail}`;
            const details = {
                id: response.id,
                accessToken: response.accessToken,
                message: message,
                resetURL: data,
            };
            responseHelper.success(res, details);
        }

        return responseHelper.success(res, {
            id: response.id,
            name: response.name,
            email: response.email,
            accessToken: response.accessToken,
        });
    } catch (err) {
        next(err);
    }
};

exports.forgotPassword = async (req, res, next) => {
    try {
        const email = req.body.email;

        const resetToken = await userService.generatePasswordResetToken(email);

        if (!resetToken) {
            responseHelper.fail(res, 'Check inputs, Something wrong happened.');
        }

        const resetURL = `${req.protocol}://${req.get('host')}/api/v1/user/resetpassword/${resetToken}`;

        // compose email
        const message = `Submit a PATCH request with the details to:\n${resetURL}`;
        const html = `<!doctype html>
        <html ⚡4email>
        <head>
            <meta charset="utf-8">
        </head>
        <body>
            <p>Hi, Greetings from StandardC! </p>
            <p>A password reset event has been triggered. By pressing the link , you can reset the password.</p>
            <br>Submit a PATCH request with the details to:
            <p> <a href=${resetURL}> Reset Link </a></p>
            <br>This link will expire after 1 day
        </body>
        </html>`;

        // send invitation email
        await sendEmail({
            from: 'ADMIN <admin@standardc.com>',
            to: email,
            subject: 'Password Reset - StandardC',
            html,
            message,
        });

        responseHelper.success(res, `Password reset link is sent to <${email}> successfully.`);
    } catch (err) {
        next(err);
    }
};

exports.resetPassword = async (req, res, next) => {
    try {
        const resetToken = req.params.resetToken;
        const newPassword = req.body.newPassword;
        const email = jwt.parseToken(resetToken);

        await jwt.verifyToken(resetToken);

        const result = await userService.updatePassword(email, newPassword);

        if (!result) {
            responseHelper.fail(res, 'Enter new pssword. New password should be different from previous passwords.');
        }

        // compose email
        const message = `Password reset successfully. You can login now.`;
        const html = `<!doctype html>
        <html ⚡4email>
        <head>
            <meta charset="utf-8">
        </head>
        <body>
            <p>Hi, Greetings from StandardC! </p>
            <p><b> Password Change Confirmation </b></p>
            <br>Your password was successfully changed.
        </body>
        </html>`;

        // send invitation email
        await sendEmail({
            from: 'ADMIN <admin@standardc.com>',
            to: email,
            subject: 'Password Reset Confirmation - StandardC',
            html,
            message,
        });

        responseHelper.success(res, `Password was successfully changed. You can login now.`);
    } catch (err) {
        next(err);
    }
};

exports.changePassword = async (req, res, next) => {
    try {
        const resetToken = req.params.resetToken;
        const { email, oldPassword, newPassword } = req.body;

        await jwt.verifyToken(resetToken);

        const response = await userService.updatePassword(email, oldPassword, newPassword);

        if (!response) {
            responseHelper.fail(res, 'Enter new password. New password should be different from previous passwords.');
        }

        // compose email
        const message = `Password changed successfully.`;
        const html = `<!doctype html>
        <html ⚡4email>
        <head>
            <meta charset="utf-8">
        </head>
        <body>
            <p>Hi, Greetings from StandardC! </p>
            <p><b> Password Change Confirmation </b></p>
            <br>Your password was successfully changed.
        </body>
        </html>`;

        // send invitation email
        await sendEmail({
            from: 'ADMIN <admin@standardc.com>',
            to: email,
            subject: 'Password Update Confirmation - StandardC',
            html,
            message,
        });

        responseHelper.success(res, `Password was changed successfully.`);
    } catch (err) {
        next(err);
    }
};
