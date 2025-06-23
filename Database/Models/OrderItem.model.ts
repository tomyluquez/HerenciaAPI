import { DataTypes, Model, Optional } from "sequelize";
import Order from "./Order.model";
import sequelize from "../connection";
import Variant from "./Variant.model";


interface OrderItemsAttributes {
    Id: number;
    Quantity: number;
    UnitPrice: number;
    TotalPrice: number;
    DateCreated: Date;
    DateUpdated: Date;
    VariantId?: number;
    Variant?: Variant;
    OrderId?: number;
    Order?: Order;
}

interface OrderItemsCreationAttributes extends Optional<OrderItemsAttributes, "Id"> { }

class OrderItems extends Model<OrderItemsAttributes, OrderItemsCreationAttributes> implements OrderItemsAttributes {
    public Id!: number;
    public Quantity!: number;
    public UnitPrice!: number;
    public TotalPrice!: number;
    public DateCreated!: Date;
    public DateUpdated!: Date;
    public VariantId!: number;
    public Variant?: Variant;
    public OrderId!: number;
    public Order?: Order;
}

OrderItems.init(
    {
        Id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        Quantity: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        UnitPrice: {
            type: DataTypes.FLOAT,
            allowNull: false
        },
        TotalPrice: {
            type: DataTypes.FLOAT,
            allowNull: false
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
        }
    },
    {
        sequelize,
        tableName: "OrderItems",
        modelName: "OrderItems",
        timestamps: false
    }
);

export default OrderItems;
