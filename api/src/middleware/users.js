import UserValidator from '../guard/users';
import UserAuth from '../auth/users';
import MiddlewareHelper from './middleware';
import followController from '../controllers/follows';

const { validatePassword, validateNewUser, validateRegisteredUser } = UserValidator;
const { findUserWithEmailOrUsername, getUserByUsernameOrEmail, verifyPassword } = UserAuth;
const { routeCallbacks } = MiddlewareHelper;
const { findFollows } = followController;

export default class UserMiddleware {
  static signup() {
    return routeCallbacks(validateNewUser, validatePassword, findUserWithEmailOrUsername);
  }

  static signin() {
    return routeCallbacks(validateRegisteredUser, validatePassword,
      getUserByUsernameOrEmail, verifyPassword, findFollows);
  }
}
