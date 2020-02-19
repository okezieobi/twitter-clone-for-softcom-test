import { followerModel, followingModel } from '../models/follows';

export default class FollowHelper {
  static async getFollowings(userId = '') {
    try {
      const followings = await followingModel.find({ userId });
      return { followings };
    } catch (error) {
      return error;
    }
  }

  static async getFollowers(userId = '') {
    try {
      const follower = await followerModel.find({ userId });
      return { follower };
    } catch (error) {
      return error;
    }
  }
}
