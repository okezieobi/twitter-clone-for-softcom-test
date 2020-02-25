import { Types } from 'mongoose';
import chai, {
  expect,
} from 'chai';
import chaiHttp from 'chai-http';
import app from '../api/src';
import userModel from '../api/src/models/users';
import { followerModel, followingModel } from '../api/src/models/follows';
import ExtendedErrs from '../api/src/errors/extended';
import { tweetModel, tweetReplyModel } from '../api/src/models/tweetOrReplies';
import {
  userSeeds, tweetReplySeeds, tweetSeeds, followSeeds,
} from '../mocks';
import token from '../api/src/utils/jwt';

const { consoleError } = ExtendedErrs;
const { ObjectId } = Types;

class Test {
  static async deleteData() {
    try {
      await tweetReplyModel.deleteMany();
      await tweetModel.deleteMany();
      await userModel.deleteMany();
      await followerModel.deleteMany();
      await followingModel.deleteMany();
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
      await tweetReplyModel.create(tweetReplySeeds);
    } catch (error) {
      consoleError(error);
    }
  }

  static async seedFollows() {
    try {
      await followerModel.create(followSeeds[1]);
      await followingModel.create(followSeeds[0]);
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


export {
  expect,
  chai,
  chaiHttp,
  app,
  Test,
  userSeeds,
  tweetSeeds,
  tweetReplySeeds,
  ObjectId,
};
