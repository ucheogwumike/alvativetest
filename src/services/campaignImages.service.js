/* eslint-disable prettier/prettier */
const httpStatus = require('http-status');
// const bcrypt = require('bcryptjs');
const { db } = require('../models');
const ApiError = require('../utils/ApiError');

/**
 * creates a campaign model
 * @param {Object} campaignBody
 * @returns {Promise<Object>}
 */

const createCampaignImages = async (campaignBody) => {

//   return db.campaignImages.create(campaignBody);
return db.campaignImages.bulkCreate(campaignBody);
};

// /**
//  * Get campaign by id
//  * @param {ObjectId} id
//  * @returns {Promise<User>}
//  */
// const getCampaignById = async (id) => {
//   // return db.campaigns.findById(id);
//   return db.campaigns.findOne({ where: { id } });
// };

// /**
//  * Find all the campaigns
//  * @param {ObjectId} id
//  * @returns {Promise<Campaign>}
//  */
// const queryCampaigns = async () => {
//   return db.campaigns.findAll();
// };

// /**
//  * Update user by id
//  * @param {ObjectId} id
//  * @param {Object} updateBody
//  * @returns {Promise<Campaign>}
//  */

// const updateCampaignById = async (id, updateBody) => {
//   const campaign = await getCampaignById(id);
//   if (!campaign) {
//     throw new ApiError(httpStatus.NOT_FOUND, 'campaign not found');
//   }
//   Object.assign(campaign, updateBody);
//   // db.campaigns.update(campaign);
//   return db.campaigns.update(campaign.dataValues, { where: { id } });

//   // return campaign;
// };

// /**
//  * Delete user by id
//  * @param {ObjectId} campaignId
//  * @returns {Promise<Campaign>}
//  */
// const deleteCampaignById = async (id) => {
//   const campaign = await getCampaignById(id);
//   if (!campaign) {
//     throw new ApiError(httpStatus.NOT_FOUND, 'Campaign not found');
//   }
//   await db.campaigns.destroy({ where: { id } });
//   return campaign;
// };

module.exports = {
  createCampaignImages,
 // getCampaignById,
 // queryCampaigns,
 // updateCampaignById,
 // deleteCampaignById,
};
