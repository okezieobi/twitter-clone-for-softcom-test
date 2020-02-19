import bcrypt from 'bcryptjs';

const { hashSync, compareSync, genSaltSync } = bcrypt;

export default class Password {
  static hash(password = '') {
    return hashSync(password, genSaltSync(12));
  }

  static compare(hashedPassword = '', password = '') {
    return compareSync(password, hashedPassword);
  }
}
