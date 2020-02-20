import bcrypt from '../../api/src/utils/bcrypt';

const { hash } = bcrypt;

export default [
  {
    _id: '5126bc054aed4daf9e2ab772',
    fullName: 'Frank Okezie',
    username: 'Obiedere',
    email: 'foobar@mail.com',
    hashedPassword: hash('456789Lovely'),
  },
  {
    _id: '5126bc054aed4daf9e2ab443',
    fullName: 'Obi Franklyn',
    username: 'Ekemezie',
    email: 'barfoo@mail.com',
    hashedPassword: hash('456789Lovely'),
  },
];