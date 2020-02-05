import HttpResponse from '../helpers/response';
import database from '../db/pgConnect';
import literalErrors from '../errors/stringLiterals';
import Logger from '../helpers/logger';
import Jwt from '../helpers/jwt';
import Queries from '../queries/users';
import Bcrypt from '../helpers/bcrypt';
import Validator from '../helpers/validator';
import TemplateErrors from '../errors/templateLiterals';

const { err400Res, err404Res } = new HttpResponse();
const { authSignup, authSignin, findUserById } = Queries;
const { queryOneOrNone } = database;
const { displayErrors } = Logger;
const { compare } = Bcrypt;
const {
  userExists, userNotExists, wrongPassword, wrongToken,
} = literalErrors;
const { verify } = Jwt;
const { checkInteger } = Validator;
const { notInteger } = TemplateErrors;

class UserAuth {
  constructor() {
    this.authSignup = this.authSignup.bind(this);
    this.verifyPassword = this.verifyPassword.bind(this);
    this.authSignin = this.authSignin.bind(this);
    this.authenticateAll = this.authenticateAll.bind(this);
    this.verifyToken = this.verifyToken.bind(this);
  }

  async authSignup({ body: { username = '', email = '' } }, res, next) {
    try {
      const newUser = await queryOneOrNone(authSignup(), [email, username]);
      this.signupNext = newUser ? err400Res(res, userExists()) : next();
      return this.signupNext;
    } catch (error) {
      return displayErrors(error);
    }
  }

  async authSignin({ body: { user = '' } }, res, next) {
    try {
      this.verifyUser = await queryOneOrNone(authSignin(), [user]);
      const resErr = this.verifyUser ? next() : err404Res(res, userNotExists());
      return resErr;
    } catch (error) {
      return displayErrors(error);
    }
  }

  async verifyPassword({ body: { password = '' } }, res, next) {
    const { verifyUser } = this;
    try {
      const verifyPassword = await compare(verifyUser.password, password);
      const resErr = verifyPassword ? next() : err400Res(res, wrongPassword());
      return resErr;
    } catch (error) {
      return displayErrors(error);
    }
  }

  verifyToken({ headers: { token = '' } }, res, next) {
    const { userId, message, name } = verify(token);
    if (name || message) return err400Res(res, { name, message }); // jwt error
    const checkId = checkInteger(userId);
    if (checkId) {
      this.userId = userId;
      return next();
    }
    return err400Res(res, notInteger('Id from token'));
  }

  async authenticateAll(req, res, next) {
    const { userId } = this;
    try {
      this.findUser = await queryOneOrNone(findUserById(), [userId]);
      const resErr = this.findUser ? next() : err404Res(res, wrongToken());
      return resErr;
    } catch (error) {
      return displayErrors(error);
    }
  }
}

export default new UserAuth();
