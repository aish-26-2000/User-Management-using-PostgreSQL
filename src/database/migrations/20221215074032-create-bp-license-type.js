'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('bp_license_type', {
            license_type_id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER,
            },
            bp_license_type_id: {
                type: Sequelize.UUID,
                unique: true,
            },
            isactive: {
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
            is_accredited: {
                type: Sequelize.STRING,
            },
            keyword: {
                type: Sequelize.STRING,
            },
        });
    },
    async down(queryInterface) {
        await queryInterface.dropTable('bp_license_type');
    },
};
