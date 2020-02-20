/* eslint-disable no-underscore-dangle */
/* eslint-disable no-console */
import Token from '../utils/jwt';
import HttpResponse from '../utils/response';
import UserHelper from '../helpers/users';

const { auth200Res, auth201Res } = new HttpResponse();
const { createUser, prepareResponse } = UserHelper;
const { generate } = Token;

export default class UserController {
  static async addUser({ body }, res) {
    const { newUserRes, name, message } = await createUser(body);
    if (name || message) return console.error({ name, message });
    return auth201Res(res, newUserRes, generate(newUserRes._id));
  }

  static sendAuthRes(req, res) {
    const { locals: { registeredUser } } = res;
    return auth200Res(res, prepareResponse(registeredUser), generate(registeredUser._id));
  }
}
