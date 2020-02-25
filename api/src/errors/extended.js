import CustomErrs from './custom';

export default class ExtendedErrs extends CustomErrs {
  static noSearchResults(title) {
    return `No search results for ${title}`;
  }

  static notTweetOrReply(tweetOrReply) {
    return CustomErrs.wrongCharLength(tweetOrReply, 280);
  }

  static followSelf(title) {
    return `${title} can not follow self`;
  }
}
