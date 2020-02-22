import TestRequest from '../utils/testReq';

const { getFalseValue, validateRequestStringType } = TestRequest;

export default class Validators {
  static validateRequest(prop, propTitle, patternTest, dataTypeTest) {
    const falseError = getFalseValue(prop, propTitle);
    if (falseError) return falseError;
    const typeErr = dataTypeTest(prop, propTitle);
    if (typeErr) return typeErr;
    return patternTest(prop, propTitle);
  }

  static checkStringTypeRequest(prop, propTitle, patternTest) {
    return Validators.validateRequest(prop, propTitle,
      patternTest, validateRequestStringType);
  }
}
