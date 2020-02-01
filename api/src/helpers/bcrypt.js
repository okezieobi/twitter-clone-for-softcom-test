import bcrypt from 'bcryptjs';

export default class Password {
  static hash(password = '') {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(12));
  }

  static compare(hashedPassword = '', password = '') {
    return bcrypt.compareSync(password, hashedPassword);
  }
}
