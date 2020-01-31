INSERT INTO replytweets
    (id, reply, "user_id", "tweet_id")
VALUES
    (4040404040404, 'This is my 1st reply to a tweet', 1010101010101, 2020202020202);

INSERT INTO replytweets
    (id, reply, "user_id", "tweet_id")
VALUES
    (6060606060606, 'This is my 2nd reply to a tweet', 5050505050505, 3030303030303);

SELECT *
FROM replytweets;

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