/* eslint-disable no-underscore-dangle */
import { Types } from 'mongoose';
import userSeeds from './users';

const { ObjectId } = Types;

const tweetSeeds = [
  {
    _id: new ObjectId(),
    tweet: 'This is my first tweet',
    userId: userSeeds[0]._id,
  },
  {
    _id: new ObjectId(),
    tweet: 'This is my 2nd tweet',
    userId: userSeeds[1]._id,
  },
];

const tweetReplySeeds = [
  {
    _id: new ObjectId(),
    reply: 'This is my first reply to a tweet',
    userId: userSeeds[0]._id,
    tweetId: tweetSeeds[0]._id,
  },
  {
    _id: new ObjectId(),
    reply: 'This is my 2nd reply to a tweet',
    userId: userSeeds[1]._id,
    tweetId: tweetSeeds[1]._id,
  },
];

export {
  tweetSeeds, tweetReplySeeds,
};
