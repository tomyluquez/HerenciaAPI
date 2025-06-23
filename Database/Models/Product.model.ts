import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../connection";
import Category from "./Category.model";
import Variant from "./Variant.model";
import ProductImages from "./ProductImages.model";

export interface ProductAttributes {
    Id: number;
    Name: string;
    Price: number;
    PromotionalPrice: number;
    Cost: number;
    Discount: number;
    Description: string;
    IsActive: boolean;
    IsPromotional: boolean;
    DateCreated: Date;
    DateUpdated: Date;
    CategoryId?: number;
    Rentability: number;
}

interface ProductCreationAttributes extends Optional<ProductAttributes, "Id" | "Description" | "IsActive" | "IsPromotional" | "DateCreated" | "DateUpdated"> { }

class Product extends Model<ProductAttributes, ProductCreationAttributes> implements ProductAttributes {
    public Id!: number;
    public Name!: string;
    public Price!: number;
    public PromotionalPrice!: number;
    public Cost!: number;
    public Discount!: number;
    public Description!: string;
    public IsActive!: boolean;
    public IsPromotional!: boolean;
    public CategoryId!: number;
    public Category?: Category;
    public DateCreated!: Date;
    public DateUpdated!: Date;
    public Variants?: Variant[];
    public Images?: ProductImages[];
    public Rentability!: number;
}

Product.init(
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
        Price: {
            type: DataTypes.FLOAT,
            allowNull: false
        },
        PromotionalPrice: {
            type: DataTypes.FLOAT,
            allowNull: false
        },
        Rentability: {
            type: DataTypes.FLOAT,
            allowNull: false
        },
        Cost: {
            type: DataTypes.FLOAT,
            allowNull: false
        },
        Discount: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        Description: {
            type: DataTypes.TEXT,
            allowNull: true,
            defaultValue: null
        },
        IsActive: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: true
        },
        IsPromotional: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false
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
        CategoryId: {
            type: DataTypes.INTEGER,
            allowNull: true,
            defaultValue: null
        }
    },
    {
        sequelize,
        tableName: "Products",
        modelName: "Product",
        timestamps: false
    }
);

export default Product;
