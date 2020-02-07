import userController from '../controllers/users';
import router from './router';
import UserMiddleware from '../middleware/users';

const { addUser, sendAuthRes } = userController;
const { signup, signin } = UserMiddleware;

router.post('/auth/signup', signup(), addUser);

router.post('/auth/signin', signin(), sendAuthRes);

export default router;
