import validator from 'validator';

export default class Patterns {
  static validateEmail(email = '') {
    return validator.isEmail(email) && validator.isLength(email, { max: 128 });
  }

  static validatePassword(password = '') {
    return validator.isLength(password, { min: 8, max: 128 });
  }

  static checkVarChar(varChar = '') {
    return validator.isLength(varChar, { max: 128 });
  }

  static checkNumber(number = '') {
    return validator.isNumeric(number);
  }

  static checkInteger(integer = '') {
    return validator.isInt(integer);
  }
}
