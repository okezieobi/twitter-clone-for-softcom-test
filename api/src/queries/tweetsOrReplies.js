export default class TweetsOrReplies {
  static createTweet() {
    return 'INSERT INTO tweets (id, tweet, "user_id") VALUES ($1, $2, $3) RETURNING tweet, id, created_on';
  }

  static getTweetsByUserId() {
    return 'SELECT * FROM tweets WHERE "user_id" = $1';
  }

  static findTweetById() {
    return 'SELECT * FROM tweets where id = $1';
  }

  static createTweetReply() {
    return 'INSERT INTO tweetreplies (id, reply, "user_id", "tweet_id") VALUES ($1, $2, $3, $4) RETURNING id, reply, created_on, tweet_id ';
  }

  /*
  static findTweetReplyById() {
    return 'SELECT * FROM tweetreplies WHERE id = $1';
  }
  */
}
