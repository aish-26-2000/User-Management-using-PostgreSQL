'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('bt_country', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER,
            },
            bt_country_id: {
                type: Sequelize.UUID,
                unique: true,
            },
            isactive: {
                type: Sequelize.STRING,
            },
            name: {
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
            short_name: {
                type: Sequelize.STRING,
            },
            sequenceno: {
                type: Sequelize.INTEGER,
            },
            is_supported: {
                type: Sequelize.STRING,
            },
        });
    },
    async down(queryInterface) {
        await queryInterface.dropTable('bt_country');
    },
};
