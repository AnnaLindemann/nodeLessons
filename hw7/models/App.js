import sequelize from "../config/db.js";
import { DataTypes } from "sequelize";

const App = sequelize.define("App", 
{
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    size: {
      type: DataTypes.INTEGER, 
      allowNull: false,
    },
  },
  {
tableName: "Apps",
timestamps: false,
}
)

export default App