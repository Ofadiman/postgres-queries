import { query } from "../utils/query"

/**
 * By definition, a sequence is an ordered list of integers. The orders of numbers in the sequence are important.
 * For example, {1,2,3,4,5} and {5,4,3,2,1} are entirely different sequences.
 * A sequence in PostgreSQL is a user-defined schema-bound object that generates a sequence of integers based on a specified specification.
 * Adding `SERIAL` keyword is equal to creating a sequence, creating a table that executes that sequence with a DEFAULT of nextval, and altering the table with `OWNED BY` statement.
 */

// Description: Create an auto-incrementing sequence.
void query(`CREATE SEQUENCE IF NOT EXISTS test_sequence2 INCREMENT 5 START WITH 33;`)

// Description: Add an auto-incrementing value to a column.
void query(`ALTER TABLE employees ALTER COLUMN employee_id SET DEFAULT nextval('employees_employee_id_sequence');`)

// Description: Rename or restart a sequence.
void query(`ALTER SEQUENCE orders_order_id_seq RESTART WITH 200000;`)
void query(`ALTER SEQUENCE test_sequence_4  RENAME TO test_sequence_four;`)

// Description: Create a `SERIAL` sequence.
void query(`
CREATE TABLE employees
  (
     employee_id SERIAL,
     NAME VARCHAR(255)
  );
`)
