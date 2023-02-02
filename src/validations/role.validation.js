const Joi = require('joi');

const createRole = {
  body: Joi.object().keys({
    name: Joi.string().required(),
    description: Joi.string().required(),
  }),
};

const getRole = {
  params: Joi.object().keys({
    roleId: Joi.string().required(),
  }),
};

const updateRole = {
  params: Joi.object().keys({
    roleId: Joi.required(),
  }),
  body: Joi.object().keys({
    name: Joi.string(),
    description: Joi.string(),
  }),
};

const deleteRole = {
  params: Joi.object().keys({
    roleId: Joi.string(),
  }),
};

module.exports = {
  createRole,
  getRole,
  updateRole,
  deleteRole,
};
