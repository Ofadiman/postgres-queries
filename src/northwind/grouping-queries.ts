import { query } from "../query"

// Business requirement: Check how many customers a company has in each country.
// Description: The `COUNT(*), country` part is a syntax specific to aggregation queries.
void query(`
SELECT country, COUNT(*) as total
FROM customers
GROUP BY country
ORDER BY total DESC;
`)

// Second example of `GROUP BY` query.
void query(`
SELECT productname, SUM(quantity * order_details.unitprice) AS amount_bought
FROM products
         JOIN order_details ON order_details.productid = products.productid
         JOIN orders ON orders.orderid = order_details.orderid
WHERE orderdate BETWEEN '1997-01-01' AND '1997-12-31'
GROUP BY productname
ORDER BY amount_bought DESC;
`)

// Business requirement: Find out how much money each company made in specified period of time and filter results by minimum `total_spent` of 5000.
// Description: The `total_spent` cannot be used in `HAVING` clause because `HAVING` is being evaluated before before `SELECT`.
void query(`
SELECT companyname, round(sum(quantity * order_details.unitprice)) AS total_spent
FROM customers
         NATURAL JOIN orders
         NATURAL JOIN order_details
WHERE orderdate BETWEEN '1997-01-01' AND '1997-6-30'
GROUP BY companyname
HAVING round(sum(quantity * order_details.unitprice)) > 5000
ORDER BY total_spent DESC;
`)

// Business requirement: Find out total sales by grouped by `productname` and `categoryname`.
void query(`
SELECT productname, categoryname, SUM(order_details.unitprice * quantity)
FROM categories
         NATURAL JOIN products
         NATURAL JOIN order_details
GROUP BY GROUPING SETS ((productname), (productname, categoryname))
ORDER BY categoryname, productname;
`)

// Description: `ROLLUP` clause is a syntactic sugar for `GROUPING SETS`.
void query(`
SELECT companyname, categoryname, productname, SUM(order_details.unitprice * quantity) as total
FROM customers
         NATURAL JOIN orders
         NATURAL JOIN order_details
         JOIN products USING (productid)
         JOIN categories USING (categoryid)
GROUP BY ROLLUP (companyname, categoryname, productname)
ORDER BY companyname, categoryname, productname;
`)
