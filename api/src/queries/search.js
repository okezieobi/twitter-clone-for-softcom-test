/* eslint-disable no-console */
import FollowQueries from './follows';

export default class Search {
  static searchUsers() {
    return 'SELECT id, username, full_name, email, type, created_on FROM users WHERE username LIKE $1 OR email LIKE $1 OR full_name LIKE $1';
  }

  static searchTweets() {
    return 'SELECT * FROM tweets WHERE tweet LIKE $1';
  }

  static searchTweetReplies() {
    return 'SELECT * FROM tweetreplies WHERE reply LIKE $1';
  }

  static async searchAll(db, searchData) {
    const { task } = db;
    const searches = task('getSearches', async (t) => {
      try {
        const { any } = t;
        const userSearch = await any(Search.searchUsers(), searchData);
        userSearch.forEach(async (user) => {
          if (user) {
            const followings = await any(FollowQueries.getFollowings(), user.id);
            const followers = await any(FollowQueries.getFollowers(), user.id);
            const eachUser = user;
            eachUser.followings = followings;
            eachUser.followers = followers;
          }
        });
        const tweetSearch = await any(Search.searchTweets(), searchData);
        const tweetReplySearch = await any(Search.searchTweetReplies(), searchData);
        return { userSearch, tweetSearch, tweetReplySearch };
      } catch (err) {
        return console.error(err);
      }
    });
    return searches;
  }
}
