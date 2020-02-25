import IndexValidator from './index';
import ExtendedErrs from '../errors/extended';

const { tokenIsRequired } = new ExtendedErrs();
const {
  checkStringTypeRequest, validatePassword, validateVarChar, validateEmail, validateJWT,
} = IndexValidator;

export default class UserValidator {
  static validateNewUser({ body: { fullName = '', email = '', username = '' } }, res, next) {
    try {
      checkStringTypeRequest(fullName, 'Full name', validateVarChar);
      checkStringTypeRequest(email, 'Email', validateEmail);
      checkStringTypeRequest(username, 'Username', validateVarChar);
      next();
    } catch (error) {
      next(error);
    }
  }

  static validatePassword({ body: { password = '' } }, res, next) {
    try {
      checkStringTypeRequest(password, 'Password', validatePassword);
      next();
    } catch (error) {
      next(error);
    }
  }

  static validateRegisteredUser({ body: { user = '' } }, res, next) {
    try {
      checkStringTypeRequest(user, 'Email or username', validateVarChar);
      next();
    } catch (error) {
      next(error);
    }
  }

  static validateToken({ headers: { token = '' } }, res, next) {
    try {
      if (!token) throw new ExtendedErrs(400, tokenIsRequired);
      validateJWT(token);
      next();
    } catch (error) {
      next(error);
    }
  }
}
