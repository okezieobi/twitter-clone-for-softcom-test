import TestRequest from '../helpers/testReq';

const { getFalseValue, validateRequestStringType } = TestRequest;

export default class Validators {
  constructor() {
    this.checkStringTypeRequest = this.checkStringTypeRequest.bind(this);
  }

  static validateRequest(prop, propTitle, patternTest, dataTypeTest) {
    const falseError = getFalseValue(prop, propTitle);
    if (falseError) return falseError;
    const typeErr = dataTypeTest(prop, propTitle);
    if (typeErr) return typeErr;
    return patternTest(prop, propTitle);
  }

  checkStringTypeRequest(prop, propTitle, patternTest) {
    return this.constructor.validateRequest(prop, propTitle,
      patternTest, validateRequestStringType);
  }
}
