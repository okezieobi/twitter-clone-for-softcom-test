import TweetOrReplyController from '../controllers/tweetsOrReplies';
import TweetOrReplyMiddleware from '../middleware/tweetsOrReplies';
import MiddlewareHelper from '../middleware/middleware';
import router from './router';

const { createTweet, getTweets, createTweetReply } = TweetOrReplyMiddleware;
const { addTweetReply, addTweet, findTweetsByUserId } = TweetOrReplyController;
const { callBack } = MiddlewareHelper;

router.post('/tweets', createTweet(), callBack(addTweet));

router.get('/tweets', getTweets(), callBack(findTweetsByUserId));

router.post('/tweets/:id/replies', createTweetReply(), callBack(addTweetReply));

export default router;
