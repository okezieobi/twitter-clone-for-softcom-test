import { singletonUserAuth } from '../auth/users';
import UserValidator from '../data/users';
import MiddlewareHelper from './middleware';
import SearchValidator from '../data/search';
import singletonSearchAuth from '../auth/search';

const { validateToken } = UserValidator;
const { authenticateAll, verifyToken } = singletonUserAuth;
const { routeCallbacks } = MiddlewareHelper;
const { validateSearch } = SearchValidator;
const { getSearches } = singletonSearchAuth;

export default class Searches {
  static createSearch() {
    return routeCallbacks(validateSearch, validateToken, verifyToken, authenticateAll, getSearches);
  }
}
