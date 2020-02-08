import followController from '../controllers/follows';
import FollowMiddleware from '../middleware/follows';
import MiddlewareHelper from '../middleware/middleware';
import router from './router';

const { addFollow } = followController;
const { createFollow } = FollowMiddleware;
const { callBackFactory } = new MiddlewareHelper();

router.post('/follows', createFollow(), callBackFactory(addFollow));

export default router;
