/* eslint-disable no-console */
/* eslint-disable no-underscore-dangle */
/* eslint-disable camelcase */
import HttpResponse from '../utils/response';
import FollowHelper from '../helpers/follows';

const { success201ResMessage } = new HttpResponse();
const { getFollows, createFollow } = FollowHelper;


export default class FollowController {
  static async addFollow(req, res) {
    const { locals: { authUser, registeredUser } } = res;
    const { username } = registeredUser;
    await createFollow(authUser._id, registeredUser._id);
    return success201ResMessage(res, `${username} successfully followed`);
  }

  static async findFollows(req, res, next) {
    const { locals: { registeredUser } } = res;
    const {
      followings, followers, name, message,
    } = await getFollows(registeredUser._id);
    if (name || message) console.error({ name, message });
    else {
      registeredUser.followers = followers;
      registeredUser.followings = followings;
      next();
    }
  }
}
