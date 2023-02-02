// const mongoose = require('mongoose');
const { sequelize } = require('../../src/config/config');
const config = require('../../src/config/config');
const {Sequelize} = require('sequelize');

const sequelizeInstance = new Sequelize(config.sequelize.url);

const setupTestDB = () => {
  beforeAll(async () => {
    // executes before any test occurs
    // await sequelizeInstance.authenticate();

    await sequelizeInstance.afterCreate();
  });

  afterAll(async () => {
    await sequelizeInstance.close();
  });
};

// const setupTestDB = () => {
//   beforeAll(async () => {
//     await mongoose.connect(config.mongoose.url, config.mongoose.options);
//   });

//   beforeEach(async () => {
//     await Promise.all(Object.values(mongoose.connection.collections).map(async (collection) => collection.deleteMany()));
//   });

//   afterAll(async () => {
//     await mongoose.disconnect();
//   });
// };

module.exports = setupTestDB;
