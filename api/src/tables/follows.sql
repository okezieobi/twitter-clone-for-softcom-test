/*
Connect to database as interviewprojects and RUN  \c softcomtwitterclone \i api/src/tables/follows.sql
*/

DROP TABLE IF EXISTS "following";

CREATE TABLE "following"
(
    id             bigint PRIMARY KEY NOT NULL,
    "user_id"      bigint NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    "following_id" bigint NOT NULL UNIQUE REFERENCES users(id)
);

DROP TABLE IF EXISTS followers;

CREATE TABLE followers
(
    id            bigint PRIMARY KEY NOT NULL,
    "user_id"     bigint NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    "follower_id" bigint NOT NULL UNIQUE REFERENCES users(id)
);
