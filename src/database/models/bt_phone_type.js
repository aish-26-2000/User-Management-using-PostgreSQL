'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class bt_phone_type extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
    }
    bt_phone_type.init(
        {
            bt_phonetype_id: DataTypes.UUID,
            is_active: DataTypes.STRING,
            name: DataTypes.STRING,
            description: DataTypes.STRING,
            createdBy: DataTypes.STRING,
            updatedBy: DataTypes.STRING,
            shortcode: DataTypes.STRING,
            sequenceno: DataTypes.INTEGER,
        },
        {
            sequelize,
            modelName: 'bt_phone_type',
        }
    );
    return bt_phone_type;
};
