const httpStatus = require('http-status');
const request = require('request');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const banks = require('../utils/banks');
const special_bank = require('../utils/bankBong');
const { campaignService, receipiantService } = require('../services');
const { default: axios } = require('axios');
const { initializePayment, verifyPayment, getBanks, transferrecipient, payout, finalizeTransfer } =
  require('../config/paystack')(axios);

const createCampaign = catchAsync(async (req, res) => {
  const campaign = await campaignService.createCampaign(req.body);
  console.log(campaign.dataValues);
  const localBank = campaign.dataValues.bankName;

  const lbanks = await banks.filter((bank) => {
    return bank.name === localBank;
  });

  const receipiant = {};

  receipiant.type = lbanks[0].type; // 'nuban';
  receipiant.currency = lbanks[0].currency; // 'NGN';
  receipiant.account_number = campaign.dataValues.accountNum; // '0696132870';
  receipiant.name = campaign.dataValues.accountName; // 'Bong-shim Edward Uke';
  receipiant.bank_code = lbanks[0].code; // '063';
  receipiant.email = 'uchedesigns11@gmail.com';

  const x = await transferrecipient(receipiant);
  const rec = await receipiantService.createReceipiants({
    rec: x.data.data.recipient_code,
    campaignId: campaign.dataValues.id,
  });
  console.log(rec);
  res.send(x.data.data.recipient_code);

  // transferrecipient(receipiant, async (error, body) => {
  //   if (error) {
  //     // handle errors
  //     console.log(error);
  //     return;
  //   }
  //   const response = JSON.parse(body);
  //   const rec = await receipiantService.createReceipiants({
  //     rec: response.data.recipient_code,
  //     campaignId: campaign.dataValues.id,
  //   });
  //   const answer = {};
  //   answer.response = response;
  //   answer.campaign = campaign;
  //   answer.rec = rec;
  //   // res.send(response);
  //   // res.status(httpStatus.CREATED).json({ campaign }, { response });
  //   res.send(answer);
  // });
  // const receipiants = await receipiantService.createReceipiants({ rec: '', campaignId: campaign.id });
  // res.status(httpStatus.CREATED).send(campaign);
});

const campaignWithdrawal = catchAsync(async (req, res) => {
  // console.log(req);
  const receipiants = await receipiantService.getReceipiantByCampaignId(req.params.id);
  const campaign = await campaignService.getCampaignById(req.params.id);
  // console.log(receipiants[0]);
  // console.log(campaign);
  if (
    campaign.dataValues.amountReceived >= campaign.dataValues.target ||
    new Date(campaign.dataValues.endDate) < new Date()
  ) {
    // console.log(campaign.dataValues.amountReceived);
    const payment = req.body;
    // console.log(req.body);
    payment.recipient = receipiants[0].dataValues.rec;
    payment.amount = campaign.dataValues.amountReceived;
    console.log(payment.amount);
    payout(payment, async (error, body) => {
      if (error) {
        // handle errors
        console.log(error);
        return;
      }
      const response = JSON.parse(body);
      console.log(body);
      res.send(response);
    });
  }
 // res.send('error you do not qualify');
});

/*
const getUsers = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['name', 'role']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const result = await userService.queryUsers(filter, options);
  res.send(result);
});
*/
const getbanknames = catchAsync(async (req, res) => {
  const result = banks.map((bank) => {
    return bank.name;
  });
  res.send(result);
});

const getCampaigns = catchAsync(async (req, res) => {
  const result = await campaignService.queryCampaigns();
  res.send(result);
});

const getCampaignById = catchAsync(async (req, res) => {
  const campaign = await campaignService.getCampaignById(req.params.campaignId);
  if (!campaign) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Campaign not found');
  }
  res.send(campaign);
});

const updateCampaign = catchAsync(async (req, res) => {
  const campaign = await campaignService.updateCampaignById(req.params.campaignId, req.body);
  res.send(campaign);
});

const deleteCampaign = catchAsync(async (req, res) => {
  await campaignService.deleteCampaignById(req.params.campaignId);
  res.status(httpStatus.NO_CONTENT).send();
});

const deleteReceipiantsById = catchAsync(async (req, res) => {
  await receipiantService.deleteReceipiantsById(req.params.receipiantsId);
  res.status(httpStatus.NO_CONTENT).send();
});

const getAllReceipiants = catchAsync(async (req, res) => {
  const result = await receipiantService.getAllReceipiants();
  res.send(result);
});

const createReceipiant = catchAsync(async (req, res) => {
  const customer = req.body;
  if (customer.bankname) {
    const names = customer.bankname;
    // eslint-disable-next-line no-unused-expressions
    customer.bank_code = special_bank[`${names}`].code;
    console.log(customer.bank_code);
  }
  const receiver = await transferrecipient(customer);
  const arr = customer.name.toLowerCase().split(' ');
  const arr2 = receiver.data.data.details.account_name.toLowerCase().split(' ');
  console.log(arr);
  console.log(arr2);
  // eslint-disable-next-line no-plusplus
  if (arr2.includes(arr[0]) && arr2.includes(arr[1])) {
    const rec = await receipiantService.createReceipiants({
      rec: receiver.data.data.recipient_code,
    });
    res.send(rec);
  } else {
    throw new ApiError(httpStatus.NOT_FOUND, 'please make sure you have the correct first name and last name please try again');
  }
  // res.json({ error: 'please make sure you have the correct first name and last name please try again' });
});

const withdrawFromCampaign = catchAsync(async (req, res) => {
  const campaign = await campaignService.getCampaignById(req.params.campaignId);
  if (!campaign) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Campaign not found');
  }
  const receipiant = {};
  receipiant.type = 'nuban';
  receipiant.currency = 'NGN';
  receipiant.account_number = campaign.accountNum;
  receipiant.name = campaign.accountName;

  res.send(campaign);
});

module.exports = {
  createCampaign,
  getCampaigns,
  getCampaignById,
  updateCampaign,
  deleteCampaign,
  withdrawFromCampaign,
  campaignWithdrawal,
  createReceipiant,
  deleteReceipiantsById,
  getAllReceipiants,
  getbanknames,
};
