/*
"database for heroku": "cat api/src/migrations/heroku.sql | heroku pg:psql -a twitter-clone-softcom-test DATABASE_URL"
*/

\i api/src/seeders/deleteAll.sql
\i api/src/tables/users.sql
\i api/src/tables/tweetsOrReplies.sql
\i api/src/tables/replies.sql
\i api/src/tables/follows.sql