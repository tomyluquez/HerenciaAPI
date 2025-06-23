import { DataTypes, Model, Optional } from "sequelize";
import sequelize from './../connection';

interface CompanyInfoAttributes {
    Id: number;
    Name: string;
    Value: string;
    Icon: string;
    IsActive: boolean;
}

interface CompanyInfoCreationAttributes extends Optional<CompanyInfoAttributes, "Id"> { }

class CompanyInfo extends Model<CompanyInfoAttributes, CompanyInfoCreationAttributes> implements CompanyInfoAttributes {
    public Id!: number;
    public Name!: string;
    public Value!: string;
    public Icon!: string;
    public IsActive!: boolean;
}

CompanyInfo.init(
    {
        Id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        Name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        Value: {
            type: DataTypes.STRING,
            allowNull: false
        },
        Icon: {
            type: DataTypes.STRING,
            allowNull: false
        },
        IsActive: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: true
        }
    },
    {
        sequelize,
        tableName: "CompanyInfo",
        modelName: "CompanyInfo",
        timestamps: false
    }
);

export default CompanyInfo;
