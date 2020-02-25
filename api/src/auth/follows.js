/* eslint-disable no-underscore-dangle */
import ExtendedErrs from '../errors/extended';
import FollowHelper from '../helpers/follows';

const { findFollow } = FollowHelper;
const { dataFound, followSelf } = ExtendedErrs;

export default class FollowAuth {
  static async verifyFollow(req,
    { locals: { authUser: { username, _id }, registeredUser } }, next) {
    try {
      if (_id.equals(registeredUser._id)) throw new ExtendedErrs(400, followSelf(username));
      const follow = await findFollow(registeredUser._id);
      if (follow) throw new ExtendedErrs(400, dataFound('Follow'));
      next();
    } catch (error) {
      next(error);
    }
  }
}
