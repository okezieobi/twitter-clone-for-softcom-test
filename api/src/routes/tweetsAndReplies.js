import tweeTController from '../controllers/tweetsAndReplies';
import TweetMiddleware from '../middlewares/tweetsAndReplies';
import router from './router';

const { createTweet, getTweets } = TweetMiddleware;
const { sendResponse } = tweeTController;

router.post('/tweets', createTweet(), sendResponse);
router.get('/tweets', getTweets(), sendResponse);

export default router;
