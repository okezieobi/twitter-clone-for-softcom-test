import IndexValidator from './index';

const { checkStringTypeRequest, validateTweetOrReply, validateObjectId } = IndexValidator;

export default class TweetOrReplyValidator {
  static validateTweet({ body: { tweet = '' } }, res, next) {
    try {
      checkStringTypeRequest(tweet, 'Tweet', validateTweetOrReply);
      next();
    } catch (error) {
      next(error);
    }
  }

  static validateTweetId({ params: { id = '' } }, res, next) {
    try {
      validateObjectId(id, 'Tweet id');
      next();
    } catch (error) {
      next(error);
    }
  }

  static validateReply({ body: { reply = '' } }, res, next) {
    try {
      checkStringTypeRequest(reply, 'Reply', validateTweetOrReply);
      next();
    } catch (error) {
      next(error);
    }
  }
}
