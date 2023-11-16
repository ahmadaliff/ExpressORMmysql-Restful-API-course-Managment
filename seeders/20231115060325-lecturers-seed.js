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
    await queryInterface.bulkInsert(
      "Lecturers",
      [
        {
          name: "drg.pamungkas",
          email: "pamungkas@mm.com",
          gender: "male",
          employeeId: "099DR",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "drg.barbie",
          email: "barbie@mm.com",
          gender: "female",
          employeeId: "100DR",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    return queryInterface.bulkDelete("Lecturers", null, {});
  },
};
