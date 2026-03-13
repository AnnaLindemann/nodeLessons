import sequelize from '../config/db.js';
import { DataTypes } from 'sequelize';

const User = sequelize.define('User', {
id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
},
username: {
type: DataTypes.STRING,
allowNull: false,
},
email: {
  type: DataTypes.STRING,
  allowNull: false,
  unique: true,
},
passwordHash: {
type: DataTypes.STRING,
allowNull: false,
},
role: {
  type: DataTypes.ENUM('user', 'admin'),
  allowNull:false,
  defaultValue: 'user',
},
mustChangePassword: {
  type: DataTypes.BOOLEAN,
  allowNull: false,
  defaultValue: false,
}
}, {
tableName: "Users",
timestamps: true,
});

export default User;