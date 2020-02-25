import CoreValidator from './coreValidator';

export default class ExtendedPatterns extends CoreValidator {
  static checkTweetOrReply(tweetOrReply = '') {
    return CoreValidator.checkCharLength(tweetOrReply, 280);
  }
}
