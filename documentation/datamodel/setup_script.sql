-- MySQL Script generated by MySQL Workbench
-- Wed Jul 19 22:00:32 2017
-- Model: New Model    Version: 1.0
-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='TRADITIONAL,ALLOW_INVALID_DATES';

-- -----------------------------------------------------
-- Schema educaid_db
-- -----------------------------------------------------
DROP SCHEMA IF EXISTS `educaid_db` ;

-- -----------------------------------------------------
-- Schema educaid_db
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `educaid_db` DEFAULT CHARACTER SET utf8 ;
USE `educaid_db` ;

-- -----------------------------------------------------
-- Table `educaid_db`.`user`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `educaid_db`.`user` ;

CREATE TABLE IF NOT EXISTS `educaid_db`.`user` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `username` VARCHAR(45) NOT NULL,
  `password` VARCHAR(64) NOT NULL,
  `firstname` VARCHAR(45) NOT NULL,
  `lastname` VARCHAR(45) NOT NULL,
  `role` ENUM('USER', 'STUDENT', 'TEACHER', 'ADMIN') NOT NULL DEFAULT 'USER',
  `created` DATETIME NULL DEFAULT NOW(),
  `modified` DATETIME NULL DEFAULT NOW(),
  `activated` TINYINT(1) NULL DEFAULT 0,
  `locked` TINYINT(1) NULL DEFAULT 0,
  `token` VARCHAR(256) NULL DEFAULT NULL,
  `avatar` VARCHAR(100) NULL,
  `kid_picture` VARCHAR(100) NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `username_UNIQUE` (`username` ASC))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `educaid_db`.`level`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `educaid_db`.`level` ;

CREATE TABLE IF NOT EXISTS `educaid_db`.`level` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `name_UNIQUE` (`name` ASC))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `educaid_db`.`specialty`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `educaid_db`.`specialty` ;

CREATE TABLE IF NOT EXISTS `educaid_db`.`specialty` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `name_UNIQUE` (`name` ASC))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `educaid_db`.`level_has_specialty`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `educaid_db`.`level_has_specialty` ;

CREATE TABLE IF NOT EXISTS `educaid_db`.`level_has_specialty` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `level_id` INT UNSIGNED NOT NULL,
  `specialty_id` INT UNSIGNED NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC),
  INDEX `fk_lhs_level_id_idx` (`level_id` ASC),
  INDEX `fk_lhs_specialty_id_idx` (`specialty_id` ASC),
  CONSTRAINT `fk_lhs_level_id`
    FOREIGN KEY (`level_id`)
    REFERENCES `educaid_db`.`level` (`id`)
    ON DELETE CASCADE
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_lhs_specialty_id`
    FOREIGN KEY (`specialty_id`)
    REFERENCES `educaid_db`.`specialty` (`id`)
    ON DELETE CASCADE
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `educaid_db`.`class`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `educaid_db`.`class` ;

CREATE TABLE IF NOT EXISTS `educaid_db`.`class` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `level_has_specialty_id` INT UNSIGNED NOT NULL,
  `year` INT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_class_lhs_id_idx` (`level_has_specialty_id` ASC),
  CONSTRAINT `fk_class_lhs_id`
    FOREIGN KEY (`level_has_specialty_id`)
    REFERENCES `educaid_db`.`level_has_specialty` (`id`)
    ON DELETE CASCADE
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `educaid_db`.`student`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `educaid_db`.`student` ;

CREATE TABLE IF NOT EXISTS `educaid_db`.`student` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `user_id` INT UNSIGNED NOT NULL,
  `class_id` INT UNSIGNED NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_student_class1_idx` (`class_id` ASC),
  INDEX `fk_student_user1_idx` (`user_id` ASC),
  CONSTRAINT `fk_student_class1`
    FOREIGN KEY (`class_id`)
    REFERENCES `educaid_db`.`class` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_student_user1`
    FOREIGN KEY (`user_id`)
    REFERENCES `educaid_db`.`user` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `educaid_db`.`subject`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `educaid_db`.`subject` ;

