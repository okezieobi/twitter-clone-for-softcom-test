import UserValidator from '../data/users';
import UserAuth, { singletonUserAuth } from '../auth/users';
import MiddlewareHelper from './middleware';

const { validatePassword, verifySignup, verifySignin } = UserValidator;
const { authSignup } = UserAuth;
const { authSignin, verifyPassword } = singletonUserAuth;
const { routeCallbacks } = MiddlewareHelper;

export default class UserMiddleware {
  static signup() {
    return routeCallbacks(verifySignup, validatePassword, authSignup);
  }

  static signin() {
    return routeCallbacks(verifySignin, validatePassword, authSignin, verifyPassword);
  }
}
