import ExtendedErrs from '../errors/extended';
import TweetOrReplyHelper from '../helpers/tweetsOrReplies';

const { dataNotFound } = ExtendedErrs;
const { findTweetById } = TweetOrReplyHelper;

export default class TweetOrReplyAuth {
  static async authTweetById({ params: { id = '' } }, res, next) {
    try {
      const getTweet = await findTweetById(id);
      if (getTweet) next();
      else throw new ExtendedErrs(404, dataNotFound('Tweet'));
    } catch (error) {
      next(error);
    }
  }
}
