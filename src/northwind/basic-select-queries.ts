import { query } from "../query"

// Business requirement: Create a report about employees and include all fields.
void query("SELECT * FROM employees;")

// Business requirement: Create a report about employees but only show some fields that are needed now.
void query("SELECT firstname, lastname FROM employees;")

// Business requirement: Check where customers of the business live.
// Query description: Select a list of countries without duplicates.
void query("SELECT DISTINCT country FROM customers;")

// Business requirement: Check how many customers is using fax.
// Query description: Count how many rows are in `fax` column that are not `null`.
void query("SELECT count(fax) FROM customers;")

// Business requirement: Check how many customers the application has.
// Query description: Count how many rows are in the `customers` table.
void query("SELECT count(*) FROM customers;")

// Business requirement: Check in how many cities the business has suppliers.
// Query description: Count how many rows are in the `city` column and remove duplicate values.
void query("SELECT count(DISTINCT city) FROM suppliers;")

// Business requirement: Find out how much money each order detail is.
void query("SELECT orderid, unitprice * quantity FROM order_details;")

// Business requirement: Find all customers that are from a specific country.
void query("SELECT * FROM customers WHERE country = 'Germany';")

// Business requirement: Find all products that cost at least 20 dollars.
void query("SELECT * FROM products WHERE unitprice >= 20;")

// Business requirement: Find all orders that have been shipped in 1996 and the freight was over 100.
void query("SELECT * FROM orders WHERE shippeddate >= '1996-01-01' AND shippeddate < '1997-01-01' AND freight > 100;")
void query("SELECT * FROM orders WHERE shippeddate BETWEEN '1996-01-01' AND '1997-01-01' AND freight > 100;")

// Business requirement: Find all orders that come from specified list of countries.
void query("SELECT * FROM orders WHERE shipcountry IN ('USA', 'UK');")
