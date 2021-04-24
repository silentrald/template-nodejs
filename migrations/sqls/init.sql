CREATE DATABASE tutorial_db;
CREATE ROLE tutorial_user WITH LOGIN PASSWORD 'password';
GRANT ALL PRIVILEGES ON DATABASE tutorial_db TO tutorial_user;

\c usg_document_tracker_db
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

\q

-- psql -h localhost -p 5432 -U tutorial_user -W -d tutorial_db