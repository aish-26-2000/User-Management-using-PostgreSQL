const { sequelize } = require('../../database/models');
const db = require('../../database/models');
const { bcrypt, jwt } = require('../../utils');
const { MESSAGES } = require('../../config');
const { BadRequestException, UnauthorizedException, MaxRequestsException } = require('../../helpers/errorResponse');
const { createEmailInviteEvent, createRegEvent, createAccEvent } = require('../history/history.service');
const moment = require('moment/moment');
const client = require('../../utils/redis');

exports.findUser = async (e) => {
    const user = await db.Invite.findOne({ where: { email: e } });
    if (user.active !== true) {
        throw new UnauthorizedException('Access denied');
    }
    if (user.regStatus === 'completed') {
        throw new UnauthorizedException('User already exists');
    }
    return user;
};

exports.addImageKey = async (e, key) => {
    await db.User.update({ imageKey: key }, { where: { email: e } });
};

exports.addPassword = async (email, password) => {
    const user = await db.User.findOne({ where: { email: email } });

    if (user) {
        const cred = await db.user_cred.create({
            password: password,
            UserId: user.UserId,
        });

        return cred.user_cred_id;
    }
};

exports.addUser = async (e, info) => {
    const user = await db.User.create({ email: e });

    await db.User.update(
        {
            firstName: info.firstName,
            lastName: info.lastName,
            phone: info.phone,
            pass_changetime: new Date(),
        },
        { where: { email: e } }
    );
    await this.addPassword(e, info.password);

    await db.Invite.update({ RegStatus: 'completed' }, { where: { email: e } });

    const data = {
        RegStatus: 'complete',
        RegisteredAt: sequelize.literal('CURRENT_TIMESTAMP'),
        UserId: user.UserId,
    };

    await db.Activity.update(data, { where: { email: e } });

    await createEmailInviteEvent(e);
    await createRegEvent(e);
    await createAccEvent(e);
};

exports.getResponse = async (e) => {
    const userInfo = await db.User.findOne({ where: { email: e } });

    return {
        id: userInfo.UserId,
        firstName: userInfo.firstName,
        lastName: userInfo.lastName,
        email: userInfo.email,
        phone: userInfo.phone,
        imageKey: userInfo.imageKey,
    };
};

exports.login = async (email, password) => {
    const maxNumberOfFailedLogins = 3;
    const timeWindowForFailedLogins = 60 * 60 * 1;

    const user = await db.User.findOne({ where: { email: email } });
    if (!user) {
        throw new BadRequestException(MESSAGES.USER.LOGIN.INVALID_CREDS);
    }

    let userAttempts = await client.get(email);
    if (userAttempts === null) {
        await client.set(email, 0, 'EX', timeWindowForFailedLogins);
    }

    if (userAttempts > maxNumberOfFailedLogins) throw new MaxRequestsException(MESSAGES.USER.LOGIN.MAX_ATTEMPTS);

    const passChangeInterval = moment(user.pass_changetime).fromNow().slice(0, 2); // this.calculateDateInterval(user.pass_changetime);

    if (passChangeInterval > 7) {
        return 'password expired';
    }

    const cred = await db.user_cred.findAll({
        where: { UserId: user.UserId },
        order: [['createdAt', 'DESC']],
    });
    const prev_pass = cred.map((pass) => pass.password);

    const passwordMatch = await bcrypt.verifyPassword(password, prev_pass[0]);
    if (!passwordMatch) {
        client.set(email, ++userAttempts, 'EX', timeWindowForFailedLogins);
        throw new BadRequestException(MESSAGES.USER.LOGIN.INVALID_CREDS);
    }

    client.del(email);

    const checkAgreements = await user.agreements;
    if (checkAgreements === false) throw new BadRequestException(MESSAGES.USER.LOGIN.AGREEMENTS);

    const accessToken = jwt.generateAccessToken({ id: user.id, email: user.email });

    await db.Activity.update({ LastLoginAt: sequelize.literal('CURRENT_TIMESTAMP') }, { where: { email: email } });

    return {
        id: user.id,
        name: user.name,
        email: user.email,
        accessToken,
        passChangeInterval,
    };
};

exports.generatePasswordResetToken = async (email) => {
    const user = await db.User.findOne({ where: { email: email } });

    if (user) {
        const resetToken = jwt.generateAccessToken(email);
        return resetToken;
    }
};

exports.updatePassword = async (email, oldPassword, newPassword) => {
    const user = await db.User.findOne({ where: { email: email } });

    if (user) {
        const cred = await db.user_cred.findAll({
            where: { UserId: user.UserId },
            order: [['createdAt', 'DESC']],
            limit: 3,
        });

        const prev_pass = cred.map((ele) => ele.password);

        const verifyOldPassword = await bcrypt.verifyPassword(oldPassword, prev_pass[0]);
        if (!verifyOldPassword) throw new BadRequestException(MESSAGES.USER.UPDATE_PASSWORD.OLD_PASSWORD);

        if ((await bcrypt.verifyPassword(newPassword, prev_pass[0])) === true) {
            throw new BadRequestException(MESSAGES.USER.UPDATE_PASSWORD.PASSWORD_MATCH);
        }
        if ((await bcrypt.verifyPassword(newPassword, prev_pass[1])) === true) {
            throw new BadRequestException(MESSAGES.USER.UPDATE_PASSWORD.PASSWORD_MATCH);
        }
        if ((await bcrypt.verifyPassword(newPassword, prev_pass[2])) === true) {
            throw new BadRequestException(MESSAGES.USER.UPDATE_PASSWORD.PASSWORD_MATCH);
        }

        const hashPassword = await bcrypt.hashPassword(newPassword);
        await this.addPassword(email, hashPassword);
        await db.User.update({ pass_changetime: new Date() }, { where: { email: email } });
        return 'ok';
    }
};

exports.calculateDateInterval = (date) => {
    const pass_changedAt = new Date(date);
    const current_date = new Date();
    const oneday = 1000 * 60 * 60 * 24;
    const diff = current_date - pass_changedAt;
    console.log(diff / oneday);
    return diff / oneday;
};
