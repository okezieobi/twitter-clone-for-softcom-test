import HttpResponse from '../helpers/response';
import IndexValidator from './index';
import TestRequest from '../helpers/testReq';

const { validateRequest } = IndexValidator;
const { validateTweetOrReply } = new TestRequest();
const { err400Res } = new HttpResponse();

export default class TweetValidator {
  static validateTweet({ body }, res, next) {
    const { tweet } = body;
    const tweetErr = validateRequest(tweet, 'Tweet', validateTweetOrReply);
    if (tweetErr) err400Res(res, tweetErr);
    else next();
  }
}
