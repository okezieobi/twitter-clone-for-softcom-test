import HttpResponse from '../helpers/response';
import database from '../db/pgConnect';
import literalErrors from '../errors/stringLiterals';
import Logger from '../helpers/logger';
// import templateErrors from '../errors/templateLiterals';
// import test from '../helpers/regex';
import Queries from '../queries/users';
//  import jwt from '../helpers/jwt';
// import bcrypt from '../helpers/bcrypt';

const { err400Res } = new HttpResponse();
const { authSignup } = Queries;
const { queryOneOrNone } = database;
const { displayErrors } = Logger;

class UserAuth {
  constructor() {
    this.authSignup = this.authSignup.bind(this);
    // this.verifyPassword = this.verifyPassword.bind(this);
    //  this.authSignin = this.authSignin.bind(this);
  }

  async authSignup({ body }, res, next) {
    try {
      const { username, email } = body;
      const newUser = await queryOneOrNone(authSignup(), [email, username]);
      if (newUser) return err400Res(res, literalErrors.userExists());
      this.signupNext = next();
      return this.signupNext;
    } catch (error) {
      return displayErrors(error);
    }
  }

  /*
  async authSignin({ body }, res, next) {
    try {
      const { user } = body;
      const findUserQuery = Queries.authSignin();
      this.verifyUser = await database.queryOneOrNone(findUserQuery, [user]);
      if (!this.verifyUser) return protocol.err404Res(res, literalErrors.userNotExists());
      return next();
    } catch (error) {
      return logger.displayErrors(error);
    }
  }

  async verifyPassword({ body }, res, next) {
    const { password } = body;
    const { verifyUser } = this;
    try {
      const verifyPassword = await bcrypt.compare(verifyUser.password, password);
      if (!verifyPassword) return protocol.err400Res(res, literalErrors.wrongPassword());
      return next();
    } catch (error) {
      return logger.displayErrors(error);
    }
  }
  */
}

export default new UserAuth();
