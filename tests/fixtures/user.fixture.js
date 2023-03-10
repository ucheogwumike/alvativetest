// const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const faker = require('faker');
// const User = require('../../src/models/user.model');
const {db} = require('../../src/models')

const password = 'password1';
const salt = bcrypt.genSaltSync(8);
const hashedPassword = bcrypt.hashSync(password, salt);

const userOne = {
  _id: 1,
  fisrtName: faker.name.findName(),
  lastName: faker.name.findName(),
  email: faker.internet.email().toLowerCase(),
  password,
  roleName: 'user',
  isEmailVerified: false,
};

const userTwo = {
  _id: 2,
  fisrtName: faker.name.findName(),
  lastName: faker.name.findName(),
  email: faker.internet.email().toLowerCase(),
  password,
  roleName: 'user',
  isEmailVerified: false,
};

const admin = {
  _id: 3,
  fisrtName: faker.name.findName(),
  lastName: faker.name.findName(),
  email: faker.internet.email().toLowerCase(),
  password,
  roleName: 'user',
  isEmailVerified: false,
};

// const insertUsers = async (users) => {
//   await User.insertMany(users.map((user) => ({ ...user, password: hashedPassword })));
// };

const insertUsers = async (users) => {
  await db.users.bulkCreate(users.map((user) => ({ ...user, password: hashedPassword })));
};

module.exports = {
  userOne,
  userTwo,
  admin,
  insertUsers,
};
