'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
      return queryInterface.createSchema('accounts');
  },

  down: function (queryInterface, Sequelize) {
      return queryInterface.dropTable('...');
  }
};
