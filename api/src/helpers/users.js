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

  static async findUserByEmailAndUsername(username, email) {
    try {
      const newUser = await userModel.findOne({ $or: [{ username }, { email }] });
      return { newUser };
    } catch (error) {
      return error;
    }
  }

  static async getUserByUsernameOrEmail(user) {
    try {
      const registeredUser = await userModel.findOne({
        $or: [{ username: user },
          { email: user }],
      });
      return { registeredUser };
    } catch (error) {
      return error;
    }
  }

  static async findUserById(_id) {
    try {
      const authUser = await userModel.findById({ _id });
      return { authUser };
    } catch (error) {
      return error;
    }
  }

  static async createUser(userReqData) {
    try {
      const userData = UserHelper.prepareRequest(userReqData);
      const addedUser = await userModel.create(userData);
      const newUserRes = UserHelper.prepareResponse(addedUser);
      return { newUserRes };
    } catch (error) {
      return error;
    }
  }
}
