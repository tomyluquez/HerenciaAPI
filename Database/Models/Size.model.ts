import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../connection";

interface SizeAttributes {
    Id: number;
    Name: string;
    IsActive: boolean;
}

interface SizeCreationAttributes extends Optional<SizeAttributes, "Id" | "IsActive"> { }

class Size extends Model<SizeAttributes, SizeCreationAttributes> implements SizeAttributes {
    public Id!: number;
    public Name!: string;
    public IsActive!: boolean;
}

Size.init(
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
        IsActive: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: true
        }
    },
    {
        sequelize,
        tableName: "Sizes",
        modelName: "Size",
        timestamps: false
    }
);

export default Size;
