/* eslint-disable no-console */
import 'core-js/stable';
import 'regenerator-runtime/runtime';
import chai, {
  expect,
} from 'chai';
import chaiHttp from 'chai-http';
import app from '../api/src';
import userModel from '../api/src/models/users';
import { tweetModel, tweetReplyModel } from '../api/src/models/tweetOrReplies';
import { userSeeds, tweetReplySeeds, tweetSeeds } from '../api/src/seeders';
import token from '../api/src/utils/jwt';

class Test {
  static async deleteData() {
    try {
      await tweetReplyModel.deleteMany();
      await tweetModel.deleteMany();
      await userModel.deleteMany();
    } catch (error) {
      console.error();
    }
  }

  static async seedUsers() {
    try {
      await userModel.create(userSeeds);
    } catch (error) {
      console.error(error);
    }
  }

  static async seedTweets() {
    try {
      await tweetModel.create(tweetSeeds);
    } catch (error) {
      console.error(error);
    }
  }

  static async seedTweetReplies() {
    try {
      tweetReplyModel.create(tweetReplySeeds);
    } catch (error) {
      console.error(error);
    }
  }

  static generateToken(id = 0) {
    return token.generate(id);
  }

  static getRandomArrayIndex(array = []) {
    return Math.floor(Math.random() * array.length);
  }

  static returnRandomValue(...values) {
    return values[Test.getRandomArrayIndex(values)];
  }

  static createVarChars(length = 0) {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    for (let charIndex = 0; charIndex < length; charIndex += 1) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }

  static createEmailVarChar(userLength = 0, domainLength = 0) {
    return `${Test.createVarChars(userLength)}@${Test.createVarChars(domainLength)}.${Test.createVarChars(3)}`;
  }
}

require('./users/signup');
/*
require('./users/signin');
require('./tweetsOrReplies/createTweet');
require('./tweetsOrReplies/getTweetsByUserId');
require('./tweetsOrReplies/createTweetReply');
require('./follows/createFollow');
require('./search/createSearch');
*/

export {
  expect,
  chai,
  chaiHttp,
  app,
  Test,
};
