/* eslint-disable no-console */
/* eslint-disable camelcase */
import HttpResponse from '../utils/response';
import TweetOrReplyHelper from '../helpers/tweetsOrReplies';

const { success201Res, success200Res } = new HttpResponse();
const { createTweet, createTweetReply, findTweetById } = TweetOrReplyHelper;

export default class TweetAndReplyController {
  static async addTweet({ body: { tweet = '' } }, res) {
    const { locals: { authUser: { _id } } } = res;
    const { newTweet, name, message } = await createTweet(tweet, _id);
    if (name || message) return console.log({ name, message });
    return success201Res(res, newTweet);
  }

  static async addTweetReply({ body: { reply = '' }, params: { id = '' } }, res) {
    const { locals: { authUser: { _id } } } = res;
    const { newReply, name, message } = await createTweetReply(reply, id, _id);
    if (name || message) return console.log({ name, message });
    return success201Res(res, newReply);
  }

  static async findTweetsByUserId(req, res) {
    const { authUser: { _id } } = res;
    const { tweetsByUserId, name, message } = await findTweetById(_id);
    if (name || message) return console.log({ name, message });
    return success200Res(res, tweetsByUserId);
  }
}
