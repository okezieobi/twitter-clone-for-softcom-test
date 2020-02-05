import TweetOrReplyValidator from '../data/tweetsOrReplies';
import userAuth from '../auth/users';
import UserValidator from '../data/users';
import MiddlewareHelper from './middleware';
import tweetOrReplyController from '../controllers/tweetsOrReplies';
import TweetOrReplyAuth from '../auth/tweetsOrReplies';

const { validateTweet, validateReply, validateTweetId } = TweetOrReplyValidator;
const { validateToken } = UserValidator;
const { authenticateAll, verifyToken } = userAuth;
const { routeCallbacks } = MiddlewareHelper;
const { addTweet, findTweetsByUserId, addReply } = tweetOrReplyController;
const { authTweetById } = TweetOrReplyAuth;

export default class TweetAndReplyMiddleware {
  static createTweet() {
    return routeCallbacks(validateTweet, validateToken, verifyToken, authenticateAll, addTweet);
  }

  static getTweets() {
    return routeCallbacks(validateToken, verifyToken, authenticateAll, findTweetsByUserId);
  }

  static createTweetReply() {
    return routeCallbacks(validateReply, validateTweetId, authTweetById,
      validateToken, verifyToken, authenticateAll, addReply);
  }
}
