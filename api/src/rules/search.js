import HttpResponse from '../utils/response';
import IndexValidator from './index';
import TestRequest from '../utils/testReq';

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
