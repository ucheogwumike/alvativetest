/* eslint-disable prettier/prettier */
const request = require('supertest');
const faker = require('faker');
const httpStatus = require('http-status');
const httpMocks = require('node-mocks-http');
const moment = require('moment');
const bcrypt = require('bcryptjs');
const app = require('../../src/app');
const config = require('../../src/config/config');
const auth = require('../../src/middlewares/auth');
const { tokenService, emailService } = require('../../src/services');
const ApiError = require('../../src/utils/ApiError');
const setupTestDB = require('../utils/setupTestDB');
const { User, Token } = require('../../src/models');
const { roleRights } = require('../../src/config/roles');
const { tokenTypes } = require('../../src/config/tokens');
// const { userOne, admin, insertUsers } = require('../fixtures/user.fixture');
const { campaignOne, insertCampaigns } = require('../fixtures/campaign.fixture');
const { userOneAccessToken, adminAccessToken } = require('../fixtures/token.fixture');
const { TestScheduler } = require('jest');


setupTestDB();

describe('campaign routes', () => {
  describe('POST /v1/campaigns', () => {
    let newCampaign;
    beforeEach(() => {
      newCampaign = {
        title: "Man united need a striker",
        target: 1000000,
        location: "Lagos",
        description: "Ronaldo is 37 and Martial can not run",
        images: "gibberish",
        accountNum: "0246923456",
        accountName: "j'ai besoin d'aide sil te plait",
        bankName: "GTB",
        launchDate:"2022-11-03",
        endDate: "2022-11-13"
      };
    });

    test('should return 201 upon a successful campaign creation', async () => {
      // await request(app).post('/v1/campaigns').send(newCampaign).expect(httpStatus.CREATED);
      await insertCampaigns([campaignOne]);
      const res = await request(app).post('/v1/campaigns').send(newCampaign).expect(httpStatus.CREATED);

      expect(res.body).toEqual({
                id: expect.anything(),
                title: newCampaign.title,
                target:newCampaign.target ,
                location:newCampaign.location,
                description: newCampaign.description,
                images: newCampaign.images,
                accountNum: newCampaign.accountNum,
                accountName: newCampaign.accountName,
                bankName: newCampaign.bankName,
                launchDate:newCampaign.launchDate,
                endDate: newCampaign.endDate,
                createdAt: expect.anything(),
                updatedAt: expect.anything()

                
              });
    });
  });


  describe('GET /v1/campaigns',()=>{
    test('should return 200', async () =>{
        await request(app)
        .get('/v1/campaigns')
        .send()
        .expect(httpStatus.OK);

    })
})

  describe('GET /v1/campaigns/:campaignId', () => {
    test('should return 200 and the campaign object if data is ok', async () => {
      // await insertUsers([userOne]);

       await request(app)
        .get(`/v1/campaigns/${campaignOne._id}`)
        .send()
        .expect(httpStatus.OK);

    //   expect(res.body).not.toHaveProperty('password');
    //   expect(res.body).toEqual({
    //     id: userOne._id.toHexString(),
    //     email: userOne.email,
    //     name: userOne.name,
    //     role: userOne.role,
    //     isEmailVerified: userOne.isEmailVerified,
    //   });
    });

    
  });

});


    

