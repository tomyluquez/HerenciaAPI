import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../connection";
import Cart from "./Cart.Model";
import Variant from "./Variant.model";

interface CartItemsAttributes {
    Id: number;
    Quantity: number;
    UnitPrice: number;
    TotalPrice: number;
    DateCreated: Date;
    DateUpdated: Date;
    CartId?: number;
    VariantId?: number;
}

interface CartItemsCreationAttributes extends Optional<CartItemsAttributes, "Id" | "DateCreated" | "DateUpdated"> { }

class CartItems extends Model<CartItemsAttributes, CartItemsCreationAttributes> implements CartItemsAttributes {
    public Id!: number;
    public Quantity!: number;
    public UnitPrice!: number;
    public TotalPrice!: number;
    public DateCreated!: Date;
    public DateUpdated!: Date;
    public CartId!: number;
    public Cart!: Cart;
    public VariantId!: number;
    public Variant!: Variant;
}

CartItems.init(
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
        },
        CartId: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        VariantId: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    },
    {
        sequelize,
        tableName: "CartItems",
        modelName: "CartItems",
        timestamps: false
    }
);

export default CartItems;
