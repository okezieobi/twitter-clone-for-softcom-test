import FollowController from '../controllers/follows';
import FollowMiddleware from '../middleware/follows';
import MiddlewareHelper from '../middleware/middleware';
import router from './router';

const { addFollow } = FollowController;
const { createFollow } = FollowMiddleware;
const { callBack } = MiddlewareHelper;

router.post('/follows', createFollow(), callBack(addFollow));

export default router;