CREATE TABLE IF NOT EXISTS `educaid_db`.`subject` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `name_UNIQUE` (`name` ASC))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `educaid_db`.`exercice`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `educaid_db`.`exercice` ;

CREATE TABLE IF NOT EXISTS `educaid_db`.`exercice` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `subject_id` INT UNSIGNED NOT NULL,
  `level_id` INT UNSIGNED NOT NULL,
  `name` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `name_UNIQUE` (`name` ASC),
  INDEX `fk_exercice_subject1_idx` (`subject_id` ASC),
  INDEX `fk_exercice_level1_idx` (`level_id` ASC),
  CONSTRAINT `fk_exercice_subject1`
    FOREIGN KEY (`subject_id`)
    REFERENCES `educaid_db`.`subject` (`id`)
    ON DELETE CASCADE
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_exercice_level1`
    FOREIGN KEY (`level_id`)
    REFERENCES `educaid_db`.`level` (`id`)
    ON DELETE CASCADE
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `educaid_db`.`student_exercice`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `educaid_db`.`student_exercice` ;

CREATE TABLE IF NOT EXISTS `educaid_db`.`student_exercice` (
  `student_id` INT UNSIGNED NOT NULL,
  `exercice_id` INT UNSIGNED NOT NULL,
  `mark` INT NULL,
  `max_mark` INT NULL,
  `last_mark` INT NULL,
  `created` DATETIME NULL,
  `modified` DATETIME NULL,
  PRIMARY KEY (`student_id`, `exercice_id`),
  INDEX `fk_student_has_exercice_exercice1_idx` (`exercice_id` ASC),
  INDEX `fk_student_has_exercice_student1_idx` (`student_id` ASC),
  CONSTRAINT `fk_student_has_exercice_student1`
    FOREIGN KEY (`student_id`)
    REFERENCES `educaid_db`.`student` (`id`)
    ON DELETE CASCADE
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_student_has_exercice_exercice1`
    FOREIGN KEY (`exercice_id`)
    REFERENCES `educaid_db`.`exercice` (`id`)
    ON DELETE CASCADE
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `educaid_db`.`document`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `educaid_db`.`document` ;

CREATE TABLE IF NOT EXISTS `educaid_db`.`document` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(80) NOT NULL,
  `URL` VARCHAR(160) NOT NULL,
  `is_public` TINYINT(1) NULL DEFAULT 0,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `educaid_db`.`qcm`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `educaid_db`.`qcm` ;

CREATE TABLE IF NOT EXISTS `educaid_db`.`qcm` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `user_id` INT UNSIGNED NOT NULL,
  `exercice_id` INT UNSIGNED NOT NULL,
  `title` VARCHAR(64) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `title_UNIQUE` (`title` ASC),
  INDEX `fk_qcm_user1_idx` (`user_id` ASC),
  INDEX `fk_qcm_exercice1_idx` (`exercice_id` ASC),
  CONSTRAINT `fk_qcm_user1`
    FOREIGN KEY (`user_id`)
    REFERENCES `educaid_db`.`user` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_qcm_exercice1`
    FOREIGN KEY (`exercice_id`)
    REFERENCES `educaid_db`.`exercice` (`id`)
    ON DELETE CASCADE
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `educaid_db`.`qcm_question`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `educaid_db`.`qcm_question` ;

CREATE TABLE IF NOT EXISTS `educaid_db`.`qcm_question` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `qcm_id` INT UNSIGNED NOT NULL,
  `answer_nb` INT NOT NULL,
  `question` VARCHAR(500) NOT NULL,
  `answer1` VARCHAR(100) NOT NULL,
  `answer2` VARCHAR(100) NOT NULL,
  `answer3` VARCHAR(100) NULL,
  `answer4` VARCHAR(100) NULL,
  `answer5` VARCHAR(100) NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_qcm_question_qcm1_idx` (`qcm_id` ASC),
  CONSTRAINT `fk_qcm_question_qcm1`
    FOREIGN KEY (`qcm_id`)
    REFERENCES `educaid_db`.`qcm` (`id`)
    ON DELETE CASCADE
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `educaid_db`.`course`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `educaid_db`.`course` ;

