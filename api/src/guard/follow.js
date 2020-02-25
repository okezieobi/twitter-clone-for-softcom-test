import IndexValidator from './index';

const {
  checkStringTypeRequest, validateVarChar,
} = IndexValidator;

export default class FollowValidator {
  static validateFollow({ body: { user = '' } }, res, next) {
    checkStringTypeRequest(user, 'Full name or username', validateVarChar);
    next();
  }
}
