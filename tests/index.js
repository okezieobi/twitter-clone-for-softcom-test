import 'core-js/stable';
import 'regenerator-runtime/runtime';
import chai, {
  expect,
} from 'chai';
import chaiHttp from 'chai-http';
import app from '../api/src';
import userModel from '../api/src/models/users';
import TemplateErrors from '../api/src/errors/templateLiterals';
import { tweetModel, tweetReplyModel } from '../api/src/models/tweetOrReplies';
import { userSeeds, tweetReplySeeds, tweetSeeds } from '../mocks';
import token from '../api/src/utils/jwt';

const { consoleError } = TemplateErrors;

class Test {
  static async deleteData() {
    try {
      await tweetReplyModel.deleteMany();
      await tweetModel.deleteMany();
      await userModel.deleteMany();
    } catch (error) {
      consoleError();
    }
  }

  static async seedUsers() {
    try {
      await userModel.create(userSeeds);
    } catch (error) {
      consoleError(error);
    }
  }

  static async seedTweets() {
    try {
      await tweetModel.create(tweetSeeds);
    } catch (error) {
      consoleError(error);
    }
  }

  static async seedTweetReplies() {
    try {
      tweetReplyModel.create(tweetReplySeeds);
    } catch (error) {
      consoleError(error);
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
require('./users/signin');
require('./tweetsOrReplies/createTweet');
/*
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
