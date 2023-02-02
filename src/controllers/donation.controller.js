const httpStatus = require('http-status');
const request = require('request');
// const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const banks = require('../utils/banks');
// const { userService } = require('../services');
const { donationService, campaignService, receipiantService } = require('../services');
// const { Console } = require('winston/lib/winston/transports');
const { initializePayment, verifyPayment, getBanks, transferrecipient, payout,finalizeTransfer } = require('../config/paystack')(request);
const logger = require('../config/logger');

const createDonation = catchAsync(async (req, res) => {
  // const donation = await donationService.createDonation(req.body);
  // const form = _.pick(req.body,[‘amount’,’email’,’full_name’]);
  const donationdata = req.body;
  donationdata.amount *= 100;

  donationdata.metadata = {
    donorName: donationdata.donorName,
    campaignId: donationdata.campaignId,
  };
  console.log(donationdata);
  const peace = await initializePayment(donationdata);
  // console.log(peace);
  res.send(peace.data);
  // initializePayment(donationdata, async (error, body) => {
  //   if (error) {
  //     // handle errors
  //     console.log(error);
  //     return;
  //   }
  //   const response = JSON.parse(body);
  //   logger.info(body);
  //   res.send(response.data.authorization_url);
  //   logger.info(response.data.authorization_url);
  //   //  response.data.authorization_url;
  //   // res.send(response.data);
  // });
  // await donationService.createDonation(req.body);
  // res.status(httpStatus.CREATED).send(donation);
  // res.status(httpStatus.CREATED).send(x);
});

const paystackCallback = catchAsync(async (req, res) => {
  const ref = req.query.reference;
  verifyPayment(ref, async (error, body) => {
    if (error) {
      logger.info(error);
      return res.redirect('/error');
    }
    const response = await JSON.parse(body);
    logger.info(body);
    const donationdata = {
      donorName: response.data.metadata.donorName,
      email: response.data.customer.email,
      amount: response.data.amount,
      campaignId: response.data.metadata.campaignId,
      reference: response.data.reference,
    };
    const donation = await donationService.createDonation(donationdata);
    res.redirect(`/v1/donations/${donation.id}`);
    // const donation = await donationService.createDonation(donationdata);
    // if (donation) {
    //   res.redirect(await donationService.getDonationById(donationdata.id));
    // }
  });
});

/*
const getUsers = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['name', 'role']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const result = await userService.queryUsers(filter, options);
  res.send(result);
});
*/

const getDonations = catchAsync(async (req, res) => {
  // const filter = pick(req.query, ['name', 'role']);
  // const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const result = await donationService.queryDonations();
  res.send(result);
});

const getDonationById = catchAsync(async (req, res) => {
  const donation = await donationService.getDonationById(req.params.donationId);
  if (!donation) {
    throw new ApiError(httpStatus.NOT_FOUND, 'donation not found');
  }
  res.send(donation);
});

const updateDonation = catchAsync(async (req, res) => {
  const donation = await donationService.updateDonationById(req.params.donationId, req.body);
  res.send(donation);
});

const deleteDonation = catchAsync(async (req, res) => {
  await donationService.deleteDonationById(req.params.donationId);
  res.status(httpStatus.NO_CONTENT).send();
});

const getDonationByDate = catchAsync(async (req, res) => {
  const donation = await donationService.queryDonationsByDate(req.params.start, req.params.end);
  if (!donation) {
    throw new ApiError(httpStatus.NOT_FOUND, 'donation not found');
  }
  res.send(donation);
});

const getBanksList = catchAsync(async (req, res) => {
  const localBank = 'Guaranty Trust Bank';

  const lbanks = await banks.filter((bank) => {
    return bank.name === localBank;
  });
  res.send(lbanks);
  // const p = await getBanks(localBank, async (error, body) => {
  //    // console.log('yes');
  //   const response = await JSON.parse(body);
  //   // const banks = response.data.map((bank) => {
  //   //   return bank.name;
  //   // });
  //   const banks = await response.data.filter((bank) => {
  //     return bank.name === localBank;
  //   });
  //   // console.log(response);
  //   // console.log()
  //   res.send(response);
  //   console.log()
  //   return banks[0].code;
  // });
  // await setTimeout(() => {
  //   console.log(p);
  //   // return p;
  // }, 10000);
  // console.log('flower');
});

const withdrawFromCampaign = catchAsync(async (req, res) => {
  const campaign = await campaignService.getCampaignById(req.params.id);
  if (!campaign) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Campaign not found');
  }
  let receipiant = await receipiantService.getReceipiantByCampaignId(campaign.dataValues.id);
  if (!receipiant) {
    throw new ApiError(httpStatus.NOT_FOUND, 'you do not qualify to withdraw');
  }
  payout(req.body, async (error, body) => {
    if (error) {
      // handle errors
      console.log(error);
      return;
    }
    const response = JSON.parse(body);
    console.log(body);
    res.send(response);
  });
});

const payReceipiant = catchAsync(async (req, res) => {
  payout(req.body, async (error, body) => {
    if (error) {
      // handle errors
      console.log(error);
      return;
    }
    const response = JSON.parse(body);
    console.log(body);
    res.send(response);
  });
});

const payfinalize = catchAsync(async (req, res) => {
  finalizeTransfer(req.body, async (error, body) => {
    if (error) {
      // handle errors
      console.log(error);
      return;
    }
    const response = JSON.parse(body);
    console.log(body);
    res.send(response);
  });
});

module.exports = {
  createDonation,
  getDonations,
  getDonationById,
  updateDonation,
  deleteDonation,
  getDonationByDate,
  paystackCallback,
  getBanksList,
  withdrawFromCampaign,
  payReceipiant,
  payfinalize,
};
