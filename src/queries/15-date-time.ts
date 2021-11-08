import { query } from "../utils/query"

/**
 * 1. You can specify the precision of seconds value (from 0 to 6 digits).
 * 2. You can allow time zones (by default time zones are disabled).
 * 3. `TIMESTAMP WITH TIME ZONE` date type is the most universal and stores all the information about time you will need.
 */

// Description: Set a date style used by PostgreSQL.
void query(`SET DateStyle = 'ISO,DMY';`)

// Description: Add a column with `TIMESTAMP WITH TIME ZONE` data type.
void query(`ALTER TABLE promotions ADD COLUMN end_time_stamp TIMESTAMP WITH TIME ZONE;`)

// Description: Use `EXTRACT` function to get a double precision number of years in an age.
void query(`SELECT EXTRACT(YEAR FROM age(birthdate)), first_name, last_name FROM employees;`)
// Description: Similar query using using `date_part` function.
void query(`SELECT date_part('day', shipped_date) FROM orders;`)

// Description: Cast one date type to another with `::` operator.
void query(`SELECT hire_date::TIMESTAMP FROM employees;`)
