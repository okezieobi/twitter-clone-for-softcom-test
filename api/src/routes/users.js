import userController from '../controllers/users';
import router from './router';
import UserMiddleware from '../middlewares/users';

const { sendAuthResponse } = userController;
const { signup, signin } = UserMiddleware;

router.post('/auth/signup', signup(), sendAuthResponse);

router.post('/auth/signin', signin(), sendAuthResponse);

export default router;
