import userController from '../controllers/users';
import router from './router';
import UserMiddleware from '../middleware/users';
import MiddlewareHelper from '../middleware/middleware';

const { addUser, sendAuthRes } = userController;
const { signup, signin } = UserMiddleware;
const { callBackFactory } = new MiddlewareHelper();

router.post('/auth/signup', signup(), callBackFactory(addUser));

router.post('/auth/signin', signin(), callBackFactory(sendAuthRes));

export default router;
