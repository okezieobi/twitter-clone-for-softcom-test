import HttpResponse from '../helpers/response';
import database from '../db/pgConnect';
import Logger from '../helpers/logger';
import templateErrors from '../errors/templateLiterals';
import Queries from '../queries/follows';
import { singletonUserAuth } from './users';

const { err400Res } = new HttpResponse();
const { findFollow } = Queries;
const { queryOneOrNone } = database;
const { dataFound } = templateErrors;
const { displayErrors } = Logger;

export default class FollowAuth {
  static async verifyFollow(req, res, next) {
    const { authUser, verifiedUser } = singletonUserAuth;
    const { username } = authUser;
    if (verifiedUser.id === authUser.id) return err400Res(res, `${username} can not follow self`);
    try {
      const authFollow = await queryOneOrNone(findFollow(), verifiedUser.id);
      if (authFollow) return err400Res(res, dataFound('Following'));
      return next();
    } catch (error) {
      return displayErrors(error);
    }
  }
}

const singletonFollowAuth = new FollowAuth();

export {
  singletonFollowAuth,
};
