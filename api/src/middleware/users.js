import UserValidator from '../data/users';
import UserAuth, { singletonUserAuth } from '../auth/users';
import MiddlewareHelper from './middleware';
import followController from '../controllers/follows';

const { validatePassword, validateNewUser, validateRegisteredUser } = UserValidator;
const { findUserWithEmailOrUsername } = UserAuth;
const { getUserByUsernameOrEmail, verifyPassword } = singletonUserAuth;
const { routeCallbacks } = MiddlewareHelper;
const { getFollows } = followController;

export default class UserMiddleware {
  static signup() {
    return routeCallbacks(validateNewUser, validatePassword, findUserWithEmailOrUsername);
  }

  static signin() {
    return routeCallbacks(validateRegisteredUser, validatePassword,
      getUserByUsernameOrEmail, verifyPassword, getFollows);
  }
}
