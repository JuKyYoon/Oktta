-- create user 'ssafy104'@'localhost' identified by 'ssafy1357';
-- GRANT ALL PRIVILEGES ON webdb.* to ssafy104@localhost;
-- flush privileges;

drop database IF EXISTS webdb;
create database webdb default character set utf8mb4;
use webdb;
DROP TABLE IF EXISTS `user`;
CREATE TABLE IF NOT EXISTS `user` (
    `idx` INT NOT NULL AUTO_INCREMENT,
    `id` VARCHAR(50) NOT NULL UNIQUE,
    `nickname` VARCHAR(10) NULL UNIQUE,
    `password` VARCHAR(100) NULL,
    `create_date` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    `modify_date` TIMESTAMP NULL,
    `sns_type` tinyint NOT NULL DEFAULT 0,
    `profile_img` INT NULL,
    `email_auth` BOOLEAN DEFAULT 0,
    `role` enum('ROLE_USER','ROLE_ADMIN') DEFAULT 'ROLE_USER',
    PRIMARY KEY (`idx`)
);

DROP TABLE IF EXISTS `profile_image`;
CREATE TABLE IF NOT EXISTS `profile_image` (
    `idx` INT NOT NULL AUTO_INCREMENT,
    `original_filename` VARCHAR(100) NOT NULL, 
    `saved_filename` VARCHAR(100) NOT NULL,
    `path` VARCHAR(100) NOT NULL,
    PRIMARY KEY(`idx`)
);

DROP TABLE IF EXISTS `lol_auth`;
CREATE TABLE IF NOT EXISTS `lol_auth` (
    `user_id` VARCHAR(50) NOT NULL UNIQUE,
    `puuid` VARCHAR(100) NOT NULL UNIQUE,
    `region` VARCHAR(10) NOT NULL,
    `tier` tinyint NOT NULL,
    `account_id` VARCHAR(100) NOT NULL,
    `summoner_name` VARCHAR(50) NOT NULL,
    `create_date` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT `fk_user_lol_auth_id_user_id` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE CASCADE,
    PRIMARY KEY(`user_id`)
);

DROP TABLE IF EXISTS `login_log`;
CREATE TABLE IF NOT EXISTS `login_log` (
    `idx` INT NOT NULL AUTO_INCREMENT,
    `user_id` VARCHAR(50) NOT NULL UNIQUE,
    `login_date` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    `ip_address` INT UNSIGNED NULL,
    CONSTRAINT `fk_login_log_user_id_user_id` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE CASCADE,
    PRIMARY KEY(`idx`)
);

DROP TABLE IF EXISTS `board`;
CREATE TABLE IF NOT EXISTS `board` (
    `idx` INT NOT NULL AUTO_INCREMENT,
    `user_idx` INT NOT NULL,
    `title` VARCHAR(100) NOT NULL,
    `content` TEXT NOT NULL,
    `create_date` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    `modify_date` TIMESTAMP NULL,
    `category` INT NOT NULL,
    `hit` INT DEFAULT 0,
    PRIMARY KEY(`idx`),
    CONSTRAINT `fk_user_board_idx_user_idx` FOREIGN KEY (`user_idx`) REFERENCES `user` (`idx`) ON DELETE CASCADE
);

DROP TABLE IF EXISTS `champion`;
CREATE TABLE IF NOT EXISTS `champion`(
    `idx` INT NOT NULL,
    `name` VARCHAR(20) NOT NULL,
    PRIMARY KEY(`idx`)
);


DROP TABLE IF EXISTS `vote`;
CREATE TABLE IF NOT EXISTS `vote`(
    `idx` INT NOT NULL AUTO_INCREMENT,
    `candidate1` INT NOT NULL,
    `candidate2` INT NOT NULL,
    `candidate3` INT NOT NULL,
    `candidate4` INT NOT NULL,
    `candidate5` INT NOT NULL,  
    -- 외래키 해야할까?  
    `end_date` TIMESTAMP NOT NULL,
    PRIMARY KEY(`idx`)
);

