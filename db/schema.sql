CREATE TABLE `monitoring`.`time_series` (
  `id` INT NOT NULL,
  `time_stamp` TIMESTAMP NOT NULL,
  `cpuload` INT NOT NULL,
  `concurrency` INT NOT NULL,
  `source` VARCHAR(45) NOT NULL);
