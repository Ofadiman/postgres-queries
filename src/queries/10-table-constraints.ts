import { query } from "../utils/query"

/**
 * 1. `UNIQUE` constraint enforces a value inserted to a column to be unique.
 * 2. `NOT NULL` constraint disallows a value in a table to be null.
 * 3. `PRIMARY KEY` constraint is equal to `UNIQUE` and `NOT NULL` at once. It is generally used for an id field that uniquely identifies a record in a table.
 * 4. `FOREIGN KEY` constraint is a reference to another table `PRIMARY KEY`. It disallows to reference a value that does not exist in a second table which protects from having an orphaned records.
 * 5. `CHECK` constraint allows to validate data in a more complex way before a record is inserted into a table.
 */

// Description: Create a table with columns that have `NOT NULL` constraint.
void query(`
CREATE TABLE IF NOT EXISTS practices
  (
     practice_id INTEGER NOT NULL,
     practice_field VARCHAR(50) NOT NULL
  ); 
`)

// Description: Create a table with `UNIQUE` constraint.
void query(`
CREATE TABLE pets
  (
     pet_id INTEGER UNIQUE,
     NAME VARCHAR(25) NOT NULL
  ); 
`)

// Description: Add `UNIQUE` constraint to a table.
void query(`
ALTER TABLE region
  ADD CONSTRAINT region_description_constraint UNIQUE(region_description); 
`)

// Description: Create a table with `PRIMARY KEY` constraint.
void query(`
CREATE TABLE practices
  (
     practice_id INTEGER PRIMARY KEY,
     field_name VARCHAR(50) NOT NULL
  ); 
`)

// Description: Create a table with `FOREIGN KEY` constraint.
void query(`
CREATE TABLE practices
  (
     practice_id INTEGER PRIMARY KEY,
     practice_field VARCHAR(50) NOT NULL,
     employee_id INTEGER NOT NULL,
     FOREIGN KEY (employee_id) REFERENCES employees(employee_id)
  );
`)

// Description: Add `FOREIGN KEY` constraint to a column.
void query(`ALTER TABLE practices ADD CONSTRAINT practices_employee_foreign_key FOREIGN KEY (employee_id) REFERENCES employees(employee_id);`)

// Description: Create a table with `CHECK` and `DEFAULT` constraints.
void query(`
CREATE TABLE pets
  (
     pet_id INTEGER PRIMARY KEY,
     NAME VARCHAR(25) NOT NULL,
     customer_id CHAR(5) NOT NULL,
     weight INTEGER DEFAULT 5 CONSTRAINT pets_weight CHECK (weight > 0 AND weight < 200),
     FOREIGN KEY (customer_id) REFERENCES customers(customer_id)
  ); 
`)

// Description: Add `CHECK` constraint to a column.
void query(`ALTER TABLE products ADD CONSTRAINT unit_price_check CHECK (unit_price > 0);`)

// Description: Add `DEFAULT` constraint to a column.
void query(`ALTER TABLE orders ALTER COLUMN ship_via SET DEFAULT 1;`)

// Description: Change `DEFAULT` constraint on a column.
void query(`ALTER TABLE products ALTER COLUMN reorder_level SET DEFAULT 5;`)
