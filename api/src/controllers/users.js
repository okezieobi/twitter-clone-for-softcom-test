import database from '../db/pgConnect';
import Token from '../helpers/jwt';
import authenticateUsers from '../auth/users';
import HttpResponse from '../helpers/response';
import Models from '../models/users';
import Queries from '../queries/users';
import Logger from '../helpers/logger';

const { auth200Res, auth201Res } = new HttpResponse();
const { requestData, responseData } = Models;
const { createClient } = Queries;
const { displayErrors } = Logger;
const { generate } = Token;
const { queryOne } = database;

class UserController {
  constructor() {
    this.addUser = this.addUser.bind(this);
    this.sendAuthResponse = this.sendAuthResponse.bind(this);
  }

  async addUser({ body }, res, next) {
    const arrayData = requestData(body);
    try {
      this.newUser = await queryOne(createClient(), arrayData);
      return next();
    } catch (error) {
      return displayErrors(error);
    }
  }

  sendAuthResponse(req, res) {
    const { newUser } = this;
    const { verifyUser } = authenticateUsers;
    try {
      if (verifyUser) {
        const signInRes = responseData(verifyUser);
        const signinToken = generate(verifyUser.id);
        auth200Res(res, signInRes, signinToken);
      } else {
        const signUpRes = responseData(newUser);
        const signupToken = generate(newUser.id);
        auth201Res(res, signUpRes, signupToken);
      }
    } catch (error) {
      throw displayErrors(error);
    }
  }
}

export default new UserController();
