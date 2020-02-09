import followController from '../controllers/follows';
import FollowMiddleware from '../middleware/follows';
import router from './router';

const { addFollow } = followController;
const { createFollow } = FollowMiddleware;

router.post('/follows', createFollow(), addFollow);

export default router;
