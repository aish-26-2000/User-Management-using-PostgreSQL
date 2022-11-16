const { sequelize, Sequelize } = require('../../database/models');
const db = require('../../database/models');
const Op = db.Sequelize.Op;

exports.addAgreement = async(agreement) => {
    const response = await db.Agreement.create(agreement)
    
    return {
        agreement_id : response.agreement_id,
        agreement_code : response.agreement_type_code,
        agreement_name : response.agreement_type_name,
        title : response.title,
        version : response.document_version,
        effective_date: response.effective_date,
        creator : response.createdBy
    };
};