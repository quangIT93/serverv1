-- MariaDB dump 10.19  Distrib 10.6.11-MariaDB, for debian-linux-gnu (x86_64)
--
-- Host: localhost    Database: aiwork_gig_app_v2
-- ------------------------------------------------------
-- Server version	10.6.11-MariaDB-0ubuntu0.22.04.1

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `accounts`
--

DROP TABLE IF EXISTS `accounts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `accounts` (
  `id` varchar(50) NOT NULL DEFAULT uuid(),
  `email` varchar(50) DEFAULT NULL,
  `phone` varchar(20) DEFAULT NULL,
  `gg_id` varchar(50) DEFAULT NULL,
  `fb_id` varchar(50) DEFAULT NULL,
  `role` tinyint(4) DEFAULT 0,
  `created_at` datetime DEFAULT current_timestamp(),
  `updated_at` datetime DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`),
  UNIQUE KEY `email` (`email`),
  UNIQUE KEY `phone` (`phone`),
  UNIQUE KEY `gg_id` (`gg_id`),
  UNIQUE KEY `fb_id` (`fb_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `accounts`
--

LOCK TABLES `accounts` WRITE;
/*!40000 ALTER TABLE `accounts` DISABLE KEYS */;
INSERT INTO `accounts` VALUES ('15c750ca-220a-44e2-b9fe-e59afa838daa',NULL,'84386958079',NULL,NULL,0,'2022-12-19 09:52:56','2022-12-19 09:52:56'),('251ac081-001c-406d-a963-599ac871d0aa','bkav2626@icloud.com',NULL,NULL,NULL,0,'2022-12-19 09:54:08','2022-12-19 09:54:08'),('301fdf9d-2872-4f51-9300-e6f268ff56e2','winnerym@gmail.com',NULL,NULL,NULL,0,'2023-01-03 03:43:13','2023-01-03 03:43:13'),('4d207f7c-d443-476b-af9a-b59da47560a9','truong123553@gmail.com',NULL,NULL,NULL,0,'2022-11-25 17:41:45','2022-11-25 17:41:45'),('52b0ed9e-de8b-41d7-adde-4cd9aa07649e','phanthang052@ggmail.com',NULL,NULL,NULL,0,'2022-12-14 09:54:58','2022-12-14 09:54:58'),('80cdadfe-9ab0-401e-87c3-a96448063c9c',NULL,'84869867902',NULL,NULL,0,'2022-12-13 04:13:42','2022-12-13 04:13:42'),('9a69fdad-c168-4dc2-ba8e-10aa7d6ad78a','nttruong10101@gmail.com',NULL,NULL,NULL,0,'2022-11-30 15:54:46','2022-11-30 15:54:46'),('bbbaefa9-79f8-434c-9152-bdf4bffbfc65','ngocthaoaiw12@gmail.com',NULL,NULL,NULL,0,'2022-12-13 04:31:45','2022-12-13 04:31:45'),('c3b658ef-1311-474e-ac04-391370830fd9','phanthang052@gmail.com',NULL,NULL,NULL,0,'2022-12-09 02:36:01','2022-12-09 02:36:01'),('cb7f2b06-1223-48ef-8773-cd201c2d0e8a','ngocthao020193@gmail.com',NULL,NULL,NULL,0,'2022-12-22 03:53:18','2022-12-22 03:53:18'),('cd381425-e89c-4057-a90f-41dac9f680c2','ngocthaoaiw@gmail.com',NULL,NULL,NULL,0,'2022-12-13 04:15:18','2022-12-13 04:15:18'),('e4aecd23-3a37-486a-bd05-bde0c82d8fe1','bkav2626@gmail.com',NULL,NULL,NULL,0,'2022-12-12 03:40:36','2022-12-12 03:40:36'),('e5090e80-ce5c-4b3c-8e20-8b5049cdda41','cindyuyen310301@gmail.com',NULL,NULL,NULL,0,'2022-12-13 04:33:04','2022-12-13 04:33:04');
/*!40000 ALTER TABLE `accounts` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `applications`
--

DROP TABLE IF EXISTS `applications`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `applications` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `account_id` varchar(50) DEFAULT NULL,
  `post_id` int(11) DEFAULT NULL,
  `status` tinyint(4) DEFAULT 0,
  `name` varchar(50) DEFAULT NULL,
  `birthday` varchar(20) DEFAULT NULL,
  `address` int(11) DEFAULT NULL,
  `gender` tinyint(4) DEFAULT NULL,
  `introduction` varchar(2000) DEFAULT NULL,
  `phone` varchar(15) DEFAULT NULL,
  `email` varchar(50) DEFAULT NULL,
  `facebook` varchar(50) DEFAULT NULL,
  `linkedin` varchar(50) DEFAULT NULL,
  `avatar` varchar(300) DEFAULT NULL,
  `created_at` datetime DEFAULT current_timestamp(),
  `updated_at` datetime DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`),
  KEY `FK_Application_Account` (`account_id`),
  KEY `FK_Application_Post` (`post_id`),
  KEY `FK_Application_Province` (`address`),
  CONSTRAINT `FK_Application_Account` FOREIGN KEY (`account_id`) REFERENCES `profiles` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `FK_Application_Post` FOREIGN KEY (`post_id`) REFERENCES `posts` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `FK_Application_Province` FOREIGN KEY (`address`) REFERENCES `provinces` (`id`) ON DELETE SET NULL ON UPDATE SET NULL
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `applications`
--

