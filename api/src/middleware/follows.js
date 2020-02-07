import { singletonUserAuth } from '../auth/users';
import UserValidator from '../data/users';
import MiddlewareHelper from './middleware';
import FollowValidator from '../data/follows';
import FollowAuth from '../auth/follows';

const { verifyFollow } = FollowAuth;
const { validateToken } = UserValidator;
const { authenticateAll, verifyToken, authUsername } = singletonUserAuth;
const { routeCallbacks } = MiddlewareHelper;
const { validateUsername } = FollowValidator;

export default class FollowMiddleware {
  static createFollow() {
    return routeCallbacks(validateUsername, validateToken,
      verifyToken, authenticateAll, authUsername, verifyFollow);
  }
}
