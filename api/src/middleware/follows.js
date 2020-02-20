import UserAuth from '../auth/users';
import UserValidator from '../data/users';
import MiddlewareHelper from './middleware';
import FollowAuth from '../auth/follows';

const { verifyFollow } = FollowAuth;
const { validateToken, validateRegisteredUser } = UserValidator;
const { authenticateAll, verifyToken, getUserByUsernameOrEmail } = UserAuth;
const { routeCallbacks } = MiddlewareHelper;

export default class FollowMiddleware {
  static createFollow() {
    return routeCallbacks(validateRegisteredUser, validateToken,
      verifyToken, authenticateAll, getUserByUsernameOrEmail, verifyFollow);
  }
}
