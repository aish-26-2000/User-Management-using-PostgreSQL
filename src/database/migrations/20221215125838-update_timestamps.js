'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface) {
        const tables = [
            'bt_phone_type',
            'bt_region',
            'bt_country',
            'bt_zipcodes',
            'bp_entity_type',
            'bp_investor_type',
            'bp_license_type',
            'bp_license_type_desig',
            'bp_user_association',
        ];
        tables.forEach((t) => {
            return queryInterface.bulkUpdate(t, {
                created: new Date(),
                updated: new Date(),
            });
        });
    },
    async down(queryInterface) {
        return queryInterface.dropAllTables;
    },
};
