export default class Follows {
  static getFollowings() {
    return 'SELECT FROM "following" WHERE "user_id" = $1';
  }

  static getFollowers() {
    return 'SELECT FROM followers WHERE "user_id" = $1';
  }

  static findFollow() {
    return 'SELECT FROM "following" WHERE "following_id" = $1';
  }

  static addFollow() {
    return 'INSERT INTO following ("user_id", "following_id") VALUES ($1, $2)';
  }

  static createFollower() {
    return 'INSERT INTO followers ("user_id", follower_id) VALUES ($2, $1)';
  }

  static async createFollow(db, followArrayData) {
    const { task } = db;
    await task('makeFollow', async (t) => {
      const { none } = t;
      await none(Follows.addFollow(), followArrayData);
      await none(Follows.createFollower(), followArrayData);
    });
  }

  static async getFollows(db, userId) {
    const { task } = db;
    const findFollows = await task('retrieveFollows', async (t) => {
      const { any } = t;
      const followings = await any(Follows.getFollowings(), [userId]);
      const followers = await any(Follows.getFollowers(), [userId]);
      return { followings, followers };
    });
    return findFollows;
  }
}
