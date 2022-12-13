const owasp = require('owasp-password-strength-test');
const { responseHelper } = require('../helpers');

owasp.config({
    maxLength: 16,
    minLength: 8,
    minOptionalTestsToPass: 4,
});

exports.testPasswordStrength = async (req, res) => {
    const password = req.body.password || req.body.newPassword;
    const result = owasp.test(password);
    if (result.strong !== true) {
        responseHelper.fail(res, {
            message: 'Weak Password ! Try another password.',
            error: result.errors,
        });
    }
    return password;
};
