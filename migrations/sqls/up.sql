-- DO $$
-- BEGIN
--     IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'sample_enum') THEN
--         CREATE TYPE sample_enum AS ENUM();
--     END IF;
-- END
-- $$;

CREATE TABLE IF NOT EXISTS groups (
    group_id    UUID        PRIMARY KEY DEFAULT uuid_generate_v4(),
    name        VARCHAR(20) NOT NULL UNIQUE
);

CREATE TABLE IF NOT EXISTS users (
    user_id                 UUID            PRIMARY KEY DEFAULT uuid_generate_v4(),
    username                VARCHAR(30)     NOT NULL UNIQUE,
    email                   VARCHAR(256)    NOT NULL,
    password                VARCHAR(60)     NOT NULL,
    group_id                UUID            NOT NULL,
    FOREIGN KEY(group_id)   REFERENCES      groups
);
