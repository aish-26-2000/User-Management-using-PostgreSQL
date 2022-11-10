const { sequelize } = require('../../database/models');
const db = require('../../database/models');
const Op = db.Sequelize.Op;
const { BadRequestException,UnauthorizedException } = require('../../helpers/errorResponse');

exports.findUser = async(e) => {
    const user = await db.Invite.findOne({where : {email : e}})
    if( (user.active) !== true) {
        throw new UnauthorizedException('Access denied');
    };
    if(user.regStatus === 'completed') {
        throw new UnauthorizedException('User already exists');
    }  
    return user;
;}

exports.addImageKey = async(e,key) => {
    await db.User.update({imageKey : key},{where : {email : e}});
};

exports.addUser = async(e,info) => {
    const user = await db.User.create({email : e});
    await db.User.update(info,{where : {email : e}});
    await db.Invite.update({RegStatus : 'completed'},{where : {email : e}});

    const data = {
        RegStatus : 'complete',
        RegisteredAt : sequelize.literal('CURRENT_TIMESTAMP'),
        UserId : user.UserId
    };
    await db.Activity.update(data,{ where : { email : e}})
};

exports.getResponse = async(e) => {
    const userInfo = await db.User.findOne({where : {email : e}})
    
    return { 
        id : userInfo.id,
        firstName : userInfo.firstName,
        lastName : userInfo.lastName,
        email : userInfo.email,
        phone : userInfo.phone,
        imageKey : userInfo.imageKey
    };
};

exports.login = async (params) => {
    const { email, password } = params;

    const user = await db.User.findOne({ where: { email } });
    if (!user) throw new BadRequestException(MESSAGES.USER.LOGIN.INVALID_CREDS);

    const passwordMatch = await bcrypt.verifyPassword(password, user.password);
    if (!passwordMatch) throw new BadRequestException(MESSAGES.USER.LOGIN.INVALID_CREDS);

    const accessToken = jwt.generateAccessToken({ id: user.id, email: user.email});

    return {
        success: true,
        id: user.id,
        name: user.name,
        email: user.email,
        accessToken,
    };
};

