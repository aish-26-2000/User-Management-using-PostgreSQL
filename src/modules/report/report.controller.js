const cron = require('node-cron');
const date = require('date-fns');
const { User, Invite } = require('../../database/models');
const sendEmail = require('../../utils/email');

//get date 
const startOfDay = date.startOfDay(new Date());
const endOfDay = date.endOfDay(new Date());
const today = { $gte: startOfDay, $lte: endOfDay };

//count function
const count = async(model) => {
    const n = await model.count({createdAt : today});
    return n;
};

//filter function
const filter = async(model,filter) => {
    const n = await model.count(filter);
    return n;
};

//send email
exports.autoReport =  async() => {
    //counts
    const inviteCount = await count(Invite);
    const userCount = await count(User);
    const regUserCount = await filter(Invite,{regStatus : "completed",createdAt : today });
    const awaitingUserCount = await filter(Invite,{regStatus : "pending",createdAt : today});
    const activeUserCount = await filter(Invite,{active : true,createdAt : today});

    const message = `This is an auto-generated email.\nStandardC User Registration Report \n\nDated On:${new Date()} \n 
                Invite Mails : ${inviteCount} \n
                Users : ${userCount} \n
                Registered Users : ${ regUserCount } \n
                Awaiting Users : ${ awaitingUserCount } \n
                Active Users : ${ activeUserCount }` 

    //scheduled on 23.55 everyday
    cron.schedule('00 01 * * * *',async() => {
        await sendEmail({
            from :'no-reply@standardc.com' ,
            to : 'ADMIN <admin@standardc.com>',
            subject : 'StandardC User Details',
            message : message,
        }); 
    });  
};
