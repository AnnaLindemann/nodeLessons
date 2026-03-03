'use strict';

/** @type {import('sequelize-cli').Migration} */
export async function up(queryInterface, Sequelize) {
 await queryInterface.createTable("Products", {
  id: {
  type: Sequelize.INTEGER,
  autoIncrement: true,
  primaryKey: true,
  allowNull: false
},
name: {
      type: Sequelize.STRING,
      allowNull: false,
    },
price: {
  type: Sequelize.DECIMAL(10,2),
      allowNull: false
},
description: {
  type: Sequelize.STRING,
  allowNull: true,
}
 })
}

export async function down(queryInterface, Sequelize) {
  await queryInterface.dropTable("Products")
}
