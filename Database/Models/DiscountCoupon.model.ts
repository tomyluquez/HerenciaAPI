import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../connection";
interface DiscountCouponAttributes {
    Id: number;
    Name: string;
    IsActive: boolean;
    Discount: number;
    DateCreated: Date;
}

interface DiscountCouponCreationAttributes extends Optional<DiscountCouponAttributes, "Id" | "IsActive" | "DateCreated"> { }

class DiscountCoupon extends Model<DiscountCouponAttributes, DiscountCouponCreationAttributes> implements DiscountCouponAttributes {
    public Id!: number;
    public Name!: string;
    public IsActive!: boolean;
    public Discount!: number;
    public DateCreated!: Date;
}

DiscountCoupon.init(
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
        },
        Discount: {
            type: DataTypes.FLOAT,
            allowNull: false
        },
        DateCreated: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW
        }
    },
    {
        sequelize,
        tableName: "DiscountCoupons",
        modelName: "DiscountCoupon",
        timestamps: false
    }
);

export default DiscountCoupon;
