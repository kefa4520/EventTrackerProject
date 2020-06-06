-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema trackerdb
-- -----------------------------------------------------
DROP SCHEMA IF EXISTS `trackerdb` ;

-- -----------------------------------------------------
-- Schema trackerdb
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `trackerdb` DEFAULT CHARACTER SET utf8 ;
USE `trackerdb` ;

-- -----------------------------------------------------
-- Table `cycle`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `cycle` ;

CREATE TABLE IF NOT EXISTS `cycle` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `period_start` DATE NOT NULL,
  `period_duration` INT NOT NULL,
  `cycle_length` INT NOT NULL,
  `volume` ENUM("HEAVY", "MEDIUM", "LIGHT") NOT NULL,
  `notes` VARCHAR(1000) NULL,
  `name` VARCHAR(60) NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;

SET SQL_MODE = '';
DROP USER IF EXISTS trackeruser@localhost;
SET SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';
CREATE USER 'trackeruser'@'localhost' IDENTIFIED BY 'trackeruser';

GRANT SELECT, INSERT, TRIGGER, UPDATE, DELETE ON TABLE * TO 'trackeruser'@'localhost';

SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;

-- -----------------------------------------------------
-- Data for table `cycle`
-- -----------------------------------------------------
START TRANSACTION;
USE `trackerdb`;
INSERT INTO `cycle` (`id`, `period_start`, `period_duration`, `cycle_length`, `volume`, `notes`, `name`) VALUES (1, '2020-03-22', 8, 23, 'HEAVY', 'Prolonged cramping first two days. Minor lower back pain. ', 'march log');
INSERT INTO `cycle` (`id`, `period_start`, `period_duration`, `cycle_length`, `volume`, `notes`, `name`) VALUES (2, '2020-04-16', 6, 24, 'LIGHT', NULL, 'april ');
INSERT INTO `cycle` (`id`, `period_start`, `period_duration`, `cycle_length`, `volume`, `notes`, `name`) VALUES (3, '2020-05-06', 5, 19, 'LIGHT', NULL, 'may log');

COMMIT;

