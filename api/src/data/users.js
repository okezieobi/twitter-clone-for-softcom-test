import protocol from '../helpers/response';
import testRequest from '../helpers/testReq';

class UserValidator {
  constructor() {
    this.verifySignup = this.verifySignup.bind(this);
    this.validatePassword = this.validatePassword.bind(this);
    // this.verifySignin = this.verifySignin.bind(this);
    this.validateRequest = this.validateRequest.bind(this);
  }

  verifySignup({ body }, res, next) {
    const {
      fullName, email, username,
    } = body;
    const fullNameFalseErr = testRequest.getFalseValue(fullName, 'Full name');
    const emailFalseErr = testRequest.getFalseValue(email, 'Email');
    const usernameFalseErr = testRequest.getFalseValue(username, 'Username');
    this.findFalseErr = testRequest.findError(fullNameFalseErr, emailFalseErr, usernameFalseErr);
    if (this.findFalseErr) return protocol.err400Res(res, this.findFalseErr);
    const fullNameErrTest = testRequest.validateVarChar(fullName, 'Full name');
    const emailErrTest = testRequest.validateEmail(email);
    const usernameErrTest = testRequest.validateVarChar(username, 'Username');
    const findErrTest = testRequest.findError(fullNameErrTest, emailErrTest, usernameErrTest);
    if (findErrTest) return protocol.err400Res(res, findErrTest);
    return next();
  }

  validateRequest(prop, propTitle, patternTest) {
    this.falseError = testRequest.getFalseValue(prop, propTitle);
    if (this.falseError) return this.falseError;
    return testRequest[patternTest](prop, propTitle);
  }

  validatePassword({ body }, res, next) {
    const { password } = body;
    const passwordErr = this.validateRequest(password, 'Password', 'validatePassword');
    if (passwordErr) protocol.err400Res(res, passwordErr);
    else next();
  }

  /*
  verifySignin({ body }, res, next) {
    const { user } = body;
    const userErr = this.validateRequest(user, 'Email or username', 'validateVarChar');
    if (userErr) protocol.err400Res(res, userErr);
    else next();
  }
  */
}

export default new UserValidator();
