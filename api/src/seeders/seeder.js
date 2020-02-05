import path from 'path';
import { QueryFile } from 'pg-promise';

class Queries {
  static sql(file) {
    const fullPath = path.join(__dirname, file);
    return new QueryFile(fullPath, { minify: true });
  }
}

export default {
  deleteAll: Queries.sql('../seeders/deleteAll.sql'),
  users: {
    insertData: Queries.sql('../seeders/users.sql'),
  },
  tweetsOrReplies: {
    insertData: Queries.sql('../seeders/tweetsOrReplies.sql'),
  },
  follows: {
    insertData: Queries.sql('../seeders/follows.sql'),
  },
};
