import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../connection";
import Order from "./Order.model";


interface ShippingAttributes {
  Id: number;
  Address: string;
  CP: number;
  City: string;
  Province: string;
}

interface ShippingCreationAttributes
  extends Optional<ShippingAttributes, "Id"> { }

class Shipping
  extends Model<ShippingAttributes, ShippingCreationAttributes>
  implements ShippingAttributes {
  public Id!: number;
  public Address!: string;
  public CP!: number;
  public City!: string;
  public Province!: string;
  public OrderId!: number;
  public Order!: Order;
}

Shipping.init(
  {
    Id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    Address: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    CP: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    City: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Province: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: "Shippings",
    modelName: "Shipping",
    timestamps: false,
  }
);

export default Shipping;
