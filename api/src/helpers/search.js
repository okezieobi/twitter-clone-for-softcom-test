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
    try {
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
      const userSearchRes = userSearch.map((user) => prepareUserRes(user));
      return { userSearchRes };
    } catch (error) {
      return error;
    }
  }

  static async searchTweetsOrReplies(search = '') {
    try {
      const searchPattern = SearchHelper.prepareRequest(search);
      const tweetSearch = await tweetModel.find({ tweet: { $regex: searchPattern } });
      const tweetReplySearch = await tweetReplyModel.find(
        { tweetReply: { $regex: searchPattern } },
      );
      const tweetSearchRes = tweetSearch.map((tweet) => prepareTweetResponse(tweet));
      const tweetReplySearchRes = tweetReplySearch.map(
        (tweetReply) => prepareTweetReplyResponse(tweetReply),
      );
      return { tweetSearchRes, tweetReplySearchRes };
    } catch (error) {
      return error;
    }
  }
}
