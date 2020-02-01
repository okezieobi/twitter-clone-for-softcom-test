import UserValidator from '../data/users';
import userAuth from '../auth/users';
import MiddlewareHelper from './middleware';
import userController from '../controllers/users';

const { validatePassword, verifySignup } = new UserValidator();
const { authSignup } = userAuth;
const { addUser } = userController;
const { routeCallbacks } = MiddlewareHelper;

export default class UserMiddleware {
  static signup() {
    return routeCallbacks(verifySignup, validatePassword,
      authSignup, addUser);
  }

  /*
  static signin() {
    const { verifySignin, validatePassword } = UserValidator;
    const { authSignin, verifyPassword } = UserAuth;
    return MiddlewareHelper.routeCallbacks(verifySignin, validatePassword,
      authSignin, verifyPassword);
  }
  */
}
