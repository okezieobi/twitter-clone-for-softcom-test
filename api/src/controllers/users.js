import database from '../db/pgConnect';
import Token from '../helpers/jwt';
import { singletonUserAuth } from '../auth/users';
import HttpResponse from '../helpers/response';
import Models from '../models/users';
import UserQueries from '../queries/users';
import FollowQueries from '../queries/follows';
import Logger from '../helpers/logger';

const { auth200Res, auth201Res } = new HttpResponse();
const { requestData, responseData } = Models;
const { createClient } = UserQueries;
const { getFollows } = FollowQueries;
const { displayErrors } = Logger;
const { generate } = Token;
const { queryOne, pool } = database;

class UserController {
  constructor() {
    this.addUser = this.addUser.bind(this);
    this.getFollows = this.getFollows.bind(this);
  }

  async addUser({ body }, res) {
    const arrayData = requestData(body);
    try {
      this.newUser = await queryOne(createClient(), arrayData);
      const { id } = this.newUser;
      return auth201Res(res, responseData(this.newUser), generate(id));
    } catch (error) {
      return displayErrors(error);
    }
  }

  async getFollows(req, res) {
    const { registeredUser } = singletonUserAuth;
    const { id } = registeredUser;
    try {
      this.follows = await getFollows(pool, id);
      const { followings, followers } = this.follows;
      registeredUser.followings = followings;
      registeredUser.followers = followers;
      return auth200Res(res, responseData(registeredUser), generate(id));
    } catch (error) {
      return displayErrors(error);
    }
  }
}

export default new UserController();
