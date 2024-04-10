/* this file will store the database script until i figure out something better */

/* BEGIN DROP */
DROP TABLE IF EXISTS guardian;
DROP TABLE IF EXISTS student;
DROP TABLE IF EXISTS course;
DROP TABLE IF EXISTS grade;
DROP TABLE IF EXISTS class;
DROP TABLE IF EXISTS class_student;
/* END DROP */

/* BEGIN CREATE */
CREATE TABLE guardian(
	id BIGINT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    created_dth DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_dth DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    name VARCHAR(64) CHARACTER SET UTF8mb4 NOT NULL
);
CREATE TABLE student(
	id BIGINT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    created_dth DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_dth DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    name VARCHAR(64) CHARACTER SET UTF8mb4 NOT NULL,
    birth_dt DATE NOT NULL,
    guardian_id BIGINT NOT NULL REFERENCES guardian(id)
);
CREATE TABLE course(
	id BIGINT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    created_dth DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_dth DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    name VARCHAR(64) CHARACTER SET UTF8mb4 NOT NULL,
    acronym VARCHAR(64) CHARACTER SET UTF8mb4 NOT NULL
);
CREATE TABLE grade(
	id BIGINT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    created_dth DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_dth DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    name VARCHAR(64) CHARACTER SET UTF8mb4 NOT NULL,
    acronym VARCHAR(64) CHARACTER SET UTF8mb4 NOT NULL,
    course_id BIGINT NOT NULL REFERENCES course(id),
    next_grade_id BIGINT REFERENCES grade(id)
);
CREATE TABLE class(
	id BIGINT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    created_dth DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_dth DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    letter VARCHAR(1) CHARACTER SET UTF8mb4 NOT NULL,
    grade_id BIGINT NOT NULL REFERENCES grade(id),
    year BIGINT NOT NULL
);
CREATE TABLE class_student(
	class_id BIGINT NOT NULL REFERENCES class(id),
    student_id BIGINT NOT NULL REFERENCES student(id),
    created_dth DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_dth DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY(class_id, student_id)
);

/* END CREATE */

/* BEGIN DATA */
INSERT INTO guardian (name) VALUES 
    ('John Doe'),
    ('Jane Smith'),
    ('Michael Johnson'),
    ('Emily Brown'),
    ('William Taylor'),
    ('Emma Wilson'),
    ('Alexander Martinez'),
    ('Olivia Anderson'),
    ('James Lee'),
    ('Sophia Garcia'),
    ('Benjamin Lopez'),
    ('Isabella Perez'),
    ('Daniel Wilson'),
    ('Ava Gonzalez'),
    ('Matthew Rodriguez'),
    ('Charlotte Hernandez'),
    ('Jacob Smith'),
    ('Amelia Brown'),
    ('Ethan Johnson'),
    ('Mia Taylor');

