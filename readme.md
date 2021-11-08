# Postgres Queries

Postgresql database query examples.

## Restore a database from a .tar file

To import example data into a database running inside a docker container, execute the following commands:

```shell
# Start all containers
yarn up
# Attach stdin to the container running postgres database
docker exec -it learning-postgresql_learning-postgresql-database_1 bash
# Restore database
pg_restore --host localhost --port 5432 --username "postgres" --dbname "postgres" --no-password  --verbose "<filename>.tar"
```
