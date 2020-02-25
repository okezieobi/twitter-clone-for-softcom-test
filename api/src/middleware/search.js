import UserAuth from '../auth/users';
import UserValidator from '../guard/users';
import MiddlewareHelper from './middleware';
import SearchValidator from '../guard/search';
import SearchAuth from '../auth/search';

const { validateToken } = UserValidator;
const { authenticateAll, verifyToken } = UserAuth;
const { routeCallbacks } = MiddlewareHelper;
const { validateSearch } = SearchValidator;
const { checkSearchResult, getUserSearch, getTweetOrReplySearch } = SearchAuth;

export default class Searches {
  static createSearch() {
    return routeCallbacks(validateSearch, validateToken, verifyToken,
      authenticateAll, getTweetOrReplySearch, getUserSearch, checkSearchResult);
  }
}
