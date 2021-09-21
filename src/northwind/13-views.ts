import { query } from "../query"

/**
 * A view is a named query that provides another way to present data in the database tables.
 * Views are used when:
 *   1. You want to save time from having to type complex queries.
 *   2. Grant permissions.
 *
 * Not all views can be updated.You can update, delete or insert into a view if:
 *   1. Only 1 table is referenced in `FROM` statement (could be another updatable view).
 *   2. A view does not have `GROUP BY`, `HAVING`, `LIMIT`, `DISTINCT`, `UNION`, `INTERSECT` and `EXCEPT` in the query.
 *   3. A view does not have window functions, set returning functions or aggregate functions.
 *
 * If you want to remove or update view columns you usually have to drop a view and recreate it with `CREATE OR REPLACE` syntax.
 * The `WITH CHECK OPTION` statement ensures that the changes to the base tables through the view satisfy the view-defining condition.
 */

// Description: Create a view.
void query(`
CREATE VIEW customer_order_details
AS
  SELECT company_name,
         orders.customer_id,
         employee_id,
         order_date,
         required_date,
         shipped_date,
         ship_via,
         freight,
         ship_name,
         ship_address,
         ship_city,
         ship_region,
         ship_postal_code,
         ship_country,
         order_details.*
  FROM   customers
         JOIN orders
           ON customers.customer_id = orders.customer_id
         JOIN order_details
           ON order_details.order_id = orders.order_id;
`)

// Description: Select data from a view.
void query(`
SELECT *
FROM customer_order_details
WHERE customer_id=3;
`)

// Description: Replace an already existing view or create it.
void query(`
CREATE OR REPLACE VIEW customer_order_details
AS
  SELECT *
  FROM   customers
         join orders
           ON customers.customer_id = orders.customer_id
         join order_details
           ON order_details.order_id = orders.order_id;
`)

// Description: Use `WITH LOCAL CHECK OPTION` statement to make sure that incorrect data won't get into a view.
void query(`
CREATE OR REPLACE view protein_products
AS
  SELECT *
  FROM   products
  WHERE  category_id IN ( 4, 6, 8 )
WITH LOCAL CHECK OPTION; 
`)

// Description: Delete a view.
void query(`DROP VIEW IF EXISTS customer_order_detailed;`)
