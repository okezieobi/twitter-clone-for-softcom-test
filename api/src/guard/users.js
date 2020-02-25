import IndexValidator from './index';
import ExtendedErrs from '../errors/extended';

const { tokenIsRequired } = new ExtendedErrs();
const {
  checkStringTypeRequest, validatePassword, validateVarChar, validateEmail, validateJWT,
} = IndexValidator;

export default class UserValidator {
  static validateNewUser({ body: { fullName = '', email = '', username = '' } }, res, next) {
    checkStringTypeRequest(fullName, 'Full name', validateVarChar);
    checkStringTypeRequest(email, 'Email', validateEmail);
    checkStringTypeRequest(username, 'Username', validateVarChar);
    next();
  }

  static validatePassword({ body: { password = '' } }, res, next) {
    checkStringTypeRequest(password, 'Password', validatePassword);
    next();
  }

  static validateRegisteredUser({ body: { user = '' } }, res, next) {
    checkStringTypeRequest(user, 'Email or username', validateVarChar);
    next();
  }

  static validateToken({ headers: { token = '' } }, res, next) {
    if (!token) throw new ExtendedErrs(400, tokenIsRequired);
    validateJWT(token);
    next();
  }
}
