"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
    return queryInterface.bulkInsert("Students", [
      {
        name: "John John",
        email: "jon@a.com",
        gender: "male",
        studentId: "123FKG",
        major: "Kedokderan",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Bambang",
        email: "bambang@a.com",
        gender: "male",
        studentId: "124FKG",
        major: "Kedokderan",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */

    return queryInterface.bulkDelete("Students", null, {});
  },
};
