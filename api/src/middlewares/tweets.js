import TweetValidator from '../data/tweets';
import userAuth from '../auth/users';
import MiddlewareHelper from './middleware';
import tweetController from '../controllers/tweets';

const { validateTweet } = TweetValidator;
const { validateToken, verifyToken, authenticateAll } = userAuth;
const { routeCallbacks } = MiddlewareHelper;
const { addOne, findAllByUserId } = tweetController;

export default class TweetMiddleware {
  static addOne() {
    return routeCallbacks(validateTweet, validateToken, verifyToken, authenticateAll, addOne);
  }

  static getAll() {
    return routeCallbacks(validateToken, verifyToken, authenticateAll, findAllByUserId);
  }
}
