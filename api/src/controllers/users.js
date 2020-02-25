/* eslint-disable no-underscore-dangle */
import Token from '../utils/jwt';
import HttpResponse from '../utils/response';
import UserHelper from '../helpers/users';

const { auth200Res, auth201Res } = HttpResponse;
const { createUser, prepareResponse } = UserHelper;
const { generate } = Token;

export default class UserController {
  static async addUser({ body }, res, next) {
    try {
      const newUserRes = await createUser(body);
      auth201Res(res, newUserRes, generate(newUserRes.id));
    } catch (error) {
      next(error);
    }
  }

  static sendAuthRes(req, res) {
    const { locals: { registeredUser } } = res;
    return auth200Res(res, prepareResponse(registeredUser), generate(registeredUser._id));
  }
}
