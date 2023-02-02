/* eslint-disable prettier/prettier */
const logger = require('../../src/config/logger');
const faker = require('faker');

const { db } = require('../../src/models');


const campaignOne = {
  _id:1,
  title: faker.name.findName(),
  target: faker.datatype.float({min:1000}),
  location: faker.address.cityName(),
  description: faker.random.words(15),
  images: faker.random.word(),
  accountNum: '0136989254',
  accountName: faker.name.findName(),
  bankName: 'GTB',
  launchDate: faker.date.future(),
  endDate: faker.date.future(),
};

const campaignTwo = {
  title: faker.name.findName(),
  target: faker.datatype.float({min:1000}),
  location: faker.address.cityName(),
  description: faker.random.words(15),
  images: faker.random.word(),
  accountNum: '1006404821',
  accountName: faker.name.findName(),
  bankName: 'GTB',
  launchDate: faker.date.future(),
  endDate: faker.date.future(),
};

const campaignThree = {
  title: faker.name.findName(),
  target: faker.datatype.float({min:1000}),
  location: faker.address.cityName(),
  description: faker.random.words(15),
  images: faker.random.word(),
  accountNum: '1007505932',
  accountName: faker.name.findName(),
  bankName: 'GTB',
  launchDate: faker.date.future(),
  endDate: faker.date.future(),
};

// const insertUsers = async (users) => {
//   await User.insertMany(users.map((user) => ({ ...user, password: hashedPassword })));
// };

// const insertCampaigns = async (campaigns) => {
//   await db.campaigns.bulkCreate(campaigns.map((campaign) => ({ ...campaign })));
// };

const insertCampaigns = async () => {
    await db.campaigns.create(campaignOne);
  };
  logger.info(campaignOne)

module.exports = {
  campaignOne,
  campaignTwo,
  campaignThree,
  insertCampaigns,
};
