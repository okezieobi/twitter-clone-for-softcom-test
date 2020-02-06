/* eslint-disable camelcase */
import Numbers from '../helpers/uniqueNos';
import SharedModel from './index';

const { uniqueIds } = Numbers;
const { handleArrayData } = SharedModel;

export default class TweetOrReplyModels {
  static tweetRequestData(tweet = '', userId = 0) {
    return [uniqueIds(), tweet, userId];
  }

  static tweetResponseData({ tweet, id, created_on }) {
    return {
      id: parseInt(id, 10),
      tweet: String(tweet),
      createdOn: Date(created_on),
    };
  }

  static replyRequestData(reply = '', userId = 0, tweetOrReplyId = 0) {
    return [uniqueIds(), reply, userId, tweetOrReplyId];
  }

  static replyResponseData({
    id, reply, user_id, created_on,
  }) {
    return {
      id: parseInt(id, 10),
      reply: String(reply),
      userId: parseInt(user_id, 10),
      createdOn: Date(created_on),
    };
  }

  static tweetResponseArray(array) {
    return handleArrayData(array, TweetOrReplyModels.tweetResponseData);
  }
}
