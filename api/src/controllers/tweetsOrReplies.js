import HttpResponse from '../utils/response';
import TweetOrReplyHelper from '../helpers/tweetsOrReplies';

const { success201Res, success200Res } = HttpResponse;
const { createTweet, createTweetReply, getTweetsByUserId } = TweetOrReplyHelper;

export default class TweetAndReplyController {
  static async addTweet({ body: { tweet = '' } }, res, next) {
    try {
      const { locals: { authUser: { _id } } } = res;
      const newTweetRes = await createTweet(tweet, _id);
      success201Res(res, newTweetRes);
    } catch (error) {
      next(error);
    }
  }

  static async addTweetReply({ body: { reply = '' }, params: { id = '' } }, res, next) {
    try {
      const { locals: { authUser: { _id } } } = res;
      const newTweetReplyRes = await createTweetReply(reply, id, _id);
      success201Res(res, newTweetReplyRes);
    } catch (error) {
      next(error);
    }
  }

  static async findTweetsByUserId(req, res, next) {
    try {
      const { locals: { authUser: { _id } } } = res;
      const userTweetsRes = await getTweetsByUserId(_id);
      success200Res(res, userTweetsRes);
    } catch (error) {
      next(error);
    }
  }
}
