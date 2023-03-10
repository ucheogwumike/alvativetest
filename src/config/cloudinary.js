/* eslint-disable prettier/prettier */
const cloudinary = require('cloudinary');
require('dotenv').config();

cloudinary.v2.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// module.exports = cloudinary;

// eslint-disable-next-line no-unused-vars
exports.uploads = (file, folder) => {
  return new Promise((resolve) => {
    cloudinary.uploader.upload(file, (result) => {
      resolve({
        url: result.url,
      });
    });
  });
};
