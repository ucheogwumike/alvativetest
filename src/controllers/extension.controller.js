/* eslint-disable prettier/prettier */
const httpStatus = require('http-status');
// const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { extensionService } = require('../services');

const createExtension = catchAsync(async (req, res) => {
  const extension = await extensionService.createExtension(req.body);
  res.status(httpStatus.CREATED).send(extension);
});

const getExtensions = catchAsync(async (req, res) => {
  // const filter = pick(req.query, ['name', 'role']);
  // const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const result = await extensionService.queryExtensions();
  res.send(result);
});

const getExtensionById = catchAsync(async (req, res) => {
  const extension = await extensionService.getExtensionById(req.params.extensionId);
  if (!extension) {
    throw new ApiError(httpStatus.NOT_FOUND, 'extension not found');
  }
  res.send(extension);
});

const updateExtension = catchAsync(async (req, res) => {
  const extension = await extensionService.updateExtensionById(req.params.extensionId, req.body);
  res.send(extension);
});

const deleteExtension = catchAsync(async (req, res) => {
  await extensionService.deleteExtensionById(req.params.extensionId);
  res.status(httpStatus.NO_CONTENT).send();
});

module.exports = {
  createExtension,
  getExtensions,
  getExtensionById,
  updateExtension,
  deleteExtension,
};