DROP TABLE IF EXISTS `debate_room`;
CREATE TABLE IF NOT EXISTS `debate_room` (
    `idx` INT NOT NULL AUTO_INCREMENT,
    `user_idx` INT NOT NULL,
    `title` VARCHAR(100) NOT NULL,
    `content` TEXT NOT NULL,
    `create_date` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    `modify_date` TIMESTAMP NULL,
    `hit` INT DEFAULT 0,
    `live` BOOLEAN DEFAULT 0,
    `vote_idx` INT NOT NULL,
    PRIMARY KEY (`idx`),
    CONSTRAINT `fk_user_debate_room_idx_user_idx` FOREIGN KEY (`user_idx`) REFERENCES `user` (`idx`) ON DELETE CASCADE,
    CONSTRAINT `fk_vote_debate_room_idx_vote_idx` FOREIGN KEY (`vote_idx`) REFERENCES `vote` (`idx`) ON DELETE CASCADE
);

DROP TABLE IF EXISTS `vote_history`;
CREATE TABLE IF NOT EXISTS `vote_history`(
    `vote_idx` INT NOT NULL,
    `user_idx` INT NOT NULL,
    `champion_idx` INT NOT NULL,
    PRIMARY KEY(`vote_idx`,`user_idx`),
    CONSTRAINT `fk_vote_vote_history_idx_vote_idx` FOREIGN KEY (`vote_idx`) REFERENCES `vote` (`idx`) ON DELETE CASCADE
);

DROP TABLE IF EXISTS `board_comment`;
CREATE TABLE IF NOT EXISTS `board_comment`(
    `idx` INT NOT NULL AUTO_INCREMENT,
    `board_idx` INT NOT NULL,
    `user_idx` INT NOT NULL,
    `content` TEXT NOT NULL,
    `create_date` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    `modify_date` TIMESTAMP NULL,
    PRIMARY KEY(`idx`),
    CONSTRAINT `fk_board_board_comment_idx_board_idx` FOREIGN KEY (`board_idx`) REFERENCES `board` (`idx`) ON DELETE CASCADE,
    CONSTRAINT `fk_user_board_comment_idx_user_idx` FOREIGN KEY (`user_idx`) REFERENCES `user` (`idx`) ON DELETE CASCADE
);


DROP TABLE IF EXISTS `debate_room_comment`;
CREATE TABLE IF NOT EXISTS `debate_room_comment`(
    `idx` INT NOT NULL AUTO_INCREMENT,
    `debate_room_idx` INT NOT NULL,
    `user_idx` INT NOT NULL,
    `content` TEXT NOT NULL,
    `create_date` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    `modify_date` TIMESTAMP NULL,
    PRIMARY KEY(`idx`),
    CONSTRAINT `fk_debate_room_debate_room_comment_idx_debate_room_idx` FOREIGN KEY (`debate_room_idx`) REFERENCES `debate_room` (`idx`) ON DELETE CASCADE,
    CONSTRAINT `fk_user_debate_room_comment_idx_user_idx` FOREIGN KEY (`user_idx`) REFERENCES `user` (`idx`) ON DELETE CASCADE
);

DROP TABLE IF EXISTS `user_auth_token`;
CREATE TABLE IF NOT EXISTS `user_auth_token`(
    `user_idx` INT NOT NULL,
    `token` VARCHAR(50) NOT NULL,
    `create_date` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    `expire_date` TIMESTAMP NULL,
    PRIMARY KEY(`user_idx`),
    CONSTRAINT `fk_user_user_auth_token_idx_user_idx` FOREIGN KEY (`user_idx`) REFERENCES `user` (`idx`) ON DELETE CASCADE
    );


/* 테스트 데이터 */
-- insert into user (id, name, password, email, mobile, address, sns_type) values ("testid", "testname", "1234", "test@test.com", 01012345678, "test_address", 0);