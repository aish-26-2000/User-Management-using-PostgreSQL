const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Agreement extends Model {
        // Helper method for defining associations.
        // This method is not a part of Sequelize lifecycle.
        // The `models/index` file will call this method automatically.       
    }
    Agreement.init(
        {
            agreement_id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: DataTypes.BIGINT,
            },
            agreement_type_code: {
                type: DataTypes.ENUM('SCBUS','GNUSR'),
                allowNull: false,
            },
            agreement_type_name: {
                type: DataTypes.STRING,
                allowNull: false,
            }, 
            priority: {
                allowNull: false,
                type: DataTypes.BIGINT,  
            },
            title: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            description: {
                type: DataTypes.TEXT,
                allowNull: false,
            },
            document_version: {
                type: DataTypes.STRING,
                defaultValue : 'v0.0.1'
            },
            is_active: {
                type: DataTypes.ENUM('Y','N'),
                allowNull : false
            },
            effective_date: {
                type: DataTypes.DATE,                
            },
            createdAt: {
                type: DataTypes.DATE,                
            },
            createdBy: {
                type: DataTypes.STRING, 
                allowNull: false               
            },
            updatedAt: {
                type: DataTypes.DATE,                
            },
            updatedBy: {
                type: DataTypes.STRING,
            },
           
        },
        {
            sequelize,
            modelName: Agreement.name,
            tableName: 'Agreements',
            paranoid: true,
            timestamps: true,
        }
    );

    return Agreement;
};