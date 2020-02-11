import UserModel from './users';
import TweetOrReplyModel from './tweetsOrReplies';

const { prepareResponse: prepareUserRes } = UserModel;
const { prepareTweetResponse, prepareReplyResponse } = TweetOrReplyModel;

export default class SearchModels {
  static prepareRequest(data) {
    return `${data}%`;
  }

  static prepareResponse({ userSearch = [], tweetSearch = [], tweetReplySearch = [] }) {
    const userRes = userSearch.map((user) => prepareUserRes(user));
    const tweetRes = tweetSearch.map((tweet) => prepareTweetResponse(tweet));
    const replyRes = tweetReplySearch.map((reply) => prepareReplyResponse(reply));
    return { userRes, tweetRes, replyRes };
  }
}
