/* eslint-disable camelcase */
import Numbers from '../helpers/uniqueNos';

const { uniqueIds } = Numbers;

export default class Replies {
  static requestData(reply = '', userId = 0, tweetId = 0) {
    return [uniqueIds(), reply, userId, tweetId];
  }

  static responseData({
    id, reply, tweet_id,
  }) {
    return {
      id: parseInt(id, 10),
      reply: String(reply),
      tweetId: parseInt(tweet_id, 10),
    };
  }
}
