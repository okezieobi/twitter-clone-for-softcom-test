/* eslint-disable no-console */
/* eslint-disable no-underscore-dangle */
/* eslint-disable camelcase */
import HttpResponse from '../utils/response';
import FollowHelper from '../helpers/follows';

const { success201ResMessage } = new HttpResponse();
const { getFollowings, getFollowers } = FollowHelper;


export default class FollowController {
  /*
  async addFollow(req, res) {
    const { authUser, registeredUser } = singletonUserAuth;
    this.followId = registeredUser.id;
    const { username } = registeredUser;
    await createFollow(pool, prepareRequest(authUser.id, this.followId));
    return success201ResMessage(res, `${username} successfully followed`);
  }
  */

  static async findFollows(req, res, next) {
    const { locals: { registeredUser } } = res;
    const userFollowings = await getFollowings(registeredUser._id);
    const userFollowers = await getFollowers(registeredUser._id);
    if (userFollowings.name || userFollowings.message) console.error(userFollowings);
    else if (userFollowers.name || userFollowers.message) console.error(userFollowers);
    else {
      const { followings } = userFollowers;
      const { followers } = userFollowers;
      res.locals.followers = followers;
      res.locals.followings = followings;
      next();
    }
  }
}
