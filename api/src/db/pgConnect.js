import pgPromise from 'pg-promise';
import promise from 'bluebird';

import dotenv from 'dotenv';

dotenv.config();

const options = {
  promiseLib: promise,
};

const pgp = pgPromise(options);

const string = process.env.DATABASE_URL || process.env.DEV_DATABASE_URL;

const pool = pgp({
  connectionString: string,
  ssl: true,
});


export default {
  result: (text = '', params = [], callback, thisArgs) => pool.result(text, params, callback, thisArgs),
  queryOneOrNone: (text = '', params = []) => pool.oneOrNone(text, params),
  queryAny: (text = '', params = []) => pool.any(text, params),
  queryOne: (text = '', params = []) => pool.one(text, params),
  queryNone: (text = '', params = []) => pool.none(text, params),
  queryMany: (text = '', params = []) => pool.many(text, params),
  pool,
};
