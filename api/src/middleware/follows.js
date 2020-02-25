import UserAuth from '../auth/users';
import UserValidator from '../guard/users';
import MiddlewareHelper from './middleware';
import FollowAuth from '../auth/follows';
import FollowValidator from '../guard/follow';

const { verifyFollow } = FollowAuth;
const { validateFollow } = FollowValidator;
const { validateToken } = UserValidator;
const { authenticateAll, verifyToken, getUserByUsernameOrEmail } = UserAuth;
const { routeCallbacks } = MiddlewareHelper;

export default class FollowMiddleware {
  static createFollow() {
    return routeCallbacks(validateFollow, validateToken,
      verifyToken, authenticateAll, getUserByUsernameOrEmail, verifyFollow);
  }
}
