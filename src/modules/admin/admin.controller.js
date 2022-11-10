const { responseHelper } = require('../../helpers');
const  sendmail  = require('../../utils/email');
const adminService = require('./admin.service');
const jwt = require('../../utils/jwt');

exports.basicAuth = async(req,res,next) => {
    const authheader = req.headers.authorization;
    
    const credential = new Buffer.from(authheader.split(' ')[1],
    'base64').toString().split(':');
    const username = credential[0];
    const password = credential[1];
    
    const data = adminService.authCheck(username,password);
    if (data === null) {
        const message = 'Wrong Credentials';
        return responseHelper.fail(res,message);
    }
    if (data === false) {
        const message = 'You need a username and password';
        return responseHelper.fail(res,message);
    }
    if (data === true) {
        next();
    }
};


exports.sendInvite = async(req,res,next) => {
   try {
        //generate accesstoken and URL
        const accessToken = jwt.generateAccessToken(req.body.email);
        const registerURL = `${req.protocol}://${req.get('host')}/api/v1/user/register/${accessToken}`;

        //compose email
        const message = `Submit a POST request with all your details to:\n${registerURL}`
        const html = `<!doctype html>
        <html ⚡4email>
        <head>
            <meta charset="utf-8">
        </head>
        <body>
            <p>Hi, Greetings from StandardC! </p>
            <p>You or someone on your behalf requested to sign-up with StandardC. By pressing the link , you opt-in to sign-up with StandardC.</p>
            <br>Submit a POST request with all your details to:
            <p> <a href=${registerURL}> Register Now </a></p>
            <br>This link will expire after 1 day
        </body>
        </html>`;

        //send invitation email
        await sendmail({
            from : 'ADMIN <admin@standardc.com>',
            to : req.body.email,
            subject : 'Welcome to StandardC',
            html,
            message
        });

        //add invite to db
        await adminService.addInvite(req.body.email);
        
        //response
        responseHelper.success(res,`Invite sent successfully to user ${req.body.email}`);
        
    } catch (err){
        next(responseHelper.fail(res,`${err}`));
    }
};

exports.restrictUser = async(req,res,next) => {
    try {
        const email = req.body.email;

        await adminService.restrict(email);

        responseHelper.success(res,`User (${email}) restricted successfully.`);

    } catch(err) {
        next(responseHelper.fail(res,`${err}`));
    }
};

exports.unrestrictUser = async(req,res,next) => {
    try {
        const email = req.body.email;

        await adminService.unrestrict(email);

        responseHelper.success(res,`User (${email}) unrestricted successfully.`);

    } catch(err) {
        next(responseHelper.fail(res,`${err}`));
    }
};

exports.resendInvite = async(req,res,next) => {
    try {
        const email = req.body.email;
        await adminService.removeUser(email);

        //generate accesstoken and URL
        const accessToken = jwt.generateAccessToken(email);
        const registerURL = `${req.protocol}://${req.get('host')}/api/v1/user/register/${accessToken}`;

        //compose email
        const message = `Submit a POST request with all your details to:\n${registerURL}`
        const html = `<!doctype html>
        <html ⚡4email>
        <head>
            <meta charset="utf-8">
        </head>
        <body>
            <p>Hi, Greetings from StandardC! </p>
            <p>You or someone on your behalf requested to sign-up with StandardC. By pressing the link , you opt-in to sign-up with StandardC.</p>
            <br>Submit a POST request with all your details to:
            <p> <a href=${registerURL}> Register Now </a></p>
            <br>This link will expire after 1 day
        </body>
        </html>`;

        //send invitation email
        await sendmail({
            from : 'ADMIN <admin@standardc.com>',
            to : email,
            subject : 'Welcome to StandardC',
            html,
            message
        });
        
        //add invite to db
        await adminService.addInvite(email);

        //response
        responseHelper.success(res,`Invite resent successfully to user ${email}`);
    } catch(err) {
        next(responseHelper.fail(res,`${err}`));
    }
};

exports.userList = async(req,res,next) => {
    try {
        const { page,size,sort_column,sort_order,query } = req.query;

        const users = await adminService.getAllUsers(page,size,sort_column,sort_order,query)
        if(users){
            responseHelper.success(res,users,'Users List');
        };

        if(!users){
            responseHelper.fail(res,'Error, Data not found');
        };

    } catch(err) {
        next(responseHelper.fail(res,`${err}`));
    }
};

exports.userDetails = async(req,res,next) => {
    try {
        const id = req.query.id;
        const details = await adminService.getUserInfo(id)

        if(details){
            responseHelper.success(res,details,'User Details fetched successfully.')
        };

        if(!details){
            responseHelper.fail(res,'Error, User not found.')
        };

    } catch(err) {
        next(responseHelper.fail(res,`${err}`));
        //next(err);
    };
};

exports.userHistory = async(req,res,next) => {
    try{
        const email = req.query.email;
        const details = await adminService.getUserHistory(email)

        if(details){
            responseHelper.success(res,details,'User Status.')
        };

        if(!details){
            responseHelper.fail(res,'Error, Check inputs and try again.')
        };
    } catch(err){
        next(responseHelper.fail(res,`${err}`));
    };
};