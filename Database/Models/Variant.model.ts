import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../connection";
import Product from "./Product.model";
import Size from "./Size.model";


interface VariantAttributes {
    Id: number;
    Stock: number;
    ProductId?: number;
    SizeId?: number;
}

interface VariantCreationAttributes extends Optional<VariantAttributes, "Id"> { }

class Variant extends Model<VariantAttributes, VariantCreationAttributes> implements VariantAttributes {
    public Id!: number;
    public Stock!: number;
    public ProductId!: number;
    public Product!: Product;
    public SizeId!: number;
    public Size?: Size;
}

Variant.init(
    {
        Id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        Stock: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0
        },
        ProductId: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        SizeId: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    },
    {
        sequelize,
        tableName: "Variants",
        modelName: "Variant",
        timestamps: false
    }
);

export default Variant;
