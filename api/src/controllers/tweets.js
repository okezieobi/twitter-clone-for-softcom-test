import database from '../db/pgConnect';
import authenticateUsers from '../auth/users';
import HttpResponse from '../helpers/response';
import Models from '../models/tweets';
import Logger from '../helpers/logger';
import Queries from '../queries/tweets';

const { success201Res, success200Res } = new HttpResponse();
const { createOne, getAllByUserId } = Queries;
const { requestData, responseData, responseArray } = Models;
const { queryOne, queryAny } = database;
const { displayErrors } = Logger;

class TweetController {
  constructor() {
    this.addOne = this.addOne.bind(this);
    this.sendResponse = this.sendResponse.bind(this);
    this.findAllByUserId = this.findAllByUserId.bind(this);
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

  async findAllByUserId(req, res, next) {
    const { findUser } = authenticateUsers;
    const { id } = findUser;
    try {
      this.tweetsById = await queryAny(getAllByUserId(), id);
      return next();
    } catch (error) {
      return displayErrors(error);
    }
  }

  sendResponse(req, res) {
    const { addTweet, tweetsById } = this;
    try {
      if (tweetsById) {
        const response = responseArray(tweetsById);
        success200Res(res, response);
      } else {
        const addTweetResponse = responseData(addTweet);
        success201Res(res, addTweetResponse);
      }
    } catch (error) {
      throw displayErrors(error);
    }
  }
}

export default new TweetController();
