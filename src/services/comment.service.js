const httpStatus = require('http-status');
const ApiError = require('../utils/ApiError');
const { db } = require('../models');

/**
 * Create a comment
 * @param {Object} commentBody
 * @returns {Promise<Object>}
 */
const createComment = async (commentBody) => {
  return db.comments.create(commentBody);
};

/**
 * @param none
 * @returns {Promise<Result>}
 */
const getAllComments = async () => {
  const comments = await db.comments.findAll();
  return comments;
};

/**
 * Get comment by id
 * @param {id} id
 * @returns {Promise<Comment>}
 */
const getCommentById = async (id) => {
  return db.comments.findOne({ where: { id } });
};

/**
 * Update comment by id
 * @param {id} commentId
 * @param {Object} updateBody
 * @returns {Promise<Comment>}
 */
const updateCommentById = async (commentId, updateBody) => {
  const comment = await getCommentById(commentId);
  if (!comment) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Comment not found');
  }
  Object.assign(comment, updateBody);
  await db.comments.update(comment.dataValues, { where: { id: commentId } });
  return comment;
};

/**
 * Delete comment by id
 * @param {id} commentId
 * @returns {Promise<Comment>}
 */
const deleteCommentById = async (commentId) => {
  const comment = await getCommentById(commentId);
  if (!comment) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Comment not found');
  }
  await db.comments.destroy({ where: { id: commentId } });
  return comment;
};

module.exports = {
  createComment,
  getAllComments,
  getCommentById,
  updateCommentById,
  deleteCommentById,
};
