/* eslint-disable camelcase */
import Numbers from '../helpers/uniqueNos';
import Bcrypt from '../helpers/bcrypt';

const { uniqueIds } = Numbers;
const { hash } = Bcrypt;

export default class UserModel {
  static prepareRequest({
    fullName = '', email = '', password = '', username = '',
  }) {
    return [uniqueIds(), fullName, email, hash(password), username];
  }

  static prepareResponse({
    id, full_name, username, email, type, created_on, followers = [], followings = [],
  }) {
    return {
      id: parseInt(id, 10),
      fullName: String(full_name),
      username: String(username),
      email: String(email),
      type: String(type),
      createdOn: Date(created_on),
      followers: followers.length,
      followings: followings.length,
    };
  }
}
