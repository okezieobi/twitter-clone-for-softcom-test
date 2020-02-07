import validator from 'validator';

const {
  isEmail, isInt, isLength, isJWT,
} = validator;

export default class Patterns {
  static validateEmail(email = '') {
    return isEmail(email || String(email)) && isLength(email || String(email), { max: 128 });
  }

  static validatePassword(password = '') {
    return isLength(password || String(password), { min: 8, max: 128 });
  }

  static checkCharLength(char = '', length = 0) {
    return isLength(char || String(char), { max: length });
  }

  static checkVarChar(varChar = '') {
    return this.checkCharLength(varChar, 128);
  }

  /*
  static checkNumber(number = '') {
    return isNumeric(number || String(number)) && parseInt(number || String(number), 10) >= 0;
  }
  */

  static checkInteger(integer = '') {
    return isInt(integer || String(integer)) && parseInt(integer || String(integer), 10) >= 0;
  }

  static checkJWT(jwt = '') {
    return isJWT(jwt || String(jwt));
  }

  static checkTweetOrReply(tweetOrReply = '') {
    return this.checkCharLength(tweetOrReply, 280);
  }
}
