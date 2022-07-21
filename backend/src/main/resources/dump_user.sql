use webdb;

INSERT INTO `user` (`idx`,`id`,`nickname`,`password`,`create_date`,`modify_date`,`sns_type`,`profile_img`,`email_auth`,`role`) VALUES (1,'ssafy@ssafy.com','ssafy','$2a$10$/i70cKgFOfkz/x267FDgbOoAIXGDQCVrHj/bHMK7.T6X46F3Ns50G','2022-07-20 02:21:37','2022-07-20 02:21:37',0,0,1,'ROLE_ADMIN');
INSERT INTO `user` (`idx`,`id`,`nickname`,`password`,`create_date`,`modify_date`,`sns_type`,`profile_img`,`email_auth`,`role`) VALUES (2,'yoojt233@gmail.com','오늘은설렁탕','$2a$10$t7DdnMwZGAivneFlXjSsyug6hVUh2VNDrP3u65DI9Njl8qAlhKWxi','2022-07-20 02:23:15','2022-07-20 02:23:15',0,0,0,'ROLE_USER');
INSERT INTO `user` (`idx`,`id`,`nickname`,`password`,`create_date`,`modify_date`,`sns_type`,`profile_img`,`email_auth`,`role`) VALUES (3,'asdf1001@naver.com','오징어덮밥','$2a$10$UzJ9U2mxFXidmI8.KliiHOMFSW7e.5dS/BCZ7rsuKClR0oAcLQvkO','2022-07-20 02:24:15','2022-07-20 02:24:15',0,0,0,'ROLE_USER');

select * from user;