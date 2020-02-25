import IndexValidator from './index';

const { checkStringTypeRequest } = IndexValidator;

export default class SearchValidator {
  static validateSearch({ body: { search = '' } }, res, next) {
    try {
      checkStringTypeRequest(search, 'Search', this.validateVarChar);
      next();
    } catch (error) {
      next(error);
    }
  }
}
