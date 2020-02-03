import HttpResponse from '../helpers/response';
import IndexValidator from './index';
import TestRequest from '../helpers/testReq';

const { checkStringTypeRequest } = new IndexValidator();
const { validateTweetOrReply } = new TestRequest();
const { err400Res } = new HttpResponse();

export default class TweetValidator {
  static validateTweet({ body: { tweet = '' } }, res, next) {
    const tweetErr = checkStringTypeRequest(tweet, 'Tweet', validateTweetOrReply);
    if (tweetErr) err400Res(res, tweetErr);
    else next();
  }
}
