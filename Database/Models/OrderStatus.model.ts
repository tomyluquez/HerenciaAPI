import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../connection";


interface OrderStatusAttributes {
    Id: number;
    Name: string;
    Color: string;
}

interface OrderStatusCreationAttributes extends Optional<OrderStatusAttributes, "Id"> { }

class OrderStatus extends Model<OrderStatusAttributes, OrderStatusCreationAttributes> implements OrderStatusAttributes {
    public Id!: number;
    public Name!: string;
    public Color!: string;
}

OrderStatus.init(
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
        Color: {
            type: DataTypes.STRING,
            allowNull: false
        }
    },
    {
        sequelize,
        tableName: "OrderStatus",
        modelName: "OrderStatus",
        timestamps: false
    }
);

export default OrderStatus;
