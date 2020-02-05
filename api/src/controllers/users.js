import database from '../db/pgConnect';
import Token from '../helpers/jwt';
import authenticateUsers from '../auth/users';
import HttpResponse from '../helpers/response';
import Models from '../models/users';
import UserQueries from '../queries/users';
import FollowQueries from '../queries/follows';
import Logger from '../helpers/logger';

const { auth200Res, auth201Res } = new HttpResponse();
const { requestData, responseData } = Models;
const { createClient } = UserQueries;
const { getFollows } = new FollowQueries();
const { displayErrors } = Logger;
const { generate } = Token;
const { queryOne, pool } = database;

class UserController {
  constructor() {
    this.addUser = this.addUser.bind(this);
    this.sendAuthResponse = this.sendAuthResponse.bind(this);
    this.getFollows = this.getFollows.bind(this);
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

  async getFollows(req, res, next) {
    const { registeredUser } = authenticateUsers;
    const { id } = registeredUser;
    try {
      const { followings, followers } = await getFollows(pool, id);
      registeredUser.followings = followings;
      registeredUser.followers = followers;
      this.getFollowsNext = next();
      return this.getFollowsNext;
    } catch (error) {
      return displayErrors(error);
    }
  }

  sendAuthResponse(req, res) {
    const { newUser } = this;
    const { registeredUser } = authenticateUsers;
    try {
      let response;
      if (registeredUser) {
        response = auth200Res(res, responseData(registeredUser), generate(registeredUser.id));
      } else {
        response = auth201Res(res, responseData(newUser), generate(newUser.id));
      }
      return response;
    } catch (error) {
      return displayErrors(error);
    }
  }
}

export default new UserController();
