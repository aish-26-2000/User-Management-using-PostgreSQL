const Joi = require('joi');

const businessSchema = {
    editableBusinessList: {
        query: Joi.object().keys({
            page: Joi.number().integer().allow('', null).default(1),
            size: Joi.number().integer().allow('', null).default(3),
        }),
    },

    allBusinessList: {
        query: Joi.object().keys({
            page: Joi.number().integer().allow('', null).default(1),
            size: Joi.number().integer().allow('', null).default(3),
            sort_column: Joi.string().valid('name', 'createdAt').allow('', null),
            sort_order: Joi.string().valid('ASC', 'DESC', '').default('ASC').optional(),
            filterby: Joi.string()
                .valid('All', 'Cannabis Business', 'Non-Cannabis Business', 'Approved Vendor', 'Member Banks', '')
                .default('All')
                .optional(),
            query: Joi.string().allow(''),
        }),
    },

    newBusiness: {
        body: Joi.object().keys({
            is_cannabis_business: Joi.string().valid('Y', 'N'),
            basic_details: {
                name: Joi.string().trim().min(3).max(50).trim().required(),
                dba: Joi.string().trim().min(3).max(50).trim().required(),
                creator_email: Joi.string().email().required(),
                state: Joi.string()
                    .uuid()
                    .valid(
                        'b8572cf3-b46e-4368-b2e7-3b2b32e8b334',
                        '1b34d248-0805-43fb-a666-af7f1391cadd',
                        'a9a4b86c-d709-43ca-8254-a179a2313213',
                        '5f4e598e-79ba-4300-adba-fe0b11fe7576',
                        'f186181f-0bda-484b-be83-0873e9b71a0a',
                        'e49c3cd6-9834-47d4-a6fc-58859ff109a1',
                        '2f98c0d9-342b-48d6-a775-004bb288a9ef',
                        'e8d7c9ee-53d2-4b81-a840-38cc5ccb3be2',
                        '843ec267-4bd1-4b2b-837c-532b70bee85c',
                        '32178a93-1e19-445d-b512-fee5322677ac',
                        '3041b309-c8ff-44a9-b5f9-338d62c948dd',
                        '7eda0ed9-dea8-471b-afa3-f8af6dc59223',
                        '5845b447-387d-43fd-be95-adc66d1bebc1',
                        '20a70438-a2e1-4d34-840e-8060a12386b2',
                        'ee9fafa1-1946-4450-864a-76753b72548c',
                        'fb57357a-5fd9-4974-9b8f-515972c8e50c',
                        '0e80c2b6-43e1-4243-a367-4f49a07b1141',
                        '0c906e87-bd76-468f-9ec6-87613b82cd7f',
                        '30362f4a-7932-4793-968a-4f8768dc4621',
                        '06c5f997-93bf-4f8b-bc74-21bf86cf3ea1',
                        '0f209498-7455-49eb-9535-84fbae0e3f9b',
                        '44d26f1b-a49e-47e6-85a3-e2da3af1b401',
                        '2c82998e-cbc5-4caf-a88f-9f7f355b30e0',
                        'fe625e11-9300-4ab1-937e-fda1c214ed93',
                        '70305548-3cf7-46bb-bcfd-05bee9fd632f',
                        '4ff6b115-59fb-4908-b150-0ce66c75f27b',
                        '04465da6-96d8-42ba-93be-e358a2587292',
                        '344c0121-8beb-44ae-ab0b-b4f2d7c07f1a',
                        'a60274e1-ba18-4adb-9b4c-0353062b8af2',
                        'd4b6a3cc-6570-40b9-a147-6221c0cf7c57',
                        'aac4d6b9-f6b1-4d6f-93b4-e662e3172dda',
                        'e09cf80c-9a10-4c6a-af14-3195641cef64',
                        'e2e6fc57-dc4b-4b7e-8ed3-cee123c6f326',
                        '6e733ee1-5f69-4974-bf9a-69885bf5a775',
                        '36480ba9-d22f-4438-bcfd-28fbce639a35',
                        'c27e2d45-43c4-4b88-99e3-49f16438c930',
                        '76e1bda0-dd44-4b2d-a13b-631abfb08106',
                        'e7647885-66d9-441a-a7cc-646a68b9f7c8',
                        '31df9e34-2f4d-4eb8-8ac2-b79280b6991f',
                        '79044d88-f43e-44cb-8092-21bdd529517a',
                        'ea9a651f-f035-4a09-b6b7-3fe37100aff0',
                        '6ff4c835-3ff7-4b9d-9b74-9273643fef00',
                        '71447ce5-4af8-4b66-8ed3-cec43b172f3f',
                        'a26b06f1-de86-40a9-82d6-98805fe50a8f',
                        'd4b6f8eb-1174-4f8e-847f-dc15bffa7500',
                        '86cfc1a2-4260-483e-8189-4dcd6f5a00f7',
                        '2da6db88-42d3-4929-bae3-d769fb7e74b9',
                        'bb4de704-57d3-4de4-b66b-1dbe8a212456',
                        '5357b482-2f9f-41a2-9a0e-14282d5515a7',
                        'b58973c9-9da4-49b7-b9f1-0cb77a8a055c',
                        'da8c3f73-72ef-442f-927d-1ad1e6c2afbd',
                        'fc64a1b8-3d1b-4103-a98d-a32d5b68ad23',
                        'c22dac42-1daa-4800-9519-bac5a4fe604f',
                        '03da3bde-c299-4284-9ea6-2a8961f82957',
                        '70c29b52-8e5f-4fec-852c-9bda7e212099',
                        '67769613-bded-4747-a17d-6e6cc4ac75b3',
                        'e1dbd512-0d9b-449a-888f-f2d2f126a0ba',
                        'd2c0e0c3-8773-4a16-b7fe-497431c8b072',
                        '483382de-4f4b-4f6a-8ae1-37dbb33b9d75',
                        'f912f2ab-6018-4e3c-b3f8-c4b073b0583c',
                        '78f7a5ec-1fc9-48ea-899a-94aad17db6ec',
                        'a333d790-cd61-4243-8915-abca2b267652',
                        '9a72688f-aaad-4c32-91ae-4e4058940dab',
                        '439cfd7b-bf19-413a-a1cd-e51e0d067884',
                        '025e01a6-0146-44c3-a260-6210980de6cb',
                        '46842439-be10-4527-b971-a31868dc0849',
                        'acf1413f-56a8-46fc-bd02-0a16ad4809a4',
                        '1ca5e3dd-6300-4726-90dc-5a81799761ee',
                        '0ce623bb-445c-4d2c-b686-3b6ea02e0cba',
                        '3574c63b-6c5a-4eb7-a1c7-c7a4688c07c7',
                        '2eaf0435-1de2-47f5-b881-522e0d67b5d0',
                        '718449bd-8722-4c4d-8b51-ae770c24e1e7',
                        'd31a1c73-3f83-495d-aaef-39f4b206d752',
                        '372efa2e-2df9-400f-a917-826a326d876d',
                        'b42d16c3-85f1-42cf-8a06-0142607705d6'
                    )
                    .required(),
            },
            cannabis_related_details: {
                license_type: Joi.when('is_cannabis_business', {
                    is: 'Y',
                    then: Joi.string()
                        .uuid()
                        .valid(
                            '0c09b919-2433-42ff-838b-794aec2d2df5',
                            'ca6c0835-34eb-4265-bb0f-f06302bc5fc7',
                            'fdd2a572-f4ec-43a9-8fbc-74609a447e7b',
                            'cbfcfb7d-70e0-40b3-907b-9b4c78a95bac',
                            '810cbc67-af07-43ba-8ae0-7124acfeff5e',
                            '9fdd0983-4dd9-4d84-abf4-2e75b180bf84',
                            'f852014e-87d3-47a2-8fb4-1e89a7df419b',
                            'f072d0a6-49fe-4f87-8862-7e973efdd1ae',
                            '274137f1-9ae5-4734-8711-dff9191f9896',
                            '1e0c4e34-6818-4531-aaa4-577d8f84a34a',
                            'a7d1d371-0339-4087-95b1-55fdf67bb70e',
                            '4d02d889-d67f-4048-b7e0-5e94561c9668',
                            '3450a092-1de2-4dd5-b8a7-c55878e642a4',
                            '46bfab7f-60a1-49ee-bfba-cd8938853209',
                            'ebb7dc7f-84d5-4a4d-a4e2-24c95d5bcfc8',
                            'dd58b7da-56e6-4e02-bea1-7332c4287460',
                            'd0c0b3d1-0016-49cc-a1dc-e403f0b08d26',
                            'cef04934-85bd-43a4-96e9-9ac57dcf1e70',
                            '32a3208a-d763-411d-85bc-2b390f90eb69',
                            '0f5d1170-70ff-4089-9c12-e3d8f3ac1e62',
                            '7d190e1a-2aca-45df-95da-c3af127583d3',
                            'ee55cbd8-7c97-4d14-8319-d29fa54b1cb4',
                            'b321a8ec-4348-491d-b87c-29829bb826da',
                            '43f90c67-25f3-470b-9568-227d7dc480e3',
                            '68a5adab-7cac-4ef1-8931-aac0d6c6f8a2',
                            '6b14ccb7-7764-4827-8452-d9678010928b',
                            'e4c1568b-fee6-456f-b1b1-183dda71cc4f',
                            'f7ab3d23-461c-4656-94cc-563cdc727ef7',
                            '6175fa37-922d-4560-b306-77627da7cbca',
                            '604ea127-443e-49ac-a988-fa2de011b8e9',
                            '7bcbd2e6-bd97-4884-8993-8b76464ca003',
                            '3817443d-f357-416b-8238-b3b7eeb95cb4',
                            'bb5bc924-a5d1-4376-a6f7-3a67589602cf',
                            '556a1887-e81e-41b4-8ef7-505eed2dd8c5',
                            '7b871440-e5ec-47ba-a173-b66dafd3915c',
                            'a32f68bd-9564-4d9d-acb6-d20ff92ff5d0'
                        )
                        .required(),
                }),
                license_no: Joi.when('is_cannabisbusiness', {
                    is: 'Y',
                    then: Joi.string().min(3).max(50).required(),
                }),
                licensed_country: Joi.when('is_cannabisbusiness', {
                    is: 'Y',
                    then: Joi.string()
                        .uuid()
                        .valid('e3eed9a4-9314-4367-95cd-4e1601472ad4', '7b1ba6e8-cefe-48fb-9c9f-98eac87517b2')
                        .required(),
                }),
                licensed_state: Joi.when('is_cannabis_business', {
                    is: 'Y',
                    then: Joi.when('licensed_country', {
                        is: 'e3eed9a4-9314-4367-95cd-4e1601472ad4',
                        then: Joi.string()
                            .uuid()
                            .valid(
                                '9a72688f-aaad-4c32-91ae-4e4058940dab',
                                '439cfd7b-bf19-413a-a1cd-e51e0d067884',
                                '025e01a6-0146-44c3-a260-6210980de6cb',
                                '46842439-be10-4527-b971-a31868dc0849',
                                'acf1413f-56a8-46fc-bd02-0a16ad4809a4',
                                '1ca5e3dd-6300-4726-90dc-5a81799761ee',
                                '0ce623bb-445c-4d2c-b686-3b6ea02e0cba',
                                '3574c63b-6c5a-4eb7-a1c7-c7a4688c07c7',
                                '2eaf0435-1de2-47f5-b881-522e0d67b5d0',
                                '718449bd-8722-4c4d-8b51-ae770c24e1e7',
                                'd31a1c73-3f83-495d-aaef-39f4b206d752',
                                '372efa2e-2df9-400f-a917-826a326d876d',
                                'b42d16c3-85f1-42cf-8a06-0142607705d6'
                            )
                            .required(),
                    }).when('licensed_country', {
                        is: '7b1ba6e8-cefe-48fb-9c9f-98eac87517b2',
                        then: Joi.string()
                            .uuid()
                            .valid(
                                'b8572cf3-b46e-4368-b2e7-3b2b32e8b334',
                                '1b34d248-0805-43fb-a666-af7f1391cadd',
                                'a9a4b86c-d709-43ca-8254-a179a2313213',
                                '5f4e598e-79ba-4300-adba-fe0b11fe7576',
                                'f186181f-0bda-484b-be83-0873e9b71a0a',
                                'e49c3cd6-9834-47d4-a6fc-58859ff109a1',
                                '2f98c0d9-342b-48d6-a775-004bb288a9ef',
                                'e8d7c9ee-53d2-4b81-a840-38cc5ccb3be2',
                                '843ec267-4bd1-4b2b-837c-532b70bee85c',
                                '32178a93-1e19-445d-b512-fee5322677ac',
                                '3041b309-c8ff-44a9-b5f9-338d62c948dd',
                                '7eda0ed9-dea8-471b-afa3-f8af6dc59223',
                                '5845b447-387d-43fd-be95-adc66d1bebc1',
                                '20a70438-a2e1-4d34-840e-8060a12386b2',
                                'ee9fafa1-1946-4450-864a-76753b72548c',
                                'fb57357a-5fd9-4974-9b8f-515972c8e50c',
                                '0e80c2b6-43e1-4243-a367-4f49a07b1141',
                                '0c906e87-bd76-468f-9ec6-87613b82cd7f',
                                '30362f4a-7932-4793-968a-4f8768dc4621',
                                '06c5f997-93bf-4f8b-bc74-21bf86cf3ea1',
                                '0f209498-7455-49eb-9535-84fbae0e3f9b',
                                '44d26f1b-a49e-47e6-85a3-e2da3af1b401',
                                '2c82998e-cbc5-4caf-a88f-9f7f355b30e0',
                                'fe625e11-9300-4ab1-937e-fda1c214ed93',
                                '70305548-3cf7-46bb-bcfd-05bee9fd632f',
                                '4ff6b115-59fb-4908-b150-0ce66c75f27b',
                                '04465da6-96d8-42ba-93be-e358a2587292',
                                '344c0121-8beb-44ae-ab0b-b4f2d7c07f1a',
                                'a60274e1-ba18-4adb-9b4c-0353062b8af2',
                                'd4b6a3cc-6570-40b9-a147-6221c0cf7c57',
                                'aac4d6b9-f6b1-4d6f-93b4-e662e3172dda',
                                'e09cf80c-9a10-4c6a-af14-3195641cef64',
                                'e2e6fc57-dc4b-4b7e-8ed3-cee123c6f326',
                                '6e733ee1-5f69-4974-bf9a-69885bf5a775',
                                '36480ba9-d22f-4438-bcfd-28fbce639a35',
                                'c27e2d45-43c4-4b88-99e3-49f16438c930',
                                '76e1bda0-dd44-4b2d-a13b-631abfb08106',
                                'e7647885-66d9-441a-a7cc-646a68b9f7c8',
                                '31df9e34-2f4d-4eb8-8ac2-b79280b6991f',
                                '79044d88-f43e-44cb-8092-21bdd529517a',
                                'ea9a651f-f035-4a09-b6b7-3fe37100aff0',
                                '6ff4c835-3ff7-4b9d-9b74-9273643fef00',
                                '71447ce5-4af8-4b66-8ed3-cec43b172f3f',
                                'a26b06f1-de86-40a9-82d6-98805fe50a8f',
                                'd4b6f8eb-1174-4f8e-847f-dc15bffa7500',
                                '86cfc1a2-4260-483e-8189-4dcd6f5a00f7',
                                '2da6db88-42d3-4929-bae3-d769fb7e74b9',
                                'bb4de704-57d3-4de4-b66b-1dbe8a212456',
                                '5357b482-2f9f-41a2-9a0e-14282d5515a7',
                                'b58973c9-9da4-49b7-b9f1-0cb77a8a055c',
                                'da8c3f73-72ef-442f-927d-1ad1e6c2afbd',
                                'fc64a1b8-3d1b-4103-a98d-a32d5b68ad23',
                                'c22dac42-1daa-4800-9519-bac5a4fe604f',
                                '03da3bde-c299-4284-9ea6-2a8961f82957',
                                '70c29b52-8e5f-4fec-852c-9bda7e212099',
                                '67769613-bded-4747-a17d-6e6cc4ac75b3',
                                'e1dbd512-0d9b-449a-888f-f2d2f126a0ba',
                                'd2c0e0c3-8773-4a16-b7fe-497431c8b072',
                                '483382de-4f4b-4f6a-8ae1-37dbb33b9d75',
                                'f912f2ab-6018-4e3c-b3f8-c4b073b0583c',
                                '78f7a5ec-1fc9-48ea-899a-94aad17db6ec',
                                'a333d790-cd61-4243-8915-abca2b267652'
                            )
                            .required(),
                    }),
                }),
            },
            contact_details: {
                legal_address: {
                    edit_state_county_details: Joi.string().valid('Y', 'N').required(),
                    country: Joi.string().uuid().valid('7b1ba6e8-cefe-48fb-9c9f-98eac87517b2').required(),
                    zipcode: Joi.string().uuid().required(),
                    county: Joi.when('edit_state_county_details', {
                        is: 'Y',
                        then: Joi.string().max(20).required(),
                    }),
                    state: Joi.when('edit_state_county_details', {
                        is: 'Y',
                        then: Joi.string().max(20).required(),
                    }),
                    city: Joi.when('edit_state_county_details', {
                        is: 'Y',
                        then: Joi.string().max(20).required(),
                    }),
                    street_no: Joi.string().max(5).required(),
                    street_name: Joi.string().trim().min(3).max(50).trim().required(),
                    phone_number: Joi.string().trim().max(12).trim().required(),
                    phone_type: Joi.string()
                        .uuid()
                        .required()
                        .valid('cb1ed256-a0ab-4b12-a986-3881743d7228', '81bef47d-4d15-4940-b561-f9f948177d21'),
                },
                business_location: {
                    is_primary_business_location_same_as_legal_address: Joi.string().valid('Y', 'N').required(),
                    edit_state_county_details: Joi.when('is_primary_business_location_same_as_legal_address', {
                        is: 'N',
                        then: Joi.string().valid('Y', 'N').required(),
                    }),
                    country: Joi.when('is_primary_business_location_same_as_legal_address', {
                        is: 'N',
                        then: Joi.string().uuid().valid('7b1ba6e8-cefe-48fb-9c9f-98eac87517b2').required(),
                    }),
                    zipcode: Joi.when('is_primary_business_location_same_as_legal_address', {
                        is: 'N',
                        then: Joi.string().uuid().required(),
                    }),
                    county: Joi.when('edit_state_county_details', {
                        is: 'Y',
                        then: Joi.string().max(20).required(),
                    }),
                    state: Joi.when('edit_state_county_details', {
                        is: 'Y',
                        then: Joi.string().max(20).required(),
                    }),
                    street_no: Joi.when('is_primary_business_location_same_as_legal_address', {
                        is: 'N',
                        then: Joi.string().max(5).required(),
                    }),
                    street_name: Joi.when('is_primary_business_location_same_as_legal_address', {
                        is: 'N',
                        then: Joi.string().trim().min(3).max(50).trim().required(),
                    }),
                    phone_number: Joi.when('is_primary_business_location_same_as_legal_address', {
                        is: 'N',
                        then: Joi.string().trim().max(12).trim().required(),
                    }),
                    phone_type: Joi.when('is_primary_business_location_same_as_legal_address', {
                        is: 'N',
                        then: Joi.string()
                            .uuid()
                            .required()
                            .valid('cb1ed256-a0ab-4b12-a986-3881743d7228', '81bef47d-4d15-4940-b561-f9f948177d21'),
                    }),
                },
            },
            key_person_registration: {
                add_user: Joi.string().valid('Y', 'N').required(),
                user_type: Joi.when('add_user', {
                    is: 'Y',
                    then: Joi.string()
                        .uuid()
                        .valid(
                            '7cf77242-181c-45a2-94a5-2728974e8805', // beneficial owner
                            'f63eda23-26fc-4594-b398-813c82f3e33b', // investor
                            'ca51143d-9486-478b-a1cd-8051d682b7e0' // controlling managers
                        )
                        .required(),
                }),
                name: Joi.when('add_user', {
                    is: 'Y',
                    then: Joi.string().trim().min(3).max(50).trim().required(),
                }),
                email: Joi.when('add_user', {
                    is: 'Y',
                    then: Joi.string().trim().email().required(),
                }),
                ownership_percentage: Joi.when('add_user', {
                    is: 'Y',
                    then: Joi.when('user_type', {
                        is: '7cf77242-181c-45a2-94a5-2728974e8805',
                        then: Joi.number().min(20).max(100).required(),
                    }),
                }),
                investor_type: Joi.when('add_user', {
                    is: 'Y',
                    then: Joi.when('user_type', {
                        is: 'f63eda23-26fc-4594-b398-813c82f3e33b',
                        then: Joi.string()
                            .uuid()
                            .valid(
                                '8c9783b7-614c-4447-9178-cb4f3165da5b',
                                'f3bacea4-41a4-4873-ae42-b8089d3956a0',
                                '919a3f56-77e5-4691-80fc-bfe1ab9a90b4',
                                '3fe33de6-a9b2-46a7-8571-9a633820840e'
                            )
                            .required(),
                    }),
                }),
                access_type: Joi.when('add_user', {
                    is: 'Y',
                    then: Joi.string()
                        .valid(
                            'd169c927-034d-4e74-997a-50f4fee899ba', // admin
                            '0cbd8cd0-5925-4968-b4d3-4bc538254d70', // advanced
                            'c6b1ff96-9ee5-4dec-a87f-432abe5b91e0', // limited
                            'c5ee4167-630c-40e4-9ec9-1e7c4bb4965b' // no access
                        )
                        .required(),
                }),
                set_as_contact_person: Joi.when('add_user', {
                    is: 'Y',
                    then: Joi.string().valid('Y', 'N'),
                }),
            },
        }),
    },

    preferences: {
        body: Joi.object().keys({
            user_id: Joi.number().required(),
            pref_value: Joi.array().items(Joi.string().valid('name', 'dba', 'type', 'license_no')),
        }),
    },
};

module.exports = { businessSchema };
