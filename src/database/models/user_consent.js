const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class user_consent extends Model {
        // Helper method for defining associations.
        // This method is not a part of Sequelize lifecycle.
        // The `models/index` file will call this method automatically. 
        static associate(model) {
            user_consent.belongsTo(model.User, { foreignKey: 'UserId' });
            user_consent.belongsTo(model.Agreement, { foreignKey: 'agreement_id' });
        }      
    }
    user_consent.init(
        {
            user_consent_id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: DataTypes.BIGINT,
            },
            agreed: {
                type: DataTypes.ENUM('Y','N'),
                defaultValue: 'N',
            },
            is_active: {
                type: DataTypes.ENUM('Y','N'),
                defaultValue : 'Y',
                allowNull : false
            },
            createdAt: {
                type: DataTypes.DATE,
                allowNull : false                
            },
            createdBy: {
                type: DataTypes.STRING, 
                allowNull: false               
            },
            updatedAt: {
                type: DataTypes.DATE,
                allowNull : false    
            },
            updatedBy: {
                type: DataTypes.STRING,
                allowNull : false
            },
            UserId : {
                type: DataTypes.BIGINT,
            },
            agreement_id: {
                type: DataTypes.BIGINT,
            }
           
        },
        {
            sequelize,
            modelName: user_consent.name,
            tableName: 'user_consent',
            paranoid: true,
            timestamps: true,
        }
    );

    return user_consent;
};