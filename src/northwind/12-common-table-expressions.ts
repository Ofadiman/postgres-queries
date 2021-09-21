import { query } from "../query"

// Business requirement: Find out the number of units ordered and amount of sales for all products from the top three categories by total sales.
void query(`
WITH top_category_sales AS
(
         SELECT   category_name,
                  Sum(order_details.unit_price*quantity) AS sales
         FROM     categories
         JOIN     products
         using    (category_id)
         JOIN     order_details
         using    (product_id)
         GROUP BY category_name
         ORDER BY sales DESC limit 3 )
SELECT   category_name,
         product_name,
         Sum(order_details.quantity)            AS product_units,
         Sum(order_details.unit_price*quantity) AS product_sales
FROM     categories
JOIN     products
using    (category_id)
JOIN     order_details
using    (product_id)
WHERE    category_name IN
         (
                SELECT category_name
                FROM   top_category_sales)
GROUP BY category_name,
         product_name
ORDER BY category_name;
`)

// Second example of `WITH` queries.
void query(`
WITH slowest_products AS
(
         SELECT   product_id,
                  Sum(od.quantity)
         FROM     products
         JOIN     order_details AS od
         using    (product_id)
         GROUP BY product_id
         ORDER BY Sum(od.quantity) ASC limit 2 )
SELECT DISTINCT(company_name)
FROM            customers natural
JOIN            orders natural
JOIN            order_details
WHERE           product_id IN
                (
                       SELECT product_id
                       FROM   slowest_products);
`)

// Description: Query that utilizes `WITH` statement to select values from previous queries and use them in subsequent queries.
void query(`
WITH new_order AS
(
            insert INTO orders
                        (
                                    customer_id,
                                    employee_id,
                                    order_date,
                                    required_date
                        )
                        VALUES
                        (
                                    'ALFKI',
                                    1,
                                    '1997-03-10',
                                    '1997-03-25'
                        )
                        returning order_id )
INSERT INTO order_details
            (
                        order_id,
                        product_id,
                        unit_price,
                        quantity,
                        discount
            )
SELECT order_id,
       1,
       20,
       5,
       0
FROM   new_order;
`)

// Description: Recursion answers questions like: `Who are all the descendants of a specific person?`, `What are all the sub-components of a specific product?`. The following example uses recursion to generate a series of numbers up to 50.
void query(`
WITH recursive upto(t) AS
(
       SELECT 1
       UNION ALL
       SELECT t+1
       FROM   upto
       WHERE  t < 50 )
SELECT *
FROM   upto;
`)

// Second example of using recursion.
void query(`
WITH recursive under_responsible(firstname,lastname,title, employee_id,reports_to,level) AS
(
       SELECT firstname,
              lastname,
              title,
              employee_id,
              reports_to,
              0
       FROM   employees
       WHERE  employee_id=200
       UNION ALL
       SELECT managed.firstname,
              managed.lastname,
              managed.title,
              managed.employee_id,
              managed.reports_to,
              level+1
       FROM   employees AS managed
       JOIN   under_responsible
       ON     managed.reports_to=under_responsible.employee_id )
SELECT *
FROM   under_responsible;
`)
