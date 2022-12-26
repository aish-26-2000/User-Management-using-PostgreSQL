'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class bp_investor_type extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            bp_investor_type.hasMany(models.Business_User_Assoc, { foreignKey: 'investor_type_id' });
        }
    }
    bp_investor_type.init(
        {
            bp_investor_type_id: DataTypes.UUID,
            isactive: DataTypes.STRING,
            name: DataTypes.STRING,
            description: DataTypes.STRING,
            created: DataTypes.DATE,
            createdby: DataTypes.STRING,
            updated: DataTypes.DATE,
            updatedby: DataTypes.STRING,
            shortcode: DataTypes.STRING,
            sequenceno: DataTypes.INTEGER,
        },
        {
            sequelize,
            modelName: bp_investor_type.name,
            tableName: 'bp_investor_type',
            timestamps: false,
        }
    );
    return bp_investor_type;
};
