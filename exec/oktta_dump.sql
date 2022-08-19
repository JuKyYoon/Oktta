-- MySQL dump 10.13  Distrib 8.0.28, for Win64 (x86_64)
--
-- Host: localhost    Database: webdb
-- ------------------------------------------------------
-- Server version	8.0.28

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `board`
--

DROP TABLE IF EXISTS `board`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `board` (
  `idx` bigint unsigned NOT NULL AUTO_INCREMENT,
  `category` int DEFAULT NULL,
  `content` longtext NOT NULL,
  `create_date` datetime DEFAULT NULL,
  `hit` bigint DEFAULT '0',
  `modify_date` datetime DEFAULT NULL,
  `title` varchar(255) NOT NULL,
  `user_idx` bigint unsigned NOT NULL,
  PRIMARY KEY (`idx`),
  KEY `FK99mdf4t9hc7f662omr9279bbk` (`user_idx`),
  CONSTRAINT `FK99mdf4t9hc7f662omr9279bbk` FOREIGN KEY (`user_idx`) REFERENCES `user` (`idx`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `board`
--

LOCK TABLES `board` WRITE;
/*!40000 ALTER TABLE `board` DISABLE KEYS */;
INSERT INTO `board` VALUES (1,0,'<p>친구들</p>','2022-08-16 04:53:08',3,'2022-08-16 04:53:08','안녕',2),(2,0,'<p>ㅁㅁㅁㅁ</p>','2022-08-18 05:56:07',0,'2022-08-18 05:56:07','ㅁㅁㅁ',1);
/*!40000 ALTER TABLE `board` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `board_comment`
--

DROP TABLE IF EXISTS `board_comment`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `board_comment` (
  `idx` bigint unsigned NOT NULL AUTO_INCREMENT,
  `content` varchar(255) DEFAULT NULL,
  `create_time` datetime DEFAULT NULL,
  `board_idx` bigint unsigned NOT NULL,
  `user_idx` bigint unsigned NOT NULL,
  PRIMARY KEY (`idx`),
  KEY `FKn8ot88hbfabrevojqy44s11bg` (`board_idx`),
  KEY `FKddfmg3qjcq72ikte2iasefyri` (`user_idx`),
  CONSTRAINT `FKddfmg3qjcq72ikte2iasefyri` FOREIGN KEY (`user_idx`) REFERENCES `user` (`idx`),
  CONSTRAINT `FKn8ot88hbfabrevojqy44s11bg` FOREIGN KEY (`board_idx`) REFERENCES `board` (`idx`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `board_comment`
--

LOCK TABLES `board_comment` WRITE;
/*!40000 ALTER TABLE `board_comment` DISABLE KEYS */;
INSERT INTO `board_comment` VALUES (1,'ㅁㅁㅁㅁ','2022-08-18 05:56:16',1,1);
/*!40000 ALTER TABLE `board_comment` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `lol_auth`
--

DROP TABLE IF EXISTS `lol_auth`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `lol_auth` (
  `user_id` varchar(255) NOT NULL,
  `account_id` varchar(255) NOT NULL,
  `create_date` datetime DEFAULT NULL,
  `puuid` varchar(255) NOT NULL,
  `summoner_name` varchar(255) NOT NULL,
  `tier` int NOT NULL,
  PRIMARY KEY (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `lol_auth`
--

LOCK TABLES `lol_auth` WRITE;
/*!40000 ALTER TABLE `lol_auth` DISABLE KEYS */;
/*!40000 ALTER TABLE `lol_auth` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `matchdata`
--

DROP TABLE IF EXISTS `matchdata`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `matchdata` (
  `match_id` varchar(255) NOT NULL,
  `user_assist` varchar(255) NOT NULL,
  `champion_id` varchar(255) NOT NULL,
  `champion_name` varchar(255) NOT NULL,
  `user_death` varchar(255) NOT NULL,
  `game_mode` varchar(255) NOT NULL,
  `user_kill` varchar(255) NOT NULL,
  `match_date` datetime NOT NULL,
  `match_tier` int DEFAULT '0',
  `participant_id` varchar(255) NOT NULL,
  `puuid` text NOT NULL,
  `summoner_id` text NOT NULL,
  `summoner_name` varchar(255) NOT NULL,
  `team_id` varchar(255) NOT NULL,
  `team_position` varchar(255) NOT NULL,
  `user_win` varchar(255) NOT NULL,
  PRIMARY KEY (`match_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `matchdata`
--

LOCK TABLES `matchdata` WRITE;
/*!40000 ALTER TABLE `matchdata` DISABLE KEYS */;
INSERT INTO `matchdata` VALUES ('KR_5980803427','5/4/5/4/4/1/5/5/8/18','266/77/45/51/25/122/64/61/81/43','Aatrox/Udyr/Veigar/Caitlyn/Morgana/Darius/LeeSin/Orianna/Ezreal/Karma','5/7/13/8/9/5/9/4/1/3','CLASSIC','3/11/7/1/0/8/7/19/7/1','2022-06-21 12:33:12',41,'1/2/3/4/5/6/7/8/9/10','smh-VCgKspZ2qg-37Y7Qrs_IWO39-HQQmwwJ6xbw6znjsvITfW3QuWV3hPotZKqmTH0Rv1IeLpZuog/YegER6SrIKserQ8qUMvyayR9d6XzhtESAAFiXeWDOmOzElR25CVMJiWZ48oeVjnh9z4HUG1lmAzlew/M4H-EKCkP012qXPc8dEjYJ7ZhO9h6CXB-0dYqIaAJRPgOkONspf62rWUXphSZclcUDgmTlx6s_ZJLw/51hh43Puxi8r9j4MC6q13Ad27TTeWouCuUPgQFI8DjMTQL25tDAr-D8_b6pnLEhPxkxp_rk68hdOFQ/k4tf6mzu9KAc-rt8P1duu6aF2StNIwjhN9UhPuYdqwGOpns9wdWpkD2wCGvcpfIIjvR-UDDFsmXJLQ/N7A8WeAoO1cB5FE1_MCi8YVT3fP9AKk1o2rFpDI0KWRmkksxScDOLWgP9vGiGVd6EXU0uYJcGj6VAQ/JeOsrfd7vjIFe9pr0ljpzx6Wm6CpsP_pQuKv6LREm5tKB7igfLPeXwHxKdDA1xR7PHj2yD0teR5FGg/WpqvPtRoANZfeIikoV0Ee5Jr9j-_cSYtll2J4s34EKNaAo3y6CgBhNGyLKNks_N7t4LHATjqZa82vg/l2QoU-nIAeAPeryCwth2jYIE6EFbwHWi7euiWtntyCzyV3cFvgDhJ88CWNvVZlFJHZ5WxMLRl3_Veg/1xZuIidlk4zD97BvSHmYUkEm8ixUW2y_jd6xvPr6MwQSGqWGBJKL-G5fyjgYYpDtHz0D6v1g-hJcuA','uDlZi1O8q-1tsZE__VwWYJGLJZUZxpKJg1DkcIUNrfCfB9I/x5_v7DaMsBMzUdry_iHJzPBjpi5X303P5bLC8qfCNDeqpJ0/oxqjVOBP7vnsffW2zazq5eDTLYRatcaMo6mxu090DBQr2YLJPZSn8aUUFg/c6AUBZyDMjku1JH8VGD5dhgMCggLaf-gd2kFaLantvotE_Q/Oa-Voau6Dyl-zyxh2V_AtDREafnrKcejESHgzYaWkrpsww/7PIbRIttWu7aloRdaOqXQHNlE6bC4gwENoagj21I7XWlpFYVsAA_Sdcb5A/CJkNuapHs4gLq6WsAhBtSaiTyA-y_DdAsC7cYZJv0w0pryY/ylyum0C7kgLrKpRJnXMP1gOZQbX1VxQ2dzgOAZ5lB9VriTE/WhEDnnLBOmkZoyqKBt7bmgnQ_CPImdU2Dy013ndoO_lzcg/iH-kFqLBcKmoNclT6F4GXwqUaTsMa-DArJPCwYegB9leOqk','노루 마약해요/ya빡치냥/그냥 먼지/CS 포기요/루루까까꿍꿍/PLAYERHYUK1/코 샥/별빛량이/짭더리퍼/twisted joker','100/100/100/100/100/200/200/200/200/200','TOP/JUNGLE/MIDDLE/BOTTOM/UTILITY/TOP/JUNGLE/MIDDLE/BOTTOM/UTILITY','false/false/false/false/false/true/true/true/true/true'),('KR_6052393911','3/5/5/5/12/8/10/3/8/11','114/238/1/81/53/54/254/39/22/99','Fiora/Zed/Annie/Ezreal/Blitzcrank/Malphite/Vi/Irelia/Ashe/Lux','10/4/5/7/6/4/8/9/3/3','CLASSIC','3/13/9/2/0/10/13/2/3/4','2022-08-02 06:04:08',0,'1/2/3/4/5/6/7/8/9/10','VeKcgxvAOK-PBsjWeawjAbpHS-fT3rABWUxkm5NieAS7uuCusLp73SoXOcbnVKOXJHAeUkrwGB5udA/MO5M2P1KojpsXbeZf5eD73GLpmuicpaGqzBUJMhx-xu1Kw3aiJkpcI2N0raN-6qLsbpDjPaKmJK0uA/gUBj8IvC5B9CoZaJNWfuVGfDnhlZfHd_OiGTzEzBDKZ8NxzmG-y6tfs391D-EB9DLhlUUUJ2SY-FXA/51hh43Puxi8r9j4MC6q13Ad27TTeWouCuUPgQFI8DjMTQL25tDAr-D8_b6pnLEhPxkxp_rk68hdOFQ/RfljxjkODEG5fpkD9-avEEVnoe_wivShtzM2219WaYEf4ZRpnor0HUnZmPq8rXVH1BqyvbkMoMxveQ/Hct6_1D13E6AcKqpNe3rIoCcGkXMnIhjgm6uitOnMudMLvFmd_jCFSpbY-hSgQNQLdAf0Rd48jCKNA/R_9x3kH-oI9gCHZ87_DyIBkrAWowNIG5cMGJDny1NhBHj-os2g_MEfgSSlwb3hdE-qCd-fsz81BTIw/E3jMjxzEXbM_lt6WD6ZBjL12--4uNJTzjZ_eENltz6R5ZjNe9DkHedhDKHTivXDoqPJKnDPHEq1WjA/RD3EDQ3ESJm9D_1MWXAlUL4CHM0NOQdM-SXd27uOQdI25cA-kypLLzoqdz3L5GzFt9XFHDlK33dfRA/_S4-_mZ1WKKD1S8JjhS-9QbHhwMlcs-ugYpEabfK5PWBEouFtkOaux0Ve9uQ3v27g8J_oWsIfzWAsw','4OrUQ3VLXpEqoKWZ2rvWqtHNQb3rQrRMycjY2ZI11OF6RfU/mSK5bzEJ0o9OuORYb-K4eBa9-bOQK1JIXF2or0owQDFQVaQ/vmybE2cZE1EvOImAD9F7JEhhvCj9g5ERJJnmZtHtH0HfNt8/c6AUBZyDMjku1JH8VGD5dhgMCggLaf-gd2kFaLantvotE_Q/Untp9erR_OGQDv5d6SHtb4UY8bKall_dtQfn8iCRUr1-2vY/nbtDtqURoq3HpyV-vIthB4k4UxU2c6-NixGMDrHHW22X3n8/WTzB5bCayG7iwOyzRaGpD4smsDL9PmOHS7eyie9kHTgxUVo/2hSTh81HS2LafXdYUozQbmwOAroolaxx3ZQLwExUURDABMc/AMO0l8ulUFZONF9FZw2oYS8qulbmgRvWh-PB1AhKhKMKjQ/cngQz0fs-v3AGQYAIlgnRSyfxXGFzb5lCObtfbd-yke0hQ','성문참새/미녁입니당/봉석이때려잡기/CS 포기요/블루안주면박아요/탑은못가/시즌3다이아1/깅소누님/쉬 라/럭스마스터박XX','100/100/100/100/100/200/200/200/200/200','TOP/JUNGLE/MIDDLE/BOTTOM/UTILITY/TOP/JUNGLE/MIDDLE/BOTTOM/UTILITY','false/false/false/false/false/true/true/true/true/true'),('KR_6061962912','5/19/16/8/12/4/8/11/12/18','122/33/75/29/20/58/64/38/21/516','Darius/Rammus/Nasus/Twitch/Nunu/Renekton/LeeSin/Kassadin/MissFortune/Ornn','13/6/7/7/9/14/9/6/8/10','ULTBOOK','10/7/7/13/9/3/12/9/14/4','2022-08-07 08:02:01',0,'1/2/3/4/5/6/7/8/9/10','ezT6IR9Jy8GG6Kbc3bSTbg4DAZzpG4qp0Z_98tNfwhtTAjDO5ima1CqotRnrbDxcSsRQQsg7FRFSEw/0Xwig5NwIgv5V8l3SNlJvuvmIRp8i5nsQFCsyOD34-K427QZku3xr6VNgUw5Ad-AV_sPsSZwSXKWZQ/uLwBz4AuvqN-ma5CMmLdekvcjeAJ5CV5dS8VoM1-cFsWR9_WiUfik7vGKSfmI0nvkrBKsLhL6bv8ow/5MdsHkPACdsz0Ua-UdkR9GFPgIY2gzgYixm74FWLUyrzBHWayHcW5Y9h1NhR8fL5XLk9DBSRbSfnFg/62i0ase1zkvsjXVJN3b1yrfYv_N4OqQyVBCLALPcS6th8-yHN7JSh8G0dZ-S1qBG9pzt-b3cvKMJyw/YqLEh-h3CkwxlHiowzTyLr97n8a2YLIweSOmECXLNGgZYGTIJJw9W0XJJG7_c3w7QPohtwnPi6B90Q/gULMCZl37cqD7So-niedObfc751wR8rKLagweNTJiKHgHI-3jjDyc4IoLFFLtLt_8VfAn2qkiTFIFw/TVJHBrCx3t-GjHC9dbLbmJDqEx86MA5Ucbjb9MSD6ybWG-3I8OEdarH98vuBhaFIrdUf4CbKEaF6iQ/Y5dkQwasMfjtChWQ-v6eTTt6tt3FPBut5FixsbvAe38a_4B4HTxbxmgBKpTJ7JE2Kl3zvkHhcNjZHQ/50u1btQzzWQtq8_oCUnH03g7Ge7FyLMsktPlOF7DbvZyqUH4ZR762Yu910GeBa5i0In4QIbLAfkLkQ','PXPK8JtNmJMgS0h7JAtH_txh_nsCftXLPFD5PnU7GCppUM4/_cMdr9G74B2bnSzeUl2JDZrImqp4Byx5PN2IZrFvkP1Kzgg/4b6TE-TH_-yyQR9GpNzulqeLgWuXLZnA_KDXIEEd5UX5Am0/QlhAQ_WkPChPa1g2QycA44Ei796yWT4-5hTU4ruXwGTkjyM/ptvN0F5iwETn2_rAkLNXT0cEsK-spa2jX2tR3r91doeylCs/JJm_4_UzmpuWHhucyXH9cQK5spmu8MrRAG3nU9HEdvjL_bk/j2kLVJyGMWR1GQO8uJM58rTytx4mrfiOe8JplfmyVO2d0g/RMa3nWsu1CwWCInvRAMYE7IYnauCaDLeLmhcct5Fq4ydMXQ/r_glzQG2nkQ0SnZ3w2oLPnGgM6KpvCIG14Qp7E8LRGWCNns/SJXQih3GpnaSkWeb51xhvhsS_XIW6MSgReTGKdPMdTuRpvM','포로베어/짝1204/루승완/명사수 애쉬/바다소년 루카/정글아제발잘하자/핵둥이/수학 선생님 요네/Doggy God/겁쟁이 오일남','100/100/100/100/100/200/200/200/200/200','TOP/JUNGLE/MIDDLE/BOTTOM/UTILITY/TOP/JUNGLE/MIDDLE/BOTTOM/UTILITY','true/true/true/true/true/false/false/false/false/false'),('KR_6062037769','3/2/1/2/0/4/5/4/5/20','266/9/84/145/57/106/141/7/51/25','Aatrox/FiddleSticks/Akali/Kaisa/Maokai/Volibear/Kayn/Leblanc/Caitlyn/Morgana','5/3/4/6/10/4/1/1/0/2','CLASSIC','1/4/2/1/0/2/5/5/15/1','2022-08-07 09:28:54',0,'1/2/3/4/5/6/7/8/9/10','VhpP6Gedes4a4cKffBO8DPBq24VdHp33UPoqynGj5XN7C8bDzPfEf7MQFy9DgJf3k8RdXqpC-C7G6w/vK00pSQY3NspSaiBAzYZQvKc1qHvksv2KWyBQDkoJuhl2429Q7spVL5raKItyUBegUgMwRA3KgVUAg/IAP2uMQS5M2ekJBfsG446lRvbWdDeX8B5XWHGx9ZBEymLJ7lA9xe8Ur2uPZ2EKCmQyOUyZXH8ckHew/7xXapea6AenYNbIHJiWmOUacILlPX-bBXDOm-hD3T5OC3eJjpPiUvu2FKx968X8GIeBojcCzhSRaMw/d1WPqci4HuOfhJsax3d4ZkqE_MGiJq-cysyiBZ9dIOnRSDMjNQHNGKqRnC3K87BeNOACKsyAtVTUKQ/sEGL8XYv5o4nX1Vz8Lsx8NyMFqKB6WALXhWFaxXVVZG1ETZ9kDDkWnpZXDdgU8rBVTqSv5FxVudSog/F6hIf0_bp7I2mL67YJes_KEBYZl0hP4gtPfemseHqMEYVL5fpYI_6KekBE1VR3lpcBnwqt3JgJubbQ/0nfrqvEuKQcBG8GGhVKjyyjge6RAybfBjbNHj71TeACVKQ718S-C6bu1C-woBrNliIy644LbH6M61Q/ip6CLnzrutUbFv_kZso03iqnh3mtKxxJ8i7BU5EYa3Fha9wbB_Yd10N-qW-nKTpHvwMaPUufi3-eFg/KfSL5znCzC5k4u11171XIN-VqxgqDUtX221o9OtFZ1rMlxnssHkSXcZtxxQKt3u0QBp-7l8dSmwgtw','DvnGH1uMC6Glt6ySlEOffrlKov4rDQ49praeKGBF4gs01cE/8P_mq3LgbA-qhERr6VSevAcBHMCxGflBtzCOcoSxqxEH3CG0qd8WTmUVGA/X39GSU4wEmymFUZ8ItjxwKwkP5BTIbFTFq7ZIR5pE-ZZSYVegPscuDp10w/RbhYWRKRu8L75gxbZ3L8VUfBAkN-WiLWh-QoED0VNMptyio/NijGkGeVbta5a1Zfy5vzJrF-3HKZBzoWHtTRTTkFnXPy7YE/WJ_Rm1Skmn7hZNHTeJqScD7bcBom1kIn5k6ZNZkcbNe-xTk/8eOrWMKFe_0i-cLr5fDNApJnuP5nNTefcMY844anyJH5N10LjdY9zzNVOw/szc69Q1iFdkK5w5RzumAUPRvrdQMeTa99fhI9YYAw33B-5I/5WpfjAW6xT8MaBzXW0vZ7OTNJlixaQ0GAnntQRFwRdLJ03P4kPa0HFwLIg/expmnAmbwtLVujnA3VZjL7bJFo56zmlrFq6nSSv5ZsbL4Uc','언더월드 전두환/S2candyS2/Wiz Lee/Caryy/조지아군/민혁의 부하서현/제주도 야생말/폐관 무언 차단 /이거어케하는거임1/태운따까리정환','100/100/100/100/100/200/200/200/200/200','TOP/JUNGLE/MIDDLE/BOTTOM/UTILITY/TOP/JUNGLE/MIDDLE/BOTTOM/UTILITY','false/false/false/false/false/true/true/true/true/true'),('KR_6072176476','6/8/7/7/16/1/4/3/0/2','887/104/234/777/89/58/254/7/119/79','Gwen/Graves/Viego/Yone/Leona/Renekton/Vi/Leblanc/Draven/Gragas','3/1/1/1/3/4/5/2/9/9','CLASSIC','2/8/5/13/1/2/3/1/2/1','2022-08-12 18:32:14',0,'1/2/3/4/5/6/7/8/9/10','njEc66D-vNpTpGQWCUEHSp_SePPKGW22n0eGaeGnEfgFw9yXCYvaugWiQSyl9IBzbQIInCMUgZLLQg/HlH2l1RDcQQLSv_Y704XY6eQLQjId1pSyjTj2jmK1s2kEQ2MJ81pE98D_MNKi6zun1BPxbsBhioBdA/MqbqrfZuqYszV7hJdy8YOUipYAfapLI9kfxeuqKUiNCg_VjSSJ1O8fBUiHK6OXoURCCC0SO5S3chvA/TKi_VSZGnb_2SFJTEdSnq9aoisOajJETZtEfCFXzLKh-x8P8t2mX0E1Zualyr55mYbiQ0YH2bKHlEg/lklDhdbO4-4eyOWrOFeVkZIGgDVlcQY5uP2CRxLOfYxzgmWrWzQl_HP7dePu_O5wEPkqwaJFftlaKg/PuqSgBu9iPvg1gas39AO94NaMnRFEXBx2OqWwiLZ_rsUSsOuOYTIcQCqzM4EoWqcJt7_ypxg5U2x-w/lajP3e7BgpU1O9uKAm88n-7SK_mpk-HDHPiY86Q2Fs5vLa3IWCyhZFV3slvEOJg4p4OPtVkHl6FBcA/Ttxgea835KfH-WfjIdFfYCKUU_DHgb4BVoi9lSevaL8Sw0tCqXo1Ica2ZcLeu958t1N12ys7s7uLdQ/UCsq_Yo9g5jhmW4XlvW_5HPru7kVAYikF-n0dGOnAxB8FYxGMfP4i_lRGPHJHPtxIFhrYOeE8aGoeQ/ghJ790TusQCoL6XtR-1b28n0t-HzePh5sz97GQmPwb6GWIu0HiwEazy7kXSQ857U-TsomZh7kYOygg','dkjJSeupFeipHZtoDUhE8CKjGadchV1bPNRvgBvSotTnIA/9UNSj4ujf03kl55UCWa-k7z_t3CvZPqf8TPWvNI7iPqIhIA/UjoDVTm0M3x1qwQqILEqESTmDmLGxvo-XhpZiTyvHHkJFeQ/ZgyX-e7vNVZOgj-gpVWUBHZ9hN-MWVkcLMICsoVnMJZEvD8/zronF9gRGyril1EoZpgM8HE_0bXBMlpd3IgIQ6FHsXg30FQ5yRDQdiJ5VA/ZwroDflOZb2S8sjows0qjlLd_Fuioua9SWYowKj3_X45Rcs/vorSlhcUlAfJ04XzTcknbE68mRQXL6FivOMCP8SHSoeZzBsF2DaMXi3W2Q/Wrx1zf4RjAIlx1FaWBjjVrXOesuvyIn_Rh6jjzZKt0ja5M3eOeBpHC-IOA/tpHDF-NZev60uUAh8tQvh-uGoQl19x4aZlMt67sStclllrQ/zsU5mGriPe7Kp2ihk2slo-jY1CWV4YDLuGzPDqrKQ8I_Jpoz6XG6Cj2U4w','Hide on bush/Advancement/NEED HER/은가뉴/boomzhu/커피물조절장인/h941u u ek7/흥분한사나이/zenbukorosu/NS Goliath','100/100/100/100/100/200/200/200/200/200','TOP/JUNGLE/MIDDLE/BOTTOM/UTILITY/TOP/JUNGLE/MIDDLE/BOTTOM/UTILITY','true/true/true/true/true/false/false/false/false/false'),('KR_6072314927','6/11/15/3/15/1/4/1/7/8','14/48/3/360/50/114/113/41/202/101','Sion/Trundle/Galio/Samira/Swain/Fiora/Sejuani/Gangplank/Jhin/Xerath','2/2/2/9/5/6/6/9/8/7','CLASSIC','5/10/1/16/4/1/2/1/7/8','2022-08-13 02:12:54',0,'1/2/3/4/5/6/7/8/9/10','qHmYw9Scna8Pzs-tPU9QRvgclnKPItYvientQE-Twv3NFYiYC0DwD1MyAN2pYsAkt0Fb3he7qs7jAA/kvgs5NlOXYVnws48Jnd64W0i3BQjgi22U4E3_OPD9FFvdrfj8Bvqk0zHpxBLQTw8VjpIWTWrAD4zVQ/EH-sE6jLNUEyOsZ3_emGHQ7t2ukWgAcvuYSqhYXN6TiQoDg28KHW6ZaGcqGFVCyB2Moadw0UWaxDUw/s4M2Pehus9NcCuNRzonxFsu1Z38hYjUhGAecdTFTgXk-tqBa-vsp4nwNmLMQdYXddp4-yophhglcpA/3_DZBMXHYNGQbM_mlI110RFsBMr7c9rEPcDhpczJkVMcgnSmHGq-Yfouj4aVlB7RxkX-Gdj9Ih2RJw/UVCBjZCYHEH5VbClqr4lhzXbcoN6QKsNxyF7wE1Ga8m-IRhsYlFdB_e7M3LUbbhrn2lpqlG1GIYPNg/RtJ6r0yIq1IX2c0JbfTRC2B2IDjqiM-L089PRhnJGXWAk9IFgK1v5tzHNt46NBsBRNtDJdMyke7gXw/YKS0F8pvUAzRObW9429KSx1jtvLJjAZSQexaByPT6td8xGG9B0-a-B28Pze78UxJZzCuuRdw8GRSYg/51hh43Puxi8r9j4MC6q13Ad27TTeWouCuUPgQFI8DjMTQL25tDAr-D8_b6pnLEhPxkxp_rk68hdOFQ/ccDdJeS7UNkAWgAixfdrZ-4cP0plovPUYySZbILDKxXXM90QF6jThUWPCfGapi6G_caXZt2WKiwbLQ','0ICI2R_qhkkX0qqNhGAx-YEwKrfPk6r_nJ7ED73vAybRYA/GxCTi4B6qb2pa8nkaWv0QWnfIKuY6GecLrw25yWu_Jh0uA/u6gqvFKpWIfAjHETD1-Y7Clyc33jHPM381fTJyaCwsWVQuY/pvJJX5JkDhitj8fFArktjvT6eIheTkK7ye9rAESlrqc0khjO/BoDR5GwrAI6GZ5iAGMdL3uBu--L29xsgRlwAeEz4kteWE4k/HjjWRF0XT7SEPP-Edrh3aGunhtdACH4cq8TdsrrHz8Xjn-Q/_iIO9GBTj2xqasra-r4d9wIh8crxdTG8fUuHPZhj0UqPjyCcL4O90cYRSg/qBjbwepscTqpW9OTLhsdDuficiWwn3nOobxvdd1rmDLa7oU/c6AUBZyDMjku1JH8VGD5dhgMCggLaf-gd2kFaLantvotE_Q/PA8TAKVEVKPZaVcyEIdE0uAwhKmh-u-YWVYHXGfdfZvB6zk','0147852/스페이스K/범인은숟가락원딜/핫바디김길상/묻지마쿤잉/브론즈특파원/데 육 /무근본 중 근본/CS 포기요/서폿원챔로서','100/100/100/100/100/200/200/200/200/200','TOP/JUNGLE/MIDDLE/BOTTOM/UTILITY/TOP/JUNGLE/MIDDLE/BOTTOM/UTILITY','true/true/true/true/true/false/false/false/false/false'),('KR_6072392399','6/4/3/11/16/3/2/1/2/2','106/131/8/202/22/54/56/110/236/267','Volibear/Diana/Vladimir/Jhin/Ashe/Malphite/Nocturne/Varus/Lucian/Nami','3/1/2/1/1/4/7/7/6/8','CLASSIC','2/11/8/8/1/2/3/1/1/1','2022-08-13 01:45:38',0,'1/2/3/4/5/6/7/8/9/10','DXLj2sCb830FTgI3j99VGwRELY_APBE5-XseGn2_FwB2UinAq1HLIkmfBCTboxHmA9BIRLocEC1xHw/VZ3SktiEVcoCkbIGJuuDPer8EWzyti6aKnVqvDdWBLlXybt6RgCHYirreYo7RhOPKcktRc6e1V9row/98A4DaEgEt0v624tTC7oyxGgNolLi5Nx1OKGat5waIFgXk9N1WcSnoSAp4b8TEc_2eRqyVU60eq9jQ/51hh43Puxi8r9j4MC6q13Ad27TTeWouCuUPgQFI8DjMTQL25tDAr-D8_b6pnLEhPxkxp_rk68hdOFQ/hFbdw1wLwd2d5cpVGSPlfEAh3ilb6gO-GdyitzDNiYxFqF_cnIYE2-nP8QiZWOGHDg9vuBBFdZktow/f3Uq7LbCbeQZJDkx1Lw13B5oNceCmCrvRT47A7VF3KxGzeEynIQ5p4oxB-RGTYBAanRSbv6vM6PfnQ/b-8V6iivLavo_zaxLhV-aQsu-kKphNYiK-MPscT6oRWDK0AcS-CmuGx0mAc_xsUa4UrORNTNK3OHhA/Ezilqu6DuaraQSsA3k2KEWEAfC84FQ34Sm0VsprfKcY8lCppZDFgZk3pZf08OO5oGYHjEXiGbiKLBg/xA9ZBd2ch4DnV99I7zYr3OSFpdi15i6v5LXL3QoRZ7RkJPsmmTcHAgytaKTW0YunrgnH0TBFTwr_wg/k80YetEp1-zK8lA4Nkp0-EXZDaCbq4XMa3duKaIGUw7CBl00c1AQf9_GAKUphaFEPOicSi0OxAj88A','DB2BEKWn2S8IFHuIn1SMrKu-Sx_2oitOFAk9tQPFH49yTks/nmKIMbT6jpkiKT34ezgm697Ze6C40MgwEgkfC6DrtMBr8w/nA7Pnurihl4N7fBYuX8zeUcVwwN7RDp1749o5Ou-dgky9tM/c6AUBZyDMjku1JH8VGD5dhgMCggLaf-gd2kFaLantvotE_Q/bq4WBjjs4dA_4am5RfImu9teDQisHCHzMcreWA66wfhRWA/5jekKCCChZW2LHl3Cuuk-l3WIsAwB4OZaCRucRYyirsmGX0/b3Xlilevzq6qbUnYsFbbHgFQIdp0-cXdZcwVcPfniFLaPss/plkee2G5BwpSu2lauBKakTwsUb8_Ejpr2w-gakDFE9A0bbi9/czLxfn31lCMg-M00wrExGENTOTyguRjVgmxmbjwB-yi29kc/-Um1nYVAx5ikzcpC-3-4r5cexyEFIzx9NDwk-R1XWVC5nM4','justlikethat NSH/Kana0218/Jade taylor/CS 포기요/무슈타프/아니근데진짜십라/억제기까진괜찮아/elca001/서로 이해합시다/인어장인','100/100/100/100/100/200/200/200/200/200','TOP/JUNGLE/MIDDLE/BOTTOM/UTILITY/TOP/JUNGLE/MIDDLE/BOTTOM/UTILITY','true/true/true/true/true/false/false/false/false/false');
/*!40000 ALTER TABLE `matchdata` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `room`
--

DROP TABLE IF EXISTS `room`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `room` (
  `idx` bigint unsigned NOT NULL AUTO_INCREMENT,
  `content` longtext NOT NULL,
  `create_date` datetime DEFAULT NULL,
  `hit` int DEFAULT '0',
  `host_summoner_name` varchar(255) DEFAULT NULL,
  `host_team_id` int DEFAULT NULL,
  `live` bit(1) DEFAULT NULL,
  `modify_date` datetime DEFAULT NULL,
  `people` int DEFAULT '0',
  `title` varchar(255) NOT NULL,
  `match_id` varchar(255) DEFAULT NULL,
  `user_idx` bigint unsigned DEFAULT NULL,
  PRIMARY KEY (`idx`),
  KEY `FKf6qdyvmigyy0g7a3f7x81dl7w` (`match_id`),
  KEY `FKasuwe9r5nkmbqmml0tromi95e` (`user_idx`),
  CONSTRAINT `FKasuwe9r5nkmbqmml0tromi95e` FOREIGN KEY (`user_idx`) REFERENCES `user` (`idx`),
  CONSTRAINT `FKf6qdyvmigyy0g7a3f7x81dl7w` FOREIGN KEY (`match_id`) REFERENCES `matchdata` (`match_id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `room`
--

LOCK TABLES `room` WRITE;
/*!40000 ALTER TABLE `room` DISABLE KEYS */;
INSERT INTO `room` VALUES (1,'<p>eeee</p>','2022-08-15 04:27:56',37,'S2candyS2',100,_binary '','2022-08-16 06:19:19',0,'eeee','KR_6062037769',1),(2,'<p>팀 기본 설정 테스트입니다.</p>','2022-08-15 07:01:37',5,'cs포기요',100,_binary '','2022-08-15 07:01:37',4,'팀 기본 설정 테스트','KR_6072392399',1),(3,'<p>팀선택 테스트ㅇㅇ</p>','2022-08-15 07:03:37',10,'CS 포기요',200,_binary '','2022-08-15 07:03:37',0,'팀선택 테스트','KR_6072314927',1),(4,'<p>ㅁㅁㅁ</p>','2022-08-15 08:00:19',2,'CS 포기요',100,_binary '\0','2022-08-15 08:00:19',0,'ㅁㅁㅁ','KR_6052393911',1),(5,'<p>07:54 테스트입니다.</p>','2022-08-15 10:54:58',4,'CS 포기요',200,_binary '\0','2022-08-15 10:54:58',3,'07:54 테스트','KR_6072314927',2),(6,'<p>asdasd</p>','2022-08-15 10:55:33',5,'Hide on bush',100,_binary '\0','2022-08-15 10:55:33',0,'07:55 테스트','KR_6072176476',2),(7,'<p>팀 선택테스트!!!!!!!!!!!!!</p>','2022-08-16 00:24:25',15,'포로베어',200,_binary '\0','2022-08-16 00:24:25',0,'팀 선택테스트!!!!!!!!!!!!!','KR_6061962912',2);
/*!40000 ALTER TABLE `room` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `room_comment`
--

DROP TABLE IF EXISTS `room_comment`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `room_comment` (
  `idx` bigint unsigned NOT NULL AUTO_INCREMENT,
  `content` varchar(255) DEFAULT NULL,
  `create_time` datetime DEFAULT NULL,
  `room_idx` bigint unsigned NOT NULL,
  `user_idx` bigint unsigned NOT NULL,
  PRIMARY KEY (`idx`),
  KEY `FKrtbax65rlqca786mge5xwiyb9` (`room_idx`),
  KEY `FK2xq7m206779vnahrktstlfiys` (`user_idx`),
  CONSTRAINT `FK2xq7m206779vnahrktstlfiys` FOREIGN KEY (`user_idx`) REFERENCES `user` (`idx`),
  CONSTRAINT `FKrtbax65rlqca786mge5xwiyb9` FOREIGN KEY (`room_idx`) REFERENCES `room` (`idx`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `room_comment`
--

LOCK TABLES `room_comment` WRITE;
/*!40000 ALTER TABLE `room_comment` DISABLE KEYS */;
INSERT INTO `room_comment` VALUES (1,'aaaa','2022-08-15 13:08:46',3,1),(2,'aaaa','2022-08-15 13:08:50',3,1),(3,'aaaa','2022-08-15 13:08:54',3,1),(4,'kkkk','2022-08-16 14:38:02',5,2),(5,'11111','2022-08-16 14:45:51',7,2),(6,'2222','2022-08-16 14:45:55',7,2),(7,'33333','2022-08-16 14:45:59',7,2),(8,'444444','2022-08-16 14:46:03',7,2),(9,'5555555','2022-08-16 14:47:28',7,2),(10,'666666','2022-08-16 14:47:32',7,2),(11,'777777','2022-08-16 14:47:36',7,2);
/*!40000 ALTER TABLE `room_comment` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `idx` bigint unsigned NOT NULL AUTO_INCREMENT,
  `create_date` datetime DEFAULT NULL,
  `id` varchar(255) NOT NULL,
  `modify_date` datetime DEFAULT NULL,
  `nickname` varchar(255) NOT NULL,
  `password` varchar(255) DEFAULT NULL,
  `profile_img` varchar(255) DEFAULT 'https://oktta.s3.us-east-2.amazonaws.com/defaultProfile.png',
  `role` varchar(255) DEFAULT 'ROLE_GUEST',
  `sns_type` int DEFAULT NULL,
  PRIMARY KEY (`idx`),
  UNIQUE KEY `UK_8qtpnv06elxuryeuv1ac4ximm` (`id`),
  UNIQUE KEY `UK_n4swgcf30j6bmtb4l4cjryuym` (`nickname`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (1,'2022-08-15 04:02:56','1','2022-08-18 05:57:39','deleteuser1',NULL,NULL,'ROLE_GUEST',-1),(2,'2022-08-15 04:04:45','112670507299666423680','2022-08-15 04:19:07','구글유저',NULL,'https://oktta.s3.us-east-2.amazonaws.com/defaultProfile.png','ROLE_USER',1),(4,'2022-08-15 10:35:22','GRYZAgPHptSp5HoYY5b-UlDIpch8G03vmLFfzsOZkIg','2022-08-15 10:35:22','NAV4871646930',NULL,'https://oktta.s3.us-east-2.amazonaws.com/defaultProfile.png','ROLE_USER',2);
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_auth_token`
--

DROP TABLE IF EXISTS `user_auth_token`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user_auth_token` (
  `user_id` varchar(255) NOT NULL,
  `create_date` datetime DEFAULT NULL,
  `expire_date` datetime DEFAULT NULL,
  `token` varchar(255) NOT NULL,
  PRIMARY KEY (`user_id`),
  UNIQUE KEY `UK_2my26swr3m2gckm85fpjgjecq` (`token`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_auth_token`
--

LOCK TABLES `user_auth_token` WRITE;
/*!40000 ALTER TABLE `user_auth_token` DISABLE KEYS */;
INSERT INTO `user_auth_token` VALUES ('abc@abc.com','2022-08-15 09:11:00','2022-08-16 09:11:00','V2dUymhYb5UNz1uLFQYX');
/*!40000 ALTER TABLE `user_auth_token` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `video`
--

DROP TABLE IF EXISTS `video`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `video` (
  `idx` bigint unsigned NOT NULL AUTO_INCREMENT,
  `record_url` longtext NOT NULL,
  `room_idx` bigint unsigned DEFAULT NULL,
  PRIMARY KEY (`idx`),
  KEY `FKt769pagq9tau2pbw45dy4h8bf` (`room_idx`),
  CONSTRAINT `FKt769pagq9tau2pbw45dy4h8bf` FOREIGN KEY (`room_idx`) REFERENCES `room` (`idx`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `video`
--

LOCK TABLES `video` WRITE;
/*!40000 ALTER TABLE `video` DISABLE KEYS */;
/*!40000 ALTER TABLE `video` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `vote`
--

DROP TABLE IF EXISTS `vote`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `vote` (
  `room_idx` varchar(255) NOT NULL,
  `end_time` datetime DEFAULT NULL,
  `fifth` bigint DEFAULT '0',
  `first` bigint DEFAULT '0',
  `fourth` bigint DEFAULT '0',
  `garbage` bigint DEFAULT '0',
  `second` bigint DEFAULT '0',
  `third` bigint DEFAULT '0',
  `total` bigint DEFAULT '0',
  PRIMARY KEY (`room_idx`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `vote`
--

LOCK TABLES `vote` WRITE;
/*!40000 ALTER TABLE `vote` DISABLE KEYS */;
INSERT INTO `vote` VALUES ('1','2022-08-18 04:27:56',0,0,0,0,0,0,0),('2','2022-08-18 07:01:37',0,0,0,0,0,0,0),('3','2022-08-15 13:12:54',0,0,1,-1,0,0,1),('4','2022-08-18 08:00:19',0,0,0,0,0,0,0),('5','2022-08-18 10:54:58',0,0,0,0,0,0,0),('6','2022-08-18 10:55:34',0,0,0,0,0,0,0),('7','2022-08-16 03:06:09',1,0,0,-1,0,0,1);
/*!40000 ALTER TABLE `vote` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `vote_record`
--

DROP TABLE IF EXISTS `vote_record`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `vote_record` (
  `room_idx` bigint NOT NULL,
  `user_idx` bigint NOT NULL,
  `number` int DEFAULT NULL,
  PRIMARY KEY (`room_idx`,`user_idx`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `vote_record`
--

LOCK TABLES `vote_record` WRITE;
/*!40000 ALTER TABLE `vote_record` DISABLE KEYS */;
INSERT INTO `vote_record` VALUES (3,1,4),(7,2,5);
/*!40000 ALTER TABLE `vote_record` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-08-19 11:34:22
