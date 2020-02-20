import UserAuth from '../auth/users';
import UserValidator from '../rules/users';
import MiddlewareHelper from './middleware';
import SearchValidator from '../rules/search';
import SearchAuth from '../auth/search';

const { validateToken } = UserValidator;
const { authenticateAll, verifyToken } = UserAuth;
const { routeCallbacks } = MiddlewareHelper;
const { validateSearch } = SearchValidator;
const { getSearchResult, getUserSearch, getTweetOrReplySearch } = SearchAuth;

export default class Searches {
  static createSearch() {
    return routeCallbacks(validateSearch, validateToken, verifyToken,
      authenticateAll, getTweetOrReplySearch, getUserSearch, getSearchResult);
  }
}
