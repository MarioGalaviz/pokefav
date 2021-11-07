CREATE TABLE "users" (
  "id" bigserial PRIMARY KEY,
  "username" varchar(12) UNIQUE,
  "password" varchar(12),
  "type" varchar(50)
);

INSERT INTO "users" (username, password, type)
VALUES ('test','test','test');