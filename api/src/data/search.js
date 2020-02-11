import HttpResponse from '../helpers/response';
import IndexValidator from './index';
import TestRequest from '../helpers/testReq';

const { checkStringTypeRequest } = new IndexValidator();
const { validateVarChar } = new TestRequest();
const { err400Res } = new HttpResponse();

export default class SearchValidator {
  static validateSearch({ body: { search = '' } }, res, next) {
    const searchErr = checkStringTypeRequest(search, 'Search', validateVarChar);
    const resErr = searchErr ? err400Res(res, searchErr) : next();
    return resErr;
  }
}
