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
    _id, tweetReply, userId, createdOn,
  }) {
    return {
      id: _id,
      tweetReply,
      userId,
      createdOn: Date(createdOn),
    };
  }

  static prepareTweetResArray(array) {
    return handleArrayData(array, TweetOrReplyHelper.prepareTweetResponse);
  }

  static async createTweet(tweet, userId) {
    try {
      const newTweet = await tweetModel.create({ tweet, userId });
      const newTweetRes = TweetOrReplyHelper.prepareTweetResponse(newTweet);
      return { newTweetRes };
    } catch (error) {
      return error;
    }
  }

  static async getTweetsByUserId(userId) {
    try {
      const userTweets = await tweetModel.find({ userId });
      const userTweetsRes = TweetOrReplyHelper.prepareTweetResArray(userTweets);
      return { userTweetsRes };
    } catch (error) {
      return error;
    }
  }

  static async findTweetById(_id) {
    try {
      const geTweet = await tweetModel.findById({ _id });
      return { geTweet };
    } catch (error) {
      return error;
    }
  }

  static async createTweetReply(reply, tweetId, userId) {
    try {
      const newTweetReply = await tweetReplyModel.create({ reply, tweetId, userId });
      const newTweetReplyRes = TweetOrReplyHelper.prepareTweetResponse(newTweetReply);
      return { newTweetReplyRes };
    } catch (error) {
      return error;
    }
  }
}