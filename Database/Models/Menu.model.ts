import { DataTypes, Model, Optional } from "sequelize";
import sequelize from './../connection';

interface MenuAttributes {
    Id: number;
    Name: string;
    Href: string;
    Icon: string;
    IsAdmin: boolean;
}

interface MenuCreationAttributes extends Optional<MenuAttributes, "Id" | "IsAdmin"> { }

class Menu extends Model<MenuAttributes, MenuCreationAttributes> implements MenuAttributes {
    public Id!: number;
    public Name!: string;
    public Href!: string;
    public Icon!: string;
    public IsAdmin!: boolean;
}

Menu.init(
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
        Href: {
            type: DataTypes.STRING,
            allowNull: false
        },
        Icon: {
            type: DataTypes.STRING,
            allowNull: false
        },
        IsAdmin: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false
        }
    },
    {
        sequelize,
        tableName: "Menu",
        modelName: "Menu",
        timestamps: false
    }
);

export default Menu;
