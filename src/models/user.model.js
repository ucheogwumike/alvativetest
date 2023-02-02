const validator = require('validator');

module.exports = (sequelize, dataType) => {
  const user = sequelize.define('user', {
    firstName: {
      type: dataType.STRING,
      allowNull: false,
      trim: true,
    },
    lastName: {
      type: dataType.STRING,
      allowNull: false,
      trim: true,
    },
    email: {
      type: dataType.STRING,
      allowNull: false,
      unique: true,
      trim: true,
      lowercase: true,
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error('Invalid email');
        }
      },
    },
    password: {
      type: dataType.STRING,
      allowNull: false,
      trim: true,
      minlength: 8,
      validate(value) {
        if (!value.match(/\d/) || !value.match(/[a-zA-Z]/)) {
          throw new Error('Password must contain at least one letter and one number');
        }
      },
    },
    isEmailVerified: {
      type: dataType.BOOLEAN,
      trim: true,
      defaultValue: false,
      allowNull: false,
    },
    dateOfBirth: {
      type: dataType.STRING,
      trim: true,
    },
    address: {
      type: dataType.STRING,
      trim: true,
    },
    profileImage: {
      type: dataType.STRING,
      trim: true,
    },
    regDate: {
      type: dataType.STRING,
      trim: true,
    },
    googleId: {
      type: dataType.STRING,
      trim: true,
    },
    facebookId: {
      type: dataType.STRING,
      trim: true,
    },
    type: {
      type: dataType.STRING,
      trim: true,
    },
    roleName: {
      type: dataType.STRING,
      defaultValue: 'user',
      allowNull: false,
      trim: true,
    },
  });

  return user;
};
