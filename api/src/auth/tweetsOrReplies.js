/* eslint-disable no-console */
import HttpResponse from '../utils/response';
import TemplateErrors from '../errors/templateLiterals';
import TweetOrReplyHelper from '../helpers/tweetsOrReplies';

const { err404Res } = new HttpResponse();
const { dataNotFound } = TemplateErrors;
const { findTweetById } = TweetOrReplyHelper;

export default class TweetOrReplyAuth {
  static async authTweetById({ params: { id = '' } }, res, next) {
    try {
      const getTweetById = await findTweetById(id);
      const resErr = getTweetById ? next() : err404Res(res, dataNotFound('Tweet'));
      return resErr;
    } catch (err) {
      return console.error(err);
    }
  }
}
