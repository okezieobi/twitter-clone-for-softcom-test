import HttpResponse from '../helpers/response';
import database from '../db/pgConnect';
import literalErrors from '../errors/stringLiterals';
import Logger from '../helpers/logger';
import templateErrors from '../errors/templateLiterals';
import Validator from '../helpers/validator';
import Queries from '../queries/users';
import Jwt from '../helpers/jwt';
import Bcrypt from '../helpers/bcrypt';
import TestRequest from '../helpers/testReq';

const { err400Res, err404Res } = new HttpResponse();
const { authSignup, authSignin, findUserById } = Queries;
const { queryOneOrNone } = database;
const { displayErrors } = Logger;
const { compare } = Bcrypt;
const {
  userExists, userNotExists, wrongPassword, tokenIsRequired, wrongToken,
} = literalErrors;
const { verify } = Jwt;
const { validateJWT } = new TestRequest();
const { checkInteger } = Validator;
const { notInteger } = templateErrors;

class UserAuth {
  constructor() {
    this.authSignup = this.authSignup.bind(this);
    this.verifyPassword = this.verifyPassword.bind(this);
    this.authSignin = this.authSignin.bind(this);
    this.validateToken = this.validateToken.bind(this);
    this.verifyToken = this.verifyToken.bind(this);
    this.authenticateAll = this.authenticateAll.bind(this);
  }

  async authSignup({ body: { username = '', email = '' } }, res, next) {
    try {
      const newUser = await queryOneOrNone(authSignup(), [email, username]);
      if (newUser) return err400Res(res, userExists());
      this.signupNext = next();
      return this.signupNext;
    } catch (error) {
      return displayErrors(error);
    }
  }

  async authSignin({ body: { user = '' } }, res, next) {
    try {
      this.verifyUser = await queryOneOrNone(authSignin(), [user]);
      if (!this.verifyUser) return err404Res(res, userNotExists());
      return next();
    } catch (error) {
      return displayErrors(error);
    }
  }

  async verifyPassword({ body: { password = '' } }, res, next) {
    const { verifyUser } = this;
    try {
      const verifyPassword = await compare(verifyUser.password, password);
      if (!verifyPassword) return err400Res(res, wrongPassword());
      return next();
    } catch (error) {
      return displayErrors(error);
    }
  }

  validateToken({ headers: { token = '' } }, res, next) {
    if (!token) return err400Res(res, tokenIsRequired());
    const tokenErr = validateJWT(token);
    if (tokenErr) return err400Res(res, tokenErr);
    this.token = token;
    return next();
  }

  async verifyToken(req, res, next) {
    const { token } = this;
    const { userId, message, name } = await verify(token);
    if (name || message) return err400Res(res, { name, message }); // jwt error
    const checkId = checkInteger(userId);
    if (!checkId) return err400Res(res, notInteger('Id from token'));
    this.userId = userId;
    return next();
  }

  async authenticateAll(req, res, next) {
    const { userId } = this;
    try {
      this.findUser = await queryOneOrNone(findUserById(), [userId]);
      if (!this.findUser) return err404Res(res, wrongToken());
      return next();
    } catch (error) {
      return displayErrors(error);
    }
  }
}

export default new UserAuth();
