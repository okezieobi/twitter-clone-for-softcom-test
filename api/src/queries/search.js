export default class Search {
  static searchUsers() {
    return 'SELECT * FROM users WHERE username LIKE $1 OR email LIKE $1 OR full_name LIKE $1';
  }

  static searchTweets() {
    return 'SELECT * FROM tweets WHERE tweet LIKE $1';
  }

  static searchTweetReplies() {
    return 'SELECT * FROM tweetreplies WHERE reply LIKE $1';
  }
}
