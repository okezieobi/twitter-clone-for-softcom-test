/*
psql -U interviewprojects -d postgres -h 127.0.0.1 -W (linux)
RUN \i api/src/seeders/seeder.sql \q
*/

\c softcomtwitterclone
\i api/src/seeders/users.sql
\i api/src/seeders/tweets.sql
\i api/src/seeders/replies.sql
\i api/src/seeders/follows.sql
