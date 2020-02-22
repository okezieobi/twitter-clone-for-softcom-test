/* eslint-disable no-underscore-dangle */
import HttpResponse from '../utils/response';
import TemplateErrors from '../errors/templateLiterals';
import FollowHelper from '../helpers/follows';

const { err400Res } = HttpResponse;
const { findFollow } = FollowHelper;
const { dataFound, followSelf, consoleError } = TemplateErrors;

export default class FollowAuth {
  static async verifyFollow(req, res, next) {
    const { locals: { authUser: { username, _id }, registeredUser } } = res;
    if (_id.equals(registeredUser._id)) return err400Res(res, followSelf(username));
    const { follow, name, message } = await findFollow(registeredUser._id);
    if (name || message) return consoleError({ name, message });
    const followErr = follow ? err400Res(res, dataFound('Follow')) : next();
    return followErr;
  }
}
