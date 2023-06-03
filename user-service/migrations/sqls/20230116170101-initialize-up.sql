CREATE TABLE "users" (
    "user_id" bigserial PRIMARY KEY,
    "phone" varchar NOT NULL,
    "email" varchar UNIQUE NOT NULL,
    "password" varchar NOT NULL,
    "salt" varchar NOT NULL,
    "user_type" varchar NOT NULL,
    "first_name" varchar,
    "last_name" varchar,
    "profile_pic" text,
    "verification_code" integer,
    "expiry" timestamptz,
    "verified" boolean NOT NULL DEFAULT FALSE,
    "created_at" timestamptz NOT NULL DEFAULT (now())
);

CREATE INDEX ON "users" ("phone")