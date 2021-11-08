import { query } from "../utils/query"

// Business requirement: Get all details about customers who placed an order in a specified period of time.
void query(`
SELECT *
FROM customers
WHERE EXISTS (SELECT customerid
             FROM orders
             WHERE customerid = customers.customerid
               AND orderdate BETWEEN '1997-04-01' AND '1997-04-30');
`)

// Another example for a similar case to the above one.
void query(`
SELECT *
FROM suppliers
WHERE NOT EXISTS (SELECT products.productid
                 FROM products
                          JOIN order_details ON products.productid = order_details.productid
                          JOIN orders ON order_details.orderid = orders.orderid
                 WHERE suppliers.supplierid = products.supplierid
                   AND orderdate BETWEEN '1996-12-01' AND '1996-12-31');
`)

// Business requirement: Find all customers who placed an order with at least 1 product with quantity being over 50.
void query(`
SELECT *
FROM customers
WHERE customerid = ANY (SELECT customerid
                        FROM orders
                                 JOIN order_details ON orders.orderid = order_details.orderid
                        WHERE quantity > 50);
`)

// Business requirement: Find products which had order amounts that were higher than the average of all the products.
void query(`
SELECT DISTINCT productname
FROM products
         JOIN order_details ON products.productid = order_details.productid
WHERE order_details.unitprice * quantity > ALL
      (SELECT AVG(order_details.unitprice * quantity)
       FROM order_details
       GROUP BY productid);
`)

// Business requirement: Find customers that are in the same country as suppliers.
void query(`
SELECT *
FROM customers
WHERE country IN (SELECT DISTINCT country
                  FROM suppliers);
`)
