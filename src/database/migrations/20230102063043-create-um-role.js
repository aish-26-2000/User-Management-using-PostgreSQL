'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('um_role', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER,
            },
            um_role_id: {
                type: Sequelize.UUID,
                allowNull: false,
            },
            is_active: {
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
        });
    },
    async down(queryInterface) {
        await queryInterface.dropTable('um_role');
    },
};