LOCK TABLES `applications` WRITE;
/*!40000 ALTER TABLE `applications` DISABLE KEYS */;
INSERT INTO `applications` VALUES (1,'4d207f7c-d443-476b-af9a-b59da47560a9',21,4,'Nguyen The Truong','995130000000',201,1,'My intro','0919004743','truong@gmail.com','facebook.com','linkedin.com','https://gig-app-upload.s3.ap-southeast-1.amazonaws.com/481b5604-6830-40cf-a00a-c5b0c07585e6-IMG_1962.JPG','2022-12-14 09:46:55','2022-12-15 06:55:16'),(2,'4d207f7c-d443-476b-af9a-b59da47560a9',22,1,'Nguyen The Truong','995130000000',201,1,'My intro','0919004743','truong@gmail.com','facebook.com','linkedin.com','https://gig-app-upload.s3.ap-southeast-1.amazonaws.com/481b5604-6830-40cf-a00a-c5b0c07585e6-IMG_1962.JPG','2022-12-14 09:47:01','2022-12-15 02:26:46'),(3,'e4aecd23-3a37-486a-bd05-bde0c82d8fe1',31,1,'BAo Thanh','0',202,1,'too la bao thanh','0386958079','bkav2626@gmail.com',NULL,NULL,'https://gig-app-upload.s3.ap-southeast-1.amazonaws.com/0370b11c-1e4d-4864-9221-205341c4e932-image_picker_CD35753B-5B99-426A-BD21-64D2AC1E2401-2138-000005E290AB9EC8.jpg','2022-12-19 08:20:12','2022-12-19 09:26:04'),(4,'e4aecd23-3a37-486a-bd05-bde0c82d8fe1',34,0,'BAo Thanh','0',202,1,'too la bao thanh','0386958079','bkav2626@gmail.com',NULL,NULL,'https://gig-app-upload.s3.ap-southeast-1.amazonaws.com/0370b11c-1e4d-4864-9221-205341c4e932-image_picker_CD35753B-5B99-426A-BD21-64D2AC1E2401-2138-000005E290AB9EC8.jpg','2022-12-19 08:27:55','2022-12-19 08:27:55'),(5,'251ac081-001c-406d-a963-599ac871d0aa',43,4,'BT 2','0',202,1,'hihihih','0386958079','bkav2626@icloud.com',NULL,NULL,NULL,'2022-12-20 07:31:28','2022-12-21 09:15:03'),(6,'e4aecd23-3a37-486a-bd05-bde0c82d8fe1',25,0,'BAo Thanh','0',202,1,'too la bao thanh','0386958079','bkav2626@gmail.com',NULL,NULL,'https://gig-app-upload.s3.ap-southeast-1.amazonaws.com/0370b11c-1e4d-4864-9221-205341c4e932-image_picker_CD35753B-5B99-426A-BD21-64D2AC1E2401-2138-000005E290AB9EC8.jpg','2022-12-30 03:04:07','2022-12-30 03:04:07'),(7,'251ac081-001c-406d-a963-599ac871d0aa',229,1,'BT 2','0',202,1,'hihihih','0386958079','bkav2626@icloud.com',NULL,NULL,NULL,'2022-12-30 05:21:58','2022-12-30 05:27:32');
/*!40000 ALTER TABLE `applications` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `applications_categories`
--

DROP TABLE IF EXISTS `applications_categories`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `applications_categories` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `application_id` int(11) DEFAULT NULL,
  `category_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`),
  KEY `FK_Application_Category` (`application_id`),
  KEY `FK_Category_Application` (`category_id`),
  CONSTRAINT `FK_Application_Category` FOREIGN KEY (`application_id`) REFERENCES `applications` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `FK_Category_Application` FOREIGN KEY (`category_id`) REFERENCES `child_categories` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `applications_categories`
--

LOCK TABLES `applications_categories` WRITE;
/*!40000 ALTER TABLE `applications_categories` DISABLE KEYS */;
INSERT INTO `applications_categories` VALUES (1,3,168),(2,3,171),(4,4,168),(5,4,171),(7,6,168),(8,6,171),(10,7,168),(11,7,167),(12,7,170),(13,7,171),(14,7,169);
/*!40000 ALTER TABLE `applications_categories` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `applications_educations`
--

DROP TABLE IF EXISTS `applications_educations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `applications_educations` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `application_id` int(11) DEFAULT NULL,
  `company_name` varchar(50) DEFAULT NULL,
  `major` varchar(50) DEFAULT NULL,
  `start_date` varchar(20) DEFAULT NULL,
  `end_date` varchar(20) DEFAULT NULL,
  `extra_information` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`),
  KEY `FK_Application_Education` (`application_id`),
  CONSTRAINT `FK_Application_Education` FOREIGN KEY (`application_id`) REFERENCES `applications` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `applications_educations`
--

LOCK TABLES `applications_educations` WRITE;
/*!40000 ALTER TABLE `applications_educations` DISABLE KEYS */;
INSERT INTO `applications_educations` VALUES (1,1,'TDT University new','Computer Science new','1568332800000','1686441600000','Nothing to tell new'),(2,1,'TDT University','Computer Science','1568073600000','1686528000000','Nothing to tell'),(4,2,'TDT University new','Computer Science new','1568332800000','1686441600000','Nothing to tell new'),(5,2,'TDT University','Computer Science','1568073600000','1686528000000','Nothing to tell'),(7,3,'fog f g','fog b','1638291600000','1669827600000','fog df cgv'),(8,4,'fog f g','fog b','1638291600000','1669827600000','fog df cgv'),(9,6,'fog f g','fog b','1638291600000','1669827600000','fog df cgv'),(10,7,'DH KHOA HOC TU NHIEN','Cong Nghe Phan Mem','1354294800000','1512061200000','Toi tot nghiep');
/*!40000 ALTER TABLE `applications_educations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `applications_experiences`
--

DROP TABLE IF EXISTS `applications_experiences`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `applications_experiences` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `application_id` int(11) DEFAULT NULL,
  `title` varchar(50) DEFAULT NULL,
  `company_name` varchar(50) DEFAULT NULL,
  `start_date` varchar(20) DEFAULT NULL,
  `end_date` varchar(20) DEFAULT NULL,
  `extra_information` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`),
  KEY `FK_Application_Experience` (`application_id`),
  CONSTRAINT `FK_Application_Experience` FOREIGN KEY (`application_id`) REFERENCES `applications` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=25 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `applications_experiences`
--

LOCK TABLES `applications_experiences` WRITE;
/*!40000 ALTER TABLE `applications_experiences` DISABLE KEYS */;
INSERT INTO `applications_experiences` VALUES (1,1,'Project Manager','TDT University - Vietnam','1570838400000','1686787200000','Nothing'),(2,1,'Student','TDT University','1568073600000','1686528000000','Nothing to tell'),(3,1,'Student','TDT University','1568073600000','1686528000000','Nothing to tell'),(4,1,'Student','TDT University','1568073600000','1686528000000','Nothing to tell'),(8,2,'Project Manager','TDT University - Vietnam','1570838400000','1686787200000','Nothing'),(9,2,'Student','TDT University','1568073600000','1686528000000','Nothing to tell'),(10,2,'Student','TDT University','1568073600000','1686528000000','Nothing to tell'),(11,2,'Student','TDT University','1568073600000','1686528000000','Nothing to tell'),(15,3,'GD','TNHH MTV BAC','1638291600000','1669827600000','hihih'),(16,3,'fog d fh','d Fahd dg','1669827600000','1669827600000','g'),(18,4,'GD','TNHH MTV BAC','1638291600000','1669827600000','hihih'),(19,4,'fog d fh','d Fahd dg','1669827600000','1669827600000','g'),(21,6,'GD','TNHH MTV BAC','1638291600000','1669827600000','hihih'),(22,6,'fog d fh','d Fahd dg','1669827600000','1669827600000','g'),(24,7,'DEV','TNHH MTV BT','1448902800000','1543597200000','ghdbfhfg');
/*!40000 ALTER TABLE `applications_experiences` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `applications_locations`
--

DROP TABLE IF EXISTS `applications_locations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `applications_locations` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `application_id` int(11) DEFAULT NULL,
  `location_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`),
  KEY `FK_Application_Location` (`application_id`),
  KEY `FK_Location_Application` (`location_id`),
  CONSTRAINT `FK_Application_Location` FOREIGN KEY (`application_id`) REFERENCES `applications` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `FK_Location_Application` FOREIGN KEY (`location_id`) REFERENCES `districts` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `applications_locations`
--

LOCK TABLES `applications_locations` WRITE;
/*!40000 ALTER TABLE `applications_locations` DISABLE KEYS */;
INSERT INTO `applications_locations` VALUES (1,1,1451),(2,1,1655),(4,2,1451),(5,2,1655),(7,3,1448),(8,3,3440),(10,4,1448),(11,4,3440),(13,6,1448),(14,6,3440),(15,6,1446),(16,7,1448),(17,7,1446);
/*!40000 ALTER TABLE `applications_locations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `banners`
--

DROP TABLE IF EXISTS `banners`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `banners` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `image` varchar(200) DEFAULT NULL,
  `redirect_url` varchar(200) DEFAULT NULL,
  `status` tinyint(4) DEFAULT 1,
  `type` tinyint(4) DEFAULT NULL,
  `version` tinyint(4) DEFAULT NULL COMMENT '1: app, 2: web',
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `banners`
--

LOCK TABLES `banners` WRITE;
/*!40000 ALTER TABLE `banners` DISABLE KEYS */;
INSERT INTO `banners` VALUES (5,'https://visme.co/blog/wp-content/uploads/2020/12/header-1200-19.png','/pages/test',1,1,1),(6,'https://gig-app-upload.s3.ap-southeast-1.amazonaws.com/f97ad122-b516-4bcf-a5a2-939d3d493788-istockphoto.jpg','https://shopee.com',1,3,1),(7,'https://gig-app-upload.s3.ap-southeast-1.amazonaws.com/11024609-0330-4460-802c-9b8df693dd08-istockphoto1.jpg','37',1,2,1),(8,'https://t3.ftcdn.net/jpg/02/72/13/62/360_F_272136238_epYG5LN4B3n4zjFSjLGyc3f8hygUdR98.jpg','https://google.com',1,3,1),(9,'https://img.freepik.com/free-vector/professional-website-banner-with-orange-shapes_1361-1755.jpg?w=2000','https://test.com',1,3,2),(10,'https://img.freepik.com/free-vector/special-offer-big-sale-background_1361-2651.jpg?w=2000','https://big-sales..com',1,3,2),(11,'https://img.freepik.com/free-vector/modern-website-banner-template-with-abstract-shapes_1361-3311.jpg?w=2000','https://test',0,3,2),(12,'https://img.freepik.com/free-vector/professional-website-banner-with-blue-shapes_1361-1531.jpg?w=2000','https://test.3.new',0,3,1),(13,'https://vietnix.vn/wp-content/uploads/2022/07/loi-ich-khi-thiet-ke-banner-website-1024x525.webp','https://sales.com',1,3,2),(14,'https://t3.ftcdn.net/jpg/04/75/78/56/360_F_475785604_HDtTcxBFA0Av87F7JoFmpircCcatQ22b.jpg','https://test.com',1,3,2);
/*!40000 ALTER TABLE `banners` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `bookmarks`
--

DROP TABLE IF EXISTS `bookmarks`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `bookmarks` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `account_id` varchar(50) NOT NULL,
  `post_id` int(11) NOT NULL,
  `created_at` datetime DEFAULT current_timestamp(),
  PRIMARY KEY (`account_id`,`post_id`),
  UNIQUE KEY `id` (`id`),
  KEY `bookmarks_ibfk_2` (`post_id`),
  CONSTRAINT `bookmarks_ibfk_1` FOREIGN KEY (`account_id`) REFERENCES `accounts` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `bookmarks_ibfk_2` FOREIGN KEY (`post_id`) REFERENCES `posts` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=28 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `bookmarks`
--

LOCK TABLES `bookmarks` WRITE;
/*!40000 ALTER TABLE `bookmarks` DISABLE KEYS */;
INSERT INTO `bookmarks` VALUES (26,'301fdf9d-2872-4f51-9300-e6f268ff56e2',18,'2023-01-03 07:20:42'),(25,'301fdf9d-2872-4f51-9300-e6f268ff56e2',19,'2023-01-03 04:32:09'),(9,'9a69fdad-c168-4dc2-ba8e-10aa7d6ad78a',41,'2022-12-27 02:29:15'),(19,'e4aecd23-3a37-486a-bd05-bde0c82d8fe1',20,'2023-01-03 03:08:48'),(1,'e4aecd23-3a37-486a-bd05-bde0c82d8fe1',23,'2022-12-20 03:22:28'),(18,'e4aecd23-3a37-486a-bd05-bde0c82d8fe1',25,'2022-12-30 03:03:17'),(23,'e4aecd23-3a37-486a-bd05-bde0c82d8fe1',41,'2023-01-03 03:15:13'),(22,'e4aecd23-3a37-486a-bd05-bde0c82d8fe1',172,'2023-01-03 03:15:07'),(21,'e4aecd23-3a37-486a-bd05-bde0c82d8fe1',203,'2023-01-03 03:15:06'),(20,'e4aecd23-3a37-486a-bd05-bde0c82d8fe1',221,'2023-01-03 03:14:59'),(12,'e4aecd23-3a37-486a-bd05-bde0c82d8fe1',225,'2022-12-27 06:57:47'),(14,'e4aecd23-3a37-486a-bd05-bde0c82d8fe1',226,'2022-12-27 07:20:38'),(17,'e4aecd23-3a37-486a-bd05-bde0c82d8fe1',227,'2022-12-27 07:24:14');
/*!40000 ALTER TABLE `bookmarks` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `child_categories`
--

DROP TABLE IF EXISTS `child_categories`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `child_categories` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `parent_category_id` int(11) DEFAULT NULL,
  `name` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`),
  KEY `FK_Child_Category_Parent_Category` (`parent_category_id`),
  CONSTRAINT `FK_Child_Category_Parent_Category` FOREIGN KEY (`parent_category_id`) REFERENCES `parent_categories` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=345 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `child_categories`
--

LOCK TABLES `child_categories` WRITE;
/*!40000 ALTER TABLE `child_categories` DISABLE KEYS */;
INSERT INTO `child_categories` VALUES (167,2,'Phục vụ'),(168,2,'Quản lý'),(169,2,'Giám sát'),(170,2,'Lễ tân'),(171,2,'Đầu bếp'),(172,2,'Phụ bếp'),(173,2,'Pha chế'),(174,2,'Tạp vụ'),(175,2,'Thu ngân'),(176,2,'Bảo vệ'),(177,2,'Nhân viên hành lý'),(178,2,'Nhân viên phục vụ phòng'),(179,2,'Nhân viên buồng phòng'),(180,2,'Nhân viên đặt phòng'),(181,2,'Nhân viên rửa bát'),(182,2,'Kế toán'),(183,2,'Thủ quỹ'),(184,2,'Khác'),(185,3,'Nhân viên cắt tóc'),(186,3,'Nhân viên làm nail'),(187,3,'Nhân viên make up'),(188,3,'Nhân viên chăm sóc da'),(189,3,'Nhân viên phun xăm điêu khắc thẩm mỹ'),(190,3,'Nhân viên gội đầu dưỡng sinh'),(191,3,'Nhân viên massage'),(192,3,'Stylist'),(193,3,'Khác'),(194,4,'Vận chuyển hàng hóa'),(195,4,'Dịch vụ chuyển nhà trọn gói'),(196,4,'Dịch vụ bốc xếp hàng hóa'),(197,4,'Dịch vụ chuyển văn phòng/nhà xưởng'),(198,4,'Tài xế'),(199,7,'Toán'),(200,7,'Vật Lý'),(201,7,'Hóa học'),(202,7,'Ngữ Văn'),(203,7,'Lịch Sử'),(204,7,'Địa Lí'),(205,7,'Sinh học'),(206,7,'Tiếng Anh'),(207,7,'Tiếng Hàn'),(208,7,'Tiếng Nhật'),(209,7,'Tiếng Trung'),(210,7,'Tin học'),(211,7,'Ngoại ngữ'),(212,7,'Luyện thi Đại học'),(213,7,'Luyện thi chứng chỉ ngoại ngữ'),(214,7,'Luyện thi các chứng chỉ khác'),(215,7,'Mỹ thuật'),(216,7,'Thanh nhạc'),(217,7,'Diễn xuất'),(218,7,'Vũ đạo'),(219,7,'Khác'),(220,8,'Dịch thuật'),(221,8,'Phiên dịch'),(222,8,'Biên dịch'),(223,9,'Vệ sinh nhà cửa'),(224,9,'Vệ sinh tòa nhà, cao ốc văn phòng'),(225,9,'Vệ sinh nhà máy, nhà xưởng'),(226,9,'Vệ sinh chung cư, căn hộ cao cấp'),(227,9,'Vệ sinh sau xây dựng'),(228,9,'Giặt thảm, ghế văn phòng'),(229,9,'Vệ sinh kính tòa nhà cao tầng'),(230,9,'Vệ sinh công nghiệp'),(231,9,'Vệ sinh thiết bị điện'),(232,9,'Vệ sinh máy lạnh'),(233,9,'Vệ sinh máy giặt'),(234,9,'Vệ sinh tủ lạnh'),(235,9,'Vệ sinh quạt thông gió'),(236,9,'Vệ sinh ống thông gió'),(237,9,'Làm sạch sàn, phủ bóng'),(238,9,'Vệ sinh cầu thang, nhà vệ sinh'),(239,9,'Phòng chống côn trùng/Phun thuốc'),(240,9,'Khác'),(241,10,'Thiết kế nội thất cho Nhà đất/Căn hộ chung cư'),(242,10,'Cải thiện gian bếp'),(243,10,'Sửa chữa nhà tắm/nhà vệ sinh'),(244,10,'Thi công Giấy dán tường'),(245,10,'Thi công cách âm'),(246,10,'Thi công ngoài trời /sân vườn'),(247,10,'Thi công lắp đặt hệ thống điện, cấp thoát nước và bảo trì rò rỉ'),(248,10,'Thi công đèn chiếu sáng'),(249,10,'Lắp ráp đồ nội thất'),(250,10,'Sửa chữa đồ nội thất'),(251,10,'Tân trang đồ nội thất'),(252,10,'Bản vẽ nội thất(CAD/3D)'),(253,10,'Khác'),(254,11,'Thiết kế App/Web-UX/UI design'),(255,11,'Thiết kế biểu ngữ tiếp thị số/quảng cáo hiển thị'),(256,11,'Thiết kế in ấn'),(257,11,'Thiết kế logo, nhận diện thương hiệu'),(258,11,'Thiết kế bao bì'),(259,11,'Thiết kế 3D'),(260,11,'Vẽ minh họa'),(261,11,'Thiết kế kiểu chữ'),(262,11,'Khác'),(263,12,'Lập trình Website'),(264,12,'Lập trình App'),(265,12,'Lập trình game, robot'),(266,12,'Lập trình thương mại điện tử'),(267,12,'Báo cáo phân tích dữ liệu'),(268,12,'Lập trình server và hỗ trợ kỹ thuật'),(269,12,'Lập trình chuyển đổi tệp'),(270,12,'Dịch vụ lên kế hoạch'),(271,13,'Tiếp thị xã hội'),(272,13,'Influencer Marketing'),(273,13,'Tiếp thị tin nhắn/tiếp thị lan truyền'),(274,13,'Quảng cáo hiển thị / quảng cáo banner'),(275,13,'Tiếp thị số'),(276,13,'Tiếp thị qua app thứ 3'),(277,13,'Video quảng cáo'),(278,13,'Public Relation'),(279,13,'SEO'),(280,14,'Chụp ảnh cá nhân'),(281,14,'Quay phim cá nhân'),(282,14,'Chụp hình doanh nghiệp/thương mại'),(283,14,'Quay phim doanh nghiệp/thương mại'),(284,14,'Chụp ảnh cưới'),(285,14,'Chụp ảnh cưới (Studio/Ngoại cảnh)'),(286,14,'Quay phim đám cưới'),(287,14,' Snap Shoting chụp nhanh'),(288,14,'Drone Shoting chụp bằng drone'),(289,14,'Chỉnh sửa Video'),(290,14,'Chỉnh ảnh Photoshop'),(291,14,'Chụp ảnh cá nhân'),(292,14,'Quay phim cá nhân'),(293,14,'Chụp hình doanh nghiệp/thương mại'),(294,14,'Quay phim doanh nghiệp/thương mại'),(295,14,'Chụp ảnh cưới'),(296,14,'Chụp ảnh cưới (Studio/Ngoại cảnh)'),(297,14,'Quay phim đám cưới'),(298,14,'Snap Shoting chụp nhanh'),(299,14,'Drone Shoting chụp bằng drone'),(300,14,'Chỉnh sửa Video'),(301,14,'Chỉnh ảnh Photoshop'),(302,15,'Hát đám cưới'),(303,15,'MC đám cưới'),(304,15,'MC sự kiện'),(305,15,'Hát sự kiện'),(306,15,'Tổ chức sự kiện/tiệc'),(307,15,'PG'),(308,14,'Người mẫu'),(309,14,'Khán giả'),(310,16,'Dắt thú cưng đi dạo'),(311,16,'Chăm sóc thú cưng (tại gia)'),(312,16,'Làm đẹp thú cưng'),(313,16,'Tổ chức đám tang thú cưng'),(314,16,'Khám chữa bệnh thú cưng'),(315,16,'Dịch vụ y tế cho thú cưng (triệt sản, phẫu thuật,...)'),(316,18,'Huấn luyện viên cá nhân'),(317,18,'Khóa học Pilates'),(318,18,'Khóa học Yoga'),(319,18,'Khóa học CrossFit'),(320,18,'Khóa học Golf'),(321,18,'Khóa học Bowling'),(322,18,'Khóa học tennis'),(323,18,'Khóa học đấm bốc'),(324,18,'Khóa học leo núi'),(325,18,'Khóa học bóng bàn'),(326,19,'Tư vấn pháp luật'),(327,19,'Khác'),(328,21,'Đồ trang trí nhà cửa'),(329,21,'Gỗ mỹ nghệ, Gốm mỹ nghệ'),(330,21,'Xà phòng tắm, dụng cụ tắm'),(331,21,'Nến/Tinh dầu/sáp thơm'),(332,21,'Mỹ phẩm, nước hoa'),(333,21,'Sản phẩm thủ công cho trẻ em'),(334,21,'Văn phòng phẩm / vật tư văn phòng'),(335,21,'Đồ dùng cho thú cưng'),(336,21,'Phụ kiện'),(337,21,'Bánh/kẹo/thực phẩm thủ công'),(338,21,'Đồ uống'),(339,21,'Tranh ảnh, quà handmade'),(340,21,'Bưu thiếp/Thiệp handmade'),(341,20,'Kiểm tra tâm lý'),(342,20,'Tư vấn tâm lý'),(343,22,'Giúp việc nhà'),(344,22,'Trông em bé -Bảo mẫu');
/*!40000 ALTER TABLE `child_categories` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `companies`
--

DROP TABLE IF EXISTS `companies`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `companies` (
  `id` varchar(50) NOT NULL DEFAULT uuid(),
  `name` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `companies`
--

LOCK TABLES `companies` WRITE;
/*!40000 ALTER TABLE `companies` DISABLE KEYS */;
/*!40000 ALTER TABLE `companies` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `districts`
--

DROP TABLE IF EXISTS `districts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `districts` (
  `id` int(11) NOT NULL,
  `province_id` int(11) DEFAULT NULL,
  `name` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`),
  KEY `FK_District_Province` (`province_id`),
  CONSTRAINT `FK_District_Province` FOREIGN KEY (`province_id`) REFERENCES `provinces` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `districts`
--

LOCK TABLES `districts` WRITE;
/*!40000 ALTER TABLE `districts` DISABLE KEYS */;
INSERT INTO `districts` VALUES (1442,202,'Quận 1'),(1443,202,'Quận 2'),(1444,202,'Quận 3'),(1446,202,'Quận 4'),(1447,202,'Quận 5'),(1448,202,'Quận 6'),(1449,202,'Quận 7'),(1450,202,'Quận 8'),(1451,202,'Quận 9'),(1452,202,'Quận 10'),(1453,202,'Quận 11'),(1454,202,'Quận 12'),(1455,202,'Quận Tân Bình'),(1456,202,'Quận Tân Phú'),(1457,202,'Quận Phú Nhuận'),(1458,202,'Quận Bình Tân'),(1459,202,'Huyện Hóc Môn'),(1460,202,'Huyện Củ Chi'),(1461,202,'Quận Gò Vấp'),(1462,202,'Quận Bình Thạnh'),(1482,201,'Quận Bắc Từ Liêm'),(1484,201,'Quận Ba Đình'),(1485,201,'Quận Cầu Giấy'),(1486,201,'Quận Đống Đa'),(1488,201,'Quận Hai Bà Trưng'),(1489,201,'Quận Hoàn Kiếm'),(1490,201,'Quận Hoàng Mai'),(1491,201,'Quận Long Biên'),(1492,201,'Quận Tây Hồ'),(1493,201,'Quận Thanh Xuân'),(1526,203,'Quận Hải Châu'),(1527,203,'Quận Thanh Khê'),(1528,203,'Quận Sơn Trà'),(1529,203,'Quận Ngũ Hành Sơn'),(1530,203,'Quận Liên Chiểu'),(1531,203,'Quận Cẩm Lệ'),(1533,202,'Huyện Bình Chánh'),(1534,202,'Huyện Nhà Bè'),(1536,204,'Thành phố Biên Hòa'),(1538,205,'Thành phố Thủ Dầu Một'),(1540,205,'Thành phố Dĩ An'),(1541,205,'Thành phố Thuận An'),(1542,201,'Quận Hà Đông'),(1544,206,'Thành phố Vũng Tàu'),(1546,207,'Thành phố Pleiku'),(1548,208,'Thành phố Nha Trang'),(1550,209,'Thành phố Đà Lạt'),(1552,210,'Thành phố Buôn Ma Thuột'),(1554,211,'Thành phố Tân An'),(1556,212,'Thành phố Mỹ Tho'),(1558,213,'Thành phố Bến Tre'),(1560,214,'Thành phố Trà Vinh'),(1562,215,'Thành phố Vĩnh Long'),(1564,216,'Thành phố Cao Lãnh'),(1566,217,'Thành phố Long Xuyên'),(1568,218,'Thành phố Sóc Trăng'),(1570,219,'Thành phố Rạch Giá'),(1572,220,'Quận Ninh Kiều'),(1573,220,'Quận Bình Thủy'),(1574,220,'Quận Cái Răng'),(1575,220,'Quận Ô Môn'),(1576,220,'Quận Thốt Nốt'),(1578,221,'Thành phố Vĩnh Yên'),(1581,201,'Huyện Mê Linh'),(1582,201,'Huyện Đông Anh'),(1583,201,'Huyện Sóc Sơn'),(1585,223,'Thành phố Huế'),(1587,224,'Quận Ngô Quyền'),(1588,224,'Quận Lê Chân'),(1589,224,'Quận Hồng Bàng'),(1590,224,'Quận Kiến An'),(1591,224,'Quận Hải An'),(1598,225,'Thành phố Hải Dương'),(1599,226,'Thành phố Thái Bình'),(1600,227,'Thành phố Hà Giang'),(1601,228,'Thành phố Tuyên Quang'),(1602,229,'Thành phố Việt Trì'),(1603,230,'Thành phố Móng Cái'),(1604,230,'Thành phố Hạ Long'),(1613,231,'Thành phố Nam Định'),(1614,232,'Thành phố Phủ Lý'),(1615,233,'Thành phố Ninh Bình'),(1616,234,'Thành phố Thanh Hóa'),(1617,235,'Thành phố Vinh'),(1618,236,'Thành phố Hà Tĩnh'),(1619,237,'Thành phố Đồng Hới'),(1620,238,'Thành phố Đông Hà'),(1621,238,'Thị xã Quảng Trị'),(1625,239,'Thành phố Đồng Xoài'),(1626,240,'Thành phố Tây Ninh'),(1627,241,'Thành phố Gia Nghĩa'),(1630,242,'Thành phố Quảng Ngãi'),(1631,243,'Thành phố Tam Kỳ'),(1632,243,'Thành phố Hội An'),(1639,244,'Thành phố Thái Nguyên'),(1640,245,'Thành phố Bắc Kạn'),(1641,246,'Thành phố Cao Bằng'),(1642,247,'Thành phố Lạng Sơn'),(1643,248,'Thành phố Bắc Giang'),(1644,249,'Thành phố Bắc Ninh'),(1653,250,'Thành phố Vị Thanh'),(1654,252,'Thành phố Cà Mau'),(1655,253,'Thành phố Bạc Liêu'),(1660,259,'Thành phố Kon Tum'),(1662,262,'Thành phố Quy Nhơn'),(1663,260,'Thành phố Tuy Hòa'),(1664,208,'Thành phố Cam Ranh'),(1665,261,'Thành phố Phan Rang – Tháp Chàm'),(1666,258,'Thành phố Phan Thiết'),(1667,206,'Thành phố Bà Rịa'),(1668,216,'Thành phố Sa Đéc'),(1674,263,'Thành phố Yên Bái'),(1675,264,'Thành phố Lai Châu'),(1676,265,'Thành phố Điện Biên Phủ'),(1677,266,'Thành phố Sơn La'),(1678,267,'Thành phố Hòa Bình'),(1680,268,'Thành phố Hưng Yên'),(1682,269,'Thành phố Lào Cai'),(1683,230,'Thành phố Cẩm Phả'),(1684,244,'Thành Phố Sông Công'),(1686,230,'Thành phố Uông Bí'),(1687,203,'Huyện Hòa Vang'),(1688,206,'TT Phú Mỹ - cũ'),(1689,206,'Huyện Long Điền'),(1690,206,'Huyện Đất Đỏ'),(1691,204,'Huyện Trảng Bom'),(1692,204,'Thành phố Long Khánh'),(1693,204,'Huyện Tân Phú'),(1694,204,'Huyện Long Thành'),(1695,205,'Thị xã Tân Uyên'),(1696,205,'Thị xã Bến Cát'),(1697,223,'Thị xã Hương Trà'),(1698,223,'Thị xã Hương Thủy'),(1699,206,'Huyện Xuyên Mộc'),(1700,204,'Huyện Định Quán'),(1701,206,'Thị Xã Phú Mỹ'),(1702,204,'Huyện Cẩm Mỹ'),(1703,201,'Huyện Gia Lâm'),(1704,204,'Huyện Xuân Lộc'),(1705,204,'Huyện Thống Nhất'),(1706,224,'Quận Dương Kinh'),(1707,224,'Quận Đồ Sơn'),(1708,204,'Huyện Nhơn Trạch'),(1709,206,'Huyện Châu Đức'),(1710,201,'Huyện Thanh Trì'),(1711,201,'Thị xã Sơn Tây'),(1712,234,'Thành phố Sầm Sơn'),(1713,233,'Thành phố Tam Điệp'),(1714,233,'Huyện Yên Khánh'),(1715,226,'Huyện Đông Hưng'),(1716,226,'Huyện Vũ Thư'),(1717,268,'Huyện Kim Động'),(1718,217,'Huyện Châu Thành'),(1719,219,'Huyện Châu Thành'),(1720,240,'Huyện Châu Thành'),(1721,240,'Thị xã Hòa Thành'),(1722,239,'Huyện Đồng Phú'),(1723,253,'Huyện Hòa Bình'),(1724,216,'Huyện Cao Lãnh'),(1725,216,'Huyện Lai Vung'),(1726,224,'Huyện Thủy Nguyên'),(1727,225,'Huyện Nam Sách'),(1728,249,'Huyện Quế Võ'),(1729,249,'Huyện Tiên Du'),(1730,249,'Thị xã Từ Sơn'),(1731,244,'Huyện Đồng Hỷ'),(1732,221,'Huyện Bình Xuyên'),(1733,221,'Huyện Vĩnh Tường'),(1734,221,'Huyện Yên Lạc'),(1735,243,'Huyện Duy Xuyên'),(1736,243,'Thị xã Điện Bàn'),(1737,242,'Huyện Sơn Tịnh'),(1738,242,'Huyện Tư Nghĩa'),(1739,208,'Huyện Diên Khánh'),(1740,212,'Huyện Châu Thành'),(1741,212,'Huyện Chợ Gạo'),(1742,213,'Huyện Châu Thành'),(1743,218,'Huyện Mỹ Xuyên'),(1744,269,'Huyện Bát Xát'),(1745,228,'Huyện Yên Sơn'),(1746,205,'Huyện Dầu Tiếng'),(1747,234,'Huyện Quảng Xương'),(1748,234,'Huyện Hoằng Hóa'),(1749,223,'Huyện Phú Vang'),(1750,217,'Huyện Thoại Sơn'),(1751,217,'Huyện Tri Tôn'),(1752,217,'Huyện Tịnh Biên'),(1753,217,'Thành phố Châu Đốc'),(1754,217,'Huyện An Phú'),(1755,217,'Thị Xã Tân Châu'),(1756,217,'Huyện Phú Tân'),(1757,217,'Huyện Chợ Mới'),(1758,217,'Huyện Châu Phú'),(1759,248,'Huyện Hiệp Hòa'),(1760,248,'Huyện Lạng Giang'),(1761,248,'Huyện Sơn Động'),(1762,248,'Huyện Tân Yên'),(1763,248,'Huyện Việt Yên'),(1764,248,'Huyện Yên Dũng'),(1765,248,'Huyện Yên Thế'),(1766,249,'Huyện Gia Bình'),(1767,249,'Huyện Thuận Thành'),(1768,249,'Huyện Yên Phong'),(1769,262,'Thị xã An Nhơn'),(1770,262,'Huyện Phù Cát'),(1771,262,'Thị xã Hoài Nhơn'),(1772,239,'Huyện Chơn Thành'),(1773,239,'Huyện Hớn Quản'),(1774,239,'Thị xã Bình Long'),(1775,239,'Thị xã Phước Long'),(1776,258,'Huyện Hàm Thuận Nam'),(1777,258,'Huyện Hàm Thuận Bắc'),(1778,258,'Thị xã La Gi'),(1779,258,'Huyện Đức Linh'),(1780,258,'Huyện Bắc Bình'),(1781,258,'Huyện Tuy Phong'),(1782,252,'Huyện Thới Bình'),(1783,252,'Huyện Năm Căn'),(1784,210,'Huyện Buôn Ðôn'),(1785,210,'Huyện Cư M\'gar'),(1786,210,'Huyện Ea H\'leo'),(1787,210,'Huyện Krông Năng'),(1788,210,'Thị xã Buôn Hồ'),(1789,210,'Huyện Krông Bông'),(1790,241,'Huyện Đắk R\'lấp'),(1791,241,'Huyện Đắk Glong'),(1792,241,'Huyện Đắk Mil'),(1793,207,'Huyện Ia Grai'),(1794,207,'Huyện Đức Cơ'),(1795,207,'Huyện Chư Prông'),(1796,207,'Huyện Chư Sê'),(1797,207,'Huyện Phú Thiện'),(1798,207,'Thị xã Ayun Pa'),(1799,207,'Huyện Ia Pa'),(1800,207,'Thị xã An Khê'),(1801,207,'Huyện Chư Păh'),(1802,232,'Thị xã Duy Tiên'),(1803,201,'Huyện Ba Vì'),(1804,201,'Huyện Đan Phượng'),(1805,201,'Huyện Hoài Đức'),(1806,201,'Huyện Mỹ Đức'),(1807,201,'Huyện Phúc Thọ'),(1808,201,'Huyện Thạch Thất'),(1809,201,'Huyện Thanh Oai'),(1810,201,'Huyện Ứng Hòa'),(1811,236,'Huyện Kỳ Anh'),(1812,236,'Huyện Hương Khê'),(1813,236,'Huyện Nghi Xuân'),(1814,236,'Thị xã Hồng Lĩnh'),(1815,236,'Huyện Cẩm Xuyên'),(1816,225,'Huyện Bình Giang'),(1817,225,'Huyện Cẩm Giàng'),(1818,225,'Thị xã Kinh Môn'),(1819,224,'Huyện An Dương'),(1820,224,'Huyện An Lão'),(1821,224,'Huyện Tiên Lãng'),(1822,224,'Huyện Vĩnh Bảo'),(1823,250,'Thành phố Ngã Bảy'),(1824,250,'Huyện Phụng Hiệp'),(1825,268,'Huyện Ân Thi'),(1826,268,'Huyện Khoái Châu'),(1827,268,'Thị xã Mỹ Hào'),(1828,268,'Huyện Yên Mỹ'),(1829,208,'Huyện Vạn Ninh'),(1830,219,'Huyện Hòn Đất'),(1831,219,'Huyện Tân Hiệp'),(1832,219,'Huyện Giồng Riềng'),(1833,219,'Huyện An Biên'),(1834,259,'Huyện Kon Plông'),(1835,259,'Huyện Đắk Hà'),(1836,209,'Huyện Đơn Dương'),(1837,209,'Huyện Đức Trọng'),(1838,209,'Thành phố Bảo Lộc'),(1839,209,'Huyện Bảo Lâm'),(1840,231,'Huyện Hải Hậu'),(1841,231,'Huyện Ý Yên'),(1842,235,'Thị xã Cửa Lò'),(1843,235,'Huyện Đô Lương'),(1844,235,'Huyện Anh Sơn'),(1845,235,'Huyện Tân Kỳ'),(1846,235,'Huyện Yên Thành'),(1847,235,'Huyện Diễn Châu'),(1848,235,'Huyện Quỳnh Lưu'),(1849,235,'Thị xã Hoàng Mai'),(1850,235,'Thị xã Thái Hòa'),(1851,235,'Huyện Nghĩa Đàn'),(1852,235,'Huyện Quỳ Hợp'),(1853,235,'Huyện Con Cuông'),(1854,235,'Huyện Nghi Lộc'),(1855,261,'Huyện Ninh Sơn'),(1856,260,'Thị Xã Sông Cầu'),(1857,237,'Huyện Lệ Thủy'),(1858,237,'Huyện Bố Trạch'),(1859,237,'Thị xã Ba Đồn'),(1860,238,'Huyện Hướng Hóa'),(1861,238,'Huyện Vĩnh Linh'),(1862,240,'Huyện Tân Biên'),(1863,240,'Huyện Tân Châu'),(1864,240,'Huyện Dương Minh Châu'),(1865,240,'Huyện Bến Cầu'),(1866,240,'Huyện Gò Dầu'),(1867,226,'Huyện Hưng Hà'),(1868,226,'Huyện Quỳnh Phụ'),(1869,226,'Huyện Thái Thụy'),(1870,234,'Thị Xã Nghi Sơn'),(1871,234,'Huyện Như Xuân'),(1872,234,'Huyện Thường Xuân'),(1873,234,'Huyện Thọ Xuân'),(1874,234,'Huyện Ngọc Lặc'),(1875,234,'Huyện Yên Định'),(1876,234,'Thị xã Bỉm Sơn'),(1877,234,'Huyện Hà Trung'),(1878,234,'Huyện Mường Lát'),(1879,234,'Huyện Quan Hóa'),(1880,234,'Huyện Thạch Thành'),(1881,234,'Huyện Vĩnh Lộc'),(1882,223,'Huyện Phú Lộc'),(1883,252,'Huyện Phú Tân'),(1884,210,'Huyện Krông Ana'),(1885,223,'Huyện A Lưới'),(1886,262,'Huyện An Lão'),(1887,245,'Huyện Ba Bể'),(1888,213,'Huyện Ba Tri'),(1889,245,'Huyện Bạch Thông'),(1890,246,'Huyện Bảo Lâm'),(1891,269,'Huyện Bảo Yên'),(1892,269,'Huyện Bắc Hà'),(1893,227,'Huyện Bắc Quang'),(1894,211,'Huyện Bến Lức'),(1895,213,'Huyện Bình Đại'),(1896,230,'Huyện Bình Liêu'),(1897,232,'Huyện Bình Lục'),(1898,242,'Huyện Bình Sơn'),(1899,239,'Huyện Bù Đăng'),(1900,212,'Huyện Cái Bè'),(1901,252,'Huyện Cái Nước'),(1902,208,'Huyện Cam Lâm'),(1903,238,'Huyện Cam Lộ'),(1904,247,'Huyện Cao Lộc'),(1905,229,'Huyện Cẩm Khê'),(1906,211,'Huyện Cần Đước'),(1907,211,'Huyện Cần Giuộc'),(1908,214,'Huyện Cầu Ngang'),(1909,211,'Huyện Châu Thành'),(1910,218,'Huyện Châu Thành'),(1911,214,'Huyện Châu Thành'),(1912,250,'Huyện Châu Thành A'),(1913,245,'Huyện Chợ Đồn'),(1914,245,'Huyện Chợ Mới'),(1915,201,'Huyện Chương Mỹ'),(1916,267,'Huyện Đà Bắc'),(1917,243,'Huyện Đại Lộc'),(1918,244,'Huyện Đại Từ'),(1919,209,'Huyện Đam Rông'),(1920,230,'Huyện đảo Vân Đồn'),(1921,259,'Huyện Đắk Glei'),(1922,252,'Huyện Đầm Dơi'),(1923,265,'Huyện Điện Biên'),(1924,244,'Huyện Định Hóa'),(1925,229,'Huyện Đoan Hùng'),(1926,253,'Huyện Đông Hải'),(1927,234,'Huyện Đông Sơn'),(1928,227,'Huyện Đồng Văn'),(1929,211,'Huyện Đức Hòa'),(1930,242,'Thị xã Đức Phổ'),(1931,210,'Huyện Ea Kar'),(1932,212,'Huyện Gò Công Đông'),(1933,212,'Huyện Gò Công Tây'),(1934,225,'Huyện Gia Lộc'),(1935,253,'Thị Xã Giá Rai'),(1936,238,'Huyện Gio Linh'),(1937,213,'Huyện Giồng Trôm'),(1938,229,'Huyện Hạ Hòa'),(1939,246,'Huyện Hà Quảng'),(1940,230,'Huyện Hải Hà'),(1941,228,'Huyện Hàm Yên'),(1942,234,'Huyện Hậu Lộc'),(1943,246,'Huyện Hòa An'),(1944,233,'Huyện Hoa Lư'),(1945,227,'Huyện Hoàng Su Phì'),(1946,253,'Huyện Hồng Dân'),(1947,235,'Huyện Hưng Nguyên'),(1948,247,'Huyện Hữu Lũng'),(1949,218,'Huyện Kế Sách'),(1950,219,'Huyện Kiên Lương'),(1951,226,'Huyện Kiến Xương'),(1952,232,'Huyện Kim Bảng'),(1953,225,'Huyện Kim Thành'),(1954,210,'Huyện Krông Pắc'),(1955,267,'Huyện Kỳ Sơn'),(1956,209,'Huyện Lạc Dương'),(1957,228,'Huyện Lâm Bình'),(1958,209,'Huyện Lâm Hà'),(1959,229,'Huyện Lâm Thao'),(1960,221,'Huyện Lập Thạch'),(1961,216,'Huyện Lấp Vò'),(1962,215,'Huyện Long Hồ'),(1963,247,'Huyện Lộc Bình'),(1964,239,'Huyện Lộc Ninh'),(1965,248,'Huyện Lục Nam'),(1966,248,'Huyện Lục Ngạn'),(1967,263,'Huyện Lục Yên'),(1968,267,'Huyện Lương Sơn'),(1969,249,'Huyện Lương Tài'),(1970,232,'Huyện Lý Nhân'),(1971,266,'Huyện Mai Sơn'),(1973,227,'Huyện Mèo Vạc'),(1974,213,'Huyện Mỏ Cày Bắc'),(1975,213,'Huyện Mỏ Cày Nam'),(1976,266,'Huyện Mộc Châu'),(1977,263,'Huyện Mù Cang Chải'),(1978,265,'Huyện Mường Chà'),(1979,265,'Huyện Mường Nhé'),(1980,264,'Huyện Mường Tè'),(1981,231,'Huyện Mỹ Lộc'),(1982,228,'Huyện Na Hang'),(1983,231,'Huyện Nam Trực'),(1984,264,'Huyện Nậm Nhùn'),(1985,261,'Huyện Ninh Hải'),(1986,261,'Huyện Ninh Phước'),(1987,243,'Huyện Núi Thành'),(1988,242,'Huyện Nghĩa Hành'),(1989,264,'Huyện Phong Thổ'),(1990,244,'Thị xã Phổ Yên'),(1991,244,'Huyện Phú Bình'),(1992,205,'Huyện Phú Giáo'),(1993,260,'Huyện Phú Hòa'),(1994,229,'Huyện Phù Ninh'),(1995,243,'Huyện Phú Ninh'),(1996,266,'Huyện Phù Yên'),(1997,246,'Huyện Phục Hòa'),(1998,253,'Huyện Phước Long'),(1999,227,'Huyện Quản Bạ'),(2000,234,'Huyện Quan Sơn'),(2001,227,'Huyện Quang Bình'),(2002,237,'Huyện Quảng Ninh'),(2003,243,'Huyện Quế Sơn'),(2004,201,'Huyện Quốc Oai'),(2005,269,'Thị xã Sa Pa'),(2006,264,'Huyện Sìn Hồ'),(2007,266,'Huyện Sông Mã'),(2008,215,'Huyện Tam Bình'),(2009,221,'Huyện Tam Dương'),(2010,264,'Huyện Tam Đường'),(2011,216,'Huyện Tam Nông'),(2012,258,'Huyện Tánh Linh'),(2013,216,'Huyện Tân Hồng'),(2014,267,'Huyện Tân Lạc'),(2015,229,'Huyện Tân Sơn'),(2016,211,'Huyện Tân Trụ'),(2017,264,'Huyện Tân Uyên'),(2018,268,'Huyện Tiên Lữ'),(2019,230,'Huyện Tiên Yên'),(2020,214,'Huyện Tiểu Cần'),(2021,265,'Huyện Tủa Chùa'),(2022,265,'Huyện Tuần Giáo'),(2023,262,'Huyện Tuy Phước'),(2024,236,'Huyện Thạch Hà'),(2025,264,'Huyện Than Uyên'),(2026,216,'Huyện Thanh Bình'),(2027,232,'Huyện Thanh Liêm'),(2028,213,'Huyện Thạnh Phú'),(2029,229,'Huyện Thanh Sơn'),(2030,216,'Huyện Tháp Mười'),(2031,211,'Huyện Thủ Thừa'),(2032,266,'Huyện Thuận Châu'),(2033,214,'Huyện Trà Cú'),(2034,215,'Huyện Trà Ôn'),(2035,240,'Thị xã Trảng Bàng'),(2036,247,'Huyện Tràng Định'),(2037,218,'Huyện Trần Đề'),(2038,252,'Huyện Trần Văn Thời'),(2039,263,'Huyện Trấn Yên'),(2040,238,'Huyện Triệu Phong'),(2041,246,'Huyện Trùng Khánh'),(2042,252,'Huyện U Minh'),(2043,269,'Huyện Văn Bàn'),(2044,263,'Huyện Văn Chấn'),(2045,268,'Huyện Văn Giang'),(2046,268,'Huyện Văn Lâm'),(2047,263,'Huyện Văn Yên'),(2048,250,'Huyện Vị Thuỷ'),(2049,204,'Huyện Vĩnh Cửu'),(2050,253,'Huyện Vĩnh Lợi'),(2051,244,'Huyện Võ Nhai'),(2052,227,'Huyện Xín Mần'),(2053,227,'Huyện Yên Minh'),(2054,215,'Thị xã Bình Minh'),(2055,212,'Thị Xã Cai Lậy'),(2056,225,'Thành phố Chí Linh'),(2057,212,'Thị xã Gò Công'),(2058,219,'Thành phố Hà Tiên'),(2059,216,'Thành Phố Hồng Ngự'),(2060,265,'Thị xã Mường Lay'),(2061,208,'Thị xã Ninh Hòa'),(2062,218,'Thị xã Ngã Năm'),(2063,263,'Thị xã Nghĩa Lộ'),(2064,229,'Thị xã Phú Thọ'),(2065,221,'Thành phố Phúc Yên'),(2066,230,'Thị xã Quảng Yên'),(2070,234,'Huyện Bá Thước'),(2073,269,'Huyện Bảo Thắng'),(2075,227,'Huyện Bắc Mê'),(2078,243,'Huyện Bắc Trà My'),(2079,266,'Huyện Bắc Yên'),(2081,215,'Huyện Bình Tân'),(2084,212,'Huyện Cai Lậy'),(2086,214,'Huyện Càng Long'),(2087,267,'Huyện Cao Phong'),(2090,202,'Huyện Cần Giờ'),(2091,214,'Huyện Cầu Kè'),(2093,218,'Huyện Cù Lao Dung'),(2096,250,'Huyện Châu Thành'),(2101,207,'Huyện Chư Pưh'),(2103,214,'Huyện Duyên Hải'),(2104,209,'Huyện Đạ Huoai'),(2105,238,'Huyện Đa Krông'),(2106,209,'Huyện Đạ Tẻh'),(2107,224,'Huyện đảo Bạch Long Vĩ'),(2108,224,'Huyện đảo Cát Hải'),(2109,230,'Huyện đảo Cô Tô'),(2110,238,'Huyện đảo Cồn Cỏ'),(2111,206,'Huyện đảo Côn Đảo'),(2112,203,'Huyện đảo Hoàng Sa'),(2113,219,'Huyện đảo Kiên Hải'),(2114,242,'Huyện đảo Lý Sơn'),(2115,219,'Thành phố Phú Quốc'),(2116,258,'Huyện đảo Phú Quý'),(2117,208,'Huyện đảo Trường Sa'),(2118,207,'Huyện Đak Đoa'),(2119,207,'Huyện Đak Pơ'),(2120,241,'Huyện Đắk Song'),(2121,259,'Huyện Đắk Tô'),(2123,265,'Huyện Điện Biên Đông'),(2125,243,'Huyện Đông Giang'),(2129,211,'Huyện Đức Huệ'),(2131,210,'Huyện Ea Súp'),(2132,219,'Huyện Gò Quao'),(2134,219,'Huyện Giang Thành'),(2137,238,'Huyện Hải Lăng'),(2139,243,'Huyện Hiệp Đức'),(2140,262,'Huyện Hoài Ân'),(2144,207,'Huyện Kbang'),(2146,267,'Huyện Kim Bôi'),(2148,259,'Huyện Kon Rẫy'),(2149,207,'Huyện Kông Chro'),(2150,210,'Huyện Krông Búk'),(2151,241,'Huyện Krông Nô'),(2152,207,'Huyện Krông Pa'),(2156,267,'Huyện Lạc Sơn'),(2157,267,'Huyện Lạc Thủy'),(2161,218,'Huyện Long Phú'),(2163,267,'Huyện Mai Châu'),(2164,215,'Huyện Mang Thít'),(2165,207,'Huyện Mang Yang'),(2167,242,'Huyện Minh Long'),(2170,265,'Huyện Mường Ảng'),(2171,269,'Huyện Mường Khương'),(2173,218,'Huyện Mỹ Tú'),(2177,243,'Huyện Nam Giang'),(2178,243,'Huyện Nam Trà My'),(2179,265,'Huyện Nậm Pồ'),(2181,234,'Huyện Nông Cống'),(2182,243,'Huyện Nông Sơn'),(2186,252,'Huyện Ngọc Hiển'),(2187,259,'Huyện Ngọc Hồi'),(2190,234,'Huyện Như Thanh'),(2193,223,'Huyện Phong Điền'),(2194,268,'Huyện Phù Cừ'),(2195,244,'Huyện Phú Lương'),(2198,243,'Huyện Phước Sơn'),(2204,266,'Huyện Quỳnh Nhai'),(2205,259,'Huyện Sa Thầy'),(2206,260,'Huyện Sông Hinh'),(2210,242,'Huyện Sơn Hà'),(2211,260,'Huyện Sơn Hòa'),(2216,212,'Huyện Tân Phú Đông'),(2219,243,'Huyện Tây Giang'),(2222,242,'Huyện Tây Trà'),(2224,243,'Huyện Tiên Phước'),(2225,259,'Huyện Tu Mơ Rông'),(2227,241,'Huyện Tuy Đức'),(2237,229,'Huyện Thanh Thủy'),(2238,218,'Huyện Thạnh Trị'),(2239,243,'Huyện Thăng Bình'),(2248,263,'Huyện Trạm Tấu'),(2249,234,'Huyện Triệu Sơn'),(2251,219,'Huyện U Minh Thượng'),(2255,266,'Huyện Vân Hồ'),(2256,227,'Huyện Vị Xuyên'),(2258,262,'Huyện Vĩnh Thạnh'),(2260,219,'Huyện Vĩnh Thuận'),(2263,215,'Huyện Vũng Liêm'),(2264,269,'Huyện Si Ma Cai'),(2266,263,'Huyện Yên Bình'),(2267,266,'Huyện Yên Châu'),(2268,229,'Huyện Yên Lập'),(2270,267,'Huyện Yên Thủy'),(2272,218,'Thị xã Vĩnh Châu'),(3125,219,'Huyện An Minh'),(3126,230,'Huyện Ba Chẽ'),(3127,242,'Huyện Ba Tơ'),(3129,261,'Huyện Bác Ái'),(3130,246,'Huyện Bảo Lạc'),(3132,205,'Huyện Bàu Bàng'),(3134,247,'Huyện Bắc Sơn'),(3135,205,'Huyện Bắc Tân Uyên'),(3138,247,'Huyện Bình Gia'),(3140,239,'Huyện Bù Đốp'),(3141,239,'Huyện Bù Gia Mập'),(3143,236,'Huyện Can Lộc'),(3146,209,'Huyện Cát Tiên'),(3147,234,'Huyện Cẩm Thủy'),(3150,220,'Huyện Cờ Đỏ'),(3152,241,'Huyện Cư Jút'),(3153,210,'Huyện Cư Kuin'),(3155,216,'Huyện Châu Thành'),(3156,247,'Huyện Chi Lăng'),(3157,228,'Huyện Chiêm Hóa'),(3158,213,'Huyện Chợ Lách'),(3160,209,'Huyện Di Linh'),(3180,230,'Huyện Đầm Hà'),(3182,247,'Huyện Đình Lập'),(3184,260,'Thị xã Đông Hòa'),(3185,230,'Thị xã Đông Triều'),(3186,260,'Huyện Đồng Xuân'),(3188,236,'Huyện Đức Thọ'),(3191,233,'Huyện Gia Viễn'),(3193,231,'Huyện Giao Thủy'),(3194,246,'Huyện Hạ Lang'),(3196,258,'Huyện Hàm Tân'),(3199,230,'Huyện Hoành Bồ'),(3200,216,'Huyện Hồng Ngự'),(3201,236,'Huyện Hương Sơn'),(3203,224,'Huyện Kiến Thụy'),(3205,233,'Huyện Kim Sơn'),(3211,235,'Huyện Kỳ Sơn'),(3212,208,'Huyện Khánh Sơn'),(3213,208,'Huyện Khánh Vĩnh'),(3216,234,'Huyện Lang Chánh'),(3217,210,'Huyện Lắk'),(3218,250,'Thị xã Long Mỹ'),(3220,236,'Huyện Lộc Hà'),(3224,237,'Huyện Minh Hóa'),(3226,242,'Huyện Mộ Đức'),(3227,211,'Huyện Mộc Hóa'),(3230,266,'Huyện Mường La'),(3232,245,'Huyện Na Rì'),(3233,235,'Huyện Nam Đàn'),(3234,223,'Huyện Nam Đông'),(3238,225,'Huyện Ninh Giang'),(3241,234,'Huyện Nga Sơn'),(3242,245,'Huyện Ngân Sơn'),(3243,231,'Huyện Nghĩa Hưng'),(3246,246,'Huyện Nguyên Bình'),(3247,233,'Huyện Nho Quan'),(3249,245,'Huyện Pác Nặm'),(3250,220,'Huyện Phong Điền'),(3254,262,'Huyện Phù Mỹ'),(3255,201,'Huyện Phú Xuyên'),(3257,223,'Huyện Quảng Điền'),(3258,237,'Huyện Quảng Trạch'),(3259,246,'Huyện Quảng Uyên'),(3260,235,'Huyện Quế Phong'),(3261,235,'Huyện Quỳ Châu'),(3265,221,'Huyện Sông Lô'),(3266,266,'Huyện Sốp Cộp'),(3267,228,'Huyện Sơn Dương'),(3270,242,'Huyện Sơn Tây'),(3271,221,'Huyện Tam Đảo'),(3272,229,'Huyện Tam Nông'),(3273,211,'Huyện Tân Hưng'),(3275,212,'Huyện Tân Phước'),(3276,211,'Huyện Tân Thạnh'),(3278,260,'Huyện Tây Hòa'),(3279,262,'Huyện Tây Sơn'),(3281,226,'Huyện Tiền Hải'),(3284,260,'Huyện Tuy An'),(3286,237,'Huyện Tuyên Hóa'),(3287,225,'Huyện Tứ Kỳ'),(3288,235,'Huyện Tương Dương'),(3289,246,'Huyện Thạch An'),(3290,229,'Huyện Thanh Ba'),(3291,235,'Huyện Thanh Chương'),(3292,225,'Huyện Thanh Hà'),(3293,211,'Huyện Thạnh Hóa'),(3294,225,'Huyện Thanh Miện'),(3298,234,'Huyện Thiệu Hóa'),(3299,246,'Huyện Thông Nông'),(3300,220,'Huyện Thới Lai'),(3301,261,'Huyện Thuận Bắc'),(3302,261,'Huyện Thuận Nam'),(3303,201,'Huyện Thường Tín'),(3304,242,'Huyện Trà Bồng'),(3305,246,'Huyện Trà Lĩnh'),(3308,231,'Huyện Trực Ninh'),(3310,247,'Huyện Văn Lãng'),(3311,247,'Huyện Văn Quan'),(3312,262,'Huyện Vân Canh'),(3315,211,'Huyện Vĩnh Hưng'),(3317,220,'Huyện Vĩnh Thạnh'),(3319,231,'Huyện Vụ Bản'),(3320,236,'Huyện Vũ Quang'),(3323,231,'Huyện Xuân Trường'),(3327,233,'Huyện Yên Mô'),(3329,211,'Thị xã Kiến Tường'),(3418,210,'Huyện M\'Đrắk'),(3440,201,'Quận Nam Từ Liêm'),(3441,236,'Thị xã Kỳ Anh'),(3443,214,'Thị xã Duyên Hải'),(3444,239,'Huyện Phú Riềng'),(3445,250,'Huyện Long Mỹ'),(3446,259,'Huyện Ia H Drai'),(3694,246,'Huyện Quảng Hòa'),(3695,202,'Thành Phố Thủ Đức');
/*!40000 ALTER TABLE `districts` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `majors`
--

DROP TABLE IF EXISTS `majors`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `majors` (
  `id` varchar(50) NOT NULL DEFAULT uuid(),
  `name` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `majors`
--

LOCK TABLES `majors` WRITE;
/*!40000 ALTER TABLE `majors` DISABLE KEYS */;
/*!40000 ALTER TABLE `majors` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `notifications`
--

DROP TABLE IF EXISTS `notifications`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `notifications` (
  `account_id` varchar(50) NOT NULL,
  `application_id` int(11) NOT NULL,
  `is_read` enum('0','1') NOT NULL DEFAULT '0' COMMENT '0: unread, 1: read',
  `application_status` tinyint(4) NOT NULL DEFAULT 0 COMMENT '0: pending, 1: seen, 2: approved, 3: rejected, 4: accepted',
  `type` enum('0','1') NOT NULL DEFAULT '0' COMMENT '0: applicant, 1: recruiter',
  `created_at` datetime NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`account_id`,`application_id`,`application_status`,`type`),
  KEY `fk_noti_application_id` (`application_id`),
  CONSTRAINT `fk_noti_account_id` FOREIGN KEY (`account_id`) REFERENCES `accounts` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_noti_application_id` FOREIGN KEY (`application_id`) REFERENCES `applications` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `notifications`
--

LOCK TABLES `notifications` WRITE;
/*!40000 ALTER TABLE `notifications` DISABLE KEYS */;
/*!40000 ALTER TABLE `notifications` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `otps`
--

DROP TABLE IF EXISTS `otps`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `otps` (
  `id` varchar(50) NOT NULL DEFAULT uuid(),
  `account_id` varchar(50) DEFAULT NULL,
  `otp` varchar(6) DEFAULT NULL,
  `created_at` datetime DEFAULT current_timestamp(),
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`),
  KEY `FK_Otp_Account` (`account_id`),
  CONSTRAINT `FK_Otp_Account` FOREIGN KEY (`account_id`) REFERENCES `accounts` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `otps`
--

LOCK TABLES `otps` WRITE;
/*!40000 ALTER TABLE `otps` DISABLE KEYS */;
INSERT INTO `otps` VALUES ('0cc99cd5-7a9f-11ed-8494-023614d5dd95','bbbaefa9-79f8-434c-9152-bdf4bffbfc65','541853','2022-12-13 04:31:45'),('0d9e9609-8014-11ed-8494-023614d5dd95','c3b658ef-1311-474e-ac04-391370830fd9','196174','2022-12-20 03:11:53'),('0e26110e-81ac-11ed-8494-023614d5dd95','80cdadfe-9ab0-401e-87c3-a96448063c9c','514969','2022-12-22 03:52:29'),('0feaa1b2-7a9e-11ed-8494-023614d5dd95','e4aecd23-3a37-486a-bd05-bde0c82d8fe1','129012','2022-12-13 04:24:40'),('1072b2e5-6ec8-11ed-a292-f875a4402abd','4d207f7c-d443-476b-af9a-b59da47560a9','660364','2022-11-28 09:54:43'),('12a130ae-7a9d-11ed-8494-023614d5dd95','cd381425-e89c-4057-a90f-41dac9f680c2','974711','2022-12-13 04:17:35'),('151de54b-7f83-11ed-8494-023614d5dd95','251ac081-001c-406d-a963-599ac871d0aa','025965','2022-12-19 09:54:09'),('183b97c0-8802-11ed-8494-023614d5dd95','e4aecd23-3a37-486a-bd05-bde0c82d8fe1','169903','2022-12-30 05:23:29'),('1847868a-8038-11ed-8494-023614d5dd95','251ac081-001c-406d-a963-599ac871d0aa','602699','2022-12-20 07:29:53'),('216e3828-7ac9-11ed-8494-023614d5dd95','9a69fdad-c168-4dc2-ba8e-10aa7d6ad78a','395085','2022-12-13 09:32:58'),('24914bcc-8bde-11ed-8494-023614d5dd95','e5090e80-ce5c-4b3c-8e20-8b5049cdda41','641484','2023-01-04 03:16:13'),('254ee3f4-79c0-11ed-8494-023614d5dd95','c3b658ef-1311-474e-ac04-391370830fd9','734807','2022-12-12 01:56:08'),('2bac7944-81ac-11ed-8494-023614d5dd95','cb7f2b06-1223-48ef-8773-cd201c2d0e8a','808199','2022-12-22 03:53:18'),('2ca0eaf2-87ed-11ed-8494-023614d5dd95','e4aecd23-3a37-486a-bd05-bde0c82d8fe1','674262','2022-12-30 02:53:44'),('32f07ceb-7c42-11ed-8494-023614d5dd95','9a69fdad-c168-4dc2-ba8e-10aa7d6ad78a','292098','2022-12-15 06:32:08'),('386f919b-776a-11ed-8494-023614d5dd95','c3b658ef-1311-474e-ac04-391370830fd9','081022','2022-12-09 02:36:01'),('38fabc4c-708d-11ed-acb5-f875a4402abd','9a69fdad-c168-4dc2-ba8e-10aa7d6ad78a','290535','2022-11-30 15:58:52'),('3aa7e68a-7b7e-11ed-8494-023614d5dd95','4d207f7c-d443-476b-af9a-b59da47560a9','621422','2022-12-14 07:09:19'),('3c3c9f7d-7a9f-11ed-8494-023614d5dd95','e5090e80-ce5c-4b3c-8e20-8b5049cdda41','932944','2022-12-13 04:33:04'),('40574e1c-7f84-11ed-8494-023614d5dd95','e5090e80-ce5c-4b3c-8e20-8b5049cdda41','326730','2022-12-19 10:02:31'),('464a271f-7a9d-11ed-8494-023614d5dd95','cd381425-e89c-4057-a90f-41dac9f680c2','780274','2022-12-13 04:19:02'),('4cd0e0a1-8013-11ed-8494-023614d5dd95','e4aecd23-3a37-486a-bd05-bde0c82d8fe1','951464','2022-12-20 03:06:29'),('58f53be8-7ab0-11ed-8494-023614d5dd95','e4aecd23-3a37-486a-bd05-bde0c82d8fe1','714973','2022-12-13 06:35:34'),('5a06caa2-8801-11ed-8494-023614d5dd95','251ac081-001c-406d-a963-599ac871d0aa','743332','2022-12-30 05:18:10'),('5b2c5261-8040-11ed-8494-023614d5dd95','e4aecd23-3a37-486a-bd05-bde0c82d8fe1','137749','2022-12-20 08:29:01'),('5e75adb6-7b95-11ed-8494-023614d5dd95','52b0ed9e-de8b-41d7-adde-4cd9aa07649e','654537','2022-12-14 09:54:58'),('5e87dc8a-8038-11ed-8494-023614d5dd95','e4aecd23-3a37-486a-bd05-bde0c82d8fe1','130487','2022-12-20 07:31:51'),('6518f48a-8107-11ed-8494-023614d5dd95','e4aecd23-3a37-486a-bd05-bde0c82d8fe1','991006','2022-12-21 08:13:47'),('69cfd9ed-7a9d-11ed-8494-023614d5dd95','cd381425-e89c-4057-a90f-41dac9f680c2','557722','2022-12-13 04:20:02'),('79887905-7b95-11ed-8494-023614d5dd95','9a69fdad-c168-4dc2-ba8e-10aa7d6ad78a','462630','2022-12-14 09:55:43'),('7ab69f0a-81ac-11ed-8494-023614d5dd95','cb7f2b06-1223-48ef-8773-cd201c2d0e8a','622521','2022-12-22 03:55:31'),('7d8bbfb7-7b94-11ed-8494-023614d5dd95','9a69fdad-c168-4dc2-ba8e-10aa7d6ad78a','019487','2022-12-14 09:48:41'),('80b6f616-858d-11ed-8494-023614d5dd95','9a69fdad-c168-4dc2-ba8e-10aa7d6ad78a','137107','2022-12-27 02:23:51'),('87657ef3-7a9c-11ed-8494-023614d5dd95','80cdadfe-9ab0-401e-87c3-a96448063c9c','565851','2022-12-13 04:13:42'),('8e837d14-7a9f-11ed-8494-023614d5dd95','e5090e80-ce5c-4b3c-8e20-8b5049cdda41','229586','2022-12-13 04:35:22'),('94959cb2-8801-11ed-8494-023614d5dd95','251ac081-001c-406d-a963-599ac871d0aa','181809','2022-12-30 05:19:48'),('9809f55c-708d-11ed-acb5-f875a4402abd','9a69fdad-c168-4dc2-ba8e-10aa7d6ad78a','241261','2022-11-30 16:01:31'),('9a815108-80fc-11ed-8494-023614d5dd95','9a69fdad-c168-4dc2-ba8e-10aa7d6ad78a','870123','2022-12-21 06:56:33'),('9b6c3b27-8692-11ed-8494-023614d5dd95','e4aecd23-3a37-486a-bd05-bde0c82d8fe1','260047','2022-12-28 09:32:54'),('9d2879f9-7f83-11ed-8494-023614d5dd95','e5090e80-ce5c-4b3c-8e20-8b5049cdda41','621551','2022-12-19 09:57:57'),('a2a0e788-8101-11ed-8494-023614d5dd95','e5090e80-ce5c-4b3c-8e20-8b5049cdda41','293232','2022-12-21 07:32:34'),('a5c94441-7a9d-11ed-8494-023614d5dd95','cd381425-e89c-4057-a90f-41dac9f680c2','474910','2022-12-13 04:21:42'),('a6784b91-708c-11ed-acb5-f875a4402abd','9a69fdad-c168-4dc2-ba8e-10aa7d6ad78a','949146','2022-11-30 15:54:46'),('a8b0c164-7f83-11ed-8494-023614d5dd95','251ac081-001c-406d-a963-599ac871d0aa','149716','2022-12-19 09:58:16'),('ad7b405a-8bdd-11ed-8494-023614d5dd95','e5090e80-ce5c-4b3c-8e20-8b5049cdda41','356002','2023-01-04 03:12:53'),('baba05a4-81b1-11ed-8494-023614d5dd95','e4aecd23-3a37-486a-bd05-bde0c82d8fe1','415554','2022-12-22 04:33:06'),('bd4b397e-79ce-11ed-8494-023614d5dd95','e4aecd23-3a37-486a-bd05-bde0c82d8fe1','326474','2022-12-12 03:40:36'),('c1037d2d-7a9c-11ed-8494-023614d5dd95','cd381425-e89c-4057-a90f-41dac9f680c2','078257','2022-12-13 04:15:19'),('c6fb09f3-79fc-11ed-8494-023614d5dd95','9a69fdad-c168-4dc2-ba8e-10aa7d6ad78a','488381','2022-12-12 09:10:09'),('c8c4c58b-6cad-11ed-a292-f875a4402abd','4d207f7c-d443-476b-af9a-b59da47560a9','686371','2022-11-25 17:41:45'),('d07192c6-708d-11ed-acb5-f875a4402abd','9a69fdad-c168-4dc2-ba8e-10aa7d6ad78a','160007','2022-11-30 16:03:06'),('d8c82d34-8591-11ed-8494-023614d5dd95','4d207f7c-d443-476b-af9a-b59da47560a9','662257','2022-12-27 02:54:57'),('e0e91635-7a9d-11ed-8494-023614d5dd95','cd381425-e89c-4057-a90f-41dac9f680c2','009006','2022-12-13 04:23:22'),('e6138e68-7d27-11ed-8494-023614d5dd95','9a69fdad-c168-4dc2-ba8e-10aa7d6ad78a','765551','2022-12-16 09:56:23'),('e9c2ef26-7f82-11ed-8494-023614d5dd95','15c750ca-220a-44e2-b9fe-e59afa838daa','336128','2022-12-19 09:52:56'),('ed86af63-7a1f-11ed-8494-023614d5dd95','e4aecd23-3a37-486a-bd05-bde0c82d8fe1','589341','2022-12-12 13:21:46'),('efaf5101-803f-11ed-8494-023614d5dd95','251ac081-001c-406d-a963-599ac871d0aa','819988','2022-12-20 08:26:01'),('f7f19934-8073-11ed-8494-023614d5dd95','9a69fdad-c168-4dc2-ba8e-10aa7d6ad78a','315623','2022-12-20 14:38:28'),('fbf3f4f4-8101-11ed-8494-023614d5dd95','e4aecd23-3a37-486a-bd05-bde0c82d8fe1','720391','2022-12-21 07:35:04'),('fd7e4437-8043-11ed-8494-023614d5dd95','9a69fdad-c168-4dc2-ba8e-10aa7d6ad78a','117688','2022-12-20 08:55:02');
/*!40000 ALTER TABLE `otps` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `parent_categories`
--

DROP TABLE IF EXISTS `parent_categories`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `parent_categories` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(50) DEFAULT NULL,
  `image` varchar(300) DEFAULT NULL,
  `default_post_image` varchar(300) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5328 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `parent_categories`
--

LOCK TABLES `parent_categories` WRITE;
/*!40000 ALTER TABLE `parent_categories` DISABLE KEYS */;
INSERT INTO `parent_categories` VALUES (1,'Tất cả','https://gig-app-upload.s3.ap-southeast-1.amazonaws.com/category/tat-ca.jpg',NULL),(2,'Dịch vụ','https://gig-app-upload.s3.ap-southeast-1.amazonaws.com/category/dich-vu.jpg','https://gig-app-upload.s3.ap-southeast-1.amazonaws.com/default-post-image/dich-vu.jpg'),(3,'Làm đẹp','https://gig-app-upload.s3.ap-southeast-1.amazonaws.com/category/lam-dep.jpg','https://gig-app-upload.s3.ap-southeast-1.amazonaws.com/default-post-image/lam-dep.jpg'),(4,'Giao hàng','https://gig-app-upload.s3.ap-southeast-1.amazonaws.com/category/giao-hang.jpg','https://gig-app-upload.s3.ap-southeast-1.amazonaws.com/default-post-image/giao-hang.jpg'),(5,'Khách sạn','https://gig-app-upload.s3.ap-southeast-1.amazonaws.com/category/khach-san.jpg','https://gig-app-upload.s3.ap-southeast-1.amazonaws.com/default-post-image/khach-san.jpg'),(6,'Soạn thảo','https://gig-app-upload.s3.ap-southeast-1.amazonaws.com/category/soan-thao.jpg','https://gig-app-upload.s3.ap-southeast-1.amazonaws.com/default-post-image/soan-thao.jpg'),(7,'Gia sư','https://gig-app-upload.s3.ap-southeast-1.amazonaws.com/category/gia-su.jpg','https://gig-app-upload.s3.ap-southeast-1.amazonaws.com/default-post-image/gia-su.jpg'),(8,'Dịch thuật','https://gig-app-upload.s3.ap-southeast-1.amazonaws.com/category/dich-thuat.jpg','https://gig-app-upload.s3.ap-southeast-1.amazonaws.com/default-post-image/dich-thuat'),(9,'Chuyển nhà/Vệ sinh','https://gig-app-upload.s3.ap-southeast-1.amazonaws.com/category/chuyen-nha-ve-sinh.jpg','https://gig-app-upload.s3.ap-southeast-1.amazonaws.com/default-post-image/chuyen-nha-ve-sinh.jpg'),(10,'Thiết kế nội thất','https://gig-app-upload.s3.ap-southeast-1.amazonaws.com/category/thiet-ke-noi-that.jpg','https://gig-app-upload.s3.ap-southeast-1.amazonaws.com/default-post-image/thiet-ke-noi-that.jpg'),(11,'Thiết kế','https://gig-app-upload.s3.ap-southeast-1.amazonaws.com/category/thiet-ke.jpg','https://gig-app-upload.s3.ap-southeast-1.amazonaws.com/default-post-image/thiet-ke.jpg'),(12,'IT/Programing','https://gig-app-upload.s3.ap-southeast-1.amazonaws.com/category/it.jpg','https://gig-app-upload.s3.ap-southeast-1.amazonaws.com/default-post-image/it.jpg'),(13,'Marketing','https://gig-app-upload.s3.ap-southeast-1.amazonaws.com/category/marketing.jpg','https://gig-app-upload.s3.ap-southeast-1.amazonaws.com/default-post-image/marketing.jpg'),(14,'Chụp hình/Quay phim','https://gig-app-upload.s3.ap-southeast-1.amazonaws.com/category/chup-hinh-quay-phim.jpg','https://gig-app-upload.s3.ap-southeast-1.amazonaws.com/default-post-image/chup-hinh-quay-phim.jpg'),(15,'Sự kiện','https://gig-app-upload.s3.ap-southeast-1.amazonaws.com/category/su-kien.jpg','https://gig-app-upload.s3.ap-southeast-1.amazonaws.com/default-post-image/su-kien.jpg'),(16,'Chăm sóc thú cưng','https://gig-app-upload.s3.ap-southeast-1.amazonaws.com/category/cham-soc-thu-cung.jpg','https://gig-app-upload.s3.ap-southeast-1.amazonaws.com/default-post-image/cham-soc-thu-cung.jpg'),(17,'Thời trang/Làm đẹp','https://gig-app-upload.s3.ap-southeast-1.amazonaws.com/category/thoi-trang-lam-dep.jpg','https://gig-app-upload.s3.ap-southeast-1.amazonaws.com/default-post-image/thoi-trang-lam-dep.jpg'),(18,'Thể thao','https://gig-app-upload.s3.ap-southeast-1.amazonaws.com/category/the-thao.jpg','https://gig-app-upload.s3.ap-southeast-1.amazonaws.com/default-post-image/the-thao.jpg'),(19,'Pháp luật','https://gig-app-upload.s3.ap-southeast-1.amazonaws.com/category/phap-luat.jpg','https://gig-app-upload.s3.ap-southeast-1.amazonaws.com/default-post-image/phap-luat.jpg'),(20,'Tư vấn kỹ năng','https://gig-app-upload.s3.ap-southeast-1.amazonaws.com/category/tu-van-ky-nang.jpg','https://gig-app-upload.s3.ap-southeast-1.amazonaws.com/default-post-image/tu-van-ky-nang.jpg'),(21,'Nghề thủ công','https://gig-app-upload.s3.ap-southeast-1.amazonaws.com/category/nghe-thu-cong.jpg','https://gig-app-upload.s3.ap-southeast-1.amazonaws.com/default-post-image/nghe-thu-cong.jpg'),(22,'Sinh hoạt/Giúp việc','https://gig-app-upload.s3.ap-southeast-1.amazonaws.com/category/sinh_hoat_giup_viec.jpg','https://gig-app-upload.s3.ap-southeast-1.amazonaws.com/default-post-image/sinh-hoat-giup-viec.jpg');
/*!40000 ALTER TABLE `parent_categories` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `post_images`
--

DROP TABLE IF EXISTS `post_images`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `post_images` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `post_id` int(11) DEFAULT NULL,
  `image` varchar(200) DEFAULT NULL,
  `status` tinyint(4) DEFAULT 1,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`),
  KEY `FK_Post_Image` (`post_id`),
  CONSTRAINT `FK_Post_Image` FOREIGN KEY (`post_id`) REFERENCES `posts` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=36 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `post_images`
--

LOCK TABLES `post_images` WRITE;
/*!40000 ALTER TABLE `post_images` DISABLE KEYS */;
INSERT INTO `post_images` VALUES (11,25,'https://gig-app-upload.s3.ap-southeast-1.amazonaws.com/c7b03e15-79b0-459c-b915-c0f289c1babc-2f0fe6db-546b-4388-b4fa-1b63e69e56bc-live-from-space.jpg',1),(14,30,'https://gig-app-upload.s3.ap-southeast-1.amazonaws.com/71fa5373-af4e-456f-b9ee-6890029a7288-2f0fe6db-546b-4388-b4fa-1b63e69e56bc-live-from-space.jpg',1),(15,30,'https://gig-app-upload.s3.ap-southeast-1.amazonaws.com/007121eb-65a4-40c4-bf89-2def1584db3d-2f0fe6db-546b-4388-b4fa-1b63e69e56bc-live-from-space.jpg',1),(16,31,'https://gig-app-upload.s3.ap-southeast-1.amazonaws.com/599f0cf6-1214-4890-984a-cf45fec02031-2f0fe6db-546b-4388-b4fa-1b63e69e56bc-live-from-space.jpg',1),(17,33,'https://gig-app-upload.s3.ap-southeast-1.amazonaws.com/04411010-71fa-4006-a2e6-fd87137036fb-image_picker_33EC47FC-5A25-458A-8E0F-2284FB141F14-57790-00006169625FAAAC.jpg',1),(18,33,'https://gig-app-upload.s3.ap-southeast-1.amazonaws.com/02583da2-6e55-45cf-8d06-d6f7e32a4913-image_picker_4372BD96-17E5-489D-93A5-5E18234436AA-57790-00006169760462CC.jpg',1),(21,39,'https://gig-app-upload.s3.ap-southeast-1.amazonaws.com/88a38778-470b-4e67-9167-bd308befcb69-image_picker3658911745576739410.jpg',1),(25,41,'https://gig-app-upload.s3.ap-southeast-1.amazonaws.com/f8c86398-6a90-4f55-80b5-0398d193684f-image_picker3330367923185622749.jpg',1),(29,37,'https://gig-app-upload.s3.ap-southeast-1.amazonaws.com/676c55a4-0925-42e5-aed5-6be0e0a9c541-image_picker_45B695A8-1FF8-4EC4-9874-B48774A8F4D5-2620-000002676433E3B6.jpg',1),(30,42,'https://gig-app-upload.s3.ap-southeast-1.amazonaws.com/faa43d0c-b196-4b84-bc17-89635ff3bd54-image_picker_BD5682E8-5BFE-4C28-9ECF-60A1F85562A5-4657-000024EE41D23050.jpg',1),(31,42,'https://gig-app-upload.s3.ap-southeast-1.amazonaws.com/f56af752-bcfe-4944-9250-7b08acea5129-image_picker_479AED6D-1B7D-4E69-8B49-8282E49AD2EF-4657-000024EE2DEB6556.jpg',1),(32,43,'https://gig-app-upload.s3.ap-southeast-1.amazonaws.com/d5514395-4b5e-4268-ae5f-14bfe82489a5-image_picker_AFF652F0-6677-4E5C-A9C4-F339620E4B29-54296-000026DE8EC1BDA9.jpg',1),(33,229,'https://gig-app-upload.s3.ap-southeast-1.amazonaws.com/1672376925665-c8132ebc-90a9-49e8-8e7e-9e40cfc86cbf.jpg',1),(34,229,'https://gig-app-upload.s3.ap-southeast-1.amazonaws.com/1672376925665-3b013ac2-e83a-476d-8ea6-daa30974300d.jpg',1),(35,229,'https://gig-app-upload.s3.ap-southeast-1.amazonaws.com/1672376925665-30d8e177-2a40-4f93-a1bc-3fcdb50917b3.jpg',1);
/*!40000 ALTER TABLE `post_images` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `posts`
--

DROP TABLE IF EXISTS `posts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `posts` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `account_id` varchar(50) DEFAULT NULL,
  `title` varchar(100) DEFAULT NULL,
  `company_name` varchar(100) DEFAULT NULL,
  `district_id` int(11) DEFAULT NULL,
  `is_date_period` tinyint(4) DEFAULT 0,
  `start_date` varchar(20) DEFAULT NULL,
  `end_date` varchar(20) DEFAULT NULL,
  `start_time` varchar(20) DEFAULT NULL,
  `end_time` varchar(20) DEFAULT NULL,
  `is_working_weekend` tinyint(4) DEFAULT 0,
  `salary` double DEFAULT NULL,
  `salary_type` int(11) DEFAULT NULL,
  `money_type` enum('1','2') DEFAULT '1',
  `description` varchar(1000) DEFAULT NULL,
  `phone_contact` varchar(15) DEFAULT NULL,
  `status` tinyint(4) DEFAULT 0,
  `created_at` datetime DEFAULT current_timestamp(),
  `updated_at` datetime DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`),
  KEY `FK_Post_Profile` (`account_id`),
  KEY `FK_Post_Province` (`district_id`) USING BTREE,
  KEY `posts_fk_salary_type` (`salary_type`),
  FULLTEXT KEY `title` (`title`,`company_name`,`description`),
  CONSTRAINT `FK_Post_District` FOREIGN KEY (`district_id`) REFERENCES `districts` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `FK_Post_Profile` FOREIGN KEY (`account_id`) REFERENCES `profiles` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `posts_fk_salary_type` FOREIGN KEY (`salary_type`) REFERENCES `salary_types` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=230 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `posts`
--

LOCK TABLES `posts` WRITE;
/*!40000 ALTER TABLE `posts` DISABLE KEYS */;
INSERT INTO `posts` VALUES (15,'4d207f7c-d443-476b-af9a-b59da47560a9','Title','AIWorks',1462,1,'1669773536554','1669773536554','1669773536554','1669773536554',1,5000,2,'1','Description',NULL,1,'2022-11-30 08:46:57','2022-12-19 15:23:38'),(16,'4d207f7c-d443-476b-af9a-b59da47560a9','Title','AIWorks',1448,1,'1668043800000','1668907800000','1668043800000','1668043800000',1,5000,1,'1','Description',NULL,1,'2022-11-30 14:28:42','2022-12-19 15:23:44'),(17,'4d207f7c-d443-476b-af9a-b59da47560a9','Title','AIWorks',1448,1,'1668043800000','1668907800000','1668043800000','1668043800000',1,5000,3,'1','Description',NULL,0,'2022-11-30 14:28:45','2022-12-19 15:23:52'),(18,'4d207f7c-d443-476b-af9a-b59da47560a9','Title','AIWorks',1448,1,'1668043800000','1668907800000','1668043800000','1668043800000',1,5000,1,'1','Description',NULL,0,'2022-11-30 14:28:46','2022-12-19 15:23:57'),(19,'4d207f7c-d443-476b-af9a-b59da47560a9','Title','AIWorks',1448,1,'1668043800000','1668907800000','1668043800000','1668043800000',1,5000,1,'1','Description',NULL,0,'2022-11-30 14:28:47','2022-12-21 20:24:39'),(20,'4d207f7c-d443-476b-af9a-b59da47560a9','Title','AIWorks',1448,1,'1668043800000','1668907800000','1668043800000','1668043800000',1,5000,1,'1','Description',NULL,0,'2022-11-30 14:28:47','2022-12-21 20:24:41'),(21,'9a69fdad-c168-4dc2-ba8e-10aa7d6ad78a','Title','AIWorks',1448,1,'1668043800000','1668907800000','1668043800000','1668043800000',1,5000,1,'1','Description',NULL,1,'2022-11-30 16:03:52','2022-12-20 03:18:51'),(22,'9a69fdad-c168-4dc2-ba8e-10aa7d6ad78a','Title','AIWorks',1448,1,'1668043800000','1668907800000','1668043800000','1668043800000',1,5000,1,'1','Description',NULL,1,'2022-11-30 16:03:54','2022-12-20 03:18:51'),(23,'9a69fdad-c168-4dc2-ba8e-10aa7d6ad78a','Title','AIWorks',1448,1,'1668043800000','1668907800000','1668043800000','1668043800000',1,5000,1,'1','Description',NULL,1,'2022-11-30 16:03:55','2022-12-20 03:32:51'),(24,'9a69fdad-c168-4dc2-ba8e-10aa7d6ad78a','Title','AIWorks',1448,1,'1668043800000','1668907800000','1668043800000','1668043800000',1,5000,1,'1','Description',NULL,1,'2022-11-30 16:03:57','2022-12-20 03:18:51'),(25,'9a69fdad-c168-4dc2-ba8e-10aa7d6ad78a','Title','AIWorks',1462,0,NULL,NULL,'1669773536554','1669773536554',1,5000,1,'1','Description',NULL,1,'2022-12-06 14:09:07','2022-12-21 07:15:26'),(26,'9a69fdad-c168-4dc2-ba8e-10aa7d6ad78a','Title','AIWorks',1462,0,NULL,NULL,'1669773536554','1669773536554',1,5000,1,'1','Description',NULL,1,'2022-12-06 14:10:38','2022-12-20 15:19:02'),(27,'9a69fdad-c168-4dc2-ba8e-10aa7d6ad78a','Title','AIWorks',1448,1,'1668043800000','1668907800000','1668043800000','1668043800000',1,5000,1,'1','Description',NULL,1,'2022-12-06 14:10:48','2022-12-20 03:18:51'),(28,'9a69fdad-c168-4dc2-ba8e-10aa7d6ad78a','Title','AIWorks',1448,1,'1668043800000','1668907800000','1668043800000','1668043800000',1,5000,1,'1','Description',NULL,2,'2022-12-06 14:18:56','2022-12-20 03:18:51'),(29,'9a69fdad-c168-4dc2-ba8e-10aa7d6ad78a','Title','AIWorks',1462,0,NULL,NULL,'1669773536554','1669773536554',1,5000,1,'1','Description',NULL,1,'2022-12-06 14:19:38','2022-12-20 03:18:51'),(30,'9a69fdad-c168-4dc2-ba8e-10aa7d6ad78a','Title','AIWorks',1462,1,'1669773536554','1669773536554','1669773536554','1669773536554',1,5000,1,'1','Description',NULL,2,'2022-12-06 15:02:26','2022-12-20 03:18:51'),(31,'9a69fdad-c168-4dc2-ba8e-10aa7d6ad78a','Title','AIWorks',1448,1,'1668043800000','1668907800000','1668043800000','1668043800000',1,5000,1,'1',NULL,NULL,1,'2022-12-06 15:15:32','2022-12-20 03:18:51'),(32,'9a69fdad-c168-4dc2-ba8e-10aa7d6ad78a','Title','AIWorks',1448,1,'1668043800000','1668907800000','1668043800000','1668043800000',1,5000,1,'1','Description',NULL,1,'2022-12-12 09:03:14','2022-12-20 03:18:51'),(33,'e4aecd23-3a37-486a-bd05-bde0c82d8fe1','CV so 1','THN SSA',1442,1,'1670864400000','1671037200000','1670835840000','1670799900000',0,30000,1,'1',' gfjhd gfjhf go ghost h',NULL,1,'2022-12-12 09:12:20','2022-12-20 03:18:51'),(34,'9a69fdad-c168-4dc2-ba8e-10aa7d6ad78a','Title','AIWorks',1448,1,'1668043800000','1668907800000','1668043800000','1668043800000',1,5000,1,'1','Description',NULL,1,'2022-12-13 04:18:48','2022-12-20 03:18:51'),(35,'9a69fdad-c168-4dc2-ba8e-10aa7d6ad78a','Title','AIWorks',1448,1,'1668043800000','1668907800000','1668043800000','1668043800000',1,5000,1,'1','Description',NULL,1,'2022-12-13 04:22:25','2022-12-20 03:18:51'),(36,'9a69fdad-c168-4dc2-ba8e-10aa7d6ad78a','Title','AIWorks',1448,1,'1668043800000','1668907800000','1668043800000','1668043800000',1,5000,1,'1','Description',NULL,1,'2022-12-13 04:23:58','2022-12-20 03:18:51'),(37,'e4aecd23-3a37-486a-bd05-bde0c82d8fe1','CV CUA THANH 2','TNHH MTV MTV',1448,1,'1670864400000','1671037200000','1671078720000','1671093120000',0,233333,1,'1','Thanh edit lần 1',NULL,1,'2022-12-13 04:34:09','2022-12-20 03:18:51'),(38,'9a69fdad-c168-4dc2-ba8e-10aa7d6ad78a','Title','AIWorks',1448,1,'1668043800000','1668907800000','1668043800000','1668043800000',1,5000,1,'1','Description',NULL,1,'2022-12-13 04:34:30','2022-12-20 03:18:51'),(39,'e5090e80-ce5c-4b3c-8e20-8b5049cdda41','Quét dọn','Ai works',1443,1,'1671037200000','1671210000000','1670895000000','1670923800000',1,8000000,1,'1','ạbcdhh ghwjsgbcj ghhbhh',NULL,1,'2022-12-13 04:37:53','2022-12-20 03:18:51'),(40,'9a69fdad-c168-4dc2-ba8e-10aa7d6ad78a','Title','AIWorks',1462,1,'1669773536554','1669773536554','1669773536554','1669773536554',1,5000,1,'1','Description',NULL,1,'2022-12-13 09:35:06','2022-12-20 03:18:51'),(41,'e5090e80-ce5c-4b3c-8e20-8b5049cdda41','tuyển nv phục vụ','cty TNHH ai',1443,1,'1671728400000','1676998800000','1670871600000','1670940060000',1,5000000,1,'1','[TB] GỌI RẺ HƠN - TIẾT KIỆM HƠN: Với 70.000đ/30 ngày, miễn phí 20 phút/cuộc gọi nội mạng (tối đa 1.000 phút). Đăng ký tại https://viettel.vn/MP70X hoặc soạn MP70X gửi 109. DV gia hạn sau 30 ngày. CT áp dụng cho TB nhận được tin nhắn. Chi tiết LH 198 (0đ).',NULL,1,'2022-12-13 09:38:17','2022-12-20 03:18:51'),(42,'e4aecd23-3a37-486a-bd05-bde0c82d8fe1','CV so 2','TNHH MTV THANH',1448,0,NULL,NULL,'1671443400000','1671443400000',0,2000000,1,'1','hihi',NULL,1,'2022-12-19 09:51:16','2022-12-20 03:18:51'),(43,'e4aecd23-3a37-486a-bd05-bde0c82d8fe1','CV SO 1','TNHH MTV BT',1448,0,NULL,NULL,'1671506160000','1671506160000',0,230000,1,'1','you cau cv that tot',NULL,3,'2022-12-20 03:17:11','2022-12-27 08:34:52'),(159,'4d207f7c-d443-476b-af9a-b59da47560a9','Chuyên Viên Tư Vấn / Telesales Khóa Học','Babilala',1448,1,'1668043800000','1668907800000','1668043800000','1668043800000',1,5000,1,'1','Description',NULL,1,'2022-11-30 14:28:42','2022-12-19 15:23:44'),(160,'4d207f7c-d443-476b-af9a-b59da47560a9','Kế Toán Tổng Hợp','CÔNG TY CỔ PHẦN SÁNG TẠO VÀ GIẢI PHÁP TRUYỀN THÔNG SỐ Á CHÂU',1448,1,'1668043800000','1668907800000','1668043800000','1668043800000',1,5000,3,'1','Description',NULL,1,'2022-11-30 14:28:45','2022-12-29 04:24:21'),(161,'4d207f7c-d443-476b-af9a-b59da47560a9','Nhân viên bán hàng qua điện thoại','Công Ty TNHH TransCosmos Việt Nam',1448,1,'1668043800000','1668907800000','1668043800000','1668043800000',1,5000,1,'1','Description',NULL,1,'2022-11-30 14:28:46','2022-12-29 04:24:21'),(162,'4d207f7c-d443-476b-af9a-b59da47560a9','Nhân Viên Nhập Liệu','CÔNG TY TNHH GBG GROUP SERVICES',1448,1,'1668043800000','1668907800000','1668043800000','1668043800000',1,5000,4,'1','Description',NULL,1,'2022-11-30 14:28:47','2022-12-29 04:24:21'),(163,'4d207f7c-d443-476b-af9a-b59da47560a9','Trưởng Phòng Thương Mại Điện Tử','Công ty CP Thời trang Bimart',1448,1,'1668043800000','1668907800000','1668043800000','1668043800000',1,5000,1,'1','Description',NULL,1,'2022-11-30 14:28:47','2022-12-29 04:24:21'),(164,'4d207f7c-d443-476b-af9a-b59da47560a9','Chuyên Viên An Toàn/ Đào Tạo Bộ Phận Thiết Bị','CÔNG TY TNHH VINA SOLAR TECHNOLOGY',1448,1,'1668043800000','1668907800000','1668043800000','1668043800000',1,5000,2,'1','Description',NULL,1,'2022-11-30 14:28:47','2022-12-29 04:24:21'),(165,'4d207f7c-d443-476b-af9a-b59da47560a9','Nhân Viên Kỹ Thuật Thang Máy','CÔNG TY CỔ PHẦN CÔNG NGHỆ THANG MÁY PHÚC LỘC',1448,1,'1668043800000','1668907800000','1668043800000','1668043800000',1,5000,2,'1','Bảo trì thang máy định kỳ. Sửa chữa được các lỗi thường gặp của các dòng thang máy. Thi công vận hành đấu nối điện cho các công trình, dự án thang máy đang triển khai.',NULL,1,'2022-11-30 14:28:47','2022-12-29 04:24:21'),(166,'4d207f7c-d443-476b-af9a-b59da47560a9','Nhân Viên Dịch Vụ Khách Hàng','Công ty chuyển phát nhanh Thuận Phong chi nhánh Hồ Chí Minh (J&T Express)',1448,1,'1668043800000','1668907800000','1668043800000','1668043800000',1,5000,2,'1','Tiếp nhận và xử lý các khiếu nại về hàng hóa, dịch vụ. Truy xuất và xử lý dữ liệu, số liệu từ hệ thống Công ty, sau đó thống kê, phân tích, giám sát và gửi báo cáo hàng ngày.',NULL,1,'2022-11-30 14:28:47','2022-12-29 04:24:21'),(167,'4d207f7c-d443-476b-af9a-b59da47560a9','Nhân Viên Tiếp Thị Kỹ Thuật Số','CÔNG TY TNHH ĐẢO HẢI SẢN',1448,1,'1668043800000','1668907800000','1668043800000','1668043800000',1,5000,4,'1','Tổ chức campaign, chiến dịch bán hàng (30%). Content (20%). Chạy quảng cáo (20%). Thực hiện theo mục tiêu các chỉ số Marketing (20%). Báo cáo, phân tích và cải tiến (10%).',NULL,1,'2022-11-30 14:28:47','2022-12-29 04:24:21'),(168,'4d207f7c-d443-476b-af9a-b59da47560a9','Kiến Trúc Sư (Thiết Kế 3D/ Bổ Kiến Trúc)','CÔNG TY CỔ PHẦN ATAKAI VIỆT NAM',1448,1,'1668043800000','1668907800000','1668043800000','1668043800000',1,5000,4,'1','Lập kế hoạch triển khai thiết kế, tiến độ thực hiện công việc thiết kế từ ý tưởng đến thiết kế cơ sở, thiết kế bản vẽ thi công 2D/ 3D cho dự án. Triển khai mô hình 3D theo sự hướng dẫn và thiết kế của kiến trúc sư chủ trì.',NULL,1,'2022-11-30 14:28:47','2022-12-29 04:24:21'),(169,'4d207f7c-d443-476b-af9a-b59da47560a9','Thực Tập Sinh Lập Trình Viên Dotnet','CÔNG TY TNHH W2SOLUTION VIỆT NAM',1448,1,'1668043800000','1668907800000','1668043800000','1668043800000',1,5000,4,'1','Tham gia phát triển các dự án phần mềm. Tham gia thực tập Full-time. Tìm hiểu và phát triển chức năng Web E-Commerce',NULL,1,'2022-11-30 14:28:47','2022-12-29 04:24:21'),(170,'4d207f7c-d443-476b-af9a-b59da47560a9','Fullstack Developer (Middle)','Công ty Cổ phần TOPCV Việt Nam',1448,1,'1668043800000','1668907800000','1668043800000','1668043800000',1,5000,3,'1','Phát triển các dự án, sản phẩm của công ty TopCV. Công việc chính là phát triển website & server-side cho ứng dụng di động.',NULL,1,'2022-11-30 14:28:47','2022-12-29 04:24:21'),(171,'4d207f7c-d443-476b-af9a-b59da47560a9','Trưởng Trạm Giao Nhận Miền Bắc','Công ty TNHH Shopee Express',1448,1,'1668043800000','1668907800000','1668043800000','1668043800000',1,5000,4,'1','Quản lý công việc, ca làm việc cho đội ngũ nhân viên giao hàng, và nhân viên tại trạm. Quản lý quá trình giao, nhận, trả của hàng hóa thuộc khu vực quản lý.',NULL,1,'2022-11-30 14:28:47','2022-12-29 04:24:21'),(172,'4d207f7c-d443-476b-af9a-b59da47560a9','Chuyên Viên Quản Lý Khách Hàng Cao Cấp','De La Sól - Sunlife',1448,1,'1668043800000','1668907800000','1668043800000','1668043800000',1,5000,2,'1','Cung cấp và hỗ trợ các giải pháp tài chính chuyên nghiệp cho khách hàng. Tìm kiếm, mở rộng và xây dựng nguồn khách hàng tiềm năng. Lên kế hoạch bán hàng theo tháng, quý để đạt được mục tiêu doanh số được giao.',NULL,1,'2022-11-30 14:28:47','2022-12-29 04:24:21'),(173,'4d207f7c-d443-476b-af9a-b59da47560a9','Điều Dưỡng Viên','CÔNG TY CỔ PHẦN PHÁT TRIỂN CÔNG NGHỆ Y HỌC VIỆT NAM - NHẬT BẢN',1448,1,'1668043800000','1668907800000','1668043800000','1668043800000',1,5000,2,'1','Tổ chức đón tiếp và hướng dẫn người bệnh/khách hàng thực hiện các thủ tục khám, chữa bệnh theo đúng nội quy, quy chế của bệnh viện',NULL,1,'2022-11-30 14:28:47','2022-12-29 04:24:21'),(174,'4d207f7c-d443-476b-af9a-b59da47560a9','Nhân Viên Bản Quyền Sách Văn Học Tiếng Anh','Công ty Văn hóa và Truyền thông 1980Books',1448,1,'1668043800000','1668907800000','1668043800000','1668043800000',1,5000,4,'1','Quản lý công việc, ca làm việc cho đội ngũ nhân viên giao hàng, và nhân viên tại trạm. Quản lý quá trình giao, nhận, trả của hàng hóa thuộc khu vực quản lý.',NULL,1,'2022-11-30 14:28:47','2022-12-29 04:24:21'),(175,'4d207f7c-d443-476b-af9a-b59da47560a9','Nhân Viên Digital Marketing','Công Ty US Direct IMM',1448,1,'1668043800000','1668907800000','1668043800000','1668043800000',1,5000,4,'1','Quản lý công việc, ca làm việc cho đội ngũ nhân viên giao hàng, và nhân viên tại trạm. Quản lý quá trình giao, nhận, trả của hàng hóa thuộc khu vực quản lý.',NULL,1,'2022-11-30 14:28:47','2022-12-29 04:24:21'),(176,'4d207f7c-d443-476b-af9a-b59da47560a9','Nhân Viên Kỹ Thuật Cơ Khí','ECOZEN INTERNATIONAL JSC',1448,1,'1668043800000','1668907800000','1668043800000','1668043800000',1,5000,4,'1','Quản lý công việc, ca làm việc cho đội ngũ nhân viên giao hàng, và nhân viên tại trạm. Quản lý quá trình giao, nhận, trả của hàng hóa thuộc khu vực quản lý.',NULL,1,'2022-11-30 14:28:47','2022-12-29 04:24:21'),(177,'4d207f7c-d443-476b-af9a-b59da47560a9','Chuyên Viên Tư Vấn - Telesales','CÔNG TY TNHH THƯƠNG MẠI VÀ XÂY LẮP MEIKO',1448,1,'1668043800000','1668907800000','1668043800000','1668043800000',1,5000,4,'1','Quản lý công việc, ca làm việc cho đội ngũ nhân viên giao hàng, và nhân viên tại trạm. Quản lý quá trình giao, nhận, trả của hàng hóa thuộc khu vực quản lý.',NULL,1,'2022-11-30 14:28:47','2022-12-29 04:24:21'),(178,'4d207f7c-d443-476b-af9a-b59da47560a9','Nhân Viên Kỹ Thuật Bảo Trì Điện','CÔNG TY TNHH KCC',1448,1,'1668043800000','1668907800000','1668043800000','1668043800000',1,5000,4,'1','Quản lý công việc, ca làm việc cho đội ngũ nhân viên giao hàng, và nhân viên tại trạm. Quản lý quá trình giao, nhận, trả của hàng hóa thuộc khu vực quản lý.',NULL,1,'2022-11-30 14:28:47','2022-12-29 04:24:21'),(179,'4d207f7c-d443-476b-af9a-b59da47560a9','Nhân Viên Kinh Doanh','Công ty Cổ phần Truyền Thông Tập Trung Mặt Trời Vàng',1448,1,'1668043800000','1668907800000','1668043800000','1668043800000',1,5000,2,'1','Quản lý công việc, ca làm việc cho đội ngũ nhân viên giao hàng, và nhân viên tại trạm. Quản lý quá trình giao, nhận, trả của hàng hóa thuộc khu vực quản lý.',NULL,1,'2022-11-30 14:28:47','2022-12-29 04:24:21'),(180,'4d207f7c-d443-476b-af9a-b59da47560a9','Quản Lý /Giám Sát Vận Hành Dịch Vụ Rạp Chiếu Phim','Công ty TNHH CJ CGV Việt Nam',1448,1,'1668043800000','1668907800000','1668043800000','1668043800000',1,5000,2,'1','Quản lý công việc, ca làm việc cho đội ngũ nhân viên giao hàng, và nhân viên tại trạm. Quản lý quá trình giao, nhận, trả của hàng hóa thuộc khu vực quản lý.',NULL,1,'2022-11-30 14:28:47','2022-12-29 04:24:21'),(181,'4d207f7c-d443-476b-af9a-b59da47560a9','Kế Toán Thuế','CÔNG TY TNHH XUẤT NHẬP KHẨU LIÊN PHONG',1448,1,'1668043800000','1668907800000','1668043800000','1668043800000',1,5000,4,'1','Quản lý công việc, ca làm việc cho đội ngũ nhân viên giao hàng, và nhân viên tại trạm. Quản lý quá trình giao, nhận, trả của hàng hóa thuộc khu vực quản lý.',NULL,1,'2022-11-30 14:28:47','2022-12-29 04:24:21'),(182,'4d207f7c-d443-476b-af9a-b59da47560a9','Chuyên Viên Tư Vấn','Tổ chức Giáo dục và Đào tạo Apollo Việt Nam',1448,1,'1668043800000','1668907800000','1668043800000','1668043800000',1,5000,4,'1','Quản lý công việc, ca làm việc cho đội ngũ nhân viên giao hàng, và nhân viên tại trạm. Quản lý quá trình giao, nhận, trả của hàng hóa thuộc khu vực quản lý.',NULL,1,'2022-11-30 14:28:47','2022-12-29 04:24:21'),(183,'4d207f7c-d443-476b-af9a-b59da47560a9','Chuyên Viên Quan Hệ Khách Hàng','Ngân hàng LienVietPostBank PGD Hoài Đức',1448,1,'1668043800000','1668907800000','1668043800000','1668043800000',1,5000,4,'1','Quản lý công việc, ca làm việc cho đội ngũ nhân viên giao hàng, và nhân viên tại trạm. Quản lý quá trình giao, nhận, trả của hàng hóa thuộc khu vực quản lý.',NULL,1,'2022-11-30 14:28:47','2022-12-29 04:24:21'),(184,'4d207f7c-d443-476b-af9a-b59da47560a9','Chuyên Viên Dịch Vụ - Chăm Sóc Học Viên','CÔNG TY CP CÔNG NGHỆ GIÁO DỤC TRƯỜNG HỌC TRỰC TUYẾN - ONSCHOOL',1448,1,'1668043800000','1668907800000','1668043800000','1668043800000',1,5000,1,'1','Quản lý công việc, ca làm việc cho đội ngũ nhân viên giao hàng, và nhân viên tại trạm. Quản lý quá trình giao, nhận, trả của hàng hóa thuộc khu vực quản lý.',NULL,1,'2022-11-30 14:28:47','2022-12-29 04:24:21'),(185,'4d207f7c-d443-476b-af9a-b59da47560a9','Nhân Viên Sale','CÔNG TY TNHH EINSIX VIET NAM',1448,1,'1668043800000','1668907800000','1668043800000','1668043800000',1,5000,2,'1','Quản lý công việc, ca làm việc cho đội ngũ nhân viên giao hàng, và nhân viên tại trạm. Quản lý quá trình giao, nhận, trả của hàng hóa thuộc khu vực quản lý.',NULL,1,'2022-11-30 14:28:47','2022-12-29 04:24:21'),(186,'4d207f7c-d443-476b-af9a-b59da47560a9','Chuyên Viên Marketing','CÔNG TY CỔ PHẦN QUỐC TẾ ANH VĂN HỘI VIỆT MỸ',1448,1,'1668043800000','1668907800000','1668043800000','1668043800000',1,5000,4,'1','Quản lý công việc, ca làm việc cho đội ngũ nhân viên giao hàng, và nhân viên tại trạm. Quản lý quá trình giao, nhận, trả của hàng hóa thuộc khu vực quản lý.',NULL,1,'2022-11-30 14:28:47','2022-12-29 04:24:21'),(187,'4d207f7c-d443-476b-af9a-b59da47560a9','Nhân Viên Bán Hàng Nội Thất Cao Cấp Hàn Quốc','CÔNG TY TNHH JANG IN FURNITURE VIỆT NAM',1448,1,'1668043800000','1668907800000','1668043800000','1668043800000',1,5000,2,'1','Quản lý công việc, ca làm việc cho đội ngũ nhân viên giao hàng, và nhân viên tại trạm. Quản lý quá trình giao, nhận, trả của hàng hóa thuộc khu vực quản lý.',NULL,1,'2022-11-30 14:28:47','2022-12-29 04:24:21'),(188,'4d207f7c-d443-476b-af9a-b59da47560a9','Nhân Viên Kinh Doanh Resort','Công ty CP Thành phố Du lịch Sinh thái Sơn Tiên',1448,1,'1668043800000','1668907800000','1668043800000','1668043800000',1,5000,4,'1','Quản lý công việc, ca làm việc cho đội ngũ nhân viên giao hàng, và nhân viên tại trạm. Quản lý quá trình giao, nhận, trả của hàng hóa thuộc khu vực quản lý.',NULL,1,'2022-11-30 14:28:47','2022-12-29 04:24:21'),(189,'4d207f7c-d443-476b-af9a-b59da47560a9','Nhân Viên Marketing','CÔNG TY TNHH GLUCK VIỆT NAM',1448,1,'1668043800000','1668907800000','1668043800000','1668043800000',1,5000,2,'1','Quản lý công việc, ca làm việc cho đội ngũ nhân viên giao hàng, và nhân viên tại trạm. Quản lý quá trình giao, nhận, trả của hàng hóa thuộc khu vực quản lý.',NULL,1,'2022-11-30 14:28:47','2022-12-29 04:24:21'),(190,'4d207f7c-d443-476b-af9a-b59da47560a9','Chuyên Viên Telesales Cấp Cao','Công ty TNHH EDUPIA',1448,1,'1668043800000','1668907800000','1668043800000','1668043800000',1,5000,2,'1','Quản lý công việc, ca làm việc cho đội ngũ nhân viên giao hàng, và nhân viên tại trạm. Quản lý quá trình giao, nhận, trả của hàng hóa thuộc khu vực quản lý.',NULL,1,'2022-11-30 14:28:47','2022-12-29 04:24:21'),(191,'4d207f7c-d443-476b-af9a-b59da47560a9','Quản Lý Spa Biết Tiếng Hàn','CÔNG TY TNHH DỊCH VỤ DU LỊCH DANANG TRESURE',1448,1,'1668043800000','1668907800000','1668043800000','1668043800000',1,5000,2,'1','Quản lý công việc, ca làm việc cho đội ngũ nhân viên giao hàng, và nhân viên tại trạm. Quản lý quá trình giao, nhận, trả của hàng hóa thuộc khu vực quản lý.',NULL,1,'2022-11-30 14:28:47','2022-12-29 04:24:21'),(192,'4d207f7c-d443-476b-af9a-b59da47560a9','Nhân Viên Bán Hàng','CÔNG TY TNHH LONG HUEI',1448,1,'1668043800000','1668907800000','1668043800000','1668043800000',1,5000,4,'1','Quản lý công việc, ca làm việc cho đội ngũ nhân viên giao hàng, và nhân viên tại trạm. Quản lý quá trình giao, nhận, trả của hàng hóa thuộc khu vực quản lý.',NULL,1,'2022-11-30 14:28:47','2022-12-29 04:24:21'),(193,'4d207f7c-d443-476b-af9a-b59da47560a9','Nhân Viên Telesales / Tư Vấn','CÔNG TY TNHH TƯ VẤN DỊCH VỤ VINKARIS',1448,1,'1668043800000','1668907800000','1668043800000','1668043800000',1,5000,4,'1','Quản lý công việc, ca làm việc cho đội ngũ nhân viên giao hàng, và nhân viên tại trạm. Quản lý quá trình giao, nhận, trả của hàng hóa thuộc khu vực quản lý.',NULL,1,'2022-11-30 14:28:47','2022-12-29 04:24:21'),(194,'4d207f7c-d443-476b-af9a-b59da47560a9','Trưởng Phòng Kinh Doanh','Công ty TNHH VUIHOC',1448,1,'1668043800000','1668907800000','1668043800000','1668043800000',1,5000,4,'1','Quản lý công việc, ca làm việc cho đội ngũ nhân viên giao hàng, và nhân viên tại trạm. Quản lý quá trình giao, nhận, trả của hàng hóa thuộc khu vực quản lý.',NULL,1,'2022-11-30 14:28:47','2022-12-29 04:24:21'),(195,'4d207f7c-d443-476b-af9a-b59da47560a9','Chuyên Viên Phát Triển Và Kinh Doanh Dịch Vụ Trên Di Động','Trung tâm Dịch vụ số MobiFone',1448,1,'1668043800000','1668907800000','1668043800000','1668043800000',1,5000,4,'1','Quản lý công việc, ca làm việc cho đội ngũ nhân viên giao hàng, và nhân viên tại trạm. Quản lý quá trình giao, nhận, trả của hàng hóa thuộc khu vực quản lý.',NULL,1,'2022-11-30 14:28:47','2022-12-29 04:24:21'),(196,'4d207f7c-d443-476b-af9a-b59da47560a9','Giám Sát Bán Hàng','CÔNG TY TNHH ĐẦU TƯ SB GROUP',1448,1,'1668043800000','1668907800000','1668043800000','1668043800000',1,5000,2,'1','Quản lý công việc, ca làm việc cho đội ngũ nhân viên giao hàng, và nhân viên tại trạm. Quản lý quá trình giao, nhận, trả của hàng hóa thuộc khu vực quản lý.',NULL,1,'2022-11-30 14:28:47','2022-12-29 04:24:21'),(197,'4d207f7c-d443-476b-af9a-b59da47560a9','Chuyên Viên Kỹ Thuật','Trung tâm Dịch vụ số MobiFone',1448,1,'1668043800000','1668907800000','1668043800000','1668043800000',1,5000,4,'1','Quản lý công việc, ca làm việc cho đội ngũ nhân viên giao hàng, và nhân viên tại trạm. Quản lý quá trình giao, nhận, trả của hàng hóa thuộc khu vực quản lý.',NULL,1,'2022-11-30 14:28:47','2022-12-29 04:24:21'),(198,'4d207f7c-d443-476b-af9a-b59da47560a9','Khai Thác Ứng Dụng & Triển Khai Các Giải Pháp CNTT','TRUNG TÂM CNTT MOBIFONE',1448,1,'1668043800000','1668907800000','1668043800000','1668043800000',1,5000,2,'1','Quản lý công việc, ca làm việc cho đội ngũ nhân viên giao hàng, và nhân viên tại trạm. Quản lý quá trình giao, nhận, trả của hàng hóa thuộc khu vực quản lý.',NULL,1,'2022-11-30 14:28:47','2022-12-29 04:24:21'),(199,'4d207f7c-d443-476b-af9a-b59da47560a9','Backend Developer (Golang)','Công ty Cổ phần Tomotek',1448,1,'1668043800000','1668907800000','1668043800000','1668043800000',1,5000,4,'1','Quản lý công việc, ca làm việc cho đội ngũ nhân viên giao hàng, và nhân viên tại trạm. Quản lý quá trình giao, nhận, trả của hàng hóa thuộc khu vực quản lý.',NULL,1,'2022-11-30 14:28:47','2022-12-29 04:24:21'),(200,'4d207f7c-d443-476b-af9a-b59da47560a9','Chuyên Viên Kinh Doanh Ngành Quảng Cáo - Truyền Thông','Công ty Cổ phần đầu tư Bizman',1448,1,'1668043800000','1668907800000','1668043800000','1668043800000',1,5000,4,'1','Quản lý công việc, ca làm việc cho đội ngũ nhân viên giao hàng, và nhân viên tại trạm. Quản lý quá trình giao, nhận, trả của hàng hóa thuộc khu vực quản lý.',NULL,1,'2022-11-30 14:28:47','2022-12-29 04:24:21'),(201,'4d207f7c-d443-476b-af9a-b59da47560a9','Kế Toán Tổng Hợp','Công ty CP Đầu tư Vàng Phú Quý',1448,1,'1668043800000','1668907800000','1668043800000','1668043800000',1,5000,1,'1','Quản lý công việc, ca làm việc cho đội ngũ nhân viên giao hàng, và nhân viên tại trạm. Quản lý quá trình giao, nhận, trả của hàng hóa thuộc khu vực quản lý.',NULL,1,'2022-11-30 14:28:47','2022-12-29 04:24:21'),(202,'4d207f7c-d443-476b-af9a-b59da47560a9','Senior Android Developer','CÔNG TY TNHH THỊ GIÁC META',1448,1,'1668043800000','1668907800000','1668043800000','1668043800000',1,5000,4,'1','Quản lý công việc, ca làm việc cho đội ngũ nhân viên giao hàng, và nhân viên tại trạm. Quản lý quá trình giao, nhận, trả của hàng hóa thuộc khu vực quản lý.',NULL,1,'2022-11-30 14:28:47','2022-12-29 04:24:21'),(203,'4d207f7c-d443-476b-af9a-b59da47560a9','Chuyên Viên Tư Vấn Hỗ Trợ Khách Hàng','CÔNG TY TNHH IRON BEE',1448,1,'1668043800000','1668907800000','1668043800000','1668043800000',1,5000,2,'1','Quản lý công việc, ca làm việc cho đội ngũ nhân viên giao hàng, và nhân viên tại trạm. Quản lý quá trình giao, nhận, trả của hàng hóa thuộc khu vực quản lý.',NULL,1,'2022-11-30 14:28:47','2022-12-29 04:24:21'),(204,'4d207f7c-d443-476b-af9a-b59da47560a9','Nhân Viên Kế Toán Thanh Toán','ECOZEN INTERNATIONAL JSC',1448,1,'1668043800000','1668907800000','1668043800000','1668043800000',1,5000,2,'1','Quản lý công việc, ca làm việc cho đội ngũ nhân viên giao hàng, và nhân viên tại trạm. Quản lý quá trình giao, nhận, trả của hàng hóa thuộc khu vực quản lý.',NULL,1,'2022-11-30 14:28:47','2022-12-29 04:24:21'),(205,'4d207f7c-d443-476b-af9a-b59da47560a9','Chuyên Viên Marketing Online','Công ty TNHH đầu tư công nghệ và dịch vụ Sconnect Việt Nam',1448,1,'1668043800000','1668907800000','1668043800000','1668043800000',1,5000,2,'1','Quản lý công việc, ca làm việc cho đội ngũ nhân viên giao hàng, và nhân viên tại trạm. Quản lý quá trình giao, nhận, trả của hàng hóa thuộc khu vực quản lý.',NULL,1,'2022-11-30 14:28:47','2022-12-29 04:24:21'),(206,'4d207f7c-d443-476b-af9a-b59da47560a9','Chuyên Viên Tư Vấn Giáo Dục/ Tư Vấn Tuyển Sinh','TRUNG TÂM ANH NGỮ QUỐC TẾ GIGI',1448,1,'1668043800000','1668907800000','1668043800000','1668043800000',1,5000,4,'1','Quản lý công việc, ca làm việc cho đội ngũ nhân viên giao hàng, và nhân viên tại trạm. Quản lý quá trình giao, nhận, trả của hàng hóa thuộc khu vực quản lý.',NULL,1,'2022-11-30 14:28:47','2022-12-29 04:24:21'),(207,'4d207f7c-d443-476b-af9a-b59da47560a9','Chuyên Viên Truyền Thông','Công ty Cổ phần Giáo dục & Đào tạo IMAP Việt Nam',1448,1,'1668043800000','1668907800000','1668043800000','1668043800000',1,5000,4,'1','Quản lý công việc, ca làm việc cho đội ngũ nhân viên giao hàng, và nhân viên tại trạm. Quản lý quá trình giao, nhận, trả của hàng hóa thuộc khu vực quản lý.',NULL,1,'2022-11-30 14:28:47','2022-12-29 04:24:21'),(208,'4d207f7c-d443-476b-af9a-b59da47560a9','Nhân Viên Tổ Chức Sự Kiện','CÔNG TY TNHH TRUNG TÂM ANH NGỮ VUS MIỀN BẮC',1448,1,'1668043800000','1668907800000','1668043800000','1668043800000',1,5000,1,'1','Quản lý công việc, ca làm việc cho đội ngũ nhân viên giao hàng, và nhân viên tại trạm. Quản lý quá trình giao, nhận, trả của hàng hóa thuộc khu vực quản lý.',NULL,1,'2022-11-30 14:28:47','2022-12-29 04:24:21'),(209,'4d207f7c-d443-476b-af9a-b59da47560a9','Giáo Viên Tiếng Anh','Trung Tâm Anh Ngữ ILA',1448,1,'1668043800000','1668907800000','1668043800000','1668043800000',1,5000,1,'1','Quản lý công việc, ca làm việc cho đội ngũ nhân viên giao hàng, và nhân viên tại trạm. Quản lý quá trình giao, nhận, trả của hàng hóa thuộc khu vực quản lý.',NULL,1,'2022-11-30 14:28:47','2022-12-29 04:24:21'),(210,'4d207f7c-d443-476b-af9a-b59da47560a9','Nhân Viên Kinh Doanh Giao Hàng Tận Nhà','CÔNG TY TNHH YAKULT VN',1448,1,'1668043800000','1668907800000','1668043800000','1668043800000',1,5000,4,'1','Quản lý công việc, ca làm việc cho đội ngũ nhân viên giao hàng, và nhân viên tại trạm. Quản lý quá trình giao, nhận, trả của hàng hóa thuộc khu vực quản lý.',NULL,1,'2022-11-30 14:28:47','2022-12-29 04:24:21'),(211,'4d207f7c-d443-476b-af9a-b59da47560a9','Lập Trình Viên','TRUNG TÂM CNTT MOBIFONE',1448,1,'1668043800000','1668907800000','1668043800000','1668043800000',1,5000,2,'1','Quản lý công việc, ca làm việc cho đội ngũ nhân viên giao hàng, và nhân viên tại trạm. Quản lý quá trình giao, nhận, trả của hàng hóa thuộc khu vực quản lý.',NULL,1,'2022-11-30 14:28:47','2022-12-29 04:24:21'),(212,'4d207f7c-d443-476b-af9a-b59da47560a9','Nhân Viên Tư Vấn Bán Hàng','CÔNG TY TNHH XUẤT NHẬP KHẨU PHÁT TRIỂN ĐÔNG DƯƠNG - TẬP ĐOÀN THỂ THAO KINGSPORT',1448,1,'1668043800000','1668907800000','1668043800000','1668043800000',1,5000,2,'1','Quản lý công việc, ca làm việc cho đội ngũ nhân viên giao hàng, và nhân viên tại trạm. Quản lý quá trình giao, nhận, trả của hàng hóa thuộc khu vực quản lý.',NULL,1,'2022-11-30 14:28:47','2022-12-29 04:24:21'),(213,'4d207f7c-d443-476b-af9a-b59da47560a9','Diễn Hoạ Kiến Trúc','Công ty TNHH VACS Việt Nam',1448,1,'1668043800000','1668907800000','1668043800000','1668043800000',1,5000,2,'1','Quản lý công việc, ca làm việc cho đội ngũ nhân viên giao hàng, và nhân viên tại trạm. Quản lý quá trình giao, nhận, trả của hàng hóa thuộc khu vực quản lý.',NULL,1,'2022-11-30 14:28:47','2022-12-29 04:24:21'),(214,'4d207f7c-d443-476b-af9a-b59da47560a9','Trưởng Phòng Kinh Doanh Bảo Hiểm','Công Ty TNHH FWM',1448,1,'1668043800000','1668907800000','1668043800000','1668043800000',1,5000,4,'1','Quản lý công việc, ca làm việc cho đội ngũ nhân viên giao hàng, và nhân viên tại trạm. Quản lý quá trình giao, nhận, trả của hàng hóa thuộc khu vực quản lý.',NULL,1,'2022-11-30 14:28:47','2022-12-29 04:24:21'),(215,'4d207f7c-d443-476b-af9a-b59da47560a9','Nhân Viên Chăm Sóc Khách Hàng','Công ty TNHH Phước Thọ An Bình',1448,1,'1668043800000','1668907800000','1668043800000','1668043800000',1,5000,4,'1','Quản lý công việc, ca làm việc cho đội ngũ nhân viên giao hàng, và nhân viên tại trạm. Quản lý quá trình giao, nhận, trả của hàng hóa thuộc khu vực quản lý.',NULL,1,'2022-11-30 14:28:47','2022-12-29 04:24:21'),(216,'4d207f7c-d443-476b-af9a-b59da47560a9','Trưởng Trạm Giao Nhận Miền Nam','Công ty TNHH Shopee Express',1448,1,'1668043800000','1668907800000','1668043800000','1668043800000',1,5000,2,'1','Quản lý công việc, ca làm việc cho đội ngũ nhân viên giao hàng, và nhân viên tại trạm. Quản lý quá trình giao, nhận, trả của hàng hóa thuộc khu vực quản lý.',NULL,1,'2022-11-30 14:28:47','2022-12-29 04:24:21'),(217,'4d207f7c-d443-476b-af9a-b59da47560a9','Nhân Viên Thiết Kế Đồ Họa','CÔNG TY TNHH XUẤT NHẬP KHẨU LIÊN PHONG',1448,1,'1668043800000','1668907800000','1668043800000','1668043800000',1,5000,2,'1','Quản lý công việc, ca làm việc cho đội ngũ nhân viên giao hàng, và nhân viên tại trạm. Quản lý quá trình giao, nhận, trả của hàng hóa thuộc khu vực quản lý.',NULL,1,'2022-11-30 14:28:47','2022-12-29 04:24:21'),(218,'4d207f7c-d443-476b-af9a-b59da47560a9','Chuyên Viên Kế Toán','CÔNG TY CỔ PHẦN QUỐC TẾ ANH VĂN HỘI VIỆT MỸ',1448,1,'1668043800000','1668907800000','1668043800000','1668043800000',1,5000,2,'1','Quản lý công việc, ca làm việc cho đội ngũ nhân viên giao hàng, và nhân viên tại trạm. Quản lý quá trình giao, nhận, trả của hàng hóa thuộc khu vực quản lý.',NULL,1,'2022-11-30 14:28:47','2022-12-29 04:23:49'),(219,'4d207f7c-d443-476b-af9a-b59da47560a9','Nhân viên kế toán','CÔNG TY TNHH TMDV ADFLY VIỆT NAM',1448,1,'1668043800000','1668907800000','1668043800000','1668043800000',1,5000,2,'1','Quản lý công việc, ca làm việc cho đội ngũ nhân viên giao hàng, và nhân viên tại trạm. Quản lý quá trình giao, nhận, trả của hàng hóa thuộc khu vực quản lý.',NULL,1,'2022-11-30 14:28:47','2022-12-29 04:23:49'),(220,'4d207f7c-d443-476b-af9a-b59da47560a9','Nhân Viên Chăm Sóc Khách Hàng','CÔNG TY CP KINH DOANH VÀ THƯƠNG MẠI EVEREST',1448,1,'1668043800000','1668907800000','1668043800000','1668043800000',1,5000,4,'1','Quản lý công việc, ca làm việc cho đội ngũ nhân viên giao hàng, và nhân viên tại trạm. Quản lý quá trình giao, nhận, trả của hàng hóa thuộc khu vực quản lý.',NULL,1,'2022-11-30 14:28:47','2022-12-29 04:23:40'),(221,'4d207f7c-d443-476b-af9a-b59da47560a9','IT Support - Hỗ Trợ Kỹ Thuật','Tek Experts Vietnam',1448,1,'1668043800000','1668907800000','1668043800000','1668043800000',1,5000,2,'1','Quản lý công việc, ca làm việc cho đội ngũ nhân viên giao hàng, và nhân viên tại trạm. Quản lý quá trình giao, nhận, trả của hàng hóa thuộc khu vực quản lý.',NULL,1,'2022-11-30 14:28:47','2022-12-27 10:22:13'),(222,'4d207f7c-d443-476b-af9a-b59da47560a9','Chuyên Viên Tư Vấn Giáo Dục','CÔNG TY CỔ PHẦN CÔNG NGHỆ & SÁNG TẠO TRẺ TEKY HOLDINGS',1448,1,'1668043800000','1668907800000','1668043800000','1668043800000',1,5000,2,'1','Quản lý công việc, ca làm việc cho đội ngũ nhân viên giao hàng, và nhân viên tại trạm. Quản lý quá trình giao, nhận, trả của hàng hóa thuộc khu vực quản lý.',NULL,1,'2022-11-30 14:28:47','2022-12-29 04:24:21'),(223,'4d207f7c-d443-476b-af9a-b59da47560a9','Nhân Viên Tư Vấn Tổng Đài/ Chăm Sóc Khách Hàng','Công ty TNHH Tele247 Global',1448,1,'1668043800000','1668907800000','1668043800000','1668043800000',1,5000,2,'1','Quản lý công việc, ca làm việc cho đội ngũ nhân viên giao hàng, và nhân viên tại trạm. Quản lý quá trình giao, nhận, trả của hàng hóa thuộc khu vực quản lý.',NULL,1,'2022-11-30 14:28:47','2022-12-29 04:23:40'),(224,'4d207f7c-d443-476b-af9a-b59da47560a9','Nhân Viên Kinh Doanh Giải Pháp Công Nghệ','Công ty cổ phần Công nghệ Sapo',1448,1,'1668043800000','1668907800000','1668043800000','1668043800000',1,5000,1,'1','Quản lý công việc, ca làm việc cho đội ngũ nhân viên giao hàng, và nhân viên tại trạm. Quản lý quá trình giao, nhận, trả của hàng hóa thuộc khu vực quản lý.',NULL,1,'2022-11-30 14:28:47','2022-12-29 04:23:40'),(225,'4d207f7c-d443-476b-af9a-b59da47560a9','Nhân Viên Quan Hệ Khách Hàng Doanh Nghiệp (Tư Vấn Tài Chính)','Công ty Cho thuê tài chính TNHH MTV Quốc tế Chailease',1448,1,'1668043800000','1668907800000','1668043800000','1668043800000',1,5000,2,'1','Quản lý công việc, ca làm việc cho đội ngũ nhân viên giao hàng, và nhân viên tại trạm. Quản lý quá trình giao, nhận, trả của hàng hóa thuộc khu vực quản lý.',NULL,1,'2022-11-30 14:28:47','2022-12-29 04:21:06'),(226,'4d207f7c-d443-476b-af9a-b59da47560a9','Nhân Viên Đào Tạo (Điều Phối Lớp Học)','CÔNG TY TNHH BẢO TÍN MINH CHÂU',1448,1,'1668043800000','1668907800000','1668043800000','1668043800000',1,5000,4,'1','Quản lý công việc, ca làm việc cho đội ngũ nhân viên giao hàng, và nhân viên tại trạm. Quản lý quá trình giao, nhận, trả của hàng hóa thuộc khu vực quản lý.',NULL,1,'2022-11-30 14:28:47','2022-12-29 04:21:06'),(227,'4d207f7c-d443-476b-af9a-b59da47560a9','Trợ Lý Kinh Doanh','CÔNG TY TNHH DỊCH VỤ VÀ KINH DOANH CÔNG NGHỆ IIC',1448,1,'1668043800000','1668907800000','1668043800000','1668043800000',1,5000,5,'1','Quản lý công việc, ca làm việc cho đội ngũ nhân viên giao hàng, và nhân viên tại trạm. Quản lý quá trình giao, nhận, trả của hàng hóa thuộc khu vực quản lý.',NULL,1,'2022-11-30 14:28:47','2022-12-27 09:49:46'),(228,'e4aecd23-3a37-486a-bd05-bde0c82d8fe1','CV via Thanh','TNHH MTV 123',1448,0,NULL,NULL,'100140000','125340000',0,10,1,'2','CV now nhang','84386958079',1,'2022-12-28 04:57:26','2022-12-29 02:42:55'),(229,'e4aecd23-3a37-486a-bd05-bde0c82d8fe1','CV cua Thanh','TNHH MTV',1448,0,NULL,NULL,'101220000','101220000',0,200000,2,'1','g nigh Biggs Hogg do bgf handgun Hogg h fight fog jfg her gh gf Jeff h fang hdf h fghgf diff h g chef ','84386958079',1,'2022-12-30 05:08:45','2022-12-30 05:21:47');
/*!40000 ALTER TABLE `posts` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `posts_categories`
--

DROP TABLE IF EXISTS `posts_categories`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `posts_categories` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `post_id` int(11) DEFAULT NULL,
  `category_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`),
  KEY `FK_Post_Category_Category` (`category_id`),
  KEY `FK_Post_Category_Post` (`post_id`),
  CONSTRAINT `FK_Post_Category_Category` FOREIGN KEY (`category_id`) REFERENCES `child_categories` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `FK_Post_Category_Post` FOREIGN KEY (`post_id`) REFERENCES `posts` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=435 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `posts_categories`
--

LOCK TABLES `posts_categories` WRITE;
/*!40000 ALTER TABLE `posts_categories` DISABLE KEYS */;
INSERT INTO `posts_categories` VALUES (75,32,188),(76,32,167),(77,33,167),(78,33,168),(79,33,169),(80,33,170),(81,33,171),(82,33,172),(83,33,173),(84,33,174),(85,33,175),(86,33,176),(87,33,177),(88,33,178),(89,33,179),(90,33,180),(91,33,181),(92,33,182),(93,33,183),(94,33,184),(103,36,167),(104,36,168),(106,38,167),(107,38,168),(108,39,167),(109,39,178),(110,40,208),(111,40,209),(112,41,167),(113,37,167),(114,42,167),(115,43,167),(361,159,167),(362,160,167),(363,161,167),(364,162,167),(365,163,177),(366,164,171),(367,165,172),(368,166,173),(369,167,174),(370,168,175),(371,169,176),(372,170,177),(373,171,178),(374,172,179),(375,173,180),(376,174,181),(377,175,182),(378,176,183),(379,177,184),(380,178,185),(381,179,186),(382,180,187),(383,181,188),(384,182,189),(385,183,190),(386,184,191),(387,185,192),(388,186,193),(389,187,194),(390,188,195),(391,189,196),(392,190,197),(393,191,198),(394,192,199),(395,193,200),(396,194,201),(397,195,202),(398,196,203),(399,197,204),(400,198,205),(401,199,206),(402,200,207),(403,201,208),(404,202,209),(405,203,210),(406,204,211),(407,205,212),(408,206,213),(409,207,214),(410,208,215),(411,209,216),(412,210,217),(413,211,218),(414,212,219),(415,213,220),(416,214,221),(417,215,222),(418,216,223),(419,217,224),(420,218,225),(421,219,226),(422,220,227),(423,221,228),(424,222,229),(425,223,230),(426,224,231),(427,225,232),(428,226,233),(429,227,234),(430,228,168),(431,228,167),(432,229,167),(433,229,168),(434,229,169);
/*!40000 ALTER TABLE `posts_categories` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `profiles`
--

DROP TABLE IF EXISTS `profiles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `profiles` (
  `id` varchar(50) NOT NULL DEFAULT uuid(),
  `name` varchar(200) DEFAULT NULL,
  `birthday` varchar(20) DEFAULT NULL,
  `address` int(11) DEFAULT NULL,
  `gender` tinyint(4) DEFAULT 0,
  `introduction` varchar(2000) DEFAULT NULL,
  `phone` varchar(20) DEFAULT NULL,
  `email` varchar(50) DEFAULT NULL,
  `facebook` varchar(50) DEFAULT NULL,
  `linkedin` varchar(50) DEFAULT NULL,
  `avatar` varchar(200) DEFAULT NULL,
  `created_at` datetime DEFAULT current_timestamp(),
  `updated_at` datetime DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`),
  KEY `FK_Profile_Province` (`address`),
  CONSTRAINT `FK_Profile_Account` FOREIGN KEY (`id`) REFERENCES `accounts` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `FK_Profile_Province` FOREIGN KEY (`address`) REFERENCES `provinces` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `profiles`
--

LOCK TABLES `profiles` WRITE;
/*!40000 ALTER TABLE `profiles` DISABLE KEYS */;
INSERT INTO `profiles` VALUES ('15c750ca-220a-44e2-b9fe-e59afa838daa',NULL,NULL,NULL,0,NULL,'84386958079',NULL,NULL,NULL,NULL,'2022-12-19 09:52:56','2022-12-19 09:52:56'),('251ac081-001c-406d-a963-599ac871d0aa','BT 2','0',202,1,'hihihih','0386958079','bkav2626@icloud.com',NULL,NULL,NULL,'2022-12-19 09:54:08','2022-12-20 07:31:24'),('301fdf9d-2872-4f51-9300-e6f268ff56e2','김동하','921600000',202,0,'ㅓㅇㅎㅇㅎ로독','73746477','winnerym@gmail.com','hdhdhdhd',NULL,'https://gig-app-upload.s3.ap-southeast-1.amazonaws.com/1672730485093-318c8547-4e25-4e61-8f26-5b4e76acab50.jpg','2023-01-03 03:43:13','2023-01-03 07:21:27'),('4d207f7c-d443-476b-af9a-b59da47560a9','Nguyen The Truong','995130000000',201,1,'My intro','0919004743','truong@gmail.com','facebook.com','linkedin.com','https://gig-app-upload.s3.ap-southeast-1.amazonaws.com/481b5604-6830-40cf-a00a-c5b0c07585e6-IMG_1962.JPG','2022-11-25 17:41:45','2022-12-14 09:44:56'),('52b0ed9e-de8b-41d7-adde-4cd9aa07649e',NULL,NULL,NULL,0,NULL,NULL,NULL,NULL,NULL,NULL,'2022-12-14 09:54:58','2022-12-14 09:54:58'),('80cdadfe-9ab0-401e-87c3-a96448063c9c',NULL,NULL,NULL,0,NULL,'84869867902',NULL,NULL,NULL,NULL,'2022-12-13 04:13:42','2022-12-13 04:13:42'),('9a69fdad-c168-4dc2-ba8e-10aa7d6ad78a','The Truong',NULL,NULL,0,NULL,NULL,NULL,NULL,NULL,NULL,'2022-11-30 15:54:46','2022-12-05 09:40:27'),('bbbaefa9-79f8-434c-9152-bdf4bffbfc65',NULL,NULL,NULL,0,NULL,NULL,NULL,NULL,NULL,NULL,'2022-12-13 04:31:45','2022-12-13 04:31:45'),('c3b658ef-1311-474e-ac04-391370830fd9',NULL,NULL,NULL,0,NULL,NULL,NULL,NULL,NULL,NULL,'2022-12-09 02:36:01','2022-12-09 02:36:01'),('cb7f2b06-1223-48ef-8773-cd201c2d0e8a',NULL,NULL,NULL,0,NULL,NULL,NULL,NULL,NULL,'https://gig-app-upload.s3.ap-southeast-1.amazonaws.com/e4036e69-99c6-4f45-ba2e-b196c121f9bf-image_picker6246802075885890955.jpg','2022-12-22 03:53:18','2022-12-22 03:57:01'),('cd381425-e89c-4057-a90f-41dac9f680c2',NULL,NULL,NULL,0,NULL,NULL,NULL,NULL,NULL,NULL,'2022-12-13 04:15:19','2022-12-13 04:15:19'),('e4aecd23-3a37-486a-bd05-bde0c82d8fe1','BAo Thanh 2','74534400000',202,1,'too la bao thanh','0386958079','bkav2626@gmail.com',NULL,NULL,'https://gig-app-upload.s3.ap-southeast-1.amazonaws.com/0370b11c-1e4d-4864-9221-205341c4e932-image_picker_CD35753B-5B99-426A-BD21-64D2AC1E2401-2138-000005E290AB9EC8.jpg','2022-12-12 03:40:36','2023-01-03 03:07:59'),('e5090e80-ce5c-4b3c-8e20-8b5049cdda41','Nguyễn Văn A','0',202,1,'tôi là ahucbdhkkgknsh','0658368627','hfubèg@gmail.ckm',NULL,NULL,'https://gig-app-upload.s3.ap-southeast-1.amazonaws.com/b4d5a7f2-8c1e-4b72-bd40-c29a5c54ebd2-image_picker1888756936499587468.jpg','2022-12-13 04:33:04','2022-12-13 11:44:16');
/*!40000 ALTER TABLE `profiles` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `profiles_categories`
--

DROP TABLE IF EXISTS `profiles_categories`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `profiles_categories` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `account_id` varchar(50) DEFAULT NULL,
  `category_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`),
  KEY `FK_ProfileAndCategory_ChildCategory` (`category_id`),
  KEY `FK_ProfileAndCategory_Profile` (`account_id`),
  CONSTRAINT `FK_ProfileAndCategory_ChildCategory` FOREIGN KEY (`category_id`) REFERENCES `child_categories` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `FK_ProfileAndCategory_Profile` FOREIGN KEY (`account_id`) REFERENCES `profiles` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=59 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `profiles_categories`
--

LOCK TABLES `profiles_categories` WRITE;
/*!40000 ALTER TABLE `profiles_categories` DISABLE KEYS */;
INSERT INTO `profiles_categories` VALUES (21,'e4aecd23-3a37-486a-bd05-bde0c82d8fe1',168),(22,'e4aecd23-3a37-486a-bd05-bde0c82d8fe1',171),(23,'e5090e80-ce5c-4b3c-8e20-8b5049cdda41',168),(24,'e5090e80-ce5c-4b3c-8e20-8b5049cdda41',186),(49,'251ac081-001c-406d-a963-599ac871d0aa',168),(50,'251ac081-001c-406d-a963-599ac871d0aa',167),(51,'251ac081-001c-406d-a963-599ac871d0aa',170),(52,'251ac081-001c-406d-a963-599ac871d0aa',171),(53,'251ac081-001c-406d-a963-599ac871d0aa',169),(54,'301fdf9d-2872-4f51-9300-e6f268ff56e2',187),(55,'301fdf9d-2872-4f51-9300-e6f268ff56e2',189),(56,'301fdf9d-2872-4f51-9300-e6f268ff56e2',191),(57,'301fdf9d-2872-4f51-9300-e6f268ff56e2',326),(58,'301fdf9d-2872-4f51-9300-e6f268ff56e2',327);
/*!40000 ALTER TABLE `profiles_categories` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `profiles_educations`
--

DROP TABLE IF EXISTS `profiles_educations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `profiles_educations` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `account_id` varchar(50) DEFAULT NULL,
  `company_name` varchar(50) DEFAULT NULL,
  `major` varchar(50) DEFAULT NULL,
  `start_date` varchar(20) DEFAULT NULL,
  `end_date` varchar(20) DEFAULT NULL,
  `extra_information` varchar(50) DEFAULT NULL,
  `created_at` datetime DEFAULT current_timestamp(),
  `updated_at` datetime DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`),
  KEY `FK_Profile_Education` (`account_id`),
  CONSTRAINT `FK_Profile_Education` FOREIGN KEY (`account_id`) REFERENCES `profiles` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=23 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `profiles_educations`
--

LOCK TABLES `profiles_educations` WRITE;
/*!40000 ALTER TABLE `profiles_educations` DISABLE KEYS */;
INSERT INTO `profiles_educations` VALUES (15,'4d207f7c-d443-476b-af9a-b59da47560a9','TDT University new','Computer Science new','1568332800000','1686441600000','Nothing to tell new','2022-11-25 17:52:12','2022-11-25 17:52:57'),(16,'4d207f7c-d443-476b-af9a-b59da47560a9','TDT University','Computer Science','1568073600000','1686528000000','Nothing to tell','2022-11-28 13:45:17','2022-11-28 13:45:17'),(20,'e4aecd23-3a37-486a-bd05-bde0c82d8fe1','fog f g','fog b','1638291600000','1669827600000','fog df cgv','2022-12-13 06:36:22','2022-12-13 06:36:22'),(21,'251ac081-001c-406d-a963-599ac871d0aa','DH KHOA HOC TU NHIEN','Cong Nghe Phan Mem','1354294800000','1512061200000','Toi tot nghiep','2022-12-20 08:28:09','2022-12-20 08:28:09'),(22,'301fdf9d-2872-4f51-9300-e6f268ff56e2','irhdhd','dff','1420045200000','1640970000000','djhfhf','2023-01-03 04:30:17','2023-01-03 04:30:17');
/*!40000 ALTER TABLE `profiles_educations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `profiles_experiences`
--

DROP TABLE IF EXISTS `profiles_experiences`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `profiles_experiences` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `account_id` varchar(50) DEFAULT NULL,
  `title` varchar(50) DEFAULT NULL,
  `company_name` varchar(50) DEFAULT NULL,
  `start_date` varchar(20) DEFAULT NULL,
  `end_date` varchar(20) DEFAULT NULL,
  `extra_information` varchar(50) DEFAULT NULL,
  `created_at` datetime DEFAULT current_timestamp(),
  `updated_at` datetime DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`),
  KEY `FK_Profile_Experience` (`account_id`),
  CONSTRAINT `FK_Profile_Experience` FOREIGN KEY (`account_id`) REFERENCES `profiles` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `profiles_experiences`
--

LOCK TABLES `profiles_experiences` WRITE;
/*!40000 ALTER TABLE `profiles_experiences` DISABLE KEYS */;
INSERT INTO `profiles_experiences` VALUES (8,'4d207f7c-d443-476b-af9a-b59da47560a9','Project Manager','TDT University - Vietnam','1570838400000','1686787200000','Nothing','2022-11-25 17:53:20','2022-11-25 17:53:43'),(9,'4d207f7c-d443-476b-af9a-b59da47560a9','Student','TDT University','1568073600000','1686528000000','Nothing to tell','2022-11-28 13:52:42','2022-11-28 13:52:42'),(10,'4d207f7c-d443-476b-af9a-b59da47560a9','Student','TDT University','1568073600000','1686528000000','Nothing to tell','2022-11-28 16:47:44','2022-11-28 16:47:44'),(13,'e4aecd23-3a37-486a-bd05-bde0c82d8fe1','GD','TNHH MTV BAC','1638291600000','1669827600000','hihih','2022-12-13 04:47:54','2022-12-13 04:47:54'),(14,'e5090e80-ce5c-4b3c-8e20-8b5049cdda41','designer','ai w','1669827600000','1669827600000','ABCD','2022-12-13 04:49:24','2022-12-13 04:49:24'),(15,'e4aecd23-3a37-486a-bd05-bde0c82d8fe1','fog d fh','d Fahd dg','1669827600000','1669827600000','g','2022-12-13 04:49:24','2022-12-13 04:49:24'),(16,'e5090e80-ce5c-4b3c-8e20-8b5049cdda41','mkt','ss','1543597200000','1669827600000','gigvkjvgìkbg ughighjkkkkl','2022-12-13 04:49:55','2022-12-13 04:49:55'),(17,'4d207f7c-d443-476b-af9a-b59da47560a9','Student','TDT University','1568073600000','1686528000000','Nothing to tell','2022-12-14 09:44:29','2022-12-14 09:44:29'),(18,'251ac081-001c-406d-a963-599ac871d0aa','DEV','TNHH MTV BT','1448902800000','1543597200000','ghdbfhfg','2022-12-20 08:28:35','2022-12-20 08:28:35'),(19,'301fdf9d-2872-4f51-9300-e6f268ff56e2','dfggg','ddff','1420045200000','1640970000000','djfhfhf','2023-01-03 04:30:39','2023-01-03 04:30:39');
/*!40000 ALTER TABLE `profiles_experiences` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `profiles_locations`
--

DROP TABLE IF EXISTS `profiles_locations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `profiles_locations` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `location_id` int(11) DEFAULT NULL,
  `account_id` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`),
  KEY `FK_Profile_Location_Account` (`account_id`),
  KEY `FK_Profile_Location_District` (`location_id`),
  CONSTRAINT `FK_Profile_Location_Account` FOREIGN KEY (`account_id`) REFERENCES `profiles` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `FK_Profile_Location_District` FOREIGN KEY (`location_id`) REFERENCES `districts` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=81 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `profiles_locations`
--

LOCK TABLES `profiles_locations` WRITE;
/*!40000 ALTER TABLE `profiles_locations` DISABLE KEYS */;
INSERT INTO `profiles_locations` VALUES (7,1451,'4d207f7c-d443-476b-af9a-b59da47560a9'),(12,1655,'4d207f7c-d443-476b-af9a-b59da47560a9'),(37,1442,'e5090e80-ce5c-4b3c-8e20-8b5049cdda41'),(38,1443,'e5090e80-ce5c-4b3c-8e20-8b5049cdda41'),(39,1484,'e5090e80-ce5c-4b3c-8e20-8b5049cdda41'),(40,1448,'251ac081-001c-406d-a963-599ac871d0aa'),(41,1446,'251ac081-001c-406d-a963-599ac871d0aa'),(43,1482,'cb7f2b06-1223-48ef-8773-cd201c2d0e8a'),(47,1534,'cb7f2b06-1223-48ef-8773-cd201c2d0e8a'),(48,1461,'cb7f2b06-1223-48ef-8773-cd201c2d0e8a'),(52,1459,'cb7f2b06-1223-48ef-8773-cd201c2d0e8a'),(60,1691,'cb7f2b06-1223-48ef-8773-cd201c2d0e8a'),(61,1693,'cb7f2b06-1223-48ef-8773-cd201c2d0e8a'),(62,1692,'cb7f2b06-1223-48ef-8773-cd201c2d0e8a'),(63,1527,'cb7f2b06-1223-48ef-8773-cd201c2d0e8a'),(64,1530,'cb7f2b06-1223-48ef-8773-cd201c2d0e8a'),(65,1528,'cb7f2b06-1223-48ef-8773-cd201c2d0e8a'),(66,1529,'cb7f2b06-1223-48ef-8773-cd201c2d0e8a'),(67,1444,'cb7f2b06-1223-48ef-8773-cd201c2d0e8a'),(68,1447,'cb7f2b06-1223-48ef-8773-cd201c2d0e8a'),(70,1462,'e4aecd23-3a37-486a-bd05-bde0c82d8fe1'),(71,1448,'e4aecd23-3a37-486a-bd05-bde0c82d8fe1'),(79,1442,'301fdf9d-2872-4f51-9300-e6f268ff56e2'),(80,1484,'301fdf9d-2872-4f51-9300-e6f268ff56e2');
/*!40000 ALTER TABLE `profiles_locations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `provinces`
--

DROP TABLE IF EXISTS `provinces`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `provinces` (
  `id` int(11) NOT NULL,
  `name` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `provinces`
--

LOCK TABLES `provinces` WRITE;
/*!40000 ALTER TABLE `provinces` DISABLE KEYS */;
INSERT INTO `provinces` VALUES (201,'Hà Nội'),(202,'Hồ Chí Minh'),(203,'Đà Nẵng'),(204,'Đồng Nai'),(205,'Bình Dương'),(206,'Bà Rịa - Vũng Tàu'),(207,'Gia Lai'),(208,'Khánh Hòa'),(209,'Lâm Đồng'),(210,'Đắk Lắk'),(211,'Long An'),(212,'Tiền Giang'),(213,'Bến Tre'),(214,'Trà Vinh'),(215,'Vĩnh Long'),(216,'Đồng Tháp'),(217,'An Giang'),(218,'Sóc Trăng'),(219,'Kiên Giang'),(220,'Cần Thơ'),(221,'Vĩnh Phúc'),(223,'Thừa Thiên - Huế'),(224,'Hải Phòng'),(225,'Hải Dương'),(226,'Thái Bình'),(227,'Hà Giang'),(228,'Tuyên Quang'),(229,'Phú Thọ'),(230,'Quảng Ninh'),(231,'Nam Định'),(232,'Hà Nam'),(233,'Ninh Bình'),(234,'Thanh Hóa'),(235,'Nghệ An'),(236,'Hà Tĩnh'),(237,'Quảng Bình'),(238,'Quảng Trị'),(239,'Bình Phước'),(240,'Tây Ninh'),(241,'Đắk Nông'),(242,'Quảng Ngãi'),(243,'Quảng Nam'),(244,'Thái Nguyên'),(245,'Bắc Kạn'),(246,'Cao Bằng'),(247,'Lạng Sơn'),(248,'Bắc Giang'),(249,'Bắc Ninh'),(250,'Hậu Giang'),(252,'Cà Mau'),(253,'Bạc Liêu'),(258,'Bình Thuận'),(259,'Kon Tum'),(260,'Phú Yên'),(261,'Ninh Thuận'),(262,'Bình Định'),(263,'Yên Bái'),(264,'Lai Châu'),(265,'Điện Biên'),(266,'Sơn La'),(267,'Hòa Bình'),(268,'Hưng Yên'),(269,'Lào Cai');
/*!40000 ALTER TABLE `provinces` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `salary_types`
--

DROP TABLE IF EXISTS `salary_types`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `salary_types` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `value` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `salary_types`
--

LOCK TABLES `salary_types` WRITE;
/*!40000 ALTER TABLE `salary_types` DISABLE KEYS */;
INSERT INTO `salary_types` VALUES (1,'Giờ'),(2,'Ngày'),(3,'Tuần'),(4,'Tháng'),(5,'Công việc');
/*!40000 ALTER TABLE `salary_types` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `themes`
--

DROP TABLE IF EXISTS `themes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `themes` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(200) DEFAULT NULL,
  `image` varchar(200) DEFAULT NULL,
  `status` tinyint(4) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=45 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `themes`
--

LOCK TABLES `themes` WRITE;
/*!40000 ALTER TABLE `themes` DISABLE KEYS */;
INSERT INTO `themes` VALUES (15,'Nhà thờ Đức Bà','https://gig-app-upload.s3.ap-southeast-1.amazonaws.com/theme/nha-tho-duc-ba.jpg',0),(16,'test','https://gig-app-upload.s3.ap-southeast-1.amazonaws.com/eae5272b-537b-460e-a9e1-2be23d94ed0a-tomorrow_by_pen_syls_der7l6i.jpg',0),(17,'Chợ Bến Thành','https://gig-app-upload.s3.ap-southeast-1.amazonaws.com/theme/cho-ben-thanh.jpg',0),(18,'Landmark 81','https://gig-app-upload.s3.ap-southeast-1.amazonaws.com/theme/landmark-81.jpg',0),(19,'KCN Tây Bắc Củ Chi','https://gig-app-upload.s3.ap-southeast-1.amazonaws.com/theme/kcn-tay-bac-cu-chi.jpg',1),(20,'KCN Đông Nam','https://gig-app-upload.s3.ap-southeast-1.amazonaws.com/theme/kcn-dong-nam.jpg',1),(21,'KCN Tân Phú Trung','https://gig-app-upload.s3.ap-southeast-1.amazonaws.com/theme/kcn-tan-phu-trung.jpg',1),(22,'KCN Lê Minh Xuân 3','https://gig-app-upload.s3.ap-southeast-1.amazonaws.com/theme/kcn-le-minh-xuan-3.jpg',1),(23,'KCN Lê Minh Xuân','https://gig-app-upload.s3.ap-southeast-1.amazonaws.com/theme/kcn-le-minh-xuan.jpg',1),(24,'KCN Phong Phú','https://gig-app-upload.s3.ap-southeast-1.amazonaws.com/theme/kcn-phong-phu.jpg',1),(25,'KCN Vĩnh Lộc','https://gig-app-upload.s3.ap-southeast-1.amazonaws.com/theme/kcn-vinh-loc.jpg',1),(26,'KCN Hiệp Phước','https://gig-app-upload.s3.ap-southeast-1.amazonaws.com/theme/kcn-hiep-phuoc.jpg',1),(27,'KCX Tân Thuận','https://gig-app-upload.s3.ap-southeast-1.amazonaws.com/theme/kcx-tan-thuan.jpg',1),(28,'KCN Bình Chiểu','https://gig-app-upload.s3.ap-southeast-1.amazonaws.com/theme/kcn-binh-chieu.jpg',1),(29,'KCX Linh Trung 2','https://gig-app-upload.s3.ap-southeast-1.amazonaws.com/theme/kcx-linh-trung-2.jpg',1),(30,'KCX Linh Trung 1','https://gig-app-upload.s3.ap-southeast-1.amazonaws.com/theme/kcx-linh-trung-1.jpg',1),(31,'Khu Công Nghệ Cao','https://gig-app-upload.s3.ap-southeast-1.amazonaws.com/theme/khu-cong-nghe-cao.jpg',1),(32,'KCN An Hạ','https://gig-app-upload.s3.ap-southeast-1.amazonaws.com/theme/kcn-an-ha.jpg',1),(33,'KCN Cát Lái 2','https://gig-app-upload.s3.ap-southeast-1.amazonaws.com/theme/kcn-cat-lai-2.jpg',1),(34,'KCN Tân Thới Hiệp','https://gig-app-upload.s3.ap-southeast-1.amazonaws.com/theme/kcn-tan-thoi-hiep.jpg',1),(35,'KCN Tân Bình','https://gig-app-upload.s3.ap-southeast-1.amazonaws.com/theme/kcn-tan-binh.jpg',1),(36,'KCN Tân Tạo','https://gig-app-upload.s3.ap-southeast-1.amazonaws.com/theme/kcn-tan-tao.jpg',1),(37,'KCN PM Quang Trung','https://gig-app-upload.s3.ap-southeast-1.amazonaws.com/theme/kcn-pm-quang-trung.jpg',1),(38,'Phú Mỹ Hưng','https://gig-app-upload.s3.ap-southeast-1.amazonaws.com/theme/phu-my-hung.jpg',1),(39,'Đường Bùi Viện','https://gig-app-upload.s3.ap-southeast-1.amazonaws.com/theme/duong-bui-vien.jpg',1),(40,'Đường Nguyễn Huệ','https://gig-app-upload.s3.ap-southeast-1.amazonaws.com/theme/duong-nguyen-hue.jpg',1),(41,'Khu Thảo Điền','https://gig-app-upload.s3.ap-southeast-1.amazonaws.com/theme/khu-thao-dien.jpg',1),(42,'Landmark 81','https://gig-app-upload.s3.ap-southeast-1.amazonaws.com/theme/landmark-81.jpg',1),(43,'Chợ Bến Thành','https://gig-app-upload.s3.ap-southeast-1.amazonaws.com/theme/cho-ben-thanh.jpg',1),(44,'Nhà Thờ Đức Bà','https://gig-app-upload.s3.ap-southeast-1.amazonaws.com/theme/nha-tho-duc-ba.jpg',1);
/*!40000 ALTER TABLE `themes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `themes_posts`
--

DROP TABLE IF EXISTS `themes_posts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `themes_posts` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `theme_id` int(11) DEFAULT NULL,
  `post_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`),
  KEY `FK_Theme_Post` (`theme_id`),
  KEY `FK_Post_Theme` (`post_id`),
  CONSTRAINT `FK_Post_Theme` FOREIGN KEY (`post_id`) REFERENCES `posts` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `FK_Theme_Post` FOREIGN KEY (`theme_id`) REFERENCES `themes` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=38 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `themes_posts`
--

LOCK TABLES `themes_posts` WRITE;
/*!40000 ALTER TABLE `themes_posts` DISABLE KEYS */;
INSERT INTO `themes_posts` VALUES (33,43,227),(34,18,227),(36,18,225),(37,18,224);
/*!40000 ALTER TABLE `themes_posts` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-01-04  7:05:02
