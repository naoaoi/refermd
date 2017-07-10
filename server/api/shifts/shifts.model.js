'use strict';

export default function(sequelize, DataTypes) {
  return sequelize.define('Shifts', {
    _id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    start: DataTypes.STRING,
    end: DataTypes.STRING,
    dow: DataTypes.TEXT   // days of week for slots
  });
}
