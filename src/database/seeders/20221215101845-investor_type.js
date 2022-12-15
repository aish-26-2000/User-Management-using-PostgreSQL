'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface) {
        return queryInterface.bulkInsert('bp_investor_type', [
            {
                bp_investor_type_id: '8c9783b7-614c-4447-9178-cb4f3165da5b',
                isactive: 'Y',
                created: '2019-02-21T21:14:11.029Z',
                createdby: '4d5a35eb-8d4a-4fba-859c-20c38ee50acc',
                updated: '2019-02-21T21:14:11.029Z',
                updatedby: '4d5a35eb-8d4a-4fba-859c-20c38ee50acc',
                name: 'Angel/Individual',
                description: null,
                shortcode: null,
                sequenceno: 1,
            },
            {
                bp_investor_type_id: 'f3bacea4-41a4-4873-ae42-b8089d3956a0',
                isactive: 'Y',
                created: '2019-02-21T21:14:23.077Z',
                createdby: '4d5a35eb-8d4a-4fba-859c-20c38ee50acc',
                updated: '2019-02-21T21:14:23.077Z',
                updatedby: '4d5a35eb-8d4a-4fba-859c-20c38ee50acc',
                name: 'Fund',
                description: null,
                shortcode: null,
                sequenceno: 3,
            },
            {
                bp_investor_type_id: '919a3f56-77e5-4691-80fc-bfe1ab9a90b4',
                isactive: 'Y',
                created: '2019-02-22T18:44:21.886Z',
                createdby: '4d5a35eb-8d4a-4fba-859c-20c38ee50acc',
                updated: '2019-02-22T18:44:21.886Z',
                updatedby: '4d5a35eb-8d4a-4fba-859c-20c38ee50acc',
                name: 'Friends and Family',
                description: null,
                shortcode: null,
                sequenceno: 2,
            },
            {
                bp_investor_type_id: '3fe33de6-a9b2-46a7-8571-9a633820840e',
                isactive: 'Y',
                created: '2019-02-22T18:44:57.902Z',
                createdby: '4d5a35eb-8d4a-4fba-859c-20c38ee50acc',
                updated: '2019-02-22T18:44:57.902Z',
                updatedby: '4d5a35eb-8d4a-4fba-859c-20c38ee50acc',
                name: 'Venture Capital/Institutional',
                description: null,
                shortcode: null,
                sequenceno: 4,
            },
        ]);
    },

    async down(queryInterface) {
        return queryInterface.bulkDelete('bp_investor_type', null, {});
    },
};
