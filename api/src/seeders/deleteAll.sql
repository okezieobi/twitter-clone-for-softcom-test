/*
Connect to db as interviewprojects and RUN  \c softcomtwitterclone \i api/src/seeders/delete.sql
*/

TRUNCATE replies
CASCADE;

TRUNCATE tweetreplies
CASCADE;

TRUNCATE tweets
CASCADE;

TRUNCATE "following"
CASCADE;

TRUNCATE followers
CASCADE;

TRUNCATE users
CASCADE;
