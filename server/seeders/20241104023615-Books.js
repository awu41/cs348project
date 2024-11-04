'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('books', [
      {
        name: "Eragon",
        author: "Christopher Paolini",
        rating: 10
      },
      {
        name: "Eldest",
        author: "Christopher Paolini",
        rating: 10
      },
      {
        name: "Brisingr",
        author: "Christopher Paolini",
        rating: 10
      },
      {
        name: "Inheritance",
        author: "Christopher Paolini",
        rating: 10
      }
    ])
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Books', null, {});
  }
};
