import sequelize from "../config/db.js";
import { DataTypes } from "sequelize";

const User = sequelize.define("User", {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,    
  },
  createAt: {
    type: DataTypes.DATE,
    defaultValue:DataTypes.NOW,    
  },
},
{
tableName: "Users",
timestamps: false,
}

)

export default User