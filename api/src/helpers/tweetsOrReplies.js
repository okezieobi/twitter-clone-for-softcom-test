/* eslint-disable camelcase */
import SharedHelper from './index';
import { tweetModel, tweetReplyModel } from '../models/tweetOrReplies';

const { handleArrayData } = SharedHelper;

export default class TweetOrReplyHelper {
  static prepareTweetResponse({ tweet, _id, createdOn }) {
    return {
      id: _id,
      tweet,
      createdOn: Date(createdOn),
    };
  }

  static prepareTweetReplyResponse({
    _id, reply, tweetId, userId, createdOn,
  }) {
    return {
      id: _id,
      reply,
      tweetId,
      userId,
      createdOn: Date(createdOn),
    };
  }

  static prepareTweetResArray(array) {
    return handleArrayData(array, TweetOrReplyHelper.prepareTweetResponse);
  }

  static async createTweet(tweet = '', userId = '') {
    const newTweet = await tweetModel.create({ tweet, userId });
    return TweetOrReplyHelper.prepareTweetResponse(newTweet);
  }

  static async getTweetsByUserId(userId = '') {
    const userTweets = await tweetModel.find({ userId });
    return TweetOrReplyHelper.prepareTweetResArray(userTweets);
  }

  static async findTweetById(_id = '') {
    const getTweet = await tweetModel.findById({ _id });
    return getTweet;
  }

  static async createTweetReply(reply = '', tweetId = '', userId = '') {
    const newTweetReply = await tweetReplyModel.create({ reply, tweetId, userId });
    return TweetOrReplyHelper.prepareTweetReplyResponse(newTweetReply);
  }
}
