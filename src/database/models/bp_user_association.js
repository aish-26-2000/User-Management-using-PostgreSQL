'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class bp_user_association extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            bp_user_association.hasMany(models.Business_User_Assoc, { foreignKey: 'user_assoc_id' });
        }
    }
    bp_user_association.init(
        {
            bp_user_association_id: DataTypes.UUID,
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
            modelName: bp_user_association.name,
            tableName: 'bp_user_association',
            timestamps: false,
        }
    );
    return bp_user_association;
};
