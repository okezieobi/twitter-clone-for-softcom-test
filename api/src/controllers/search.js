import HttpResponse from '../helpers/response';
import authSearches from '../auth/search';

const { success200Res } = new HttpResponse();

class SearchController {
  constructor() {
    this.sendResponse = this.sendResponse.bind(this);
  }

  async sendResponse(req, res) {
    const { searches } = authSearches;
    this.resData = searches;
    return success200Res(res, this.resData);
  }
}

export default new SearchController();
