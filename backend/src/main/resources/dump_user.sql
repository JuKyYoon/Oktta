use webdb;

# 아이디: ssafy@ssafy.com, 비밀번호: ssafy, 권한: admin
INSERT INTO `user` (`idx`,`id`,`nickname`,`password`,`create_date`,`modify_date`,`sns_type`,`profile_img`,`role`) VALUES (1,'ssafy@ssafy.com','ssafy','$2a$10$DLvNUEdt1B5OzeTNO22EAu0q9t/f9Md1IOyi8Uc5K.v3NcUhLXxym','2022-07-22 01:27:46','2022-07-22 01:27:46',0,0,'ROLE_ADMIN');
# 아이디: user@user.com, 비밀번호: 1234, 권한: user
INSERT INTO `user` (`idx`,`id`,`nickname`,`password`,`create_date`,`modify_date`,`sns_type`,`profile_img`,`role`) VALUES (2,'user@user.com','user','$2a$10$Etx4oDRo7FMJS0jXTryq7OZoWBKSoU/fCStrS5McbngbLdchZVprC','2022-07-22 01:28:39','2022-07-22 01:28:39',0,0,'ROLE_USER');
# 아이디: guest@guest.com, 비밀번호: 1234, 권한: guest
INSERT INTO `user` (`idx`,`id`,`nickname`,`password`,`create_date`,`modify_date`,`sns_type`,`profile_img`,`role`) VALUES (3,'guest@guest.com','guest','$2a$10$4SiDMrkBZFWhXFIeRPBlXeEl4KUmX9PIZ7OwFOyqqYu0Fb7FKxwBq','2022-07-22 01:28:49','2022-07-22 01:28:49',0,0,'ROLE_GUEST');

select * from user;