import SearchController from '../controllers/search';
import SearchMiddleware from '../middleware/search';
import router from './router';

const { getSearches } = new SearchController();
const { createSearch } = SearchMiddleware;

router.post('/searches', createSearch(), getSearches);

export default router;
