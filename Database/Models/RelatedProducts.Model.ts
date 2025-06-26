import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../connection";
import Product from "./Product.model";

export interface RelatedProductAttributes {
    Id: number;
    ProductId: number;
    RelatedProductId: number;
}

interface RelatedProductCreationAttributes extends Optional<RelatedProductAttributes, "Id"> { }

class RelatedProduct extends Model<RelatedProductAttributes, RelatedProductCreationAttributes> implements RelatedProductAttributes {
    public Id!: number;
    public ProductId!: number;
    public RelatedProductId!: number;
    public Related?: Product
}

RelatedProduct.init(
    {
        Id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        ProductId: {
            type: DataTypes.INTEGER,
            allowNull: true,
            defaultValue: null
        },
        RelatedProductId: {
            type: DataTypes.INTEGER,
            allowNull: true,
            defaultValue: null
        }
    },
    {
        sequelize,
        tableName: "RelatedProducts",
        modelName: "RelatedProduct",
        timestamps: false
    }
);

export default RelatedProduct;
