import { Schema, model } from 'mongoose';
import { DateTime } from 'luxon';

const tweetSchema = new Schema({
  tweet: {
    type: String,
    required: true,
    length: 280,
  },
  userId: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'User',
  },
  createdOn: {
    type: Date,
    default: DateTime.local(),
  },
});

const tweetReplySchema = new Schema({
  reply: {
    type: String,
    required: true,
    length: 280,
  },
  userId: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'User',
  },
  tweetId: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'Tweet',
  },
  createdOn: {
    type: Date,
    default: DateTime.local(),
  },
});

const tweetModel = model('Tweet', tweetSchema);
const tweetReplyModel = model('TweetReply', tweetReplySchema);

export {
  tweetModel,
  tweetReplyModel,
};
