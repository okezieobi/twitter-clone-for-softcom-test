import Validator from '../utils/validator';
import ExtendedErrs from '../errors/extended';

const {
  isRequired, isStringType,
  notObjectId, notVarChar, throwErr,
} = ExtendedErrs;
const { notEmail, notPassword, notJWT } = new ExtendedErrs();

const {
  validateEmail, validatePassword, checkJWT, checkObjectId, checkVarChar,
} = Validator;

export default class CheckRequests {
  static getFalseValue(request, requestTitle) {
    if (!request) throw new ExtendedErrs(400, isRequired(requestTitle));
  }

  static validateRequestStringType(request, requestTitle) {
    if (typeof request !== 'string') throw new ExtendedErrs(400, isStringType(requestTitle));
  }

  static validateWithTests(request, test, errMessage, requestTitle) {
    let err;
    if (!test(request)) {
      err = requestTitle ? errMessage(requestTitle) : errMessage;
    }
    if (err) throw new ExtendedErrs(400, err);
  }

  static validateEmail(email) {
    return CheckRequests.validateWithTests(email, validateEmail, notEmail);
  }

  static validatePassword(password) {
    return CheckRequests.validateWithTests(password, validatePassword, notPassword);
  }

  static validateJWT(jwt) {
    return CheckRequests.validateWithTests(jwt, checkJWT, notJWT);
  }

  static validateObjectId(id, objectIdTitle) {
    return CheckRequests.validateWithTests(id, checkObjectId, notObjectId, objectIdTitle);
  }

  static validateVarChar(chars, charTitle) {
    return CheckRequests.validateWithTests(chars, checkVarChar, notVarChar, charTitle);
  }

  /*
  validateNumber(number, numberTitle) {
    return this.constructor.validateWithTests(number, 'checkNumber', 'notNumber', numberTitle);
  }

  validateInteger(integer, integerTitle) {
    return this.constructor.validateWithTests(integer, 'checkInteger', 'notInteger', integerTitle);
  }
  */

  static validateRequest(prop, propTitle, patternTest, dataTypeTest) {
    try {
      CheckRequests.getFalseValue(prop, propTitle);
      dataTypeTest(prop, propTitle);
      patternTest(prop, propTitle);
    } catch (error) {
      throwErr(error);
    }
  }

  static checkStringTypeRequest(prop, propTitle, patternTest) {
    return CheckRequests.validateRequest(prop, propTitle,
      patternTest, CheckRequests.validateRequestStringType);
  }
}
