export default class Follows {
  static getFollowings() {
    return 'SELECT FROM "followinG" WHERE "user_id" = $1';
  }

  static getFollowers() {
    return 'SELECT FROM followers WHERE "user_id" = $1';
  }

  async getFollows(db, userId) {
    const { task } = db;
    this.findFollows = await task('retrieveFollows', async (t) => {
      const { one } = t;
      const followings = await one(Follows.getFollowings(), [userId]);
      const followers = await one(Follows.getFollowers(), [userId]);
      return { followings, followers };
    });
    return this.findFollows;
  }
}
