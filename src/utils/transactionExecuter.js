//initialize transactions
const { Transaction } = require('sequelize');

const transactionExecuter = (callBack) => {
    return DbConnection().transaction({
        isolationLevel: Transaction.ISOLATION_LEVELS.READ_COMMITTED,
    },(t) => callBack(t));
};

module.exports = transactionExecuter;
