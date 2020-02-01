import userController from '../controllers/users';
import router from './router';
import UserMiddleware from '../middlewares/users';

const { sendAuthResponse } = userController;
const { signup } = UserMiddleware;

router.post('/auth/signup', signup(), sendAuthResponse);

// router.post('/auth/signin', userMiddleware.signin(), userController.sendAuthResponse);

export default router;
