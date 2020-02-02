import TweetValidator from '../data/tweets';
import userAuth from '../auth/users';
import MiddlewareHelper from './middleware';
import tweetController from '../controllers/tweets';

const { validateTweet } = TweetValidator;
const { authToken, authenticateAll } = userAuth;
const { routeCallbacks } = MiddlewareHelper;
const { addOne } = tweetController;

export default class TweetMiddleware {
  static addOne() {
    return routeCallbacks(validateTweet, authToken, authenticateAll, addOne);
  }
}
