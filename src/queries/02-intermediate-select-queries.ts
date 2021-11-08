import { query } from "../utils/query"

// Business requirement: Create a pagination on a table.
void query("SELECT * FROM orders ORDER BY orderdate DESC, shipcity ASC LIMIT 10 OFFSET 10;")

// Business requirement: When did we have the first order from Italy?
void query("SELECT MIN(orderdate) FROM orders WHERE shipcountry = 'Italy';")

// Business requirement: What was the longest running order in France?
void query("SELECT MAX(shippeddate - orderdate) FROM orders WHERE shipcountry = 'France';")

// Business requirement: What was the longest running order in France?
void query("SELECT MAX(shippeddate - orderdate) FROM orders WHERE shipcountry = 'France';")

// Business requirement: What is the average total order price?
void query("SELECT AVG(unitprice * quantity) FROM order_details;")

// Business requirement: What customers have their contact names start with `D` letter?
void query("SELECT * FROM customers WHERE contactname LIKE 'D%';")

// Business requirement: None. Used only to increase readability of a computed values.
// Description: You cannot use aliases in WHERE and FROM clauses because there are evaluated before SELECT part. ORDER BY and GROUP BY are evaluated after SELECT so you can use aliases there.
void query("SELECT unitprice * quantity AS total_spent FROM order_details ORDER BY total_spent DESC;")

// Business requirement: Find out how many customers did not fill the region value (e.g. because you may want to send them a reminder email).
void query("SELECT * FROM customers WHERE region IS NULL;")
