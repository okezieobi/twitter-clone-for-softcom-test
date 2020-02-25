import IndexValidator from './index';

const { checkStringTypeRequest } = IndexValidator;

export default class SearchValidator {
  static validateSearch({ body: { search = '' } }, res, next) {
    checkStringTypeRequest(search, 'Search', this.validateVarChar);
    next();
  }
}
