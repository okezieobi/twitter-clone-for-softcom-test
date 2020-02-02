import HttpResponse from '../helpers/response';
import TestRequest from '../helpers/testReq';
import IndexValidator from './index';

const { getFalseValue, findError } = TestRequest;
const {
  validateEmail, validateVarChar, validatePassword,
} = new TestRequest();
const { err400Res } = new HttpResponse();
const { validateRequest } = IndexValidator;

export default class UserValidator {
  static verifySignup({ body }, res, next) {
    const {
      fullName, email, username,
    } = body;
    const fullNameFalseErr = getFalseValue(fullName, 'Full name');
    const emailFalseErr = getFalseValue(email, 'Email');
    const usernameFalseErr = getFalseValue(username, 'Username');
    const findFalseErr = findError(fullNameFalseErr, emailFalseErr, usernameFalseErr);
    if (findFalseErr) return err400Res(res, findFalseErr);
    const fullNameErrTest = validateVarChar(fullName, 'Full name');
    const emailErrTest = validateEmail(email);
    const usernameErrTest = validateVarChar(username, 'Username');
    const findErrTest = findError(fullNameErrTest, emailErrTest, usernameErrTest);
    if (findErrTest) return err400Res(res, findErrTest);
    return next();
  }

  static validatePassword({ body }, res, next) {
    const { password } = body;
    const passwordErr = validateRequest(password, 'Password', validatePassword);
    if (passwordErr) err400Res(res, passwordErr);
    else next();
  }

  static verifySignin({ body }, res, next) {
    const { user } = body;
    const userErr = validateRequest(user, 'Email or username', validateVarChar);
    if (userErr) err400Res(res, userErr);
    else next();
  }
}
