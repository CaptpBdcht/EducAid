SET SQL_SAFE_UPDATES = 0
;

INSERT INTO user (username, password, firstname, lastname, activated, role)
VALUES ('Admin', '$2a$10$09BhYC1esxiq62p5SvTImeLlXZoutyTtbldoHlBIkLRWQYtKMcuV2', 'Admin', 'ADMIN', 1, 'ADMIN'),
	('User', '$2a$10$Vf0axSMoLDYjYgcGSs9Nquzey0tfH0kltpC/3aMfAvSpE0KWzUepu', 'User', 'USER', 1, 'USER'),
	('ProfPrimaire1', '$2a$10$r6bfB78dyHmZOCCMUSeIneIujxN86wstqVqZrYwGObwwNDLxn5pxm', 'ProfPrimo', 'PRIMAIRE1', 1, 'TEACHER'), 
	('ProfPrimaire2', '$2a$10$r6bfB78dyHmZOCCMUSeIneIujxN86wstqVqZrYwGObwwNDLxn5pxm', 'ProfAbdoul', 'PRIMAIRE2', 1, 'TEACHER'), 
	('ProfPrimaire3', '$2a$10$r6bfB78dyHmZOCCMUSeIneIujxN86wstqVqZrYwGObwwNDLxn5pxm', 'ProfKaynes', 'PRIMAIRE3', 1, 'TEACHER'),  
	('ProfMaths1', '$2a$10$r6bfB78dyHmZOCCMUSeIneIujxN86wstqVqZrYwGObwwNDLxn5pxm', 'Mato', 'MATHS1', 1, 'TEACHER'),  
	('ProfFrancais1', '$2a$10$r6bfB78dyHmZOCCMUSeIneIujxN86wstqVqZrYwGObwwNDLxn5pxm', 'Francois', 'FRANCAIS1', 1, 'TEACHER'),  
	('ProfEconomie1', '$2a$10$r6bfB78dyHmZOCCMUSeIneIujxN86wstqVqZrYwGObwwNDLxn5pxm', 'Econimus', 'ECONOMIE1', 1, 'TEACHER'),  
	('ProfAnglais1', '$2a$10$r6bfB78dyHmZOCCMUSeIneIujxN86wstqVqZrYwGObwwNDLxn5pxm', 'Anglouss', 'ANGLAIS1', 1, 'TEACHER'),  
	('StudentS1', '$2a$10$IcmE5LYxGww/9yAqSf69U.paruOyxtCbMZDnImeLOhAMI2.O9ynCC', 'Student', 'SONE', 1, 'STUDENT'), 
	('StudentS2', '$2a$10$IcmE5LYxGww/9yAqSf69U.paruOyxtCbMZDnImeLOhAMI2.O9ynCC', 'Student', 'STWO', 1, 'STUDENT'), 
	('StudentS3', '$2a$10$IcmE5LYxGww/9yAqSf69U.paruOyxtCbMZDnImeLOhAMI2.O9ynCC', 'Student', 'STHREE', 1, 'STUDENT'), 
	('StudentL1', '$2a$10$IcmE5LYxGww/9yAqSf69U.paruOyxtCbMZDnImeLOhAMI2.O9ynCC', 'Student', 'LONE', 1, 'STUDENT'), 
	('StudentL2', '$2a$10$IcmE5LYxGww/9yAqSf69U.paruOyxtCbMZDnImeLOhAMI2.O9ynCC', 'Student', 'LTWO', 1, 'STUDENT'),
	('StudentL3', '$2a$10$IcmE5LYxGww/9yAqSf69U.paruOyxtCbMZDnImeLOhAMI2.O9ynCC', 'Student', 'LTHREE', 1, 'STUDENT'),
	('StudentCP1', '$2a$10$IcmE5LYxGww/9yAqSf69U.paruOyxtCbMZDnImeLOhAMI2.O9ynCC', 'Student', 'CPONE', 1, 'STUDENT'),
	('StudentCP2', '$2a$10$IcmE5LYxGww/9yAqSf69U.paruOyxtCbMZDnImeLOhAMI2.O9ynCC', 'Student', 'CPTWO', 1, 'STUDENT'),
	('Student6e1', '$2a$10$IcmE5LYxGww/9yAqSf69U.paruOyxtCbMZDnImeLOhAMI2.O9ynCC', 'Student', 'SIXONE', 1, 'STUDENT'),
	('Student6e2', '$2a$10$IcmE5LYxGww/9yAqSf69U.paruOyxtCbMZDnImeLOhAMI2.O9ynCC', 'Student', 'SIXTWO', 1, 'STUDENT');

INSERT INTO level (name)
VALUES
	('CP'), ('CE1'), ('CE2'), ('CM1'), ('CM2'),
	('6e'), ('5e'), ('4e'), ('3e'),
	('2nde'), ('1ère'), ('Terminale');

INSERT INTO specialty (name)
VALUES
	('SES'), ('HIDA'), ('SI'),
	('S - SI'), ('S - SVT'), ('STI'), ('STG'), ('ES'), ('L'), ('Européenne');
	
INSERT INTO subject (name)
VALUES ('Mathématiques'), ('SVT'), ('Physique'), ('Chimie'), ('Physique-Chimie'),
	('SI'), ('SES'), ('Histoire des Arts'), ('Economie'),
	('Anglais'), ('Français'), ('Littérature'), ('Philosophie'),
	('Histoire'), ('Géographie'), ('Histoire-Géographie');


INSERT INTO level_has_specialty (level_id, specialty_id)
VALUES (1, NULL), (2, NULL), (3, NULL), (4, NULL), (5, NULL),
	(6, NULL), (7, NULL), (8, NULL), (9, 10),
	(10, 1), (10, 2), (10, 3),
	(11, 4), (11, 5), (11, 6),
	(12, 7), (12, 8), (12, 9);
	
INSERT INTO class (level_has_specialty_id, year)
VALUES
	(1, '2017'), (2, '2017'), (3, '2017'), (4, '2017'), (5, '2017'),
	(6, '2017'), (7, '2017'), (8, '2017'), (9, '2017'),
	(10, '2017'), (11, '2017'), (12, '2017'),
	(13, '2017'), (14, '2017'), (15, '2017'),
	(16, '2017'), (17, '2017'), (18, '2017');

/* 
 *
 * END INSERTS
 *
 */

SELECT * FROM user;
SELECT * FROM subject;
SELECT * FROM level;
SELECT * FROM level_has_specialty;
SELECT * FROM specialty;
SELECT * FROM class;
SELECT * FROM course;
SELECT * FROM student;
SELECT * FROM qcm;
SELECT * FROM qcm_question;
SELECt * FROM exercice;