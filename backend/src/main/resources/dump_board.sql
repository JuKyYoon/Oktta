use webdb;

INSERT INTO board VALUES (1, 1, "이렇게 하면 될까", "맞나", now(), now(), 0, 0);
INSERT INTO board VALUES (2, 1, "TEST 2", "테스트 중이에요", now(), now(), 0, 0);
INSERT INTO board VALUES (3, 1, "맞는듯", "맞을거야", now(), now(), 1, 0);

select * from board;