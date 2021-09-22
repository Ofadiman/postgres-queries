import { query } from '../query'

/**
 * Besides built-in data types, PostgreSQL allows you to create user-defined data types through the following statements:
 *   1. `CREATE DOMAIN` creates a user-defined data type with constraints such as `NOT NULL`, `CHECK`, etc.
 *   2. `CREATE TYPE` creates a composite type used in stored procedures as the data types of returned values.
 *
 *   From the lecture I assume they are rather useless.
 */

void query(`CREATE TYPE address AS ( street_address varchar(50), street_address2 varchar(50), city varchar(50), state_region varchar(50), country varchar(50), postal_code varchar(15) );`)

// Description: Create a composite types and insert values into the table that defines constraints with them.
void query(`
CREATE TYPE address AS ( street_address varchar(50), street_address2 varchar(50), city varchar(50), state_region varchar(50), country varchar(50), postal_code varchar(15) );

CREATE TYPE full_name AS ( first_name varchar(50), middle_name varchar(50), last_name varchar(50) );

CREATE TYPE dates_to_remember AS ( birthdate DATE, age integer, anniversary DATE );

CREATE TABLE friends
  (
     name         FULL_NAME,
     address      ADDRESS,
     special_dates DATES_TO_REMEMBER
  );

INSERT INTO friends
            (name, address, special_dates)
VALUES      (ROW('Boyd', 'M', 'Gregory'),
             ROW('7777', '', 'Boise', 'Idaho', 'USA', '99999'),
             ROW('1969-02-01', 49, '2001-07-15'));
`)
