/* eslint-disable camelcase */
import database from '../db/pgConnect';
import { singletonUserAuth } from '../auth/users';
import HttpResponse from '../helpers/response';
import Models from '../models/tweetsOrReplies';
import Logger from '../helpers/logger';
import Queries from '../queries/tweetsOrReplies';

const { success201Res, success200Res } = new HttpResponse();
const { createTweet, getTweetsByUserId, createTweetReply } = Queries;
const {
  tweetRequestData, tweetResponseData, tweetResponseArray, replyRequestData, replyResponseData,
} = Models;
const { queryOne, queryAny } = database;
const { displayErrors } = Logger;

class TweetAndReplyController {
  constructor() {
    this.addTweet = this.addTweet.bind(this);
    this.findTweetsByUserId = this.findTweetsByUserId.bind(this);
    this.addTweetReply = this.addTweetReply.bind(this);
  }

  async addTweet({ body: { tweet = '' } }, res) {
    const { authUser } = singletonUserAuth;
    const { id } = authUser;
    const arrayData = tweetRequestData(tweet, id);
    try {
      this.newTweet = await queryOne(createTweet(), arrayData);
      return success201Res(res, tweetResponseData(this.newTweet));
    } catch (error) {
      return displayErrors(error);
    }
  }

  async addTweetReply({ body: { reply = '' }, params: { id = '' } }, res) {
    const { authUser } = singletonUserAuth;
    const arrayData = replyRequestData(reply, authUser.id, id);
    try {
      this.newReply = await queryOne(createTweetReply(), arrayData);
      const { tweet_id } = this.newReply;
      const newReply = replyResponseData(this.newReply);
      newReply.tweetId = parseInt(tweet_id, 10);
      return success201Res(res, newReply);
    } catch (error) {
      return displayErrors(error);
    }
  }

  async findTweetsByUserId(req, res) {
    const { authUser } = singletonUserAuth;
    const { id } = authUser;
    try {
      this.tweetsByUserId = await queryAny(getTweetsByUserId(), id);
      return success200Res(res, tweetResponseArray(this.tweetsByUserId));
    } catch (error) {
      return displayErrors(error);
    }
  }
}

export default new TweetAndReplyController();
