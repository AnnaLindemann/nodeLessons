import sequelize from "../config/db";
import { DataTypes } from "sequelize";


const Product = sequelize.define("Product", {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  price: {
    type: DataTypes.DECIMAL(10,2),
    allowNull: false
},
description: {
  type: DataTypes.STRING,
  allowNull: true,
}},
{
tableName: "Products",
timestamps: false,
}
)

export default Product