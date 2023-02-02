const express = require('express');
const authRoute = require('./auth.route');
const userRoute = require('./user.route');
const commentRoute = require('./comment.route');
const complaintRoute = require('./complaint.route');
const roleRoute = require('./role.route');
const permissionRoute = require('./permission.route');
const docsRoute = require('./docs.route');
const campaignRoute = require('./campaign.route');
const campaignImagesRoute = require('./campaignImages.route');
const donationRoute = require('./donation.route');
const extensionRoute = require('./extension.route');
// const userLogRoute = require('./user-logs.route');
// const withdrawHistory = require('./withdrawal-history.route');
const config = require('../../config/config');

const router = express.Router();

const defaultRoutes = [
  {
    path: '/auth',
    route: authRoute,
  },
  {
    path: '/users',
    route: userRoute,
  },
  {
    path: '/comments',
    route: commentRoute,
  },
  {
    path: '/complaints',
    route: complaintRoute,
  },
  {
    path: '/roles',
    route: roleRoute,
  },
  {
    path: '/permissions',
    route: permissionRoute,
  },
  {
    path: '/campaigns',
    route: campaignRoute,
  },
  {
    path: '/campaignImages',
    route: campaignImagesRoute,
  },
  {
    path: '/donations',
    route: donationRoute,
  },
  {
    path: '/extensions',
    route: extensionRoute,
  },
];

const devRoutes = [
  // routes available only in development mode
  // eslint-disable-next-line prettier/prettier
  {
    path: '/docs',
    route: docsRoute,
  },
];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

/* istanbul ignore next */
if (config.env === 'development') {
  devRoutes.forEach((route) => {
    router.use(route.path, route.route);
  });
}

module.exports = router;
