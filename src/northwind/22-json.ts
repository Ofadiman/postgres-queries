import { query } from '../query'

/**
 * PostgreSQL has 2 types for declaring JSON values: `json` and `jsonb`. The vast majority of time you want to use `jsonb` type because it allows to execute all kinds of operators provided by PostgreSQL.
 */

void query(`
CREATE TABLE books (id serial, book_info JSONB);

INSERT INTO books (book_info)
VALUES ('{"title": "Introduction To Data Mining", "author": ["Pang-ning Tan", "Michael Steinbach", "Vipin Kumar"], "publisher":"Addison Wesley", "date": 2006}');

SELECT book_info -> 'author' FROM books;

INSERT INTO books (book_info) VALUES ('{"title": "Artificial Intelligence With Uncertainty");

SELECT book_info -> 'title' FROM books;
`)
