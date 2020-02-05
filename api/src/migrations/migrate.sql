/*
psql -U interviewprojects -d postgres -h 127.0.0.1 -W (linux)
RUN \i api/src/migrations/migrate.sql \q
*/

DROP DATABASE IF EXISTS softcomtwitterclone;
CREATE DATABASE softcomtwitterclone;

\c softcomtwitterclone
\i api/src/tables/users.sql
\i api/src/tables/tweetsOrReplies.sql
\i api/src/tables/follows.sql