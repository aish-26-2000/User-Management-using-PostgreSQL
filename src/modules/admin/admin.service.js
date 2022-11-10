const { sequelize, Sequelize } = require('../../database/models');
const db = require('../../database/models');
const Op = db.Sequelize.Op;
const { getAccessURL } = require('../../utils/s3helper');

exports.addInvite = async(data) => {
    const response = await db.Invite.create({email : data})
    const status = {
        email : data,
        InviteStatus : 'sent',
        InviteSentAt : sequelize.literal('CURRENT_TIMESTAMP'),
        InviteId : response.InviteId
    };
    await db.Activity.create(status)

    return {
        id : response._id,
        email : response.email
    };
};

exports.SetInviteStatus = async(data) => {
    const status = {
        email : data,
        InviteStatus : 'fail'
    }

    await db.Activity.create(data)
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
    attributes:['UserId','firstName','lastName','email','phone','imageKey'],
    where: {
        [Op.or]: [
        {firstName: { [Op.like]: '%' + query + '%' }},
        {lastName: { [Op.like]: '%' + query + '%' }},
        {email: { [Op.like]: '%' + query + '%' }}
        ]
      },
    order: [[sort_column || 'UserId',sort_order || 'ASC']], 
    limit,
    offset
    })

    const response = getPagingData(users,page,limit);
    return response;
};

exports.getUserInfo = async(id) => {
    const user = await db.User.findOne({
        where : {UserId : id},
        attributes:['UserId','firstName','lastName','email','phone','imageKey']
    })

    if(user) {
        if(user.imageKey !== null) {
            const image = await getAccessURL(user.imageKey)
            return {
                id : user.UserId,
                firstName : user.firstName,
                lastName : user.lastName,
                email : user.email,
                phone : user.phone,
                imageURl : image
            };
        } else {
            return user;
        };
    };    
};

exports.getUserHistory = async(id) => {
    const user = await db.Activity.findOne({
        where : { Id : id },
        attributes:['Id','email','InviteStatus','RegStatus','IdVerification','KYCStatus','MembershipStatus']
    })

    return user;
};