import userController from '../controllers/users';
import router from './router';
import UserMiddleware from '../middlewares/users';

const { addUser, getFollows } = userController;
const { signup, signin } = UserMiddleware;

router.post('/auth/signup', signup(), addUser);

router.post('/auth/signin', signin(), getFollows);

export default router;
