import tweetOrController from '../controllers/tweetsOrReplies';
import TweetOrMiddleware from '../middleware/tweetsOrReplies';
import router from './router';

const { createTweet, getTweets, createTweetReply } = TweetOrMiddleware;
const { addTweetReply, addTweet, findTweetsByUserId } = tweetOrController;

router.post('/tweets', createTweet(), addTweet);
router.get('/tweets', getTweets(), findTweetsByUserId);
router.post('/tweets/:id', createTweetReply(), addTweetReply);

export default router;
