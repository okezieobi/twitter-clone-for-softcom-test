/*
Connect to db as interviewprojects and RUN  \c softcomtwitterclone \i api/src/seeders/tweets.sql \q
*/

INSERT INTO tweets
    (id, tweet, "user_id")
VALUES
    (2020202020202, 'This is my first tweet', 1010101010101);

INSERT INTO tweets
    (id, tweet, "user_id")
VALUES
    (3030303030303, 'This is my 2nd tweet', 5050505050505);

INSERT INTO tweets
    (id, tweet, "user_id")
VALUES
    (8080808080808, 'This is my 3nd tweet', 5050505050505);

SELECT *
FROM tweets;


INSERT INTO tweetreplies
    (id, reply, "user_id", "tweet_id")
VALUES
    (4040404040404, 'This is my 1st reply to a tweet', 1010101010101, 2020202020202);

INSERT INTO tweetreplies
    (id, reply, "user_id", "tweet_id")
VALUES
    (6060606060606, 'This is my 2nd reply to a tweet', 5050505050505, 3030303030303);

SELECT *
FROM tweetreplies;

INSERT INTO replies
    (id, reply, "user_id", "reply_id")
VALUES
    (7070707070707, 'This is my 1st reply to another reply', 1010101010101, 4040404040404);

INSERT INTO replies
    (id, reply, "user_id", "reply_id")
VALUES
    (8080808080808, 'This is my 2nd reply to another reply', 5050505050505, 6060606060606);

SELECT *
FROM replies;
