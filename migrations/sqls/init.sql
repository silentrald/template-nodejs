CREATE DATABASE usg_document_tracker_db;
CREATE ROLE udt_user WITH LOGIN PASSWORD 'password';
GRANT ALL PRIVILEGES ON DATABASE usg_document_tracker_db TO udt_user;

\c usg_document_tracker_db
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

\q

-- psql -h localhost -p 5432 -U udt_user -W -d usg_document_tracker_db