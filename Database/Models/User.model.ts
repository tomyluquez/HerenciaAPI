import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../connection";
import Order from "./Order.model";
import bcrypt from "bcryptjs";


// Define los atributos del modelo
interface UserAttributes {
    Id: number;
    Name: string;
    Email: string;
    Password: string;
    Role: number;
    Phone?: number;
    Addres?: string;
    DateCreated: Date;
    DateUpdated: Date;
    Image?: string;
    Orders?: Order[];
}

// Define atributos opcionales para la creación de nuevos usuarios
interface UserCreationAttributes extends Optional<UserAttributes, "Id" | "Phone" | "Addres" | "Image" | "DateCreated" | "DateUpdated"> { }

// Crea la clase User que extiende de Model
class User extends Model<UserAttributes, UserCreationAttributes> implements UserAttributes {
    public Id!: number;
    public Name!: string;
    public Email!: string;
    public Password!: string;
    public Role!: number;
    public Image?: string;
    public Phone?: number;
    public Addres?: string;
    public DateCreated!: Date;
    public DateUpdated!: Date;
    public Orders?: Order[];
}

// Inicializa el modelo
User.init(
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
        Email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        Password: {
            type: DataTypes.STRING,
            allowNull: false
        },
        Phone: {
            type: DataTypes.BIGINT,
            allowNull: true,
            defaultValue: null
        },
        Addres: {
            type: DataTypes.STRING,
            allowNull: true,
            defaultValue: null
        },
        DateCreated: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW
        },
        DateUpdated: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW
        },
        Image: {
            type: DataTypes.STRING,
            allowNull: true,
            defaultValue: null
        },
        Role: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 2
        }
    },
    {
        sequelize,
        tableName: "Users",
        modelName: "User",
        hooks: {
            beforeCreate: async (user) => {
                const salt = await bcrypt.genSalt(10);
                user.Password = await bcrypt.hash(user.Password, salt);
            }
        },
        timestamps: false
    }
);

export default User;
