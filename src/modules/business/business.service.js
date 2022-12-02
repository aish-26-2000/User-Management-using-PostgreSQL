const db = require('../../database/models');
const Op = db.Sequelize.Op


exports.getAllBusiness = async(page,size,sort_column,sort_order,filterby,query) => { 
    const Pagination = (page, size) => {
        const limit = size ? +size : 3;
        const offset = page ? page * limit : 0;
        return { limit, offset};
    };
    const getPagingData = (data, page, limit) => {
        const { count: totalItems, rows: list} = data;
        const currentPage = page ? +page : 0;
        const totalPages = Math.ceil(totalItems / limit);
        return { totalItems, list, totalPages, currentPage };
    };
    
    const { limit,offset } = Pagination(page,size);

    if(filterby === 'Cannabis Business') {
        const business = await db.Business.findAndCountAll({ 
            attributes:['bp_business_id','name','dba','bp_group_shortcode','createdAt','is_approved','is_approved_vendor','is_cannabis_business','is_createdby_stdc'],
            where: {
                [Op.and]: [
                {is_cannabis_business : 'Y'},
                {[Op.or] : [
                    {name: { [Op.like]: '%' + query + '%' }},
                    {dba: { [Op.like]: '%' + query + '%' }},
                ]},
                ]
              },
            include :  [
                {model: db.Business_Stage_Status,
                attributes:['bp_onboard_stage_status_id','stage','status']
            }],
            order: [[sort_column || 'bp_business_id',sort_order || 'ASC']], 
            limit,
            offset
            })
        
            
            const response = getPagingData(business,page,limit);
            if(response) return response; 
    };

    if(filterby === 'Non-Cannabis Business') {
        const business = await db.Business.findAndCountAll({ 
            attributes:['bp_business_id','name','dba','bp_group_shortcode','createdAt','is_approved','is_approved_vendor','is_cannabis_business','is_createdby_stdc'],
            where: {
                [Op.and]: [
                    {is_cannabis_business : 'N'},
                    {[Op.or] : [
                        {name: { [Op.like]: '%' + query + '%' }},
                        {dba: { [Op.like]: '%' + query + '%' }},
                    ]},
                    ]
              },
            include :  [
                {model: db.Business_Stage_Status,
                attributes:['bp_onboard_stage_status_id','stage','status']
            }],
            order: [[sort_column || 'bp_business_id',sort_order || 'ASC']], 
            limit,
            offset
            })
        
            
            const response = getPagingData(business,page,limit);
            if(response) return response; 
    };

    if(filterby === 'Approved Vendor') {
        const business = await db.Business.findAndCountAll({ 
            attributes:['bp_business_id','name','dba','bp_group_shortcode','createdAt','is_approved','is_approved_vendor','is_cannabis_business','is_createdby_stdc'],
            where: {
                [Op.and]: [
                    {is_approved_vendor : 'Y'},
                    {[Op.or] : [
                        {name: { [Op.like]: '%' + query + '%' }},
                        {dba: { [Op.like]: '%' + query + '%' }},
                    ]},
                    ]
              },
            include :  [
                {model: db.Business_Stage_Status,
                attributes:['bp_onboard_stage_status_id','stage','status']
            }],
            order: [[sort_column || 'bp_business_id',sort_order || 'ASC']], 
            limit,
            offset
            })
        
            
            const response = getPagingData(business,page,limit);
            if(response) return response; 
    };

    if(filterby === 'Member Banks') {
        const business = await db.Business.findAndCountAll({ 
            attributes:['bp_business_id','name','dba','bp_group_shortcode','createdAt','is_approved','is_approved_vendor','is_cannabis_business','is_createdby_stdc'],
            where: {
                [Op.and]: [
                    {bp_group_shortcode : 'MEMFI'},
                    {[Op.or] : [
                        {name: { [Op.like]: '%' + query + '%' }},
                        {dba: { [Op.like]: '%' + query + '%' }},
                    ]},
                    ]
              },
            include :  [
                {model: db.Business_Stage_Status,
                attributes:['bp_onboard_stage_status_id','stage','status']
            }],
            order: [[sort_column || 'bp_business_id',sort_order || 'ASC']], 
            limit,
            offset
            })
        
            
            const response = getPagingData(business,page,limit);
            if(response) return response; 
    };

    const business = await db.Business.findAndCountAll({ 
        attributes:['bp_business_id','name','dba','bp_group_shortcode','createdAt','is_approved','is_approved_vendor','is_cannabis_business','is_createdby_stdc'],
        where: {
            [Op.or]: [
            {name: { [Op.like]: '%' + query + '%' }},
            {dba: { [Op.like]: '%' + query + '%' }},
            ]
          },
        include :  [
            {model: db.Business_Stage_Status,
            attributes:['bp_onboard_stage_status_id','stage','status']
        }],
        order: [[sort_column || 'bp_business_id',sort_order || 'ASC']], 
        limit,
        offset
        })
    
        
        const response = getPagingData(business,page,limit);
        if(response) return response;    
};



exports.addBusiness = async(data) => {
    const response = await db.Business.create(data);

    if(response) {
        console.log()
        await db.Business_Stage_Status.create({
            createdBy : data.createdBy,
            updatedBy : data.updatedBy,
            stage : 'Membership',
            status : 'Inactive',
            bp_business_id : response.bp_business_id
        });

        return {
            id : response.bp_business_id,
            name : response.name,
            dba : response.dba,
            code : response.bp_group_shortcode
        };
    };   
};