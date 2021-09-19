### Importing data into a database

To import example data into a database run the following commands:

```shell
# Start all containers
yarn up
# Attach stdin to container running postgres database
docker exec -it learning-postgresql_learning-postgresql-database_1 bash
# Restore database
pg_restore --host localhost --port 5432 --username "postgres" --dbname "postgres" --no-password  --verbose "northwind.tar"
```
