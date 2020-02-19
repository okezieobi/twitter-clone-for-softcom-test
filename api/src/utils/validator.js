import validator from 'validator';
import { isValidObjectId, Schema } from 'mongoose';

const {
  isEmail, isInt, isLength, isJWT,
} = validator;
const { Types: { ObjectId } } = Schema;

export default class Patterns {
  static checkForString(data) {
    this.checkStringResult = typeof data === 'string' ? data : String(data);
    return this.checkStringResult;
  }

  static validateEmail(email = '') {
    return isEmail(Patterns.checkForString(email))
    && this.checkCharLength(Patterns.checkForString(email), 128);
  }

  static validatePassword(password = '') {
    return isLength(Patterns.checkForString(password), { min: 8, max: 128 });
  }

  static checkCharLength(char = '', length = 0) {
    return isLength(Patterns.checkForString(char), { max: length });
  }

  static checkVarChar(varChar = '') {
    return this.checkCharLength(varChar, 128);
  }

  /*
   checkNumber(number = '') {
    return isNumeric(number || String(number)) && parseInt(number || String(number), 10) >= 0;
  }
  */

  static checkInteger(integer = '') {
    return isInt(Patterns.checkForString(integer))
    && parseInt(Patterns.checkForString(integer), 10) >= 0;
  }

  static checkJWT(jwt = '') {
    return isJWT(Patterns.checkForString(jwt));
  }

  static checkObjectId(id) {
    return !!(String(new ObjectId(id)) === id && isValidObjectId(id));
  }

  static checkTweetOrReply(tweetOrReply = '') {
    return this.checkCharLength(tweetOrReply, 280);
  }
}
