/* eslint-disable no-underscore-dangle */
import userModel from '../models/users';
import { tweetModel, tweetReplyModel } from '../models/tweetOrReplies';
import { followingModel, followerModel } from '../models/follows';
import UserHelper from './users';
import TweetOrReplyHelper from './tweetsOrReplies';

const { prepareTweetResponse, prepareTweetReplyResponse } = TweetOrReplyHelper;
const { prepareResponse: prepareUserRes } = UserHelper;

export default class SearchHelper {
  static prepareRequest(search = '') {
    return new RegExp(search, 'i');
  }

  static async searchUsers(search = '') {
    const searchPattern = SearchHelper.prepareRequest(search);
    const userSearch = await userModel.find({
      $or: [{ username: { $regex: searchPattern } },
        { fullName: { $regex: searchPattern } }],
    });
    if (userSearch.length > 0) {
      userSearch.forEach(async (user) => {
        const { _id } = user;
        const followings = await followingModel.find({ userId: _id });
        const followers = await followerModel.find({ userId: _id });
        const eachUser = user;
        eachUser.followings = followings;
        eachUser.followers = followers;
      });
    }
    return userSearch.map((user) => prepareUserRes(user));
  }

  static async searchTweetsOrReplies(search = '') {
    const searchPattern = SearchHelper.prepareRequest(search);
    const tweetSearch = await tweetModel.find({ tweet: { $regex: searchPattern } });
    const tweetReplySearch = await tweetReplyModel.find(
      { reply: { $regex: searchPattern } },
    );
    const tweetSearchRes = tweetSearch.map((tweet) => prepareTweetResponse(tweet));
    const tweetReplySearchRes = tweetReplySearch.map(
      (tweetReply) => prepareTweetReplyResponse(tweetReply),
    );
    return { tweetSearchRes, tweetReplySearchRes };
  }
}
