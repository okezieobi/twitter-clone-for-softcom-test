import validator from './validator';
import templateErrors from '../errors/templateLiterals';
import literalErrors from '../errors/stringLiterals';

export default class Requests {
  constructor() {
    this.validateEmail = this.validateEmail.bind(this);
    this.validatePassword = this.validatePassword.bind(this);
    this.validateVarChar = this.validateVarChar.bind(this);
    this.validateInteger = this.validateInteger.bind(this);
    this.validateNumber = this.validateNumber.bind(this);
  }

  static findError(...errorList) {
    return errorList.find((error) => error);
  }

  static getFalseValue(request, requestTitle) {
    let err;
    if (!request) err = templateErrors.isRequired(requestTitle);
    return err;
  }

  static validateWithTests(request, test, testError, requestTitle = undefined) {
    let err;
    if (!validator[test](request) && !requestTitle) {
      err = literalErrors[testError]();
    } else if (!validator[test](request) && requestTitle) {
      err = templateErrors[testError](requestTitle);
    }
    return err;
  }

  validateEmail(email) {
    return this.constructor.validateWithTests(email, 'validateEmail', 'notEmail');
  }

  validatePassword(password) {
    return this.constructor.validateWithTests(password, 'validatePassword', 'notPassword');
  }

  validateVarChar(chars, charTitle) {
    return this.constructor.validateWithTests(chars, 'checkVarChar', 'notVarChar', charTitle);
  }

  validateNumber(number, numberTitle) {
    return this.constructor.validateWithTests(number, 'checkNumber', 'notNumber', numberTitle);
  }

  validateInteger(integer, integerTitle) {
    return this.constructor.validateWithTests(integer, 'checkInteger', 'notInteger', integerTitle);
  }
}
