/* eslint-disable no-console */
import HttpResponse from '../helpers/response';
import database from '../db/pgConnect';
import templateErrors from '../errors/templateLiterals';
import Queries from '../queries/tweetsOrReplies';

const { err404Res } = new HttpResponse();
const { findTweetById } = Queries;
const { queryOneOrNone } = database;
const { dataNotFound } = templateErrors;

export default class TweetOrReplyAuth {
  static async authTweetById({ params: { id = '' } }, res, next) {
    try {
      const getTweetById = await queryOneOrNone(findTweetById(), id);
      const resErr = getTweetById ? next() : err404Res(res, dataNotFound('Tweet'));
      return resErr;
    } catch (err) {
      return console.error(err);
    }
  }
}
