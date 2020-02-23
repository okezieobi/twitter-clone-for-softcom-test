import HttpResponse from '../utils/response';
import IndexValidator from './index';
import TestRequest from '../utils/testReq';

const { checkStringTypeRequest } = IndexValidator;
const { validateTweetOrReply, validateObjectId } = new TestRequest();
const { err400Res } = HttpResponse;

export default class TweetOrReplyValidator {
  static validateTweet({ body: { tweet = '' } }, res, next) {
    const tweetErr = checkStringTypeRequest(tweet, 'Tweet', validateTweetOrReply);
    const resErr = tweetErr ? err400Res(res, tweetErr) : next();
    return resErr;
  }

  static validateTweetId({ params: { id = '' } }, res, next) {
    const isTweetIdErr = validateObjectId(id, 'Tweet id');
    const resErr = isTweetIdErr ? err400Res(res, isTweetIdErr) : next();
    return resErr;
  }

  static validateReply({ body: { reply = '' } }, res, next) {
    const replyErr = checkStringTypeRequest(reply, 'Reply', validateTweetOrReply);
    const resErr = replyErr ? err400Res(res, replyErr) : next();
    return resErr;
  }
}