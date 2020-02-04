import tweeTController from '../controllers/tweets';
import TweetMiddleware from '../middlewares/tweets';
import router from './router';

const { addOne, getAll } = TweetMiddleware;
const { sendResponse } = tweeTController;

router.post('/tweets', addOne(), sendResponse);
router.get('/tweets', getAll(), sendResponse);

export default router;
