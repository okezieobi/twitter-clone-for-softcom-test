import ExtendedErrs from '../errors/extended';
import UserHelper from '../helpers/users';
import Jwt from '../utils/jwt';
import Bcrypt from '../utils/bcrypt';
import Validator from '../utils/validator';

const { compare } = Bcrypt;
const {
  userExists, userNotExists, wrongPassword, wrongToken,
} = new ExtendedErrs();
const { verify } = Jwt;
const { checkObjectId } = Validator;
const { notObjectId } = ExtendedErrs;
const { findUserByEmailAndUsername, findUserById, getUserByUsernameOrEmail } = UserHelper;

export default class UserAuth {
  static async findUserWithEmailOrUsername({ body: { username = '', email = '' } }, res, next) {
    try {
      const newUser = await findUserByEmailAndUsername(username, email);
      if (newUser) throw new ExtendedErrs(400, userExists);
      next();
    } catch (error) {
      next(error);
    }
  }

  static async getUserByUsernameOrEmail({ body: { user = '' } }, res, next) {
    try {
      const registeredUser = await getUserByUsernameOrEmail(user);
      if (registeredUser) {
        res.locals.registeredUser = registeredUser;
        next();
      } else {
        throw new ExtendedErrs(404, userNotExists);
      }
    } catch (error) {
      next(error);
    }
  }

  static verifyPassword({ body: { password = '' } }, { locals: { registeredUser: { hashedPassword } } }, next) {
    const verifyPassword = compare(hashedPassword, password);
    if (verifyPassword) next();
    else throw new ExtendedErrs(400, wrongPassword);
  }

  static verifyToken({ headers: { token = '' } }, res, next) {
    const { userId } = verify(token);
    const checkId = checkObjectId(userId);
    if (checkId) {
      res.locals.userId = userId;
      next();
    } else {
      throw new ExtendedErrs(400, notObjectId('Id from token'));
    }
  }

  static async authenticateAll(req, res, next) {
    try {
      const { locals: { userId } } = res;
      const authUser = await findUserById(userId);
      if (authUser) {
        res.locals.authUser = authUser;
        next();
      } else {
        throw new ExtendedErrs(404, wrongToken);
      }
    } catch (error) {
      next(error);
    }
  }
}
