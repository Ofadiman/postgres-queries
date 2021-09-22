import { query } from "../query"

/**
 * Transaction may run in different isolation levels which will create the following phenomenas:
 *   1. Dirty reads - A transaction reads data written by another UNFINISHED transaction running at the same time (there is a chance that the unfinished transaction will be rolled back).
 *   2. Non-repeatable reads - During the same transaction you are reading the same row twice but the values have change between those 2 reads.
 *   3. Phantom reads - Occurs when in the course of a transaction, ROWS are added or removed by another transaction to the records that are being read.
 *
 * SQL standards define 4 isolation levels:
 *   1. Read uncommitted - Allows all isolation phenomenas. The lightest in case of latency because there are no locks.
 *   2. Read committed - Allows `Non-repeatable reads` and `Phantom reads`. It guarantees that any data read is committed at the moment is read but the next read in transaction might find different data.
 *   3. Repeatable reads - Allows only `Phantom reads`.
 *   4. Serializable - Does not allow any isolation phenomenas.
 *
 * PostgreSQL uses MVCC model that handles isolation levels a little bit differently.
 * In this model, the database is using snapshots to read data so there is no difference between `Read uncommitted` and `Read committed` isolation levels.
 * Default isolation level in PostgreSQL is `Read committed`.
 */

// Description: Run series of queries in a transaction.
void query(`
BEGIN TRANSACTION;
UPDATE
   products 
SET
   reorder_level = reorder_level - 5;
SELECT
   COUNT(*) 
FROM
   products 
WHERE
   units_in_stock + units_on_order < reorder_level;
END TRANSACTION;
`)

// Description: Use `SAVEPOINT` to create a reference to a place where you can come back when something goes wrong during transaction.
void query(`
START TRANSACTION;
INSERT INTO
   employees (employee_id, lastname, firstname, title, birthdate, hire_date) 
VALUES
   (
      501, 'Sue', 'Jones', 'Operations Assistant', '1999-05-23', '2017-06-13'
   );
SAVEPOINT inserted_employee;
UPDATE
   employees 
SET
   birthdate = '2025-07-11';
ROLLBACK TO inserted_employee;
UPDATE
   employees 
SET
   birthdate = '1998-05-23' 
WHERE
   employee_id = 501;
COMMIT TRANSACTION;
`)
