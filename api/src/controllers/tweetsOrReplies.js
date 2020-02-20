import HttpResponse from '../utils/response';
import TweetOrReplyHelper from '../helpers/tweetsOrReplies';
import TemplateErrors from '../errors/templateLiterals';

const { success201Res, success200Res } = new HttpResponse();
const { createTweet, createTweetReply, findTweetById } = TweetOrReplyHelper;
const { consoleError } = TemplateErrors;

export default class TweetAndReplyController {
  static async addTweet({ body: { tweet = '' } }, res) {
    const { locals: { authUser: { _id } } } = res;
    const { newTweetRes, name, message } = await createTweet(tweet, _id);
    if (name || message) consoleError({ name, message });
    else success201Res(res, newTweetRes);
  }

  static async addTweetReply({ body: { reply = '' }, params: { id = '' } }, res) {
    const { locals: { authUser: { _id } } } = res;
    const { newReply, name, message } = await createTweetReply(reply, id, _id);
    if (name || message) consoleError({ name, message });
    else success201Res(res, newReply);
  }

  static async findTweetsByUserId(req, res) {
    const { authUser: { _id } } = res;
    const { tweetsByUserId, name, message } = await findTweetById(_id);
    if (name || message) consoleError({ name, message });
    else success200Res(res, tweetsByUserId);
  }
}
