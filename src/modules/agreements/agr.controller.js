const { responseHelper } = require('../../helpers');
const sendEmail = require('../../utils/email');
const agrService = require('./agr.service');

exports.addAgreement = async(req,res,next) => {
    try{
        const data = {
            agreement_type_code : req.body.agreement_type_code,
            agreement_type_name : req.body.agreement_type_name,
            priority : req.body.priority,
            title : req.body.title,
            description : req.body.description,
            document_version : req.body.document_version,
            effective_date : req.body.effective_date,
            is_active : req.body.is_active,
            createdBy : req.body.createdBy
        }
        
        const response = await agrService.addAgreement(data)

        if(response) {
            responseHelper.success(res,message = 'Agreement successfully added')
        };

        if(!response) {
            responseHelper.fail(res,'Something Wrong Happened')
        };

    } catch(err) {
        next(responseHelper.fail(res,`${err}`));
    };
};


exports.updateAgreement = async(req,res,next) => {
    try{
        const data = {
            agreement_id : req.body.agreement_id,
            priority : req.body.priority,
            title : req.body.title,
            description : req.body.description,
            document_version : req.body.document_version,
            effective_date : req.body.effective_date,
            updatedBy : req.body.updatedBy
        }

        const updatedAgreement = await agrService.updateAgreement(data.agreement_id,data)
        if(!updatedAgreement){
            responseHelper.fail(res,'Something Wrong happened. Agreeement not updated');
        }

        //compose email
        const message = `We've updated our Terms and Conditions. The updated terms are for ${data.title}`
        const html = `<!doctype html>
        <html ⚡4email>
        <head>
            <meta charset="utf-8">
        </head>
        <body>
            <p>Hi, Greetings from StandardC! </p>
            <p>We've Updated Our Terms and Conditions. The updated terms are for <b>${data.title}</b>.</p>
            <br>We encourage you to review all of the updated terms that apply to you.
        </body>
        </html>`;
        const mailList = await agrService.usersList()

        //send notification
        await sendEmail({
            from : 'ADMIN <admin@standardc.com>',
            to : mailList ,
            subject : 'Terms and Conditions Updated.',
            html,
            message
        });

        responseHelper.success(res,'Terms and Conditions updated successfully. Notification mail sent to all active users.')

    } catch(err) {
        next(responseHelper.fail(res,`${err}`));
    }
};

exports.getAgreements = async(req,res,next) => {
    try{
        const response = await agrService.getAllAgreements()
        
        if(response){
            responseHelper.success(res,response,'Success');
        };

        if(!response){
            responseHelper.fail(res,'No agreements found.')
        };

    } catch(err) {
        next(responseHelper.fail(res,`${err}`))
    };
};

exports.getAllBusinessAgreements = async(req,res,next) => {
    try{
        const response = await agrService.getBusinessAgreements()

        if(response){
            responseHelper.success(res,response,'Success');
        };

        if(!response){
            responseHelper.fail(res,'No agreements found.')
        };

    } catch(err) {
        next(responseHelper.fail(res,`${err}`))
    };
};

exports.getAllUserAgreements = async(req,res,next) => {
    try{
        const response = await agrService.getUserAgreements()

        if(response){
            responseHelper.success(res,response,'Success');
        };

        if(!response){
            responseHelper.fail(res,'No agreements found.')
        };

    } catch(err) {
        next(responseHelper.fail(res,`${err}`))
    };
};