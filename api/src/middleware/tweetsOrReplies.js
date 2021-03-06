import TweetOrReplyValidator from '../guard/tweetsOrReplies';
import UserAuth from '../auth/users';
import UserValidator from '../guard/users';
import MiddlewareHelper from './middleware';
import TweetOrReplyAuth from '../auth/tweetsOrReplies';

const { validateTweet, validateReply, validateTweetId } = TweetOrReplyValidator;
const { validateToken } = UserValidator;
const { authenticateAll, verifyToken } = UserAuth;
const { routeCallbacks } = MiddlewareHelper;
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
