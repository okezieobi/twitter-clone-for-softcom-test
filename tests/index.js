import 'core-js/stable';
import 'regenerator-runtime/runtime';
import chai, {
  expect,
} from 'chai';
import chaiHttp from 'chai-http';
import app from '../api/src';
import pool from '../api/src/db/pgConnect';
import seeder from '../api/src/seeders/seeder';
import token from '../api/src/helpers/jwt';

class Test {
  constructor() {
    this.returnRandomValue = this.returnRandomValue.bind(this);
    this.createEmailVarChar = this.createEmailVarChar.bind(this);
  }

  static deleteData() {
    return seeder.deleteAll;
  }

  static users() {
    return seeder.users.insertData;
  }

  static tweetsOrReplies() {
    return seeder.tweetsOrReplies.insertData;
  }

  static generateToken(id = 0) {
    return token.generate(id);
  }

  static getRandomArrayIndex(array = []) {
    return Math.floor(Math.random() * array.length);
  }

  returnRandomValue(...values) {
    return values[this.constructor.getRandomArrayIndex(values)];
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

  createEmailVarChar(userLength = 0, domainLength = 0) {
    return `${this.constructor.createVarChars(userLength)}@${this.constructor.createVarChars(domainLength)}.${this.constructor.createVarChars(3)}`;
  }
}

require('./users/signup');
require('./users/signin');
require('./tweetsOrReplies/createTweet');
require('./tweetsOrReplies/getTweetsByUserId');
require('./tweetsOrReplies/createTweetReply');
require('./follows/createFollow');

export {
  expect,
  chai,
  chaiHttp,
  app,
  pool,
  Test,
};
