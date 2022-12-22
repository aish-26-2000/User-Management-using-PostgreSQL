'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class bt_phone_type extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(model) {
            bt_phone_type.hasMany(model.Business_Phone, { foreignKey: 'id' });
        }
    }
    bt_phone_type.init(
        {
            bt_phonetype_id: DataTypes.UUID,
            is_active: DataTypes.STRING,
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
            modelName: bt_phone_type.name,
            tableName: 'bt_phone_type',
            timestamps: false,
        }
    );
    return bt_phone_type;
};
