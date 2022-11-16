const { responseHelper } = require('../../helpers');
const agrService = require('./agr.service');

exports.addNewAgreement = async(req,res,next) => {
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
            responseHelper.success(res,response,'Agreement added successfully')
        };

        if(!response) {
            responseHelper.fail(res,'Something Wrong Happened')
        };

    } catch(err) {
        next(responseHelper.fail(res,`${err}`));
    };
};