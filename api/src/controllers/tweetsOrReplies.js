/* eslint-disable no-console */
/* eslint-disable camelcase */
import database from '../db/pgConnect';
import { singletonUserAuth } from '../auth/users';
import HttpResponse from '../helpers/response';
import Models from '../models/tweetsOrReplies';
import Queries from '../queries/tweetsOrReplies';

const { success201Res, success200Res } = new HttpResponse();
const { createTweet, getTweetsByUserId, createTweetReply } = Queries;
const {
  prepareTweetRequest, prepareTweetResponse, prepareTweetResArray,
  prepareReplyRequest, prepareReplyResponse,
} = Models;
const { queryOne, queryAny } = database;

class TweetAndReplyController {
  constructor() {
    this.addTweet = this.addTweet.bind(this);
    this.findTweetsByUserId = this.findTweetsByUserId.bind(this);
    this.addTweetReply = this.addTweetReply.bind(this);
  }

  async addTweet({ body: { tweet = '' } }, res) {
    try {
      const { authUser: { id } } = singletonUserAuth;
      this.newTweet = await queryOne(createTweet(), prepareTweetRequest(tweet, id));
      return success201Res(res, prepareTweetResponse(this.newTweet));
    } catch (err) {
      return console.error(err);
    }
  }

  async addTweetReply({ body: { reply = '' }, params: { id = '' } }, res) {
    try {
      const { authUser } = singletonUserAuth;
      const arrayData = prepareReplyRequest(reply, authUser.id, id);
      this.newReply = await queryOne(createTweetReply(), arrayData);
      const { tweet_id } = this.newReply;
      const newReply = prepareReplyResponse(this.newReply);
      newReply.tweetId = parseInt(tweet_id, 10);
      return success201Res(res, newReply);
    } catch (err) {
      return console.error(err);
    }
  }

  async findTweetsByUserId(req, res) {
    try {
      const { authUser: { id } } = singletonUserAuth;
      this.tweetsByUserId = await queryAny(getTweetsByUserId(), id);
      return success200Res(res, prepareTweetResArray(this.tweetsByUserId));
    } catch (err) {
      return console.error(err);
    }
  }
}

export default new TweetAndReplyController();
