import { followerModel, followingModel } from '../models/follows';

export default class FollowHelper {
  static async getFollows(userId = '') {
    try {
      const followers = await followerModel.find({ userId });
      const followings = await followingModel.find({ userId });
      return { followers, followings };
    } catch (error) {
      return error;
    }
  }

  static async findFollow(followId = '') {
    try {
      const follow = await followingModel.findOne({ followId });
      return { follow };
    } catch (error) {
      return error;
    }
  }

  static async createFollow(userId = '', followId = '') {
    try {
      await followingModel.create({ followingId: followId, userId });
      return await followerModel.create({ followerId: followId, userId });
    } catch (error) {
      return error;
    }
  }
}
