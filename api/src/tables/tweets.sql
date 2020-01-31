/*
Connect to database as interviewprojects and RUN  \c softcomtwitterclone \i api/src/tables/tweets.sql
*/

DROP TABLE IF EXISTS tweets;

CREATE TABLE tweets
(
    id         bigint       PRIMARY KEY NOT NULL,
    tweet      varchar(280) NOT NULL,
    created_on timestamptz  DEFAULT NOW(),
    "user_id"  bigint       NOT NULL REFERENCES users(id) ON DELETE CASCADE
);