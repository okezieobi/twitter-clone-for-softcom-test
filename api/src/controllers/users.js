/* eslint-disable no-console */
import database from '../db/pgConnect';
import Token from '../helpers/jwt';
import followController from './follows';
import HttpResponse from '../helpers/response';
import Models from '../models/users';
import UserQueries from '../queries/users';
import { singletonUserAuth } from '../auth/users';

const { auth200Res, auth201Res } = new HttpResponse();
const { prepareRequest, prepareResponse } = Models;
const { createClient } = UserQueries;
const { generate } = Token;
const { queryOne } = database;

class UserController {
  constructor() {
    this.addUser = this.addUser.bind(this);
    this.sendAuthRes = this.sendAuthRes.bind(this);
  }

  async addUser({ body }, res) {
    try {
      this.newUser = await queryOne(createClient(), prepareRequest(body));
      return auth201Res(res, prepareResponse(this.newUser), generate(this.newUser.id));
    } catch (err) {
      return console.error(err);
    }
  }

  sendAuthRes(req, res) {
    try {
      const { retrievedFollows: { followers, followings } } = followController;
      const { registeredUser } = singletonUserAuth;
      registeredUser.followings = followings;
      registeredUser.followers = followers;
      this.authRes = auth200Res(res, prepareResponse(registeredUser), generate(registeredUser.id));
      return this.authRes;
    } catch (err) {
      return console.error(err);
    }
  }
}

export default new UserController();
