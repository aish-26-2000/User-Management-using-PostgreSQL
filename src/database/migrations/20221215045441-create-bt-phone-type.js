'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('bt_phone_types', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER,
            },
            bt_phonetype_id: {
                type: Sequelize.UUID,
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
            createdBy: {
                type: Sequelize.STRING,
            },
            updatedBy: {
                type: Sequelize.STRING,
            },
            shortcode: {
                type: Sequelize.STRING,
            },
            sequenceno: {
                type: Sequelize.INTEGER,
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE,
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE,
            },
        });
    },
    async down(queryInterface) {
        await queryInterface.dropTable('bt_phone_types');
    },
};
