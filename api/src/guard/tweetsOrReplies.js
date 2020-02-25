import IndexValidator from './index';

const { checkStringTypeRequest, validateTweetOrReply, validateObjectId } = IndexValidator;

export default class TweetOrReplyValidator {
  static validateTweet({ body: { tweet = '' } }, res, next) {
    checkStringTypeRequest(tweet, 'Tweet', validateTweetOrReply);
    next();
  }

  static validateTweetId({ params: { id = '' } }, res, next) {
    validateObjectId(id, 'Tweet id');
    next();
  }

  static validateReply({ body: { reply = '' } }, res, next) {
    checkStringTypeRequest(reply, 'Reply', validateTweetOrReply);
    next();
  }
}
