import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../connection";


interface ShippingMethodAttributes {
  Id: number;
  Name: string;
  value: string;
  Price: number;
}

interface ShippingMethodCreationAttributes
  extends Optional<ShippingMethodAttributes, "Id"> { }

class ShippingMethod
  extends Model<ShippingMethodAttributes, ShippingMethodCreationAttributes>
  implements ShippingMethodAttributes {
  public Id!: number;
  public Name!: string;
  public value!: string;
  public Price!: number;
}

ShippingMethod.init(
  {
    Id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    Name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    value: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Price: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
  },
  {
    sequelize,
    tableName: "ShippingMethods",
    modelName: "ShippingMethod",
    timestamps: false,
  }
);

export default ShippingMethod;
