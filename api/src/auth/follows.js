/* eslint-disable no-console */
import HttpResponse from '../helpers/response';
import database from '../db/pgConnect';
import templateErrors from '../errors/templateLiterals';
import Queries from '../queries/follows';
import { singletonUserAuth } from './users';

const { err400Res } = new HttpResponse();
const { findFollow } = Queries;
const { queryOneOrNone } = database;
const { dataFound, followSelf } = templateErrors;

export default class FollowAuth {
  static async verifyFollow(req, res, next) {
    try {
      const { authUser, registeredUser } = singletonUserAuth;
      const { username } = authUser;
      if (registeredUser.id === authUser.id) return err400Res(res, followSelf(username));
      const authFollow = await queryOneOrNone(findFollow(), registeredUser.id);
      if (authFollow) return err400Res(res, dataFound('Follow'));
      return next();
    } catch (err) {
      return console.error(err);
    }
  }
}
