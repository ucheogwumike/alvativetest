const Joi = require('joi');
// const { password, objectId } = require('./custom.validation');

const createComment = {
  body: Joi.object().keys({
    message: Joi.string().required(),
  }),
};

const getComment = {
  params: Joi.object().keys({
    commentId: Joi.string(),
  }),
};

const updateComment = {
  params: Joi.object().keys({
    commentId: Joi.required(),
  }),
  body: Joi.object().keys({
    message: Joi.string().required(),
  }),
};

const deleteComment = {
  params: Joi.object().keys({
    commentId: Joi.string(),
  }),
};

module.exports = {
  createComment,
  getComment,
  updateComment,
  deleteComment,
};
