import { query } from "../utils/query"

void query(`SELECT companyname FROM customers UNION SELECT companyname FROM suppliers;`)

void query(`(SELECT city, country FROM customers INTERSECT SELECT city, country FROM suppliers) ORDER BY country;`)

void query(`SELECT COUNT(*) FROM (SELECT city FROM customers INTERSECT SELECT city FROM suppliers) AS same_city;`)
