const httpStatus = require('http-status');
const ApiError = require('../utils/ApiError');
const { db } = require('../models');

/**
 * Create a role
 * @param {Object} roleBody
 * @returns {Promise<Object>}
 */
const createRole = async (roleBody) => {
  return db.roles.create(roleBody);
};

/**
 * Query for roles
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 */
const getAllRoles = async () => {
  const roles = await db.roles.findAll();
  return roles;
};

/**
 * Get role by id
 * @param {id} id
 * @returns {Promise<Role>}
 */
const getRoleById = async (id) => {
  return db.roles.findOne({ where: { id } });
};

/**
 * Update role by id
 * @param {id} roleId
 * @param {Object} updateBody
 * @returns {Promise<Role>}
 */
const updateRoleById = async (roleId, updateBody) => {
  const role = await getRoleById(roleId);
  if (!role) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Role not found');
  }
  Object.assign(role, updateBody);
  await db.roles.update(role.dataValues, { where: { id: roleId } });
  return role;
};

/**
 * Delete role by id
 * @param {id} roleId
 * @returns {Promise<Role>}
 */
const deleteRoleById = async (roleId) => {
  const role = await getRoleById(roleId);
  if (!role) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Role not found');
  }
  await db.roles.destroy({ where: { id: roleId } });
  return role;
};

module.exports = {
  createRole,
  getAllRoles,
  getRoleById,
  updateRoleById,
  deleteRoleById,
};
