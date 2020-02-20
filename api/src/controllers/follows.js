/* eslint-disable no-underscore-dangle */
import HttpResponse from '../utils/response';
import FollowHelper from '../helpers/follows';
import TemplateErrors from '../errors/templateLiterals';

const { success201ResMessage } = new HttpResponse();
const { getFollows, createFollow } = FollowHelper;
const { consoleError } = TemplateErrors;

export default class FollowController {
  static async addFollow(req, res) {
    const { locals: { authUser, registeredUser } } = res;
    const { username } = registeredUser;
    const { name, message } = await createFollow(authUser._id, registeredUser._id);
    if (name || message) return consoleError({ name, message });
    return success201ResMessage(res, `${username} successfully followed`);
  }

  static async findFollows(req, res, next) {
    const { locals: { registeredUser } } = res;
    const {
      followings, followers, name, message,
    } = await getFollows(registeredUser._id);
    if (name || message) consoleError({ name, message });
    else {
      registeredUser.followers = followers;
      registeredUser.followings = followings;
      next();
    }
  }
}
