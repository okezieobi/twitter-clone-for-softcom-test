import HttpResponse from '../helpers/response';
import TestRequest from '../helpers/testReq';
import IndexValidator from './index';
import LiteralErrors from '../errors/stringLiterals';


const { findError } = TestRequest;
const {
  validateEmail, validateVarChar, validatePassword, validateJWT,
} = new TestRequest();
const { err400Res } = new HttpResponse();
const { checkStringTypeRequest } = new IndexValidator();

const { tokenIsRequired } = LiteralErrors;


export default class UserValidator {
  static validateNewUser({ body: { fullName = '', email = '', username = '' } }, res, next) {
    const fullNameErr = checkStringTypeRequest(fullName, 'Full name', validateVarChar);
    const emailErr = checkStringTypeRequest(email, 'Email', validateEmail);
    const usernameErr = checkStringTypeRequest(username, 'Username', validateVarChar);
    const findErr = findError(fullNameErr, emailErr, usernameErr);
    const resErr = findErr ? err400Res(res, findErr) : next();
    return resErr;
  }

  static validatePassword({ body: { password = '' } }, res, next) {
    const passwordErr = checkStringTypeRequest(password, 'Password', validatePassword);
    const resErr = passwordErr ? err400Res(res, passwordErr) : next();
    return resErr;
  }

  static validateRegisteredUser({ body: { user = '' } }, res, next) {
    const userErr = checkStringTypeRequest(user, 'Email or username', validateVarChar);
    const resErr = userErr ? err400Res(res, userErr) : next();
    return resErr;
  }

  static validateToken({ headers: { token = '' } }, res, next) {
    if (!token) return err400Res(res, tokenIsRequired());
    const validateToken = validateJWT(token);
    const resErr = validateToken ? err400Res(res, validateToken) : next();
    return resErr;
  }
}
