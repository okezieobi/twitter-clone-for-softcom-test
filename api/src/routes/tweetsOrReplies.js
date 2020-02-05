import tweetOrController from '../controllers/tweetsOrReplies';
import TweetOrMiddleware from '../middlewares/tweetsOrReplies';
import router from './router';

const { createTweet, getTweets, createTweetReply } = TweetOrMiddleware;
const { sendResponse } = tweetOrController;

router.post('/tweets', createTweet(), sendResponse);
router.get('/tweets', getTweets(), sendResponse);
router.post('/tweet_replies', createTweetReply(), sendResponse);

export default router;
