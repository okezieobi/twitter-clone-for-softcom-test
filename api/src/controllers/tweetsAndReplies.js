import database from '../db/pgConnect';
import authenticateUsers from '../auth/users';
import HttpResponse from '../helpers/response';
import Models from '../models/tweets';
import Logger from '../helpers/logger';
import Queries from '../queries/tweetsAndReplies';

const { success201Res, success200Res } = new HttpResponse();
const { createTweet, getTweetsByUserId } = Queries;
const { requestData, responseData, responseArray } = Models;
const { queryOne, queryAny } = database;
const { displayErrors } = Logger;

class TweetController {
  constructor() {
    this.addTweet = this.addTweet.bind(this);
    this.sendResponse = this.sendResponse.bind(this);
    this.findTweetsByUserId = this.findTweetsByUserId.bind(this);
  }

  async addTweet({ body: { tweet = '' } }, res, next) {
    const { findUser } = authenticateUsers;
    const { id } = findUser;
    const arrayData = requestData(tweet, id);
    try {
      this.addTweet = await queryOne(createTweet(), arrayData);
      return next();
    } catch (error) {
      return displayErrors(error);
    }
  }

  async findTweetsByUserId(req, res, next) {
    const { findUser } = authenticateUsers;
    const { id } = findUser;
    try {
      this.tweetsById = await queryAny(getTweetsByUserId(), id);
      return next();
    } catch (error) {
      return displayErrors(error);
    }
  }

  sendResponse(req, res) {
    const { addTweet, tweetsById } = this;
    try {
      if (tweetsById) return success200Res(res, responseArray(tweetsById));
      return success201Res(res, responseData(addTweet));
    } catch (error) {
      return displayErrors(error);
    }
  }
}

export default new TweetController();
