/* eslint-disable camelcase */
import Bcrypt from '../utils/bcrypt';
import userModel from '../models/users';

const { hash } = Bcrypt;

export default class UserHelper {
  static prepareRequest({
    fullName = '', email = '', password = '', username = '',
  }) {
    const hashedPassword = hash(password);
    return {
      fullName, email, hashedPassword, username,
    };
  }

  static prepareResponse({
    _id, fullName, username, email, type, createdOn, followers = [], followings = [],
  }) {
    return {
      id: _id,
      fullName,
      username,
      email,
      type,
      createdOn: Date(createdOn),
      followers: followers.length,
      followings: followings.length,
    };
  }

  static async findUserByEmailAndUsername(username = '', email = '') {
    const newUser = await userModel.findOne({ $or: [{ username }, { email }] });
    return newUser;
  }

  static async getUserByUsernameOrEmail(user = '') {
    const registeredUser = await userModel.findOne({
      $or: [{ username: user },
        { email: user }],
    });
    return registeredUser;
  }

  static async findUserById(_id = '') {
    const authUser = await userModel.findById({ _id });
    return authUser;
  }

  static async createUser(userReqData = {}) {
    const userData = UserHelper.prepareRequest(userReqData);
    const addedUser = await userModel.create(userData);
    return UserHelper.prepareResponse(addedUser);
  }
}
