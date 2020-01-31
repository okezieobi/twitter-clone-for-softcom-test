import path from 'path';
import { QueryFile } from 'pg-promise';

class Queries {
  static sql(file) {
    const fullPath = path.join(__dirname, file);
    return new QueryFile(fullPath, { minify: true });
  }
}

export default {
  deleteAll: Queries.sql('../seeders/delete.sql'),
  users: {
    insertData: Queries.sql('../seeders/users.sql'),
  },
  tweets: {
    insertData: Queries.sql('../seeders/tweets.sql'),
  },
  replies: {
    insertData: Queries.sql('../seeders/replies.sql'),
  },
  follows: {
    insertData: Queries.sql('../seeders/follows.sql'),
  },
};
