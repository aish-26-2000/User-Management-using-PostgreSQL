'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface) {
        return queryInterface.bulkInsert('um_role', [
            {
                um_role_id: 'd169c927-034d-4e74-997a-50f4fee899ba',
                is_active: 'Y',
                created: new Date(),
                createdby: '4d5a35eb-8d4a-4fba-859c-20c38ee50acc',
                updated: new Date(),
                updatedby: '4d5a35eb-8d4a-4fba-859c-20c38ee50acc',
                name: 'Admin',
            },
            {
                um_role_id: 'c5ee4167-630c-40e4-9ec9-1e7c4bb4965b',
                is_active: 'Y',
                created: new Date(),
                createdby: '4d5a35eb-8d4a-4fba-859c-20c38ee50acc',
                updated: new Date(),
                updatedby: '4d5a35eb-8d4a-4fba-859c-20c38ee50acc',
                name: 'No Access',
            },
            {
                um_role_id: '0cbd8cd0-5925-4968-b4d3-4bc538254d70',
                is_active: 'Y',
                created: new Date(),
                createdby: '4d5a35eb-8d4a-4fba-859c-20c38ee50acc',
                updated: new Date(),
                updatedby: '4d5a35eb-8d4a-4fba-859c-20c38ee50acc',
                name: 'Advanced',
            },
            {
                um_role_id: 'c6b1ff96-9ee5-4dec-a87f-432abe5b91e0',
                is_active: 'Y',
                created: new Date(),
                createdby: '4d5a35eb-8d4a-4fba-859c-20c38ee50acc',
                updated: new Date(),
                updatedby: '4d5a35eb-8d4a-4fba-859c-20c38ee50acc',
                name: 'Limited',
            },
        ]);
    },

    async down(queryInterface) {
        return queryInterface.bulkDelete('um_role', null, {});
    },
};
