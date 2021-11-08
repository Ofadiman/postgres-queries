import { query } from "../utils/query"

/**
 * 1. When you execute the same query multiple times the consequent executions should be faster because all the data is in RAM (unless it got flushed because other data was more important and the database decided to swap it).
 * 2. There are 2 types of costs while running queries. I/O cost (reading from disk) and CPU cost (processing data).
 * 3. Relation pages are 8kB chunks of data. Every table and index is stored as an array of pages of fixed size (8kB). When a database pulls a data from disk it reads and loads into memory the whole page at once.
 * 4. With multi column indexes make sure that the index is being used properly. If you have a multi column index on e.g. (customer_id, order_id) you can use it to search on `customer_id` column or `customer_id` and `order_id` columns but you cannot use it to search for `order_id` column only.
 * 5. Sometimes you may want to create indexes on uppercase strings (e.g. to ignore letter casing typos by users). You may create an index on the `UPPER` function call which will persists values in uppercase letters so that you can search by uppercase strings only.
 * 6. There are 6 types of indexes available (in PostgreSQL) which are B-Tree, Hash, GIN, Gist, BRIN and SP-GiST.
 * 7. Pattern matching is slow on B-Tree indexes (e.g. LIKE). Use GIN index for full text search.
 */

// Description: Create a unique index on specific column. The `UNIQUE` keyword prevents duplicate values in the column.
void query(`CREATE UNIQUE INDEX idx_employees_employee_id ON employees (employee_id);`)

// Description: Create a compound index on 2 columns.
void query(`CREATE INDEX idx_orders_customer_id_order_id ON orders (customer_id, order_id);`)

// Description: Remove an index from a database.
void query(`DROP INDEX idx_orders_customer_id_order_id;`)

// Description: Query that shows all the activity in the database. It's useful when e.g. you make a mistake and try to insert 50kk rows at once (which will take forever). You will be able to see the process that is inserting rows and kill it.
void query(`SELECT * FROM pg_stat_activity WHERE state = 'active';`)

// Description: Gracefully stop an unwanted running process.
void query(`SELECT pg_cancel_backend(PID);`)

// Description: Forcefully stop an unwanted running process. Be careful here because it may lead to database restart.
void query(`SELECT pg_terminate_backend(PID);`)

// Description: Select the total size of records that take up `orders` table (format in a better readable way).
void query(`SELECT pg_size_pretty(pg_relation_size('orders'));`)

// Description: Create an index on a function call.
void query(`CREATE INDEX idx_product_upper_name ON products (UPPER(name));`)
void query(`CREATE INDEX idx_person_full_name ON customers ((customers.first_name || ' ' || customers.last_name));`)

// Description: Create a GIN index to speed up text search queries (e.g. `LIKE '%ant%')You must enable trigram feature of PostgreSQL on the database. `trgm` stands for trigram.
void query(`
CREATE EXTENSION pg_trgm;
CREATE INDEX trgm_idx_performance_test_location ON performance_test USING gin (location gin_trgm_ops);
`)
