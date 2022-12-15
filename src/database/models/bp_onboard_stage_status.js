const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Business_Stage_Status extends Model {
        // Helper method for defining associations.
        // This method is not a part of Sequelize lifecycle.
        // The `models/index` file will call this method automatically.
        static associate(model) {
            Business_Stage_Status.belongsTo(model.Business, { foreignKey: 'business_id' });
        }
    }
    Business_Stage_Status.init(
        {
            bp_onboard_stage_status_id: {
                allowNull: false,
                primaryKey: true,
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
            },
            is_active: {
                type: DataTypes.ENUM('Y', 'N'),
                defaultValue: 'Y',
            },
            createdAt: {
                type: DataTypes.DATE,
            },
            createdBy: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            updatedAt: {
                type: DataTypes.DATE,
            },
            updatedBy: {
                type: DataTypes.STRING,
            },
            stage: {
                type: DataTypes.ENUM('Membership', 'StandardC Due Diligence', 'Business KYC/CDD', 'Business Profile'),
                allowNull: false,
            },
            status: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            business_id: {
                allowNull: false,
                type: DataTypes.BIGINT,
            },
        },
        {
            sequelize,
            modelName: Business_Stage_Status.name,
            tableName: 'bp_onboard_stage_status',
            paranoid: true,
            timestamps: true,
        }
    );

    return Business_Stage_Status;
};
