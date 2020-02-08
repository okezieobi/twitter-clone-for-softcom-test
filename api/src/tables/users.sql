/*
Connect to database as interviewprojects and RUN  \c softcomtwitterclone \i api/src/tables/users.sql
*/

CREATE EXTENSION
IF NOT EXISTS "pgcrypto";

DROP TABLE IF EXISTS users CASCADE;

CREATE TABLE users
(
    id          bigint       PRIMARY KEY NOT NULL,
    full_name   varchar(128) NOT NULL,
    email       varchar(128) NOT NULL UNIQUE,
    username    varchar(128) NOT NULL UNIQUE,
    "password"  varchar(128) NOT NULL,
    "type"      varchar(128) DEFAULT 'Client',
    is_admin    boolean      DEFAULT  false,
    created_on  timestamptz  DEFAULT NOW(),
    modified_on timestamptz  DEFAULT NOW()
);
