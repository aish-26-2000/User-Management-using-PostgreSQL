const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Invite extends Model {
        // Helper method for defining associations.
        // This method is not a part of Sequelize lifecycle.
        // The `models/index` file will call this method automatically.
        static associate(model) {
            Invite.hasMany(model.User, { foreignKey: 'userId', as: 'invites' });
        }
    }
    Invite.init(
        {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: DataTypes.BIGINT,
            },
            userId: {
                type: DataTypes.BIGINT,
                references: {
                    model: 'Users',
                    key: 'id',
                },
                constrains: true,
                onUpdate: 'cascade',
                onDelete: 'cascade',
            },
            email: {
                type: DataTypes.STRING,
                unique: true,
            },
            RegStatus: {
                type: DataTypes.STRING,
                enum : ['pending','completed'],
                defaultValue : 'pending'
            },
            active: {
                type : DataTypes.BOOLEAN,
                defaultValue : true
            }
        },
        {
            sequelize,
            modelName: Invite.name,
            tableName: 'Invites',
            paranoid: true,
            timestamps: true,
        }
    );

    return Invite;
};
