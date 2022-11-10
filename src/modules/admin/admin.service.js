const db = require('../../database/models');
const Op = db.Sequelize.Op;
const operatorsAliases = {
    $like: Op.like,
    $not: Op.not
  }
const { getAccessURL } = require('../../utils/s3helper');

exports.addInvite = async(data) => {
    const response = await db.Invite.create({email : data})

    return {
        id : response._id,
        email : response.email
    };
};

exports.authCheck = (username,password) => {
    if (!username || !password) {
        return false;
    };

    if (username === process.env.USER_AUTH && password === process.env.PASSWORD){
        return true;
    } else {
        return null;
    };
};

exports.restrict = async(e) => {
    const user = db.Invite.findOne({where : {email : e}})

    if(user !== null) {
        await db.Invite.update(
            {active : false},
            {where : {email : e}}
        );
    };
};

exports.unrestrict = async(e) => {
    const user = db.Invite.findOne({where : {email : e}})

    if(user !== null) {
        await db.Invite.update(
            {active : true},
            {where : {email : e}}
        );
    };
};

exports.removeUser = async(e) => {
    await db.Invite.destroy({
        where : { email : e },
        force : true
    })
    await db.User.destroy({
        where : { email : e },
        force : true
    })
}; 

exports.getAllUsers = async(page,size,sort_column,sort_order,query) => {

    const Pagination = (page, size) => {
        const limit = size ? +size : 3;
        const offset = page ? page * limit : 0;
        return { limit, offset};
    };
    const getPagingData = (data, page, limit) => {
        const { count: totalItems, rows: users} = data;
        const currentPage = page ? +page : 0;
        const totalPages = Math.ceil(totalItems / limit);
        return { totalItems, users, totalPages, currentPage };
    };

    const { limit,offset } = Pagination(page,size);
    
    const users = await db.User.findAndCountAll({ 
    attributes:['id','firstName','lastName','email','phone','imageKey'],
    where: {
        [Op.or]: [
        {firstName: { [Op.like]: '%' + query + '%' }},
        {lastName: { [Op.like]: '%' + query + '%' }},
        {email: { [Op.like]: '%' + query + '%' }}
        ]
      },
    order: [[sort_column || 'id',sort_order || 'ASC']], 
    limit,
    offset
    })

    const response = getPagingData(users,page,limit);
    return response;
};

exports.getUserInfo = async(id) => {
    const user = await db.User.findOne({
        where : {id : id},
        attributes:['id','firstName','lastName','email','phone','imageKey']
    })

    return user;
};

exports.getUserHistory = async(email) => {
    const user = await db.Invite.findOne({where : { email : email }})

    if(user){
        return {
            user_status : `${user.active} [true : active]`,
            email_invitation : {
                status : "sent",
                sentAt :  String(user.createdAt)
            },
            personal_profile : {
                status : user.regStatus,
                registeredAt :  String(user.updatedAt)
            }      
        }
        
    };

};