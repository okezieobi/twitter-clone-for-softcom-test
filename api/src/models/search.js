import UserModel from './users';
import TweetOrReplyModel from './tweetsOrReplies';

const { prepareResponse: prepareUserRes } = UserModel;
const { prepareTweetResponse, prepareReplyResponse } = TweetOrReplyModel;

export default class SearchModels {
  static prepareRequest(data) {
    return `${data}%`;
  }

  static prepareResponse({ userSearch = [], tweetSearch = [], replySearch = [] }) {
    const userRes = userSearch.map((user) => prepareUserRes(user));
    const tweetRes = tweetSearch.map((tweet) => prepareTweetResponse(tweet));
    const replyRes = replySearch.map((reply) => prepareReplyResponse(reply));
    return { userRes, tweetRes, replyRes };
  }
}
