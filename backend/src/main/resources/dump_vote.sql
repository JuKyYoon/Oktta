use webdb;

INSERT INTO vote VALUES (1, 10, 33, 65, 19, 1, date_add(now(),INTERVAL 1 DAY));
INSERT INTO vote VALUES (2, 2, 3, 4, 5, 6, date_add(now(), INTERVAL 7 DAY));
INSERT INTO vote VALUES (3, 62, 22, 23, 34, 111, date_add(now(), INTERVAL 3 HOUR));
INSERT INTO vote VALUES (4, 110, 111, 55, 48, 26, date_add(now(), INTERVAL 1 HOUR));
INSERT INTO vote VALUES (5, 71, 2, 56, 89, 99, date_add(now(), INTERVAL 3 DAY));

select * from vote;