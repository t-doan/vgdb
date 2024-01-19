set client_min_messages to warning;

-- DANGER: this is NOT how to do it in the real world.
-- `drop schema` INSTANTLY ERASES EVERYTHING.
drop schema "public" cascade;

create schema "public";

CREATE TABLE "users" (
  "userId" serial PRIMARY KEY,
  "username" text,
  "password" text,
  "profileImage" text,
  "createdAt" date,
  "bio" text
);

CREATE TABLE "games" (
  "gameId" text PRIMARY KEY,
  "name" text,
  "backgroundImage" text
);

CREATE TABLE "userList" (
  "userlistId" serial PRIMARY KEY,
  "listName" text,
  "userId" int
);

CREATE TABLE "list" (
  "type" text,
  "id" serial PRIMARY KEY,
  "userId" int
);

CREATE TABLE "listGames" (
  "listId" int,
  "gameId" text
);

CREATE TABLE "reviews" (
  "reviewId" serial PRIMARY KEY,
  "userId" int,
  "gameId" text,
  "note" text,
  "isGood" boolean,
  "isBad" boolean
);

ALTER TABLE "userList" ADD FOREIGN KEY ("userId") REFERENCES "users" ("userId");

ALTER TABLE "list" ADD FOREIGN KEY ("userId") REFERENCES "users" ("userId");

ALTER TABLE "listGames" ADD FOREIGN KEY ("listId") REFERENCES "list" ("id");

ALTER TABLE "listGames" ADD FOREIGN KEY ("gameId") REFERENCES "games" ("gameId");

ALTER TABLE "reviews" ADD FOREIGN KEY ("userId") REFERENCES "users" ("userId");

ALTER TABLE "reviews" ADD FOREIGN KEY ("gameId") REFERENCES "games" ("gameId");
