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
    try {
      const { authUser, registeredUser } = singletonUserAuth;
      const { username } = authUser;
      if (registeredUser.id === authUser.id) return err400Res(res, `${username} can not follow self`);
      const authFollow = await queryOneOrNone(findFollow(), registeredUser.id);
      if (authFollow) return err400Res(res, dataFound('Following'));
      return next();
    } catch (error) {
      return displayErrors(error);
    }
  }
}
