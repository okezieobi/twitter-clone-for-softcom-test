/* eslint-disable no-underscore-dangle */
/* eslint-disable no-console */
import HttpResponse from '../utils/response';
import TemplateErrors from '../errors/templateLiterals';
import FollowHelper from '../helpers/follows';

const { err400Res } = new HttpResponse();
const { getFollowings } = FollowHelper;
const { dataFound, followSelf } = TemplateErrors;

export default class FollowAuth {
  static async verifyFollow(req, res, next) {
    try {
      const { locals: { authUser: { username, _id }, registeredUser } } = res;
      if (registeredUser._id === _id) return err400Res(res, followSelf(username));
      const authFollow = await getFollowings(registeredUser._id);
      if (authFollow) return err400Res(res, dataFound('Follow'));
      return next();
    } catch (err) {
      return console.log(err);
    }
  }
}
