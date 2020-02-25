import SearchController from '../controllers/search';
import SearchMiddleware from '../middleware/search';
import MiddlewareHelper from '../middleware/middleware';
import router from './router';

const { sendResponse } = SearchController;
const { createSearch } = SearchMiddleware;
const { callBack } = MiddlewareHelper;

router.post('/searches', createSearch(), callBack(sendResponse));

export default router;
