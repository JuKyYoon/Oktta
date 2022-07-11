use s07p11a104;
DROP TABLE IF EXISTS `user`;
CREATE TABLE IF NOT EXISTS `user` (
  `idx` INT NOT NULL AUTO_INCREMENT,
  `id` VARCHAR(50) NULL UNIQUE,
  `name` VARCHAR(10) NULL,
  `password` VARCHAR(100) NULL,
  `email` VARCHAR(50) NULL,
  `mobile` VARCHAR(11) NULL,
  `address` VARCHAR(20) NOT NULL,
  `create_date` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `modify_date` TIMESTAMP NULL,
  `sns_type` tinyint NOT NULL DEFAULT 0,
  `role` enum('ROLE_USER','ROLE_ADMIN') DEFAULT 'ROLE_USER',
  PRIMARY KEY (`idx`)
);

DROP TABLE IF EXISTS `sign_token`;
CREATE TABLE IF NOT EXISTS `sign_token` (
    `idx` BIGINT NOT NULL AUTO_INCREMENT,
    `access_token` text NOT NULL,
    `refresh_token` text NOt NULL,
    `user_id` VARCHAR(50) NOT NULL UNIQUE,
    `refresh_token_expire_time` datetime DEFAULT NULL,
    `create_date` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    `revoked_date` TIMESTAMP DEFAULT NULL,
    `ip_address` INT UNSIGNED NULL,
    CONSTRAINT `fk_refresh_token_user_id_user_id` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE CASCADE,
    PRIMARY KEY(`idx`)
);

/* 테스트 데이터 */
insert into user (id, name, password, email, mobile, address, sns_type) values ("testid", "testname", "1234", "test@test.com", 01012345678, "test_address", 0);