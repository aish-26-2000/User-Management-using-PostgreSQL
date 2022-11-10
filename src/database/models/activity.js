const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Activity extends Model {
        // Helper method for defining associations.
        // This method is not a part of Sequelize lifecycle.
        // The `models/index` file will call this method automatically.
        static associate(model) {
            Activity.belongsTo(model.User, { foreignKey: 'UserId' });
            Activity.belongsTo(model.Invite, { foreignKey : 'InviteId' });
        }
    }
    Activity.init(
        {
            Id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: DataTypes.BIGINT,
            },
            email: {
                type: DataTypes.STRING,
                unique: true,
            },
            InviteStatus: {
                type: DataTypes.ENUM('sent','fail'),
            },
            InviteSentAt: {
                type: DataTypes.DATE,
            },
            RegStatus: {
                type: DataTypes.ENUM('pending','complete'),
                defaultValue : 'pending'
            },
            RegisteredAt: {
                type: DataTypes.DATE,                
            },
            IdVerification: {
                type: DataTypes.ENUM('pending','complete'),
                defaultValue : 'pending'
            },
            KYCStatus : {
                type: DataTypes.ENUM('pending','complete'),
                defaultValue : 'pending'
            },
            MembershipStatus: {
                type: DataTypes.ENUM('active','inactive'),
                defaultValue : 'inactive'
            }
        },
        {
            sequelize,
            modelName: Activity.name,
            tableName: 'Activity',
            paranoid: true,
            timestamps: true,
        }
    );

    return Activity;
};
