'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('bt_phone_type', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER,
            },
            bt_phonetype_id: {
                type: Sequelize.UUID,
                unique: true,
            },
            is_active: {
                type: Sequelize.STRING,
            },
            name: {
                type: Sequelize.STRING,
            },
            description: {
                type: Sequelize.STRING,
            },
            created: {
                type: Sequelize.DATE,
            },
            createdby: {
                type: Sequelize.STRING,
            },
            updated: {
                type: Sequelize.DATE,
            },
            updatedby: {
                type: Sequelize.STRING,
            },
            shortcode: {
                type: Sequelize.STRING,
            },
            sequenceno: {
                type: Sequelize.INTEGER,
            },
        });
    },
    async down(queryInterface) {
        await queryInterface.dropTable('bt_phone_type');
    },
};
