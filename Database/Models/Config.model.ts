import { DataTypes, Model, Optional } from "sequelize";
import sequelize from './../connection';

interface ConfigAttributes {
    Id: number;
    Name: string;
    Value: string;
}

interface ConfigCreationAttributes extends Optional<ConfigAttributes, "Id"> { }

class Config extends Model<ConfigAttributes, ConfigCreationAttributes> implements ConfigAttributes {
    public Id!: number;
    public Name!: string;
    public Value!: string;
}

Config.init(
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
        }
    },
    {
        sequelize,
        tableName: "Config",
        modelName: "Config",
        timestamps: false
    }
);

export default Config;
