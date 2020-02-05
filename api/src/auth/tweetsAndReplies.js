import HttpResponse from '../helpers/response';
import database from '../db/pgConnect';
import Logger from '../helpers/logger';
import templateErrors from '../errors/templateLiterals';
import Queries from '../queries/tweetsAndReplies';

const { err404Res } = new HttpResponse();
const { findTweetById } = Queries;
const { queryOneOrNone } = database;
const { dataNotFound } = templateErrors;
const { displayErrors } = Logger;

export default class authTweetReplies {
  static async verifyTweetById({ params: { id = '' } }, res, next) {
    try {
      const getTweetById = await queryOneOrNone(findTweetById(), [id]);
      const resErr = getTweetById ? next() : err404Res(res, dataNotFound('Tweet'));
      return resErr;
    } catch (error) {
      throw displayErrors(error);
    }
  }
}
