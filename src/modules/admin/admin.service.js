const { sequelize, Sequelize } = require('../../database/models');
const db = require('../../database/models');
const Op = db.Sequelize.Op;
const { getAccessURL } = require('../../utils/s3helper');

exports.addInvite = async (data) => {
    const response = await db.Invite.create({ email: data });
    const status = {
        email: data,
        InviteStatus: 'sent',
        InviteSentAt: sequelize.literal('CURRENT_TIMESTAMP'),
        InviteId: response.InviteId,
    };
    await db.Activity.create(status);

    return {
        id: response.InviteId,
        email: response.email,
    };
};

exports.SetInviteStatus = async (data) => {
    const status = {
        email: data,
        InviteStatus: 'fail',
    };

    await db.Activity.create(status);
};

exports.authCheck = (username, password) => {
    if (!username || !password) {
        return false;
    }

    if (username === process.env.USER_AUTH && password === process.env.PASSWORD) {
        return true;
    } else {
        return null;
    }
};

exports.restrict = async (e) => {
    const user = db.Invite.findOne({ where: { email: e } });

    if (user !== null) {
        await db.Invite.update({ active: false }, { where: { email: e } });
    }
};

exports.unrestrict = async (e) => {
    const user = db.Invite.findOne({ where: { email: e } });

    if (user !== null) {
        await db.Invite.update({ active: true }, { where: { email: e } });
    }
};

exports.removeUser = async (e) => {
    const t = await sequelize.transaction();
    try {
        await db.Invite.destroy(
            {
                where: { email: e },
                force: true,
            },
            { transaction: t }
        );
        await db.User.destroy(
            {
                where: { email: e },
                force: true,
            },
            { transaction: t }
        );

        await t.commit();
    } catch (err) {
        await t.rollback();
    }
};

exports.getAllUsers = async (page, size, sort_column, sort_order, query) => {
    const Pagination = (page, size) => {
        const limit = size ? +size : 3;
        const offset = page ? page * limit : 0;
        return { limit, offset };
    };
    const getPagingData = (data, page, limit) => {
        const { count: totalItems, rows: users } = data;
        const currentPage = page ? +page : 0;
        const totalPages = Math.ceil(totalItems / limit);
        return { totalItems, users, totalPages, currentPage };
    };

    const { limit, offset } = Pagination(page, size);

    const users = await db.User.findAndCountAll({
        attributes: ['UserId', 'firstName', 'lastName', 'email', 'phone', 'imageKey'],
        where: {
            [Op.or]: [
                { firstName: { [Op.like]: '%' + query + '%' } },
                { lastName: { [Op.like]: '%' + query + '%' } },
                { email: { [Op.like]: '%' + query + '%' } },
            ],
        },
        order: [[sort_column || 'UserId', sort_order || 'ASC']],
        limit,
        offset,
    });

    const response = getPagingData(users, page, limit);
    return response;
};

exports.getUserInfo = async (id) => {
    const user = await db.User.findOne({
        where: { UserId: id },
        attributes: ['UserId', 'firstName', 'lastName', 'fullName', 'email', 'phone', 'imageKey', 'imageUrl'],
    });

    const activity = await this.getUserActivity(id);

    if (user) {
        if (user.imageKey !== null) {
            return {
                General_Details: {
                    id: user.UserId,
                    Name: user.fullName,
                    email: user.email,
                    phone: user.phone,
                    imageKey: user.imageKey,
                    imageURL: await user.imageUrl,
                },
                User_Activity: activity,
            };
        } else {
            return {
                General_Details: {
                    id: user.UserId,
                    Name: user.fullName,
                    email: user.email,
                    phone: user.phone,
                },
                User_Activity: activity,
            };
        }
    }
};

exports.getUserActivity = async (id) => {
    const user = await db.Activity.findOne({
        where: { Id: id },
    });
    if (user) {
        return {
            inviteDetails: {
                Status: user.InviteStatus,
                InviteSentAt: user.InviteSentAt,
            },
            regDetails: {
                Status: user.RegStatus,
                updatedAt: user.RegisteredAt,
            },
            IdVerification: {
                Status: user.IdVerification,
            },
            KYC: {
                Status: user.KYCStatus,
            },
            Membership: {
                Status: user.MembershipStatus,
            },
        };
    }
};

exports.getAllInvites = async (page, size) => {
    const Pagination = (page, size) => {
        const limit = size ? +size : 3;
        const offset = page ? page * limit : 0;
        return { limit, offset };
    };
    const getPagingData = (data, page, limit) => {
        const { count: totalItems, rows: InviteDetails } = data;
        const currentPage = page ? +page : 0;
        const totalPages = Math.ceil(totalItems / limit);
        return { totalItems, InviteDetails, totalPages, currentPage };
    };

    const { limit, offset } = Pagination(page, size);

    const invites = await db.Invite.findAndCountAll({
        attributes: ['InviteId', 'email', 'active'],
        limit,
        offset,
        include: [
            {
                model: db.Activity,
                attributes: ['InviteStatus', 'RegStatus', 'IdVerification', 'KYCStatus', 'MembershipStatus', 'LastLoginAt'],
            },
        ],
    });

    const response = getPagingData(invites, page, limit);
    return response;
};

exports.verifyId = async (id, admin) => {
    const t = await sequelize.transaction();
    try {
        const user = await db.Activity.findOne(
            {
                where: { UserId: id },
            },
            { transaction: t }
        );
        if (user) {
            const data = {
                IdVerification: 'pass',
                IdVerifiedAt: sequelize.literal('CURRENT_TIMESTAMP'),
                IdVerifiedBy: admin,
            };

            await db.Activity.update(data, { where: { UserId: id } }, { transaction: t });

            return 'ok';
        }
        await t.commit();
    } catch (err) {
        await t.rollback();
        console.log(err);
    }
};

exports.userHistory = async (id) => {
    const user = await db.User.findOne({
        where: {
            UserId: id,
        },
    });

    if (user) {
        const events = await db.userActivity.findAll({
            where: {
                UserId: id,
            },
            attributes: ['user_activity_id', 'description', 'is_active', 'createdAt', 'createdBy', 'updatedAt', 'updatedBy', 'UserId'],
        });
        return {
            User_History: {
                events,
            },
        };
    }
};
