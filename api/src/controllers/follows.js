/* eslint-disable no-underscore-dangle */
import HttpResponse from '../utils/response';
import FollowHelper from '../helpers/follows';

const { success201ResMessage } = HttpResponse;
const { getFollows, createFollow } = FollowHelper;

export default class FollowController {
  static async addFollow(req, res, next) {
    try {
      const { locals: { authUser, registeredUser } } = res;
      const { username } = registeredUser;
      await createFollow(authUser._id, registeredUser._id);
      success201ResMessage(res, `${username} successfully followed`);
    } catch (error) {
      next(error);
    }
  }

  static async findFollows(req, res, next) {
    try {
      const { locals: { registeredUser } } = res;
      const { followings, followers } = await getFollows(registeredUser._id);
      registeredUser.followers = followers;
      registeredUser.followings = followings;
      next();
    } catch (error) {
      next(error);
    }
  }
}
