import tweeTController from '../controllers/tweets';
import TweetMiddleware from '../middlewares/tweets';
import router from './router';

const { addOne } = TweetMiddleware;
const { sendResponse } = tweeTController;

router.post('/tweets', addOne(), sendResponse);

export default router;
