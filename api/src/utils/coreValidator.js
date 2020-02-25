import validator from 'validator';

const {
  isEmail, isLength, isJWT, isMongoId,
} = validator;

export default class Patterns {
  static checkForString(data) {
    Patterns.checkStringResult = typeof data === 'string' ? data : String(data);
    return Patterns.checkStringResult;
  }

  static validateEmail(email = '') {
    return isEmail(Patterns.checkForString(email))
    && Patterns.checkCharLength(Patterns.checkForString(email), 128);
  }

  static validatePassword(password = '') {
    return isLength(Patterns.checkForString(password), { min: 8, max: 128 });
  }

  static checkCharLength(char = '', length = 0) {
    return isLength(Patterns.checkForString(char), { max: length });
  }

  static checkVarChar(varChar = '') {
    return Patterns.checkCharLength(varChar, 128);
  }

  /*
   checkNumber(number = '') {
    return isNumeric(number || String(number)) && parseInt(number || String(number), 10) >= 0;
  }

  static checkInteger(integer = '') {
    return isInt(Patterns.checkForString(integer))
    && parseInt(Patterns.checkForString(integer), 10) >= 0;
  }
  */

  static checkJWT(jwt = '') {
    return isJWT(Patterns.checkForString(jwt));
  }

  static checkObjectId(id = '') {
    return isMongoId(Patterns.checkForString(id));
  }
}
