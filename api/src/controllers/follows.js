/* eslint-disable camelcase */
import database from '../db/pgConnect';
import { singletonUserAuth } from '../auth/users';
import HttpResponse from '../helpers/response';
import Queries from '../queries/follows';
import Models from '../models/follows';

const { success201ResMessage } = new HttpResponse();
const { createFollow, getFollows } = Queries;
const { pool } = database;
const { prepareRequest } = Models;

class FollowController {
  constructor() {
    this.addFollow = this.addFollow.bind(this);
    this.getFollows = this.getFollows.bind(this);
  }

  async addFollow(req, res) {
    const { authUser, registeredUser } = singletonUserAuth;
    this.followId = registeredUser.id;
    const { username } = registeredUser;
    await createFollow(pool, prepareRequest(authUser.id, this.followId));
    return success201ResMessage(res, `${username} successfully followed`);
  }

  async getFollows(req, res, next) {
    const { registeredUser } = singletonUserAuth;
    this.retrievedFollows = await getFollows(pool, registeredUser.id);
    return next();
  }
}

export default new FollowController();
