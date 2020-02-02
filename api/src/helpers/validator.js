import validator from 'validator';

const {
  isEmail, isNumeric, isInt, isLength, isJWT,
} = validator;

export default class Patterns {
  static validateEmail(email = '') {
    return isEmail(email) && isLength(email, { max: 128 });
  }

  static validatePassword(password = '') {
    return isLength(password, { min: 8, max: 128 });
  }

  static checkCharLength(char = '', length = 0) {
    return isLength(char, { max: length });
  }

  static checkVarChar(varChar = '') {
    return this.checkCharLength(varChar, 128);
  }

  static checkNumber(number = '') {
    return isNumeric(number);
  }

  static checkInteger(integer = '') {
    return isInt(integer);
  }

  static checkJWT(jwt = '') {
    return isJWT(jwt);
  }

  static checkTweetOrReply(tweetOrReply = '') {
    return this.checkCharLength(tweetOrReply, 280);
  }
}
