import database from '../db/pgConnect';
import authenticateUsers from '../auth/users';
import HttpResponse from '../helpers/response';
import Models from '../models/tweetsOrReplies';
import Logger from '../helpers/logger';
import Queries from '../queries/tweetsOrReplies';

const { success201Res, success200Res } = new HttpResponse();
const { createTweet, getTweetsByUserId, createTweetReply } = Queries;
const {
  tweetRequestData, tweetResponseData, tweetResponseArray, replyRequestData, replyTweetResData,
} = Models;
const { queryOne, queryAny } = database;
const { displayErrors } = Logger;

class TweetAndReplyController {
  constructor() {
    this.addTweet = this.addTweet.bind(this);
    this.sendResponse = this.sendResponse.bind(this);
    this.findTweetsByUserId = this.findTweetsByUserId.bind(this);
    this.addReply = this.addReply.bind(this);
  }

  async addTweet({ body: { tweet = '' } }, res, next) {
    const { authUser } = authenticateUsers;
    const { id } = authUser;
    const arrayData = tweetRequestData(tweet, id);
    try {
      this.newTweet = await queryOne(createTweet(), arrayData);
      return next();
    } catch (error) {
      return displayErrors(error);
    }
  }

  async addReply({ body: { reply = '' }, params: { id = '' } }, res, next) {
    const { authUser } = authenticateUsers;
    const arrayData = replyRequestData(reply, authUser.id, id);
    try {
      this.newReply = await queryOne(createTweetReply(), arrayData);
      return next();
    } catch (error) {
      return displayErrors(error);
    }
  }

  async findTweetsByUserId(req, res, next) {
    const { authUser } = authenticateUsers;
    const { id } = authUser;
    try {
      this.tweetsByUserId = await queryAny(getTweetsByUserId(), id);
      return next();
    } catch (error) {
      return displayErrors(error);
    }
  }

  sendResponse(req, res) {
    const { newTweet, tweetsByUserId, newReply } = this;
    try {
      let response;
      if (tweetsByUserId) response = success200Res(res, tweetResponseArray(tweetsByUserId));
      else if (newReply) response = success200Res(res, replyTweetResData(newReply));
      else response = success201Res(res, tweetResponseData(newTweet));
      return response;
    } catch (error) {
      return displayErrors(error);
    }
  }
}

export default new TweetAndReplyController();
