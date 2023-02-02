/* eslint-disable prettier/prettier */
// const { default: axios } = require('axios');
const request = require('request');
const axios = require('axios');

const paystack = () => {
  const MySecretKey = 'Bearer sk_test_b091455cbeeaf415db25e76603feb9d37be73689';
  // sk_test_xxxx to be replaced by your own secret key
  const initializePayment = (form) => {
    const option = {
      method:'post',
      url: 'https://api.paystack.co/transaction/initialize',
      headers: {
        authorization: MySecretKey,
        'content-type': 'application/json',
        'cache-control': 'no-cache',
      },
      data:form,
    };
    // const callback = (error, response, body) => {
    //   return mycallback(error, body);
    // };
   return axios(option);
  };
  const verifyPayment = (ref, mycallback) => {
    const option = {
      url: `https://api.paystack.co/transaction/verify/${  encodeURIComponent(ref)}`,
      headers: {
        authorization: MySecretKey,
        'content-type': 'application/json',
        'cache-control': 'no-cache',
      },
    };
    const callback = (error, response, body) => {
      return mycallback(error, body);
    };
    request(option, callback);
  };
  const transferrecipient =  (form)=>{
    const option = {
      method:'post',
      url:'https://api.paystack.co/transferrecipient',
      headers: {
        authorization: MySecretKey,
        'content-type': 'application/json',
        'cache-control': 'no-cache',
      },
      data:form,
    };
      return axios(option);
  }
  const payout = (form,mycallback)=>{
    const option = {
      url:'https://api.paystack.co/transfer',
      headers: {
        authorization: MySecretKey,
        'content-type': 'application/json',
        'cache-control': 'no-cache',
      },
      form,
    };const callback = (error, response, body) => {
      return mycallback(error, body);
    };
     request.post(option, callback);
  }
  const finalizeTransfer = (form,mycallback)=>{
    const option = {
      url:'https://api.paystack.co/transfer/finalize_transfer',
      headers: {
        authorization: MySecretKey,
        'content-type': 'application/json',
        'cache-control': 'no-cache',
      },
      form,
    };const callback = (error, response, body) => {
      return mycallback(error, body);
    };
    request.post(option, callback);
  }
  const getBanks = (localBanks, mycallback) => {
    const option = {
      url: `https://api.paystack.co/bank`,
      headers: {
        authorization: MySecretKey,
        // 'content-type': 'application/json',
        // 'cache-control': 'no-cache',
      },
    };
    const callback = (error, response, body) => {
      return mycallback(error, body);
    };
      request(option, callback);
  }
  return { initializePayment, verifyPayment, transferrecipient,getBanks,payout,finalizeTransfer};
};

module.exports = paystack;
