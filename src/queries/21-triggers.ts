import { query } from "../utils/query"

// Description: Create a trigger that will insert a value into `last_updated` column after create or update.
void query(`
ALTER TABLE employees ADD COLUMN last_updated TIMESTAMP;


CREATE OR REPLACE FUNCTION employees_timestamp() RETURNS TRIGGER AS $$
BEGIN

	NEW.last_updated := now();
	RETURN NEW;

END;
$$ LANGUAGE PLPGSQL;


DROP TRIGGER IF EXISTS employees_timestamp ON employees;


CREATE TRIGGER employees_timestamp
BEFORE
INSERT
OR
UPDATE ON employees
FOR EACH ROW EXECUTE FUNCTION employees_timestamp();
`)

// Description: Create a trigger that runs for the whole table.
void query(`
CREATE TABLE order_details_audit (OPERATION char(1) NOT NULL, userid text NOT NULL, stamp TIMESTAMP NOT NULL, order_id smallint NOT NULL, product_id smallint NOT NULL, unit_price real NOT NULL, quantity smallint NOT NULL, discount real)

CREATE OR REPLACE FUNCTION audit_order_details() RETURNS TRIGGER AS $$
BEGIN
	IF (TG_OP == 'DELETE') THEN
		INSERT INTO order_details_audit
		SELECT 'D',user,now(),o.* FROM old_table o;
	ELSIF (TG_OP == 'UPDATE') THEN
		INSERT INTO order_details_audit
		SELECT 'U',user,now(),n.* FROM new_table n;
	ELSIF (TG_OP == 'INSERT') THEN
		INSERT INTO order_details_audit
		SELECT 'U',user,now(),n.* FROM new_table n;
	END IF;
	RETURN NULL;

END;
$$ LANGUAGE PLPGSQL;

DROP TRIGGER IF EXISTS audit_order_details_insert ON order_details;

CREATE TRIGGER audit_order_details_insert AFTER
INSERT ON order_details REFERENCING NEW TABLE AS new_table
FOR EACH STATEMENT EXECUTE FUNCTION audit_order_details();
`)
