use webdb;

INSERT INTO board VALUES (1, 1, "Test 1", "First", now(), now(), 0, 0);
INSERT INTO board VALUES (2, 1, "Test 2", "Second", now(), now(), 0, 0);
INSERT INTO board VALUES (3, 1, "Test 3", "Third", now(), now(), 0, 0);
INSERT INTO board VALUES (4, 1, "Test 4", "Fourth", now(), now(), 0, 0);
INSERT INTO board VALUES (5, 1, "Test 5", "Fifth", now(), now(), 0, 0);
INSERT INTO board VALUES (6, 1, "이렇게 하면 될까", "맞나", now(), now(), 1, 0);
INSERT INTO board VALUES (7, 1, "맞는듯", "맞을거야", now(), now(), 1, 0);
INSERT INTO board VALUES (8, 2, "Test 6", "Sixth", now(), now(), 0, 0);
INSERT INTO board VALUES (9, 2, "Test 7", "Seventh", now(), now(), 0, 0);
INSERT INTO board VALUES (10, 3, "Test 8", "Eighth", now(), now(), 0, 0);
INSERT INTO board VALUES (11, 3, "Test 9", "Ninth", now(), now(), 0, 0);
INSERT INTO board VALUES (12, 3, "Test 10", "Tenth", now(), now(), 0, 0);
INSERT INTO board VALUES (13, 3, "Test 11", "Eleventh", now(), now(), 0, 0);
INSERT INTO board VALUES (14, 3, "Test 12", "Twelfth", now(), now(), 0, 0);
INSERT INTO board VALUES (15, 3, "Test 13", "Thirteenth", now(), now(), 0, 0);

select * from board;