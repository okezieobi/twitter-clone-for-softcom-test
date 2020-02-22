import HttpResponse from '../utils/response';

const { success200Res } = HttpResponse;

export default class SearchController {
  static sendResponse(req, res) {
    const { locals: { userSearchRes, tweetSearchRes, tweetReplySearchRes } } = res;
    return success200Res(res, { userSearchRes, tweetSearchRes, tweetReplySearchRes });
  }
}
