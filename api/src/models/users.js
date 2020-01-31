/* eslint-disable camelcase */
import numbers from '../helpers/uniqueNos';
import bcrypt from '../helpers/bcrypt';

export default class UserModel {
  static requestData({
    fullName = '', email = '', password = '', username = '',
  }) {
    return [numbers.uniqueIds(), fullName, email,
      bcrypt.hash(password), username];
  }

  static responseData({
    id, full_name, username, email, type,
  }) {
    return {
      id: parseInt(id, 10),
      fullName: String(full_name),
      userName: String(username),
      email: String(email),
      type: String(type),
    };
  }
}
