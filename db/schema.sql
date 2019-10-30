CREATE TABLE `monitoring`.`time_series` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `time_stamp` INT NOT NULL,
  `cpuload` TINYINT NOT NULL,
  `concurrency` INT NOT NULL,
  PRIMARY KEY (`id`));
