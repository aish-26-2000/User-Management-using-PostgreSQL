const db = require('../../database/models');
const { createConsentEvent } = require('../history/history.service');

exports.addAgreement = async (agreement) => {
    const response = await db.Agreement.create(agreement);

    return response;
};

exports.updateAgreement = async (id, data) => {
    const response = await db.Agreement.findOne({ where: { agreement_id: id } });

    if (response) {
        const res = await db.Agreement.update(data, { where: { agreement_id: id } });
        return res;
    }
};

exports.usersList = async () => {
    const users = await db.User.findAll();
    let list = users.map((user) => user.email);
    return list;
};

exports.getAllAgreements = async () => {
    const data = await db.Agreement.findAll({
        order: [['priority', 'ASC']],
    });

    return data;
};

exports.getUserAgreements = async () => {
    const response = await db.Agreement.findAll({
        where: { agreement_type_code: 'GNUSR' },
        order: [['priority', 'ASC']],
    });

    if (response) {
        return response;
    }
};

exports.getBusinessAgreements = async () => {
    const response = await db.Agreement.findAll({
        where: { agreement_type_code: 'SCBUS' },
        order: [['priority', 'ASC']],
    });

    if (response) {
        return response;
    }
};

exports.createUserConsent = async (email) => {
    const user = await db.User.findOne({ where: { email: email } });

    await db.user_consent.create({
        createdBy: user.fullName,
        updatedBy: user.fullName,
        UserId: user.UserId,
    });
};

exports.updateUserConsent = async (userid, agreementid) => {
    const user = await db.user_consent.findOne({ where: { UserId: userid } });

    if (user) {
        await db.user_consent.update(
            {
                //agreement_id : agreementid,
                agreed: 'Y',
            },
            {
                where: { UserId: userid },
            }
        );

        await db.User.update(
            {
                agreements: true,
            },
            {
                where: { UserId: userid },
            }
        );

        await createConsentEvent(userid);

        return { consent_id: user.user_consent_id };
    }
};
