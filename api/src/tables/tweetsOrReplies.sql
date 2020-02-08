/*
Connect to database as interviewprojects and RUN  \c softcomtwitterclone \i api/src/tables/tweets.sql
*/

DROP TABLE IF EXISTS tweets CASCADE;

CREATE TABLE tweets
(
    id         bigint       PRIMARY KEY NOT NULL,
    tweet      varchar(280) NOT NULL,
    created_on timestamptz  DEFAULT NOW(),
    "user_id"  bigint       NOT NULL REFERENCES users(id) ON DELETE CASCADE
);

DROP TABLE IF EXISTS tweetreplies;

CREATE TABLE tweetreplies
(
    id         bigint       PRIMARY KEY NOT NULL,
    reply      varchar(280) NOT NULL,
    created_on timestamptz  DEFAULT NOW(),
    "user_id"  bigint       NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    "tweet_id" bigint       NOT NULL REFERENCES tweets(id)
);


DROP TABLE IF EXISTS replies;

CREATE TABLE replies
(
    id         bigint       PRIMARY KEY NOT NULL,
    reply      varchar(280) NOT NULL,
    created_on timestamptz  DEFAULT NOW(),
    "user_id"  bigint       NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    "reply_id" bigint       NOT NULL REFERENCES tweetreplies(id)
);