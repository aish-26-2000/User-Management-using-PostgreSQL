const db = require('../../database/models');

exports.createEmailInviteEvent = async(email) => {
    const invite = await db.Invite.findOne({ where : { email : email }});
    const user = await db.User.findOne({ where : { email : email }});

    await db.userActivity.create({
        UserId : user.UserId,
        user_name : user.fullName,
        createdAt : invite.createdAt,
        description : 'Email Invitation sent',
        is_active : 'Y',
        createdBy : user.fullName,
        updatedBy : user.fullName
    })
};

exports.createRegEvent = async(email) => {
    const user = await db.User.findOne({ where : { email : email }});

    if(user) {
        await db.userActivity.create({
            UserId : user.UserId,
            user_name : user.fullName,
            description : 'Profile completed',
            is_active : 'Y',
            createdBy : user.fullName,
            updatedBy : user.fullName
        })
    };
};

exports.createAccEvent = async(email) => {
    const user = await db.User.findOne({ where : { email : email }});

    if(user) {
        await db.userActivity.create({
            UserId : user.UserId,
            user_name : user.fullName,
            description : 'Account Created',
            is_active : 'Y',
            createdBy : user.fullName,
            updatedBy : user.fullName
        })
    }
};

exports.createConsentEvent = async(id) => {
    const user = await db.User.findOne({ where : {UserId : id}});

    if(user) {
        await db.userActivity.create({
            UserId : user.UserId,
            user_name : user.fullName,
            description : 'Agreement Accepted',
            is_active : 'Y',
            createdBy : user.fullName,
            updatedBy : user.fullName
        })
    }
};