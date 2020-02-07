import HttpResponse from '../helpers/response';
import IndexValidator from './index';
import TestRequest from '../helpers/testReq';

const { checkStringTypeRequest } = new IndexValidator();
const { validateVarChar } = new TestRequest();
const { err400Res } = new HttpResponse();

export default class FollowValidator {
  static validateUsername({ body: { username = '' } }, res, next) {
    const followIdErr = checkStringTypeRequest(username, 'Username', validateVarChar);
    const resErr = followIdErr ? err400Res(res, followIdErr) : next();
    return resErr;
  }
}
