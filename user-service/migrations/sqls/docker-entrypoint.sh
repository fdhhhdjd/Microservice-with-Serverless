#!/bin/bash
set -e

# Chờ PostgreSQL khởi động
until pg_isready --host=postgres --port=5432 --username="$POSTGRES_USER" --dbname="$POSTGRES_DB"
do
  echo "Waiting for PostgreSQL to start..."
  sleep 1
done

# PostgreSQL đã khởi động, chạy các lệnh SQL
psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" --dbname "$POSTGRES_DB" <<-EOSQL
    CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
EOSQL

retry=2
for f in /docker-entrypoint-initdb.d/*.sql; do
    for ((i=1; i<=$retry; i++)); do
        if psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" --dbname "$POSTGRES_DB" -f "$f"; then
            break
        else
            echo "Error executing $f. Retrying in 5 seconds..."
            sleep 5
        fi
    done
done
