import CoreCheckRequests from './coreIndex';
import ExtendedErrs from '../errors/extended';
import Validator from '../utils/validator';

const { validateWithTests } = CoreCheckRequests;
const { notTweetOrReply } = ExtendedErrs;
const { checkTweetOrReply } = Validator;

export default class ExtendedCheckRequests extends CoreCheckRequests {
  static validateTweetOrReply(tweet, replyOrTweet) {
    return validateWithTests(tweet, checkTweetOrReply,
      notTweetOrReply, replyOrTweet);
  }
}
