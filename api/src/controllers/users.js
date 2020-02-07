import database from '../db/pgConnect';
import Token from '../helpers/jwt';
import followController from './follows';
import HttpResponse from '../helpers/response';
import Models from '../models/users';
import UserQueries from '../queries/users';
import Logger from '../helpers/logger';
import { singletonUserAuth } from '../auth/users';

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
    const { retrievedFollows } = followController;
    const { followers, followings } = retrievedFollows;
    const { registeredUser } = singletonUserAuth;
    registeredUser.followings = followings;
    registeredUser.followers = followers;
    this.authRes = auth200Res(res, responseData(registeredUser), generate(registeredUser.id));
    return this.authRes;
  }
}

export default new UserController();
