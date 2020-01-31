INSERT INTO "following"
    ("user_id", "following_id")
VALUES
    (1010101010101, 5050505050505);

INSERT INTO followers
    ("user_id", "follower_id")
VALUES
    (5050505050505, 1010101010101);

INSERT INTO "following"
    ("user_id", "following_id")
VALUES
    (5050505050505, 1010101010101);

INSERT INTO followers
    ("user_id", "follower_id")
VALUES
    (1010101010101, 5050505050505);


SELECT *
FROM "following";

SELECT *
FROM followers;