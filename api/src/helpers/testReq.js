import regex from './validator';
import templateErrors from '../errors/templateLiterals';
import literalErrors from '../errors/stringLiterals';

class Requests {
  findError(...errorList) {
    this.filteredError = errorList.find((error) => error);
    return this.filteredError;
  }

  getFalseValue(request, requestTitle) {
    if (!request) this.falseError = templateErrors.isRequired(requestTitle);
    return this.falseError;
  }

  validateWithTests(request, test, testError, requestTitle = undefined) {
    if (!regex[test](request) && !requestTitle) {
      this.testError = literalErrors[testError]();
    } else if (!regex[test](request) && requestTitle) {
      this.testError = templateErrors[testError](requestTitle);
    }
    return this.testError;
  }

  validateEmail(email) {
    return this.validateWithTests(email, 'validateEmail', 'notEmail');
  }

  validatePassword(password) {
    return this.validateWithTests(password, 'validatePassword', 'notPassword');
  }

  validateVarChar(chars, charTitle) {
    return this.validateWithTests(chars, 'checkVarChar', 'notVarChar', charTitle);
  }

  validateNumber(number, numberTitle) {
    return this.validateWithTests(number, 'checkNumber', 'notNumber', numberTitle);
  }

  validateInteger(integer, integerTitle) {
    return this.validateWithTests(integer, 'checkInteger', 'notInteger', integerTitle);
  }
}

export default new Requests();
