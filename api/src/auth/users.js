import HttpResponse from '../helpers/response';
import database from '../db/pgConnect';
import literalErrors from '../errors/stringLiterals';
import Logger from '../helpers/logger';
// import templateErrors from '../errors/templateLiterals';
// import test from '../helpers/regex';
import Queries from '../queries/users';
//  import jwt from '../helpers/jwt';
import Bcrypt from '../helpers/bcrypt';

const { err400Res, err404Res } = new HttpResponse();
const { authSignup, authSignin } = Queries;
const { queryOneOrNone } = database;
const { displayErrors } = Logger;
const { compare } = Bcrypt;
const { userExists, userNotExists, wrongPassword } = literalErrors;

class UserAuth {
  constructor() {
    this.authSignup = this.authSignup.bind(this);
    this.verifyPassword = this.verifyPassword.bind(this);
    this.authSignin = this.authSignin.bind(this);
  }

  async authSignup({ body }, res, next) {
    try {
      const { username, email } = body;
      const newUser = await queryOneOrNone(authSignup(), [email, username]);
      if (newUser) return err400Res(res, userExists());
      this.signupNext = next();
      return this.signupNext;
    } catch (error) {
      return displayErrors(error);
    }
  }

  async authSignin({ body }, res, next) {
    try {
      const { user } = body;
      this.verifyUser = await queryOneOrNone(authSignin(), [user]);
      if (!this.verifyUser) return err404Res(res, userNotExists());
      return next();
    } catch (error) {
      return displayErrors(error);
    }
  }

  async verifyPassword({ body }, res, next) {
    const { password } = body;
    const { verifyUser } = this;
    try {
      const verifyPassword = await compare(verifyUser.password, password);
      if (!verifyPassword) return err400Res(res, wrongPassword());
      return next();
    } catch (error) {
      return displayErrors(error);
    }
  }
}

export default new UserAuth();
