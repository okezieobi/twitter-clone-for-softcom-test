/* eslint-disable no-underscore-dangle */
import userSeeds from './users';

export default [
  {
    followingId: userSeeds[1]._id,
    userId: userSeeds[0]._id,
  },
  {
    followerId: userSeeds[0]._id,
    userId: userSeeds[1]._id,
  },
];
