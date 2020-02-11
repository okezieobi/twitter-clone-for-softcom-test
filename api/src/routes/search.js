import SearchController from '../controllers/search';
import SearchMiddleware from '../middleware/search';
import router from './router';

const { sendResponse } = SearchController;
const { createSearch } = SearchMiddleware;

router.post('/searches', createSearch(), sendResponse);

export default router;
