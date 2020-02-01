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

  static generateToken(id) {
    return token.generate(id);
  }

  static getRandomArrayIndex(array) {
    return Math.floor(Math.random() * array.length);
  }

  returnRandomValue(...values) {
    return values[this.constructor.getRandomArrayIndex(values)];
  }

  static createVarChars(length) {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    for (let charIndex = 0; charIndex < length; charIndex += 1) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }

  createEmailVarChar(userLength, domainLength) {
    return `${this.constructor.createVarChars(userLength)}@${this.constructor.createVarChars(domainLength)}.${this.constructor.createVarChars(3)}`;
  }
}

require('./users/signup');

export {
  expect,
  chai,
  chaiHttp,
  app,
  pool,
  Test,
};