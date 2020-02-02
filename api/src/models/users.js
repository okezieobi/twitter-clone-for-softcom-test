/* eslint-disable camelcase */
import Numbers from '../helpers/uniqueNos';
import Bcrypt from '../helpers/bcrypt';

const { uniqueIds } = Numbers;
const { hash } = Bcrypt;

export default class UserModel {
  static requestData({
    fullName = '', email = '', password = '', username = '',
  }) {
    return [uniqueIds(), fullName, email, hash(password), username];
  }

  static responseData({
    id, full_name, username, email, type, followers = 0, followings = 0,
  }) {
    return {
      id: parseInt(id, 10),
      fullName: String(full_name),
      username: String(username),
      email: String(email),
      type: String(type),
      followers,
      followings,
    };
  }
}
