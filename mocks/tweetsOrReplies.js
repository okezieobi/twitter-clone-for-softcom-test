const tweetSeeds = [
  {
    _id: '5126bc054aed4daf9e2ab772876',
    tweet: 'This is my first tweet',
    userId: '5126bc054aed4daf9e2ab772',
  },
  {
    _id: '5126bc054aed4daf9e2ab772987',
    tweet: 'This is my 2nd tweet',
    userId: '5126bc054aed4daf9e2ab443',
  },
];

const tweetReplySeeds = [
  {
    _id: '5126bc054aed4daf9e2ab772321',
    tweet: 'This is my first reply to a tweet',
    userId: '5126bc054aed4daf9e2ab772',
    tweetId: '5126bc054aed4daf9e2ab772876',
    createdOn: Date(),
  },
  {
    _id: '5126bc054aed4daf9e2ab772231',
    tweet: 'This is my 2nd reply to a tweet',
    userId: '5126bc054aed4daf9e2ab443',
    tweetId: '5126bc054aed4daf9e2ab772443',
    createdOn: Date(),
  },
];

export {
  tweetSeeds, tweetReplySeeds,
};
