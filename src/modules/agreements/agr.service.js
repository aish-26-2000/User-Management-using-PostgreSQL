const { sequelize, Sequelize } = require('../../database/models');
const db = require('../../database/models');
const Op = db.Sequelize.Op;

exports.addAgreement = async(agreement) => {
    const response = await db.Agreement.create(agreement)
    
    return response;
};

exports.updateAgreement = async(id,data) => {
    const response = await db.Agreement.findOne({ where : {agreement_id : id}})

    if(response) { 
        const res = await db.Agreement.update(data,{ where : {agreement_id : id}})
        return res;
    }
};

exports.usersList = async() => {
   const users =  await db.User.findAll()
   let list = users.map(user => user.email);
   return list;   
};

exports.getAllAgreements = async() => {
    const data = await db.Agreement.findAll({ 
    order: [['priority','ASC']]
    })

    return data;
}

exports.getUserAgreements = async() => {
    const response = await db.Agreement.findAll({
        where : {agreement_type_code : 'GNUSR'},
        order: [['priority','ASC']]
    })

    if(response) { return response; } 
};

exports.getBusinessAgreements = async() => {
    const response = await db.Agreement.findAll({
        where : {agreement_type_code : 'SCBUS'},
        order: [['priority','ASC']]
    })
    
    if(response) { return response; } 
};