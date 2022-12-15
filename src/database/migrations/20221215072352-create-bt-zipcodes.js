'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('bt_zipcodes', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER,
            },
            bt_zipcodes_id: {
                type: Sequelize.UUID,
                unique: true,
            },
            isactive: {
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
            zipcode: {
                type: Sequelize.STRING,
            },
            bt_country_id: {
                type: Sequelize.UUID,
                unique: true,
                references: {
                    model: { tableName: 'bt_country' },
                },
            },
            city: {
                type: Sequelize.STRING,
            },
            county: {
                type: Sequelize.STRING,
            },
            bt_region_id: {
                type: Sequelize.UUID,
                unique: true,
                references: {
                    model: { tableName: 'bt_region' },
                },
            },
        });
    },
    async down(queryInterface) {
        await queryInterface.dropTable('bt_zipcodes');
    },
};
