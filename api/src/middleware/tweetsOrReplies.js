import TweetOrReplyValidator from '../data/tweetsOrReplies';
import { singletonUserAuth } from '../auth/users';
import UserValidator from '../data/users';
import MiddlewareHelper from './middleware';
import TweetOrReplyAuth from '../auth/tweetsOrReplies';

const { validateTweet, validateReply, validateTweetId } = TweetOrReplyValidator;
const { validateToken } = UserValidator;
const { authenticateAll, verifyToken } = singletonUserAuth;
const { routeCallbacks } = new MiddlewareHelper();
const { authTweetById } = TweetOrReplyAuth;

export default class TweetAndReplyMiddleware {
  static createTweet() {
    return routeCallbacks(validateTweet, validateToken, verifyToken, authenticateAll);
  }

  static getTweets() {
    return routeCallbacks(validateToken, verifyToken, authenticateAll);
  }

  static createTweetReply() {
    return routeCallbacks(validateReply, validateTweetId, authTweetById,
      validateToken, verifyToken, authenticateAll);
  }
}
