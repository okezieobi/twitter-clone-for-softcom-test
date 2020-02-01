import HttpResponse from '../helpers/response';
import TestRequest from '../helpers/testReq';

const { getFalseValue, findError } = TestRequest;
const {
  validateEmail, validateVarChar, validatePassword,
} = new TestRequest();
const { err400Res } = new HttpResponse();

export default class UserValidator {
  constructor() {
    this.validatePassword = this.validatePassword.bind(this);
    this.verifySignup = this.verifySignup.bind(this);
  }

  verifySignup({ body }, res, next) {
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
    this.signupNext = next();
    return this.signupNext;
  }

  static validateRequest(prop, propTitle, patternTest) {
    const falseError = getFalseValue(prop, propTitle);
    if (falseError) return falseError;
    return patternTest(prop, propTitle);
  }

  validatePassword({ body }, res, next) {
    const { password } = body;
    const passwordErr = this.constructor.validateRequest(password, 'Password', validatePassword);
    if (passwordErr) err400Res(res, passwordErr);
    else next();
  }

  /*
  verifySignin({ body }, res, next) {
    const { user } = body;
    const userErr = this.validateRequest(user, 'Email or username', 'validateVarChar');
    if (userErr) Protocol.err400Res(res, userErr);
    else next();
  }
  */
}
