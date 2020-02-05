import TweetAndReplyValidator from '../data/tweetsAndReplies';
import userAuth from '../auth/users';
import UserValidator from '../data/users';
import MiddlewareHelper from './middleware';
import tweetAndReplyController from '../controllers/tweetsAndReplies';

const { validateTweet } = TweetAndReplyValidator;
const { validateToken } = UserValidator;
const { authenticateAll, verifyToken } = userAuth;
const { routeCallbacks } = MiddlewareHelper;
const { addTweet, findTweetsByUserId } = tweetAndReplyController;

export default class TweetMiddleware {
  static createTweet() {
    return routeCallbacks(validateTweet, validateToken, verifyToken, authenticateAll, addTweet);
  }

  static getTweets() {
    return routeCallbacks(validateToken, verifyToken, authenticateAll, findTweetsByUserId);
  }
}
