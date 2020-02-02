import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

const { sign, verify } = jwt;

dotenv.config();

export default class Token {
  static generate(id = 0) {
    return sign({
      userId: id,
    }, process.env.SECRET, {
      expiresIn: 24 * 60 * 60,
    });
  }

  static verify(token = '') {
    return verify(token, process.env.SECRET, (err, decoded) => decoded || err);
  }
}
