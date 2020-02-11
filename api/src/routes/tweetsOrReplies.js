import tweetOrReplyController from '../controllers/tweetsOrReplies';
import TweetOrReplyMiddleware from '../middleware/tweetsOrReplies';
import router from './router';

const { createTweet, getTweets, createTweetReply } = TweetOrReplyMiddleware;
const { addTweetReply, addTweet, findTweetsByUserId } = tweetOrReplyController;

router.post('/tweets', createTweet(), addTweet);
router.get('/tweets', getTweets(), findTweetsByUserId);
router.post('/tweets/:id/replies', createTweetReply(), addTweetReply);

export default router;
