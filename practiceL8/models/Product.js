import { DataTypes } from "sequelize";
import sequelize from "../config/db";

const Product = sequelize.define("Product", {
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  price:{
    type: DataTypes.DECIMAL(10,2),
    allowNull:false,
  },
  categoryName: {
    type: DataTypes.STRING,
    allowNull: false,
  }
},
{
  tableName: "Products",
  timestamps: false,
}
)


export default Product