INSERT INTO student (name, birth_dt, guardian_id) VALUES 
    ('Alice Doe', '2010-05-15', 1),
    ('Bob Smith', '2011-07-20', 2),
    ('Charlie Johnson', '2012-09-25', 3),
    ('Daisy Brown', '2013-11-30', 4),
    ('Ella Taylor', '2014-01-05', 5),
    ('Finn Wilson', '2015-03-10', 6),
    ('Grace Martinez', '2016-05-15', 7),
    ('Henry Anderson', '2017-07-20', 8),
    ('Ivy Lee', '2018-09-25', 9),
    ('Jack Garcia', '2019-11-30', 10),
    ('Kate Lopez', '2020-01-05', 11),
    ('Liam Perez', '2021-03-10', 12),
    ('Molly Wilson', '2010-05-15', 13),
    ('Noah Gonzalez', '2011-07-20', 14),
    ('Olivia Rodriguez', '2012-09-25', 15),
    ('Peter Hernandez', '2013-11-30', 16),
    ('Quinn Smith', '2014-01-05', 17),
    ('Rose Brown', '2015-03-10', 18),
    ('Sam Johnson', '2016-05-15', 19),
    ('Tina Taylor', '2017-07-20', 20),
    ('Sophie Smith', '2011-09-25', 2), -- Sibling of Bob Smith
    ('Charlie Smith', '2012-11-30', 2), -- Sibling of Bob Smith
    ('James Taylor', '2014-03-10', 5),  -- Sibling of Ella Taylor
    ('Emma Taylor', '2014-05-15', 5),   -- Sibling of Ella Taylor
    ('Lily Wilson', '2015-07-20', 6),   -- Sibling of Finn Wilson
    ('Mason Wilson', '2015-09-25', 6),  -- Sibling of Finn Wilson
    ('Sophia Brown', '2013-01-05', 4),  -- Sibling of Daisy Brown
    ('Oliver Brown', '2013-03-10', 4),  -- Sibling of Daisy Brown
    ('Alexander Johnson', '2016-07-20', 3),  -- Sibling of Charlie Johnson
    ('Ava Johnson', '2016-09-25', 3),   -- Sibling of Charlie Johnson
    ('Ethan Anderson', '2018-11-30', 8),   -- Sibling of Henry Anderson
    ('Lucas Anderson', '2018-01-05', 8),   -- Sibling of Henry Anderson
    ('Emily Lopez', '2021-05-15', 11),   -- Sibling of Kate Lopez
    ('Elijah Lopez', '2021-07-20', 11),  -- Sibling of Kate Lopez
    ('Isaac Perez', '2020-09-25', 12),   -- Sibling of Liam Perez
    ('Aria Perez', '2020-11-30', 12),    -- Sibling of Liam Perez
    ('Madison Wilson', '2011-03-10', 6),  -- Sibling of Finn Wilson
    ('Evelyn Wilson', '2011-05-15', 6),   -- Sibling of Finn Wilson
    ('Jacob Taylor', '2012-07-20', 5),   -- Sibling of Ella Taylor
    ('Sofia Taylor', '2012-09-25', 5),   -- Sibling of Ella Taylor
    ('Daniel Smith', '2013-11-30', 13),  -- Sibling of Bob Smith
    ('Harper Smith', '2014-01-05', 13);   -- Sibling of Bob Smith;

INSERT INTO course (name, acronym) VALUES ('Elementary School', 'ES');
INSERT INTO course (name, acronym) VALUES ('Middle School', 'MS');
INSERT INTO course (name, acronym) VALUES ('High School', 'HS');

INSERT INTO grade (name, acronym, course_id, next_grade_id) VALUES ('12º Grade', '12º', 3, NULL);
INSERT INTO grade (name, acronym, course_id, next_grade_id) VALUES ('11º Grade', '11º', 3, 1);
INSERT INTO grade (name, acronym, course_id, next_grade_id) VALUES ('10º Grade', '10º', 3, 2);
INSERT INTO grade (name, acronym, course_id, next_grade_id) VALUES ('9º Grade', '9º', 3, 3);
INSERT INTO grade (name, acronym, course_id, next_grade_id) VALUES ('8º Grade', '8º', 2, 4);
INSERT INTO grade (name, acronym, course_id, next_grade_id) VALUES ('7º Grade', '7º', 2, 5);
INSERT INTO grade (name, acronym, course_id, next_grade_id) VALUES ('6º Grade', '6º', 2, 6);
INSERT INTO grade (name, acronym, course_id, next_grade_id) VALUES ('5º Grade', '5º', 1, 7);
INSERT INTO grade (name, acronym, course_id, next_grade_id) VALUES ('4º Grade', '4º', 1, 8);
INSERT INTO grade (name, acronym, course_id, next_grade_id) VALUES ('3º Grade', '3º', 1, 9);
INSERT INTO grade (name, acronym, course_id, next_grade_id) VALUES ('2º Grade', '2º', 1, 10);
INSERT INTO grade (name, acronym, course_id, next_grade_id) VALUES ('1º Grade', '1º', 1, 11);
/* END DATA */