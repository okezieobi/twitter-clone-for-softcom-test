export default class Tweets {
  static createOne() {
    return 'INSERT INTO tweets (id, tweet, "user_id") VALUES ($1, $2, $3) RETURNING tweet, id, created_on';
  }
}
