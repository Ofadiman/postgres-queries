import { query } from "../query"

// Description: Create a function that updates a table.
void query(`
CREATE 
OR REPLACE FUNCTION fix_homepage() returns void AS $$ 
UPDATE
   suppliers 
SET
   homepage = 'N/A' 
WHERE
   homepage IS NULL;
$$ language sql;
SELECT
   fix_homepage();
`)

// Description: Create a function that returns a value.
void query(`
CREATE 
OR REPLACE FUNCTION max_price() RETURNS real AS $$ 
SELECT
   MAX(unit_price) 
FROM
   products;
$$ LANGUAGE SQL;
SELECT
   max_price();
`)

// Description: Create a function that takes parameters.
void query(`
CREATE 
OR REPLACE FUNCTION customer_largest_order(cid bpchar) RETURNS double precision AS $$ 
SELECT
   MAX(order_total) 
FROM
   (
      SELECT
         SUM(quantity*unit_price) as order_total,
         order_id 
      FROM
         order_details NATURAL 
         JOIN
            orders 
      WHERE
         customer_id = cid 
      GROUP BY
         order_id
   )
   as order_total;
$$ LANGUAGE SQL;
`)
