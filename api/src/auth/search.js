import SearchHelper from '../helpers/search';
import ExtendedErrs from '../errors/extended';

const { searchUsers, searchTweetsOrReplies } = SearchHelper;
const { noSearchResults } = ExtendedErrs;

export default class SearchAuth {
  static async getUserSearch({ body: { search = '' } }, res, next) {
    try {
      res.locals.userSearchRes = await searchUsers(search);
      next();
    } catch (error) {
      next(error);
    }
  }

  static async getTweetOrReplySearch({ body: { search = '' } }, res, next) {
    try {
      const { tweetSearchRes, tweetReplySearchRes } = await searchTweetsOrReplies(search);
      res.locals.tweetSearchRes = tweetSearchRes;
      res.locals.tweetReplySearchRes = tweetReplySearchRes;
      next();
    } catch (error) {
      next(error);
    }
  }

  static checkSearchResult({ body: { search = '' } }, { locals: { userSearchRes, tweetSearchRes, tweetReplySearchRes } }, next) {
    try {
      if (userSearchRes.length > 0 || tweetSearchRes.length > 0 || tweetReplySearchRes.length > 0) {
        next();
      } else {
        throw new ExtendedErrs(404, noSearchResults(search));
      }
    } catch (error) {
      next(error);
    }
  }
}
