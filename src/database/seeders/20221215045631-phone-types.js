'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface) {
        return queryInterface.bulkInsert('bt_phone_types', [
            {
                bt_phonetype_id: 'cb1ed256-a0ab-4b12-a986-3881743d7228',
                is_active: 'Y',
                createdAt: '2019-02-08T17:59:08.963Z',
                createdBy: '4d5a35eb-8d4a-4fba-859c-20c38ee50acc',
                updatedAt: '2019-02-08T17:59:08.963Z',
                updatedBy: '4d5a35eb-8d4a-4fba-859c-20c38ee50acc',
                name: 'Mobile',
                description: null,
                sequenceno: 1,
                shortcode: null,
            },
            {
                bt_phonetype_id: '81bef47d-4d15-4940-b561-f9f948177d21',
                is_active: 'Y',
                createdAt: '2019-02-08T17:59:24.019Z',
                createdBy: '4d5a35eb-8d4a-4fba-859c-20c38ee50acc',
                updatedAt: '2019-02-08T17:59:24.019Z',
                updatedBy: '4d5a35eb-8d4a-4fba-859c-20c38ee50acc',
                name: 'Landline',
                description: null,
                sequenceno: 1,
                shortcode: null,
            },
        ]);
    },

    async down(queryInterface) {
        return queryInterface.bulkDelete('bt_phone_types', null, {});
    },
};
