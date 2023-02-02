/* eslint-disable prettier/prettier */
module.exports = (sequelize, DataTypes) => {
    const receipiant = sequelize.define('receipiants', {
      rec: {
        type: DataTypes.STRING,
      },
    });
    return receipiant;
  };
  