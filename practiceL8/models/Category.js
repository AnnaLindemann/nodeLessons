import { DataTypes } from "sequelize";
import sequelize from "../config/db";


const Category = sequelize.define("Category", {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    unique:true,
  }
},
{
  tableName: "Categories",
  timestamps: false,
}
)

export default Category