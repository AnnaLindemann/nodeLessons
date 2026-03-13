"use strict";
/** @type {import('sequelize-cli').Migration} */
export async function up(queryInterface, Sequelize) {
  await queryInterface.createTable("UserPosts", {
    userId: {
      type: Sequelize.INTEGER,
      references: {
        model: "Users",
        key: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    },
    postId: {
      type: Sequelize.INTEGER,
      references: {
        model: "Posts",
        key: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    },
  });
}
export async function down(queryInterface, _Sequelize) {
  await queryInterface.dropTable("UserPosts");
}