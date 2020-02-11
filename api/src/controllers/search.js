import database from '../db/pgConnect';
import HttpResponse from '../helpers/response';
import Queries from '../queries/search';
import Models from '../models/search';

const { success201Res } = new HttpResponse();
const { searchAll } = Queries;
const { pool } = database;
const { prepareRequest, prepareResponse } = Models;

export default class Search {
  constructor() {
    this.getSearches = this.getSearches.bind(this);
  }

  async getSearches({ body: { search = '' } }, res) {
    this.searches = await searchAll(pool, prepareRequest(search));
    return success201Res(res, prepareResponse(this.searches));
  }
}
