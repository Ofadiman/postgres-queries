import { query } from "../query"

/**
 * Window functions are similar to aggregate functions but they do not reduce number of rows returned by the query.
 */

// Description: Query will return all rows and each row will have additional column `avg` with value equal to average price product in product category.
void query(`
SELECT category_name,
       product_name,
       unit_price,
       AVG(unit_price)
         OVER (
           partition BY category_name)
FROM   products
       JOIN categories
         ON categories.category_id = products.category_id 
`)

// Business requirement: Fraud detection.
// Description: Find and order which is 5 times greater than average order of the customer.
void query(`SELECT company_name,
       order_id,
       amount,
       average_order
FROM   (SELECT company_name,
               order_id,
               amount,
               Avg(amount)
                 OVER (
                   partition BY company_name) AS average_order
        FROM   (SELECT company_name,
                       orders.order_id,
                       Sum(unit_price * quantity) AS amount
                FROM   customers
                       JOIN orders
                         ON orders.customer_id = customers.customer_id
                       JOIN order_details
                         ON orders.order_id = order_details.order_id
                GROUP  BY company_name,
                          orders.order_id) AS order_amounts) AS order_averages
WHERE  amount > 5 * average_order
ORDER  BY company_name;
`)

// Business requirement: Find 2 most valuable items ordered for each order record.
void query(`
SELECT *
FROM   (SELECT orders.order_id,
               product_id,
               unit_price,
               quantity,
               Rank()
                 OVER (
                   partition BY order_details.order_id
                   ORDER BY (quantity*unit_price) DESC) AS rank_amount
        FROM   orders
               natural JOIN order_details) AS ranked
WHERE  rank_amount <= 2;
`)
