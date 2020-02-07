import database from '../db/pgConnect';
import Token from '../helpers/jwt';
import followController from './follows';
import HttpResponse from '../helpers/response';
import Models from '../models/users';
import UserQueries from '../queries/users';
import Logger from '../helpers/logger';

const { auth200Res, auth201Res } = new HttpResponse();
const { requestData, responseData } = Models;
const { createClient } = UserQueries;
const { displayErrors } = Logger;
const { generate } = Token;
const { queryOne } = database;

class UserController {
  constructor() {
    this.addUser = this.addUser.bind(this);
    this.sendAuthRes = this.sendAuthRes.bind(this);
  }

  async addUser({ body }, res) {
    try {
      const arrayData = requestData(body);
      this.newUser = await queryOne(createClient(), arrayData);
      const { id } = this.newUser;
      return auth201Res(res, responseData(this.newUser), generate(id));
    } catch (error) {
      return displayErrors(error);
    }
  }

  sendAuthRes(req, res) {
    const { registeredUserWithFollows } = followController;
    const { id } = registeredUserWithFollows;
    this.res = res;
    return auth200Res(this.res, responseData(registeredUserWithFollows), generate(id));
  }
}

export default new UserController();
