import { query } from "../query"

// Description: Insert values into a table.
void query(`
INSERT INTO orders
(orderid, customerid, employeeid, orderdate, requireddate, shipvia,
 freight, shipname, shipaddress, shipcity, shippostalcode, shipcountry)
VALUES (11078, 'VINET', 4, '2017-09-16', '2017-09-30', 3,
        42.5, 'Vins et alcools Chevalier', '59 rue de l''Abbaye', 'Reims', '51100', 'France');
`)

// Description: Update a value in a table. If `WHERE` clause is not present, the update will be run on EVERY row! BE CAREFUL!
void query(`
UPDATE order_details
SET quantity=40,
    discount=.05
WHERE orderid = 11078
  AND productid = 11;
`)

// Description: Delete a value in a table. If `WHERE` clause is not present, the delete will be run on EVERY row! BE CAREFUL!
void query(`
DELETE
FROM order_details
WHERE orderid = 11078
  AND productid = 11;
`)

// Description: Copy and override rows from one table into another table. Useful for making backups or copying tables for testing purposes.
void query(`
SELECT *
INTO orders_1997
FROM orders
WHERE orderdate BETWEEN '1997-01-01' AND '1997-12-31';
`)

// Description: Append rows from one table to another.
void query(`
INSERT INTO suppliers_backup
SELECT *
FROM suppliers
WHERE country IN ('Brazil', 'Argentina')
`)

// Description: `RETURNING` clause can be used to return a new row after UPDATE statement, or after deleting a row in DELETE statement.
void query(`
UPDATE order_details
SET quantity = quantity * 2
WHERE orderid = 10248
  AND productid = 11
RETURNING *;
`)
