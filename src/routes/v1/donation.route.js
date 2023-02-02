const express = require('express');
// const auth = require('../../middlewares/auth');
// const validate = require('../../middlewares/validate');
// const userValidation = require('../../validations/user.validation');
const donationController = require('../../controllers/donation.controller');

const router = express.Router();

router.route('/').post(donationController.createDonation).get(donationController.getDonations);

router.route('/callback').get(donationController.paystackCallback);
router.route('/banks').get(donationController.getBanksList);
router.route('/payouts').post(donationController.payReceipiant);
router.route('/finalize').post(donationController.payfinalize);
router.route('/bankdetails/:id').post(donationController.withdrawFromCampaign);

router
  .route('/:donationId')
  .get(donationController.getDonationById)
  .patch(donationController.updateDonation)
  .delete(donationController.deleteDonation);

router.route('/:start/:end').get(donationController.getDonationByDate);
module.exports = router;
