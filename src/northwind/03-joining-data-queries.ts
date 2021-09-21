import { query } from "../query"

// Business requirement: Getting all data from 2 columns.
void query("SELECT * FROM products LEFT JOIN suppliers on products.supplierid = suppliers.supplierid;")

// Business requirement: Getting specified data from many columns without NULL values with advanced filter conditions to generate a report.
void query(`
SELECT companyname,
       productname,
       categoryname,
       orderdate,
       order_details.unitprice,
       quantity
FROM orders
         INNER JOIN order_details ON orders.orderid = order_details.orderid
         INNER JOIN customers ON customers.customerid = orders.customerid
         INNER JOIN products ON products.productid = order_details.productid
         INNER JOIN categories ON categories.categoryid = products.categoryid
WHERE categoryname = 'Seafood'
  AND order_details.unitprice * quantity >= 500;
  `)

// Business requirement: Similar to the above one.
void query(`
SELECT productname, orderid
FROM products
         LEFT JOIN order_details ON products.productid = order_details.productid
WHERE orderid IS NULL;
`)

// Business requirement: Similar to the above one.
void query(`
SELECT productname,
       categoryname
FROM categories
         FULL JOIN products ON products.categoryid = categories.categoryid;
`)

// Business requirement: None.
// Description: The `USING` keyword is used to reduce typings in queries.
void query(`SELECT *
FROM orders
         JOIN order_details USING (orderid)
         JOIN products USING (productid);
`)

// Business requirement: None.
// Description: The `NATURAL JOIN` is a syntactic sugar for other types of joins. It can be used with other keywords (e.g. `NATURAL INNER JOIN`). Important requirement is that the foreign key is named the same in both tables (e.g. `orders` and `order_details` are using `order_id` column name).
void query(`
SELECT *
FROM customers
         NATURAL JOIN orders
         NATURAL JOIN order_details;
`)
