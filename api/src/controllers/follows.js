/* eslint-disable camelcase */
import database from '../db/pgConnect';
import { singletonUserAuth } from '../auth/users';
import HttpResponse from '../helpers/response';
import Logger from '../helpers/logger';
import Queries from '../queries/follows';

const { success200ResMessage } = new HttpResponse();
const { displayErrors } = Logger;
const { createFollow } = Queries;
const { pool } = database;

class FollowController {
  constructor() {
    this.addFollow = this.addFollow.bind(this);
  }

  async addFollow(req, res) {
    const { authUser, verifiedUser } = singletonUserAuth;
    this.followId = verifiedUser.id;
    const { id } = authUser;
    const { username } = verifiedUser;
    try {
      await createFollow(pool, [id, this.followId]);
      return success200ResMessage(res, `${username} successfully followed`);
    } catch (error) {
      return displayErrors(error);
    }
  }
}

export default new FollowController();
