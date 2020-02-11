/*
Connect to db as interviewprojects and RUN  \c softcomtwitterclone \i api/src/seeders/delete.sql
*/

TRUNCATE users
CASCADE;

TRUNCATE followers
CASCADE;

TRUNCATE "following"
CASCADE;

TRUNCATE tweets
CASCADE;

TRUNCATE tweetreplies
CASCADE;

TRUNCATE replies
CASCADE;
