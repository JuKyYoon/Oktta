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
    `role` enum('ROLE_USER','ROLE_ADMIN','ROLE_GUEST') DEFAULT 'ROLE_GUEST',
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
>>>>>>> dev
    `user_id` VARCHAR(50) NOT NULL UNIQUE,
    `puuid` VARCHAR(100) NOT NULL UNIQUE,
    `tier` tinyint NOT NULL,
    `account_id` VARCHAR(100) NOT NULL,
    `summoner_name` VARCHAR(50) NOT NULL,
    `create_date` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    `revoked_date` TIMESTAMP DEFAULT NULL,
    `ip_address` INT UNSIGNED NULL,
    CONSTRAINT `fk_refresh_token_user_id_user_id` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE CASCADE,
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
    `user_id` VARCHAR(50) NOT NULL,
    `token` VARCHAR(50) NOT NULL UNIQUE,
    `create_date` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `expire_date` TIMESTAMP NOT NULL,
    PRIMARY KEY(`user_id`),
    CONSTRAINT `fk_user_user_auth_token_idx_user_idx` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE CASCADE
);