import { Types } from 'mongoose';
import bcrypt from '../api/src/utils/bcrypt';

const { ObjectId } = Types;

const { hash } = bcrypt;

export default [
  {
    _id: new ObjectId(),
    fullName: 'Frank Okezie',
    username: 'Obiedere',
    email: 'foobar@mail.com',
    hashedPassword: hash('456789Lovely'),
  },
  {
    _id: new ObjectId(),
    fullName: 'Obi Franklyn',
    username: 'Ekemezie',
    email: 'barfoo@mail.com',
    hashedPassword: hash('456789Lovely'),
  },
];
