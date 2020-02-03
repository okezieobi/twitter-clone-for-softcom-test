import HttpResponse from '../helpers/response';
import TestRequest from '../helpers/testReq';
import IndexValidator from './index';

const { findError } = TestRequest;
const {
  validateEmail, validateVarChar, validatePassword,
} = new TestRequest();
const { err400Res } = new HttpResponse();
const { checkStringTypeRequest } = new IndexValidator();

export default class UserValidator {
  static verifySignup({ body: { fullName = '', email = '', username = '' } }, res, next) {
    const fullNameErr = checkStringTypeRequest(fullName, 'Full name', validateVarChar);
    const emailErr = checkStringTypeRequest(email, 'Email', validateEmail);
    const usernameErr = checkStringTypeRequest(username, 'Username', validateVarChar);
    const findErr = findError(fullNameErr, emailErr, usernameErr);
    if (findErr) return err400Res(res, findErr);
    return next();
  }

  static validatePassword({ body: { password = '' } }, res, next) {
    const passwordErr = checkStringTypeRequest(password, 'Password', validatePassword);
    if (passwordErr) err400Res(res, passwordErr);
    else next();
  }

  static verifySignin({ body: { user = '' } }, res, next) {
    const userErr = checkStringTypeRequest(user, 'Email or username', validateVarChar);
    if (userErr) err400Res(res, userErr);
    else next();
  }
}
