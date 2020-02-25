import IndexValidator from './index';

const { checkStringTypeRequest, validateVarChar } = IndexValidator;

export default class SearchValidator {
  static validateSearch({ body: { search = '' } }, res, next) {
    checkStringTypeRequest(search, 'Search', validateVarChar);
    next();
  }
}
