import { query } from "../query"

// Description: Create a table called `subscribers`.
void query(`
CREATE TABLE subscribers
  (
     firstname  VARCHAR(200),
     lastname   VARCHAR(200),
     email      VARCHAR(250),
     signup     TIMESTAMP,
     frequency  INTEGER,
  );
`)

// Description: Rename a column.
void query(`ALTER TABLE subscribers RENAME firstname TO first_name;`)

// Description: Rename a table.
void query(`ALTER TABLE subscribers RENAME TO email_subscribers;`)

// Description: Add a column to a table.
void query(`ALTER TABLE email_subscribers ADD COLUMN last_visit_date timestamp;`)

// Description: Drop a column from a table.
void query(`ALTER TABLE order_returns DROP COLUMN reason;`)

// Description: Change data type on a column.
void query(`ALTER TABLE email_subscribers ALTER COLUMN email SET DATA TYPE varchar(225);`)

// Description: Drop a table.
void query(`DROP TABLE orders;`)
