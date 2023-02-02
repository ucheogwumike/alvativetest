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
const { userOne, admin, insertUsers } = require('../fixtures/user.fixture');
const { userOneAccessToken, adminAccessToken } = require('../fixtures/token.fixture');
const { TestScheduler } = require('jest');

setupTestDB();

describe('Auth routes', () => {
  describe('POST /v1/auth/register', () => {
    let newUser;
    beforeEach(() => {
      newUser = {
        firstName: faker.name.findName(),
        lastName: faker.name.findName(),
        email: faker.internet.email().toLowerCase(),
        password: 'Password123',
      };
    });

    test('should return 201 upon a successful registration', async () => {
      await request(app).post('/v1/auth/register').send(newUser).expect(httpStatus.CREATED);
    });
  });
});
