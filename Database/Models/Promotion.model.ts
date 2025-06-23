import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../connection";

interface PromotionAttributes {
  Id: number;
  Code: string;
  IsActive: boolean;
  Discount: number;
  DateCreated: Date;
  DateUpdated: Date;
}

interface PromotionCreationAttributes
  extends Optional<PromotionAttributes, "Id"> { }

class Promotion
  extends Model<PromotionAttributes, PromotionCreationAttributes>
  implements PromotionAttributes {
  public Id!: number;
  public Code!: string;
  public IsActive!: boolean;
  public Discount!: number;
  public DateCreated!: Date;
  public DateUpdated!: Date;
}

Promotion.init(
  {
    Id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    Code: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    IsActive: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
    Discount: {
      type: DataTypes.FLOAT,
      allowNull: false,
      validate: {
        min: 0,
        max: 100,
      },
    },
    DateCreated: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    DateUpdated: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    sequelize,
    tableName: "Promotions",
    modelName: "Promotion",
    timestamps: false,
  }
);

export default Promotion;
