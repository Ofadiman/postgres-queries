import { query } from '../query'

// Description: Create a new database in the current PostgreSQL server.
void query(`CREATE DATABASE custom_name;`)

// Description: Drop database in the current PostgreSQL server.
void query(`DROP DATABASE IF EXISTS custom_name;`)
