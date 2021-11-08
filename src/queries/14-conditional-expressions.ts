import { query } from "../utils/query"

// Description: If/else statement using SQL query.
void query(`
SELECT company_name,
       country,
       CASE
         WHEN country IN ( 'Austria', 'Germany', 'Poland', 'France',
                           'Sweden', 'Italy', 'Spain', 'UK',
                           'Ireland', 'Belgium', 'Finland', 'Norway',
                           'Portugal', 'Switzerland' ) THEN 'Europe'
         WHEN country IN ( 'Canada', 'Mexico', 'USA' ) THEN 'North America'
         WHEN country IN ( 'Argentina', 'Brazil', 'Venezuela' ) THEN 'South America'
         ELSE country
       END AS continent
FROM   customers;
`)

// Description: The `COALESCE` function is used to return a default value if selected column value is null.
void query(`SELECT company_name, COALESCE(homepage,'Call to find') from suppliers;`)

// Description: The `NULLIF` function is used to return a null if 2 values are equal.
void query(`SELECT company_name, phone, COALESCE(NULLIF(homepage,''),'Need to call') FROM suppliers;`)
