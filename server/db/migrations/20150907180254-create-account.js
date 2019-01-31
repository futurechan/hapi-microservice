'use strict';
module.exports = {
    up: function (queryInterface, Sequelize) {
        return queryInterface.createTable('accounts', {
            id: {
                allowNull: false,
                primaryKey: true,
                type: Sequelize.UUID
            },
            name: {
                allowNull: false,
                type: Sequelize.STRING
            },
            phone: {
                type:Sequelize.STRING,
                allowNull: true
            },
            website: {
                type:Sequelize.STRING,
                allowNull:true
            },
            email: {
                type:Sequelize.STRING,
                allowNull:true
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE,
                field: "created_at"
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE,
                field: "updated_at"
            }
        }, {
            schema: "accounts",
            freezeTableName: true,
            tableName: "accounts",
            define: {
                schema: "accounts"
            }
        });
    },
    down: function (queryInterface, Sequelize) {
        return queryInterface.dropTable('accounts');
    }
};