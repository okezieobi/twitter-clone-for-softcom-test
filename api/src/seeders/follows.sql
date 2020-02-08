/*
Connect to db as interviewprojects and RUN  \c softcomtwitterclone \i api/src/seeders/follows.sql \q
*/

INSERT INTO "following"
    (id, "user_id", "following_id")
VALUES
    (1212121212121, 1010101010101, 5050505050505);

INSERT INTO followers
    (id, "user_id", "follower_id")
VALUES
    (1313131313131, 5050505050505, 1010101010101);

INSERT INTO "following"
    (id, "user_id", "following_id")
VALUES
    (1414141414141, 5050505050505, 1010101010101);

INSERT INTO followers
    (id, "user_id", "follower_id")
VALUES
    (1515151515151, 1010101010101, 5050505050505);


SELECT *
FROM "following";

SELECT *
FROM followers;