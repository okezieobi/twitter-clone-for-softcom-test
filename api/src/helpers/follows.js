import { followerModel, followingModel } from '../models/follows';

export default class FollowHelper {
  static async getFollows(userId = '') {
    const followers = await followerModel.find({ userId });
    const followings = await followingModel.find({ userId });
    return { followers, followings };
  }

  static async findFollow(followId = '') {
    const follow = await followingModel.findOne({ followingId: followId });
    return follow;
  }

  static async createFollow(userId = '', followId = '') {
    await followingModel.create({ followingId: followId, userId });
    await followerModel.create({ followerId: userId, userId: followId });
  }
}
