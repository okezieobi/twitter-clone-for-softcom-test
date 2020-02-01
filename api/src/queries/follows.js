export default class Follows {
  constructor() {
    this.getFollows = this.getFollows.bind(this);
  }

  static getFollowings() {
    return 'SELECT FROM "following" WHERE "user_id" = $1';
  }

  static getFollowers() {
    return 'SELECT FROM followers WHERE "user_id" = $1';
  }

  async getFollows(db, userId) {
    const { task } = db;
    this.findFollows = await task('retrieveFollows', async (t) => {
      const { oneOrNone } = t;
      const followings = await oneOrNone(Follows.getFollowings(), [userId]) || 0;
      const followers = await oneOrNone(Follows.getFollowers(), [userId]) || 0;
      return { followings, followers };
    });
    return this.findFollows;
  }
}
