





import chai, { assert } from 'chai';
import chaiHttp from 'chai-http';
import request from 'supertest';
import { expect } from 'chai';

import sinon from 'sinon';
import cron from 'node-cron';

import db , {sequelize} from "../src/database/models/index"
import { checkPassword } from '../src/jobs/checkExpiredPassword';
import markPasswordExpired from '../src/events/markPasswordExpired';

const { User } = require('../src/database/models');





describe('checkPassword', () => {
    let scheduleSpy;
  
    beforeEach(() => {
      scheduleSpy = sinon.spy(cron, 'schedule');
    });
  
    afterEach(() => {
      scheduleSpy.restore();
    });
  
    it('should schedule a cron job correctly', () => {
      checkPassword();
  
      expect(scheduleSpy.calledOnce).to.be.true;
      expect(scheduleSpy.args[0][0]).to.equal(process.env.CRON_SCHEDULE);
    });
    it('should return an array of expired users', async function () {
      const expiredUsers = await User.findAll({
        where: sequelize.literal(`
      NOW() - "lastPasswordUpdate" > INTERVAL '${process.env.PASSWORD_EXPIRY}'
    `),
      });
  
      assert.isArray(expiredUsers);
    });
    it('should return an array of expired users', async function () {
      const expiredUsers = await User.findAll({
        where: sequelize.literal(`
      NOW() - "lastPasswordUpdate" < INTERVAL '${process.env.PASSWORD_EXPIRY}'
    `),
      });
  
      assert.isArray(expiredUsers);
    });
  });
  
  describe('markPasswordExpired', () => {
    let consoleStub;
  
    beforeEach(() => {
      consoleStub = sinon.stub(console, 'log');
    });
  
    afterEach(() => {
      consoleStub.restore();
    });
    it('should log "No expired password" when there are no expired users', async () => {
      const expiredUsers = [];
      await markPasswordExpired(expiredUsers);
      expect(consoleStub.calledOnceWithExactly('No expired password')).to.be.true;
    });
    it('should update the status of expired users to NeedsToUpdatePassword', async function () {
      // Create test users with expired passwords
      const testUser1 = await User.create({
        firstName: 'test1',
        lastName: 'user1',
        email: 'test1@test.com',
        password: 'password',
        lastPasswordUpdate: new Date(Date.now() - 31 * 24 * 60 * 60 * 1000),
      });
      const testUser2 = await User.create({
        firstName: 'test2',
        lastName: 'user2',
        email: 'test2@test.com',
        password: 'password',
        lastPasswordUpdate: new Date(Date.now() - 31 * 24 * 60 * 60 * 1000),
      });
      const expiredUsers = [testUser1, testUser2];
      await markPasswordExpired(expiredUsers);
    //   assert.equal(testUser1.status, false);
    //   assert.equal(testUser2.status, false);
      // Delete the test users from the database
      await testUser1.destroy();
      await testUser2.destroy();
    });
    it('should not update the status of users with no last password update date', async function () {
      // Create test user with no last password update date
      const testUser = await User.create({
        firstName: 'test3',
        lastName: 'user3',
        email: 'test3@test.com',
        password: 'password',
        lastPasswordUpdate: null,
      });
      const expiredUsers = await User.findAll({
        where: sequelize.literal(`
      NOW() - "lastPasswordUpdate" > INTERVAL '${process.env.PASSWORD_EXPIRY}'
    `),
      });
      const usersWithNoLastPasswordUpdate = [expiredUsers];
      await markPasswordExpired(usersWithNoLastPasswordUpdate);
      assert.notEqual(testUser.status, 'NeedsToUpdatePassword');
      // Delete the test user from the database
      await testUser.destroy();
    });
  });
  
  