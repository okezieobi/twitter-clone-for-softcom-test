/* eslint-disable no-console */
import HttpResponse from '../helpers/response';
import database from '../db/pgConnect';
import literalErrors from '../errors/stringLiterals';
import Jwt from '../helpers/jwt';
import Queries from '../queries/users';
import Bcrypt from '../helpers/bcrypt';
import Validator from '../helpers/validator';
import TemplateErrors from '../errors/templateLiterals';

const { err400Res, err404Res } = new HttpResponse();
const {
  findUserWithEmailOrUsername, getUserByUsernameAndEmail, findUserById,
} = Queries;
const { queryOneOrNone } = database;
const { compare } = Bcrypt;
const {
  userExists, userNotExists, wrongPassword, wrongToken,
} = literalErrors;
const { verify } = Jwt;
const { checkInteger } = Validator;
const { notInteger } = TemplateErrors;

export default class UserAuth {
  constructor() {
    this.verifyPassword = this.verifyPassword.bind(this);
    this.getUserByUsernameOrEmail = this.getUserByUsernameOrEmail.bind(this);
    this.authenticateAll = this.authenticateAll.bind(this);
    this.verifyToken = this.verifyToken.bind(this);
  }

  static async findUserWithEmailOrUsername({ body: { username = '', email = '' } }, res, next) {
    try {
      const newUser = await queryOneOrNone(findUserWithEmailOrUsername(), [email, username]);
      const signupNext = newUser ? err400Res(res, userExists()) : next();
      return signupNext;
    } catch (err) {
      return console.error(err);
    }
  }

  async getUserByUsernameOrEmail({ body: { user = '' } }, res, next) {
    try {
      this.registeredUser = await queryOneOrNone(getUserByUsernameAndEmail(), [user]);
      const resErr = this.registeredUser ? next() : err404Res(res, userNotExists());
      return resErr;
    } catch (err) {
      return console.error(err);
    }
  }

  verifyPassword({ body: { password = '' } }, res, next) {
    const { registeredUser } = this;
    const verifyPassword = compare(registeredUser.password, password);
    const resErr = verifyPassword ? next() : err400Res(res, wrongPassword());
    return resErr;
  }

  verifyToken({ headers: { token = '' } }, res, next) {
    const { userId, message, name } = verify(token);
    if (name || message) return err400Res(res, { name, message }); // jwt err
    const checkId = checkInteger(userId);
    if (checkId) {
      this.userId = userId;
      return next();
    }
    return err400Res(res, notInteger('Id from token'));
  }

  async authenticateAll(req, res, next) {
    try {
      const { userId } = this;
      this.authUser = await queryOneOrNone(findUserById(), [userId]);
      const resErr = this.authUser ? next() : err404Res(res, wrongToken());
      return resErr;
    } catch (err) {
      return console.error(err);
    }
  }
}

const singletonUserAuth = new UserAuth();

export {
  singletonUserAuth,
};
