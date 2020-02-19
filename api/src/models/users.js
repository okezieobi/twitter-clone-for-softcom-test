import { Schema, model } from 'mongoose';
import { DateTime } from 'luxon';

const userSchema = new Schema({
  fullName: {
    type: String,
    required: true,
    length: 128,
  },
  username: {
    type: String,
    required: true,
    unique: true,
    length: 128,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    length: 128,
  },
  hashedPassword: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    enum: ['Client', 'Admin'],
    default: 'Client',
  },
  createdOn: {
    type: Date,
    default: DateTime.local(),
  },
});

export default model('User', userSchema);
