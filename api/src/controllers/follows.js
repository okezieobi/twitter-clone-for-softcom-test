/* eslint-disable camelcase */
import database from '../db/pgConnect';
import { singletonUserAuth } from '../auth/users';
import HttpResponse from '../helpers/response';
import Logger from '../helpers/logger';
import Queries from '../queries/follows';

const { success200ResMessage } = new HttpResponse();
const { displayErrors } = Logger;
const { createFollow, getFollows } = Queries;
const { pool } = database;

class FollowController {
  constructor() {
    this.addFollow = this.addFollow.bind(this);
    this.getFollows = this.getFollows.bind(this);
  }

  async addFollow(req, res) {
    const { authUser, registeredUser } = singletonUserAuth;
    this.followId = registeredUser.id;
    const { id } = authUser;
    const { username } = registeredUser;
    try {
      await createFollow(pool, [id, this.followId]);
      return success200ResMessage(res, `${username} successfully followed`);
    } catch (error) {
      return displayErrors(error);
    }
  }

  async getFollows(req, res, next) {
    try {
      const { registeredUser } = singletonUserAuth;
      const { id } = registeredUser;
      const { followings, followers } = await getFollows(pool, id);
      registeredUser.followings = followings;
      registeredUser.followers = followers;
      this.registeredUserWithFollows = registeredUser;
      return next();
    } catch (error) {
      return displayErrors(error);
    }
  }
}

export default new FollowController();