CREATE TABLE IF NOT EXISTS `educaid_db`.`course` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `subject_id` INT UNSIGNED NOT NULL,
  `class_id` INT UNSIGNED NOT NULL,
  `user_id` INT UNSIGNED NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_course_subject1_idx` (`subject_id` ASC),
  INDEX `fk_course_class1_idx` (`class_id` ASC),
  INDEX `fk_course_user1_idx` (`user_id` ASC),
  CONSTRAINT `fk_course_subject1`
    FOREIGN KEY (`subject_id`)
    REFERENCES `educaid_db`.`subject` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_course_class1`
    FOREIGN KEY (`class_id`)
    REFERENCES `educaid_db`.`class` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_course_user1`
    FOREIGN KEY (`user_id`)
    REFERENCES `educaid_db`.`user` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `educaid_db`.`course_has_document`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `educaid_db`.`course_has_document` ;

CREATE TABLE IF NOT EXISTS `educaid_db`.`course_has_document` (
  `course_id` INT UNSIGNED NOT NULL,
  `document_id` INT UNSIGNED NOT NULL,
  PRIMARY KEY (`course_id`, `document_id`),
  INDEX `fk_course_has_document_document1_idx` (`document_id` ASC),
  INDEX `fk_course_has_document_course1_idx` (`course_id` ASC),
  CONSTRAINT `fk_course_has_document_course1`
    FOREIGN KEY (`course_id`)
    REFERENCES `educaid_db`.`course` (`id`)
    ON DELETE CASCADE
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_course_has_document_document1`
    FOREIGN KEY (`document_id`)
    REFERENCES `educaid_db`.`document` (`id`)
    ON DELETE CASCADE
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `educaid_db`.`course_has_exercice`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `educaid_db`.`course_has_exercice` ;

CREATE TABLE IF NOT EXISTS `educaid_db`.`course_has_exercice` (
  `course_id` INT UNSIGNED NOT NULL,
  `exercice_id` INT UNSIGNED NOT NULL,
  PRIMARY KEY (`course_id`, `exercice_id`),
  INDEX `fk_course_has_exercice_exercice1_idx` (`exercice_id` ASC),
  INDEX `fk_course_has_exercice_course1_idx` (`course_id` ASC),
  CONSTRAINT `fk_course_has_exercice_course1`
    FOREIGN KEY (`course_id`)
    REFERENCES `educaid_db`.`course` (`id`)
    ON DELETE CASCADE
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_course_has_exercice_exercice1`
    FOREIGN KEY (`exercice_id`)
    REFERENCES `educaid_db`.`exercice` (`id`)
    ON DELETE CASCADE
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `educaid_db`.`help_request`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `educaid_db`.`help_request` ;

CREATE TABLE IF NOT EXISTS `educaid_db`.`help_request` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `user_id_ask` INT UNSIGNED NOT NULL,
  `class_id_ask` INT UNSIGNED NOT NULL,
  `exercice_id` INT UNSIGNED NOT NULL,
  `user_id` INT UNSIGNED NULL,
  `helpful` INT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_help_request_user2_idx` (`user_id` ASC),
  INDEX `fk_help_request_exercice1_idx` (`exercice_id` ASC),
  INDEX `fk_help_request_user1_idx` (`user_id_ask` ASC),
  INDEX `fk_help_request_class1_idx` (`class_id_ask` ASC),
  CONSTRAINT `fk_help_request_user2`
    FOREIGN KEY (`user_id`)
    REFERENCES `educaid_db`.`user` (`id`)
    ON DELETE CASCADE
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_help_request_exercice1`
    FOREIGN KEY (`exercice_id`)
    REFERENCES `educaid_db`.`exercice` (`id`)
    ON DELETE CASCADE
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_help_request_user1`
    FOREIGN KEY (`user_id_ask`)
    REFERENCES `educaid_db`.`user` (`id`)
    ON DELETE CASCADE
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_help_request_class1`
    FOREIGN KEY (`class_id_ask`)
    REFERENCES `educaid_db`.`class` (`id`)
    ON DELETE CASCADE
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
