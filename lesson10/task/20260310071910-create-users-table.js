'use strict';

/** @type {import('sequelize-cli').Migration} */
export async function up(queryInterface, Sequelize) {
  await queryInterface.createTable("Users", {
    id: {
type: Sequelize.INTEGER,
autoIncrement: true,
primaryKey: true,
allowNull: false,
},
username: {
type: Sequelize.STRING,
allowNull: false,
},
email:{
   type: Sequelize.STRING,
    allowNull: false,
    unique: true,
},
passwordHash: {
type: Sequelize.STRING,
allowNull: false,
},
role: {
  type: Sequelize.ENUM('user', 'admin'),
  allowNull:false,
  defaultValue: 'user',
},
mustChangePassword: {
  type: Sequelize.BOOLEAN,
  allowNull: false,
  defaultValue: false,
},
 createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
  })
}
export async function down(queryInterface, Sequelize) {
  await queryInterface.dropTable("Users")
}
