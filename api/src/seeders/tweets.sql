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