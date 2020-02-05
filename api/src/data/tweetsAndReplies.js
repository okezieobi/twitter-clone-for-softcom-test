import HttpResponse from '../helpers/response';
import IndexValidator from './index';
import TestRequest from '../helpers/testReq';

const { checkStringTypeRequest } = new IndexValidator();
const { validateTweetOrReply, validateInteger } = new TestRequest();
const { err400Res } = new HttpResponse();

export default class TweetValidator {
  static validateTweet({ body: { tweet = '' } }, res, next) {
    const tweetErr = checkStringTypeRequest(tweet, 'Tweet', validateTweetOrReply);
    const resErr = tweetErr ? err400Res(res, tweetErr) : next();
    return resErr;
  }

  static getTweetById({ params: { id = '' } }, res, next) {
    const findTweetErr = checkStringTypeRequest(id, 'Tweet id', validateInteger);
    const resErr = findTweetErr ? err400Res(res, findTweetErr) : next();
    return resErr;
  }

  static validateReply({ body: { reply = '' } }, res, next) {
    const replyErr = checkStringTypeRequest(reply, 'Reply', validateTweetOrReply);
    const resErr = replyErr ? err400Res(res, replyErr) : next();
    return resErr;
  }
}
