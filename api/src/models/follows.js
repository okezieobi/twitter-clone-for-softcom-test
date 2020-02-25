import { Schema, model } from 'mongoose';

const followingSchema = new Schema({
  followingId: {
    type: Schema.Types.ObjectId,
    required: true,
    unique: true,
    ref: 'User',
  },
  userId: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'User',
  },
});


const followerSchema = new Schema({
  followerId: {
    type: Schema.Types.ObjectId,
    required: true,
    unique: true,
    ref: 'User',
  },
  userId: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'User',
  },
});

const followingModel = model('Following', followingSchema);
const followerModel = model('Follower', followerSchema);

export {
  followerModel, followingModel,
};
