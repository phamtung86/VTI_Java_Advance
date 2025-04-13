-- MySQL dump 10.13  Distrib 8.0.36, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: finalexamvti
-- ------------------------------------------------------
-- Server version	8.0.37

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `account`
--

DROP TABLE IF EXISTS `account`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `account` (
  `id` int NOT NULL AUTO_INCREMENT,
  `Username` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `first_name` varchar(255) DEFAULT NULL,
  `last_name` varchar(255) DEFAULT NULL,
  `role` enum('ADMIN','EMPLOYEE','MANAGER') NOT NULL DEFAULT 'EMPLOYEE',
  `department_id` int unsigned DEFAULT NULL,
  `create_date` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `email` varchar(255) DEFAULT NULL,
  `status` int DEFAULT NULL,
  `profileImage` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `username` (`Username`),
  KEY `department_id` (`department_id`),
  CONSTRAINT `account_ibfk_1` FOREIGN KEY (`department_id`) REFERENCES `department` (`id`) ON DELETE SET NULL
) ENGINE=InnoDB AUTO_INCREMENT=84 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `account`
--

LOCK TABLES `account` WRITE;
/*!40000 ALTER TABLE `account` DISABLE KEYS */;
INSERT INTO `account` VALUES (81,'tungpham149','$2a$10$XBY7kjaMmLjtx5zYre2Jp.SiN/xhq.8f/WXPil0krkzmqUy7PjMc2','Tung','Pham Van','ADMIN',51,'2025-04-02 12:53:56','phamvantunga2004@gmail.com',1,'https://res.cloudinary.com/dspqk9rl9/image/upload/v1737165699/360_F_549983970_bRCkYfk0P6PP5fKbMhZMIb07mCJ6esXL_dkutwd.jpg'),(82,'top1haihau','$2a$10$MBm3crvf2.LnqMlvBJFCxeZyGXRlFtqFrQB4tQWMP3L7ZpzudkTNm','Hai','Hau','EMPLOYEE',NULL,'2025-04-02 13:07:46','haihau999990@gmail.com',1,'https://res.cloudinary.com/dspqk9rl9/image/upload/v1737165699/360_F_549983970_bRCkYfk0P6PP5fKbMhZMIb07mCJ6esXL_dkutwd.jpg'),(83,'namdinh12','$2a$10$Eo5UqEkM/pPHhc7/fJF8hO7z2viPZIx9IVpSPaBeQ3NiM4Fg6Ib3C','Nam','Dinh','EMPLOYEE',2,'2025-04-02 13:29:16',NULL,1,'https://res.cloudinary.com/dspqk9rl9/image/upload/v1737165699/360_F_549983970_bRCkYfk0P6PP5fKbMhZMIb07mCJ6esXL_dkutwd.jpg');
/*!40000 ALTER TABLE `account` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `account_active_token`
--

DROP TABLE IF EXISTS `account_active_token`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `account_active_token` (
  `id` int NOT NULL AUTO_INCREMENT,
  `createdAt` datetime(6) DEFAULT NULL,
  `expiryDate` datetime(6) DEFAULT NULL,
  `token` varchar(255) DEFAULT NULL,
  `account_id` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK6yw8o7l29gfk9n208whfnbirt` (`account_id`),
  CONSTRAINT `FK6yw8o7l29gfk9n208whfnbirt` FOREIGN KEY (`account_id`) REFERENCES `account` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `account_active_token`
--

LOCK TABLES `account_active_token` WRITE;
/*!40000 ALTER TABLE `account_active_token` DISABLE KEYS */;
INSERT INTO `account_active_token` VALUES (7,'2025-04-02 19:53:55.795000','2025-04-03 19:53:55.795000','bda03538-4fc4-4b26-8251-ed17ae0292f0',81),(8,'2025-04-02 20:07:45.682000','2025-04-03 20:07:45.682000','93c31e2a-afaf-49e1-aa12-03d9834d5429',82);
/*!40000 ALTER TABLE `account_active_token` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `department`
--

DROP TABLE IF EXISTS `department`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `department` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `total_member` int unsigned DEFAULT NULL,
  `created_date` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=69 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `department`
--

LOCK TABLES `department` WRITE;
/*!40000 ALTER TABLE `department` DISABLE KEYS */;
INSERT INTO `department` VALUES (2,'Sale',1,'2020-03-05 00:00:00'),(4,'Nhân sự',0,'2020-03-08 00:00:00'),(5,'Kỹ thuật',0,'2020-03-10 00:00:00'),(8,'Giám đốc Tùng',0,'2020-04-07 00:00:00'),(10,'Bán hàng',0,'2020-04-09 00:00:00'),(32,'Bảo vệ',0,'2024-12-18 08:42:40'),(50,'Thư kí',0,'2024-12-27 18:59:12'),(51,'Phó giám đốc',1,'2024-12-27 18:59:35'),(56,'Phạm Văn Tùng',0,'2025-03-14 12:07:30'),(67,'WB0302067247',0,'2025-04-02 20:19:16');
/*!40000 ALTER TABLE `department` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `password_reset_token`
--

DROP TABLE IF EXISTS `password_reset_token`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `password_reset_token` (
  `id` int NOT NULL AUTO_INCREMENT,
  `createdAt` datetime(6) DEFAULT NULL,
  `expiryDate` datetime(6) DEFAULT NULL,
  `token` varchar(255) DEFAULT NULL,
  `account_id` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_password_reset_token_account` (`account_id`),
  CONSTRAINT `FK_password_reset_token_account` FOREIGN KEY (`account_id`) REFERENCES `account` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `password_reset_token`
--

LOCK TABLES `password_reset_token` WRITE;
/*!40000 ALTER TABLE `password_reset_token` DISABLE KEYS */;
/*!40000 ALTER TABLE `password_reset_token` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-04-13 19:57:38
