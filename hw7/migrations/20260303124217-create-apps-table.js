'use strict';

/** @type {import('sequelize-cli').Migration} */
export async function up(queryInterface, Sequelize) {
await queryInterface.createTable("Apps", {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      size: {
        type: Sequelize.INTEGER, 
        allowNull: false,
      },
})
}
export async function down(queryInterface, Sequelize) {
  await queryInterface.dropTable("Apps")
}
