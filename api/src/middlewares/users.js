import UserValidator from '../data/users';
import userAuth from '../auth/users';
import MiddlewareHelper from './middleware';
import userController from '../controllers/users';

const { validatePassword, verifySignup, verifySignin } = new UserValidator();
const { authSignup, authSignin, verifyPassword } = userAuth;
const { addUser } = userController;
const { routeCallbacks } = MiddlewareHelper;

export default class UserMiddleware {
  static signup() {
    return routeCallbacks(verifySignup, validatePassword,
      authSignup, addUser);
  }

  static signin() {
    return routeCallbacks(verifySignin, validatePassword,
      authSignin, verifyPassword);
  }
}