/* eslint-disable no-console */
export default class Follows {
  static getFollowings() {
    return 'SELECT * FROM "following" WHERE "user_id" = $1';
  }

  static getFollowers() {
    return 'SELECT * FROM followers WHERE "user_id" = $1';
  }

  static findFollow() {
    return 'SELECT * FROM "following" WHERE "following_id" = $1';
  }

  static addFollow() {
    return 'INSERT INTO following (id, "user_id", "following_id") VALUES ($3, $1, $2)';
  }

  static createFollower() {
    return 'INSERT INTO followers (id, "user_id", follower_id) VALUES ($4, $2, $1)';
  }

  static async createFollow(db, followArrayData) {
    const { task } = db;
    await task('makeFollow', async (t) => {
      try {
        const { none } = t;
        await none(Follows.addFollow(), followArrayData);
        await none(Follows.createFollower(), followArrayData);
      } catch (err) {
        console.error(err);
      }
    });
  }

  static async getFollows(db, userId) {
    const { task } = db;
    const findFollows = await task('retrieveFollows', async (t) => {
      try {
        const { any } = t;
        const followings = await any(Follows.getFollowings(), [userId]);
        const followers = await any(Follows.getFollowers(), [userId]);
        return { followings, followers };
      } catch (err) {
        return console.error(err);
      }
    });
    return findFollows;
  }
}
