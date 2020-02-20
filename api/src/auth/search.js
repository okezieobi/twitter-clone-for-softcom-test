import HttpResponse from '../utils/response';
import SearchHelper from '../helpers/search';
import TemplateErrors from '../errors/templateLiterals';

const { err404Res } = new HttpResponse();
const { searchUsers, searchTweetsOrReplies } = SearchHelper;
const { noSearchResults, consoleError } = TemplateErrors;

export default class SearchAuth {
  static async getUserSearch({ body: { search = '' } }, res, next) {
    const { userSearchRes, name, message } = await searchUsers(search);
    if (name || message) consoleError({ name, message });
    else {
      res.locals.userSearchRes = userSearchRes;
      next();
    }
  }

  static async getTweetOrReplySearch({ body: { search = '' } }, res, next) {
    const {
      tweetSearchRes, tweetReplySearchRes, name, message,
    } = await searchTweetsOrReplies(search);
    if (name || message) consoleError({ name, message });
    else {
      res.locals.tweetSearchRes = tweetSearchRes;
      res.locals.tweetReplySearchRes = tweetReplySearchRes;
      next();
    }
  }

  static async checkSearchResult({ body: { search = '' } }, res, next) {
    const { locals: { userSearchRes, tweetSearchRes, tweetReplySearchRes } } = res;
    if (userSearchRes.length !== 0 || tweetSearchRes.length !== 0
      || tweetReplySearchRes.length !== 0) {
      next();
    } else {
      err404Res(res, noSearchResults(search));
    }
  }
}
