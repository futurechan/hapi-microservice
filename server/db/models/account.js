'use strict';
module.exports = function(sequelize, DataTypes) {
  var Account = sequelize.define('Account', {
      id: {
          primaryKey: true,
          type: DataTypes.UUID,
          allowNull: false,
      },
    name: {
      type:DataTypes.STRING,
      allowNull:false
    },
       phone: {
          type:DataTypes.STRING,
          allowNull:true
      },
      email: {
          type:DataTypes.STRING,
          allowNull:true
      },
      website: {
          type:DataTypes.STRING,
          allowNull:true
      },
      createdAt: {
          allowNull: false,
          type: DataTypes.DATE,
          field: "created_at",
          defaultValue: () => new Date()
      },
      updatedAt: {
          allowNull: false,
          type: DataTypes.DATE,
          field: "updated_at",
          defaultValue: () => new Date()
      }
  }, {
      schema: "accounts",
      freezeTableName: true,
      tableName: "accounts",
      define: {
          schema: "accounts"
      }
  });

  Account.associate = function(models) {
    // Account.hasMany(models.Facility, { foreignKey: 'account_id' })
    // Account.hasMany(models.User, { foreignKey: 'accountId' })
    // Account.hasMany(models.Customer, { foreignKey: 'accountId' })
    // Account.hasMany(models.Consumable, { foreignKey: 'accountId' })

    // Account.hasMany(models.Quote, { foreignKey: 'accountId' })

      // Account.hasOne(models.SalesSettings, { foreignKey: 'accountId' })

  }

  Account.prototype.toDTO = function(){
      var a = this.get({plain: true})

      return a;
  }

  return Account;
};