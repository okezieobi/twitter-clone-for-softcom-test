import database from '../db/pgConnect';
import HttpResponse from '../helpers/response';
import Queries from '../queries/search';
import Models from '../models/search';
import templateErrors from '../errors/templateLiterals';

const { err404Res } = new HttpResponse();
const { searchAll } = Queries;
const { pool } = database;
const { prepareRequest, prepareResponse } = Models;
const { noSearchResults } = templateErrors;

class SearchAuth {
  constructor() {
    this.getSearches = this.getSearches.bind(this);
  }

  async getSearches({ body: { search = '' } }, res, next) {
    const searchResults = await searchAll(pool, prepareRequest(search));
    const { userRes, tweetRes, replyRes } = prepareResponse(searchResults);
    if (userRes.length !== 0 || tweetRes.length !== 0 || replyRes.length !== 0) {
      this.searches = { userRes, tweetRes, replyRes };
      return next();
    }
    return err404Res(res, noSearchResults(search));
  }
}

export default new SearchAuth();
