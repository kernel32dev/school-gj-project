/* this file will store the database script until i figure out something better */

/* BEGIN DROP */
DROP TABLE IF EXISTS tb_test;
/* END DROP */

/* BEGIN CREATE */
CREATE TABLE tb_test(
	id BIGINT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(64) CHARACTER SET UTF8mb4 NOT NULL,
    value VARCHAR(64) CHARACTER SET UTF8mb4 NOT NULL
);
/* END CREATE */

/* BEGIN DATA */
INSERT INTO tb_test(name, value) VALUES ('nameA', 'valueA');
INSERT INTO tb_test(name, value) VALUES ('nameB', 'valueB');
INSERT INTO tb_test(name, value) VALUES ('nameC', 'valueC');
/* END DATA */