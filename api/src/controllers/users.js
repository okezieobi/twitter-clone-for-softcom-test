import database from '../db/pgConnect';
import Token from '../helpers/jwt';
import followController from './follows';
import HttpResponse from '../helpers/response';
import Models from '../models/users';
import UserQueries from '../queries/users';
import { singletonUserAuth } from '../auth/users';
import Logger from '../helpers/logger';

const { auth200Res, auth201Res } = new HttpResponse();
const { prepareRequest, prepareResponse } = Models;
const { createClient } = UserQueries;
const { generate } = Token;
const { queryOne } = database;
const { logErrors } = Logger;

class UserController {
  constructor() {
    this.addUser = this.addUser.bind(this);
    this.sendAuthRes = this.sendAuthRes.bind(this);
  }

  async addUser({ body }, res) {
    try {
      const arrayData = prepareRequest(body);
      this.newUser = await queryOne(createClient(), arrayData);
      const { id } = this.newUser;
      return auth201Res(res, prepareResponse(this.newUser), generate(id));
    } catch (error) {
      return logErrors(error);
    }
  }

  sendAuthRes(req, res) {
    try {
      const { retrievedFollows } = followController;
      const { followers, followings } = retrievedFollows;
      const { registeredUser } = singletonUserAuth;
      registeredUser.followings = followings;
      registeredUser.followers = followers;
      this.authRes = auth200Res(res, prepareResponse(registeredUser), generate(registeredUser.id));
      return this.authRes;
    } catch (error) {
      return logErrors(error);
    }
  }
}

export default new UserController();
