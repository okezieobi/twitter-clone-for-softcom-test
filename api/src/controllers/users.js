/* eslint-disable no-underscore-dangle */
import Token from '../utils/jwt';
import HttpResponse from '../utils/response';
import UserHelper from '../helpers/users';
import TemplateErrors from '../errors/templateLiterals';

const { auth200Res, auth201Res } = HttpResponse;
const { createUser, prepareResponse } = UserHelper;
const { generate } = Token;
const { consoleError } = TemplateErrors;

export default class UserController {
  static async addUser({ body }, res) {
    const { newUserRes, name, message } = await createUser(body);
    if (name || message) return consoleError({ name, message });
    return auth201Res(res, newUserRes, generate(newUserRes.id));
  }

  static sendAuthRes(req, res) {
    const { locals: { registeredUser } } = res;
    return auth200Res(res, prepareResponse(registeredUser), generate(registeredUser._id));
  }
}
