/* eslint-disable prettier/prettier */
const httpStatus = require('http-status');
const ApiError = require('../utils/ApiError');
const { db } = require('../models');

/**
 * Create a receipiant
 * @param {Object} receipiantBody
 * @returns {Promise<Object>}
 */
const createReceipiants = async (receipiantBody) => {
  return db.receipiants.create(receipiantBody);
};

/**
 * Query for Receipiants
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 */
const getAllReceipiants = async () => {
  const receipiants = await db.receipiants.findAll();
  return receipiants;
};

/**
 * Get Receipiants by id
 * @param {id} id
 * @returns {Promise<Role>}
 */
const getReceipiantsById = async (id) => {
  return db.receipiants.findOne({ where: { id } });
};

/**
 * Update Receipiants by id
 * @param {id} receipiantsId
 * @param {Object} updateBody
 * @returns {Promise<Role>}
 */
const updateReceipiantsById = async (receipiantsId, updateBody) => {
  const receipiants = await getReceipiantsById(receipiantsId);
  if (!receipiants) {
    throw new ApiError(httpStatus.NOT_FOUND, 'receipiants not found');
  }
  Object.assign(receipiants, updateBody);
  await db.receipiants.update(receipiants.dataValues, { where: { id: receipiantsId } });
  return receipiants;
};

/**
 * Get receipiant by campaign id
 * @param {ObjectId} id
 * @returns {Promise<Store>}
 */
 const getReceipiantByCampaignId = async (campaignId) => {
    const receipiant = await db.receipiants.findAll({
      where: { campaignId },
      attributes: { exclude: ['createdAt', 'updatedAt'] },
    });
    if (!receipiant) {
      throw new ApiError(httpStatus.NOT_FOUND, 'receipiant not found');
    }
    return receipiant;
  };

/**
 * Delete receipiants by id
 * @param {id} receipiantsId
 * @returns {Promise<Role>}
 */
const deleteReceipiantsById = async (receipiantsId) => {
  const receipiants = await getReceipiantsById(receipiantsId);
  if (!receipiants) {
    throw new ApiError(httpStatus.NOT_FOUND, 'receipiants not found');
  }
  await db.receipiants.destroy({ where: { id: receipiantsId } });
  return receipiants;
};

module.exports = {
  createReceipiants,
  getAllReceipiants,
  getReceipiantsById,
  updateReceipiantsById ,
  deleteReceipiantsById,
  getReceipiantByCampaignId,
};
