import tweetOrReplyController from '../controllers/tweetsOrReplies';
import TweetOrReplyMiddleware from '../middleware/tweetsOrReplies';
import MiddlewareHelper from '../middleware/middleware';
import router from './router';

const { createTweet, getTweets, createTweetReply } = TweetOrReplyMiddleware;
const { addTweetReply, addTweet, findTweetsByUserId } = tweetOrReplyController;
const { callBackFactory } = new MiddlewareHelper();

router.post('/tweets', createTweet(), addTweet);
router.get('/tweets', getTweets(), callBackFactory(findTweetsByUserId));
router.post('/tweets/:id', createTweetReply(), callBackFactory(addTweetReply));

export default router;
