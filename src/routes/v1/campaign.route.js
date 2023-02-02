const express = require('express');
const campaignController = require('../../controllers/campaign.controller');

const router = express.Router();

router.route('/').post(campaignController.createCampaign).get(campaignController.getCampaigns);
router.route('/receiver').post(campaignController.createReceipiant).get(campaignController.getAllReceipiants);
router.route('/receiver/:receipiantsId').delete(campaignController.deleteReceipiantsById);

router.route('/banks').get(campaignController.getbanknames);

router.route('/withdraw/:id').post(campaignController.campaignWithdrawal);

router
  .route('/:campaignId')
  .get(campaignController.getCampaignById)
  .patch(campaignController.updateCampaign)
  .delete(campaignController.deleteCampaign);

module.exports = router;
