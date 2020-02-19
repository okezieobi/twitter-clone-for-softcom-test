import Validator from './validator';
import TemplateErrors from '../errors/templateLiterals';
import LiteralErrors from '../errors/stringLiterals';

const { isRequired, isStringType } = TemplateErrors;

export default class Requests {
  constructor() {
    this.validateEmail = this.validateEmail.bind(this);
    this.validatePassword = this.validatePassword.bind(this);
    this.validateVarChar = this.validateVarChar.bind(this);
    this.validateInteger = this.validateInteger.bind(this);
    this.validateNumber = this.validateNumber.bind(this);
    this.validateJWT = this.validateJWT.bind(this);
    this.validateTweetOrReply = this.validateTweetOrReply.bind(this);
  }

  static findError(...errorList) {
    return errorList.find((error) => error);
  }

  static getFalseValue(request, requestTitle) {
    const err = !request ? isRequired(requestTitle) : false;
    return err;
  }

  static validateRequestStringType(request, requestTitle) {
    const err = typeof request !== 'string' ? isStringType(requestTitle) : false;
    return err;
  }

  static validateWithTests(request, test, testError, requestTitle) {
    let err;
    if (!Validator[test](request)) {
      err = requestTitle ? TemplateErrors[testError](requestTitle) : LiteralErrors[testError]();
    }
    return err;
  }

  validateEmail(email) {
    return this.constructor.validateWithTests(email, 'validateEmail', 'notEmail');
  }

  validatePassword(password) {
    return this.constructor.validateWithTests(password, 'validatePassword', 'notPassword');
  }

  validateJWT(jwt) {
    return this.constructor.validateWithTests(jwt, 'checkJWT', 'notJWT');
  }

  validateObjectId(id) {
    return this.contructor.validateWithTests(id, 'checkObjectId', 'notObjectId');
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

  validateTweetOrReply(tweet, replyOrTweet) {
    return this.constructor.validateWithTests(tweet, 'checkTweetOrReply', 'notTweetOrReply', replyOrTweet);
  }
}
