import HttpResponse from '../utils/response';
import TemplateErrors from '../errors/templateLiterals';
import TweetOrReplyHelper from '../helpers/tweetsOrReplies';

const { err404Res } = new HttpResponse();
const { dataNotFound, consoleError } = TemplateErrors;
const { findTweetById } = TweetOrReplyHelper;

export default class TweetOrReplyAuth {
  static async authTweetById({ params: { id = '' } }, res, next) {
    const { getTweet, name, message } = await findTweetById(id);
    if (name || message) return consoleError({ name, message });
    const resErr = getTweet ? next() : err404Res(res, dataNotFound('Tweet'));
    return resErr;
  }
}
