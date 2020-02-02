import TestRequest from '../helpers/testReq';

const { getFalseValue } = TestRequest;

export default class Validators {
  static validateRequest(prop, propTitle, patternTest) {
    const falseError = getFalseValue(prop, propTitle);
    if (falseError) return falseError;
    return patternTest(prop, propTitle);
  }
}
