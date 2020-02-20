import HttpResponse from '../utils/response';
import LiteralErrors from '../errors/stringLiterals';
import TemplateErrors from '../errors/templateLiterals';
import UserHelper from '../helpers/users';
import Jwt from '../utils/jwt';
import Bcrypt from '../utils/bcrypt';
import Validator from '../utils/validator';

const { err400Res, err404Res } = new HttpResponse();
const { compare } = Bcrypt;
const {
  userExists, userNotExists, wrongPassword, wrongToken, notObjectId,
} = LiteralErrors;
const { verify } = Jwt;
const { checkObjectId } = Validator;
const { consoleError } = TemplateErrors;
const { findUserByEmailAndUsername, findUserById, getUserByUsernameOrEmail } = UserHelper;

export default class UserAuth {
  static async findUserWithEmailOrUsername({ body: { username = '', email = '' } }, res, next) {
    const { newUser, name, message } = await findUserByEmailAndUsername(username, email);
    if (name || message) return consoleError({ name, message });
    const signupNext = newUser ? err400Res(res, userExists()) : next();
    return signupNext;
  }

  static async getUserByUsernameOrEmail({ body: { user = '' } }, res, next) {
    const { registeredUser, name, message } = await getUserByUsernameOrEmail(user);
    if (name || message) return consoleError({ name, message });
    if (registeredUser) {
      res.locals.registeredUser = registeredUser;
      return next();
    }
    return err404Res(res, userNotExists());
  }

  static verifyPassword({ body: { password = '' } }, res, next) {
    const { locals: { registeredUser: { hashedPassword } } } = res;
    const verifyPassword = compare(hashedPassword, password);
    const resErr = verifyPassword ? next() : err400Res(res, wrongPassword());
    return resErr;
  }

  static verifyToken({ headers: { token = '' } }, res, next) {
    const { userId, message, name } = verify(token);
    if (name || message) return consoleError({ name, message }); // jwt err
    const checkId = checkObjectId(userId);
    if (checkId) {
      res.locals.userId = userId;
      return next();
    }
    return err400Res(res, notObjectId());
  }

  static async authenticateAll(req, res, next) {
    const { locals: { userId } } = res;
    const { authUser, name, message } = await findUserById(userId);
    if (name || message) return consoleError({ name, message });
    if (authUser) {
      res.locals.authUser = authUser;
      return next();
    }
    return err404Res(res, wrongToken());
  }
}
