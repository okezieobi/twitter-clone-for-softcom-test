import { singletonUserAuth } from '../auth/users';
import UserValidator from '../data/users';
import MiddlewareHelper from './middleware';
import FollowAuth from '../auth/follows';

const { verifyFollow } = FollowAuth;
const { validateToken, validateRegisteredUser } = UserValidator;
const { authenticateAll, verifyToken, getUserByUsernameOrEmail } = singletonUserAuth;
const { routeCallbacks } = new MiddlewareHelper();

export default class FollowMiddleware {
  static createFollow() {
    return routeCallbacks(validateRegisteredUser, validateToken,
      verifyToken, authenticateAll, getUserByUsernameOrEmail, verifyFollow);
  }
}
