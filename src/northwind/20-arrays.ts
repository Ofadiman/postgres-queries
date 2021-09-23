import { query } from "../query"

/**
 * PostgreSQL has array data type. You can declare array size but iit will be ignored (it's only used for documentation purposes).
 */

// Description: Create a column that will store array data type.
void query(`
CREATE TABlE salary_employees
    (
        name           text,
        pay_by_quarter array
    );
`)

// Description: Insert values into table that has a column of type array.
void query(`
INSERT INTO salary_employees
    (
        name,
        pay_by_quarter,
        schedule
    )
VALUES
    (
        'Bill', '{20000, 20000, 20000, 20000}', '{{"meeting", "training"},{"lunch", "sales call"}}'
    );
`)

// Description: Get an item at index 2 inside an array.
void query(`
SELECT
    children [2]
FROM
    friends;
`)

// Description: Get a range of values from an array. In this case the query will return second and third item.
void query(`
SELECT
    pay_by_quarter [2:3]
FROM
    salary_employees;
`)

// Description: Update item at index 4 inside an array.
void query(`
UPDATE
    salary_employees
SET
    pay_by_quarter[4] = 26000
WHERE
    name = 'Bill';
`)

// Description: Use array indexes in `WHERE` clauses to filter items.
void query(`
SELECT
    *
FROM
    friends
WHERE
    children[0] = 'Billy' OR children[1] = 'Billy';
`)
