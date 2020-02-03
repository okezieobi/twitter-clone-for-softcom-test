import database from '../db/pgConnect';
import authenticateUsers from '../auth/users';
import HttpResponse from '../helpers/response';
import Models from '../models/tweets';
import Logger from '../helpers/logger';
import Queries from '../queries/tweets';

const { success201Res } = new HttpResponse();
const { createOne } = Queries;
const { requestData, responseData } = Models;
const { queryOne } = database;
const { displayErrors } = Logger;

class TweetController {
  constructor() {
    this.addOne = this.addOne.bind(this);
    this.sendResponse = this.sendResponse.bind(this);
  }

  async addOne({ body: { tweet = '' } }, res, next) {
    const { findUser } = authenticateUsers;
    const { id } = findUser;
    const arrayData = requestData(tweet, id);
    try {
      this.addTweet = await queryOne(createOne(), arrayData);
      return next();
    } catch (error) {
      return displayErrors(error);
    }
  }

  sendResponse(req, res) {
    const { addTweet } = this;
    const addTweetResponse = responseData(addTweet);
    success201Res(res, addTweetResponse);
  }
}

export default new TweetController();
