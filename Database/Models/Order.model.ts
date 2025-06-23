import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../connection";
import DiscountCoupon from "./DiscountCoupon.model";
import User from "./User.model";
import OrderStatus from "./OrderStatus.model";
import Promotion from "./Promotion.model";
import PaymentMethod from "./PaymentMethod.model";
import ShippingMethod from "./ShippingMethod.model";
import OrderItems from "./OrderItem.model";


export interface OrderAttributes {
    Id: number;
    OrderNumber: number;
    DateCreated: Date;
    DateUpdated: Date;
    IsActive: boolean;
    Total: number;
    Subtotal: number;
    DiscountCouponTotal?: number;
    DiscountCouponPercentage?: number;
    DiscountCouponId?: number;
    DiscountCoupon?: DiscountCoupon;
    DiscountPaymentTotal?: number;
    DiscountPaymentPercentage?: number;
    UserId?: number;
    User?: User;
    OrderStatusId?: number;
    OrderStatus?: OrderStatus;
    PromotionId?: number;
    Promotion?: Promotion;
    PaymentMethodId?: number;
    PaymentMethod?: PaymentMethod;
    ShippingMethodId?: number;
    ShippingMethod?: ShippingMethod;
    ShippingCost: number;
    OrderItems?: OrderItems[];
}

interface OrderCreationAttributes extends Optional<OrderAttributes, "Id"> { }

class Order extends Model<OrderAttributes, OrderCreationAttributes> implements OrderAttributes {
    public Id!: number;
    public OrderNumber!: number;
    public DateCreated!: Date;
    public DateUpdated!: Date;
    public IsActive!: boolean;
    public Total!: number;
    public Subtotal!: number;
    public DiscountCouponTotal!: number;
    public DiscountCouponPercentage!: number;
    public DiscountCouponId!: number;
    public DiscountCoupon?: DiscountCoupon;
    public DiscountPaymentTotal!: number;
    public DiscountPaymentPercentage!: number;
    public UserId!: number;
    public User?: User;
    public OrderStatusId!: number;
    public OrderStatus?: OrderStatus;
    public PromotionId!: number;
    public Promotion?: Promotion;
    public PaymentMethodId!: number;
    public PaymentMethod?: PaymentMethod;
    public ShippingMethodId!: number;
    public ShippingMethod?: ShippingMethod;
    public ShippingCost!: number;
    public OrderItems?: OrderItems[];
}

Order.init(
    {
        Id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        OrderNumber: {
            type: DataTypes.BIGINT,
            allowNull: false,
            unique: true
        },
        IsActive: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: true
        },
        Total: {
            type: DataTypes.FLOAT,
            allowNull: false
        },
        Subtotal: {
            type: DataTypes.FLOAT,
            allowNull: false
        },
        DiscountCouponTotal: {
            type: DataTypes.FLOAT,
            allowNull: false
        },
        DiscountCouponPercentage: {
            type: DataTypes.FLOAT,
            allowNull: false
        },
        DiscountCouponId: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        DiscountPaymentTotal: {
            type: DataTypes.FLOAT,
            allowNull: false
        },
        DiscountPaymentPercentage: {
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
        UserId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        PromotionId: {
            type: DataTypes.INTEGER,
            allowNull: true,
            defaultValue: null
        },
        PaymentMethodId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        ShippingMethodId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        ShippingCost: {
            type: DataTypes.FLOAT,
            allowNull: false
        },
        OrderStatusId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
    },
    {
        sequelize,
        tableName: "Orders",
        modelName: "Order",
        timestamps: false
    }
);

export default Order;
