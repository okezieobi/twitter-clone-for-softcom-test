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

  static returnRandomValue(...values) {
    return values[this.getRandomArrayIndex(values)];
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

  static createEmailVarChar(userLength, domainLength) {
    return `${this.createVarChars(userLength)}@${this.createVarChars(domainLength)}.${this.createVarChars(3)}`;
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
