import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../connection";


interface PaymentMethodAttributes {
    Id: number;
    Name: string;
    Discount: number;
}

interface PaymentMethodCreationAttributes extends Optional<PaymentMethodAttributes, "Id" | "Discount"> { }

class PaymentMethod extends Model<PaymentMethodAttributes, PaymentMethodCreationAttributes> implements PaymentMethodAttributes {
    public Id!: number;
    public Name!: string;
    public Discount!: number;
}

PaymentMethod.init(
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
        Discount: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: 0
        }
    },
    {
        sequelize,
        tableName: "PaymentMethods",
        modelName: "PaymentMethod",
        timestamps: false
    }
);

export default PaymentMethod;
