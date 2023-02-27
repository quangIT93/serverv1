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
INSERT INTO `accounts` VALUES ('3f04d917-ddc7-4a49-8854-5fffa2059364',NULL,'84835743377',NULL,NULL,0,'2022-12-01 13:24:56','2022-12-01 13:24:56'),('4d207f7c-d443-476b-af9a-b59da47560a9','truong123553@gmail.com',NULL,NULL,NULL,0,'2022-11-25 17:41:45','2022-11-25 17:41:45'),('596ed003-a4f8-4002-8abd-412851703e2e','nttruong10101@gmail.com',NULL,NULL,NULL,0,'2022-12-15 13:30:53','2022-12-15 13:30:53'),('665848b6-6f6c-4b6f-ad9c-440beacb44f4',NULL,'84386958079',NULL,NULL,0,'2022-12-07 15:52:26','2022-12-07 15:52:26'),('66deb066-7836-4c07-8511-581b68d1fdb3',NULL,'84935743377',NULL,NULL,0,'2022-12-01 13:24:50','2022-12-01 13:24:50'),('b0afd13d-e515-4a41-8f85-11837b4df3f5',NULL,'84938858029',NULL,NULL,0,'2022-12-01 13:08:25','2022-12-01 13:08:25'),('c53fe2a4-52c3-4332-b7e8-9b3baae27764','phanthang052@gmail.com',NULL,NULL,NULL,0,'2022-11-30 15:45:00','2022-11-30 15:45:00');
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
  `liked` enum('0','1') NOT NULL DEFAULT '0',
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
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `applications`
--

LOCK TABLES `applications` WRITE;
/*!40000 ALTER TABLE `applications` DISABLE KEYS */;
INSERT INTO `applications` VALUES (1,'3f04d917-ddc7-4a49-8854-5fffa2059364',16,4,'0','Nguyen The Truong','995130000000',201,1,'My intro','0919004743','truong@gmail.com','facebook.com','linkedin.com',NULL,'2022-12-07 15:06:59','2022-12-15 14:19:51'),(2,'c53fe2a4-52c3-4332-b7e8-9b3baae27764',16,3,'0','PCT','995130000000',201,1,'My intro','0835743377','phanthang052@gmail.com','facebook.com','linkedin.com',NULL,'2022-12-07 16:43:41','2022-12-12 10:12:32'),(3,'b0afd13d-e515-4a41-8f85-11837b4df3f5',16,1,'0','Nguyen The Truong','995130000000',201,1,'My intro','012345','phanthang053@gmail.com','facebook.com','linkedin.com',NULL,'2022-12-08 10:31:42','2022-12-08 10:34:09'),(4,'b0afd13d-e515-4a41-8f85-11837b4df3f5',15,0,'0','Nguyen The Truong','995130000000',201,1,'My intro','012345','phanthang053@gmail.com','facebook.com','linkedin.com',NULL,'2022-12-19 15:28:39','2022-12-19 15:28:39');
/*!40000 ALTER TABLE `applications` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `applications_categories`
--

DROP TABLE IF EXISTS `applications_categories`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `applications_categories` (
  `application_id` int(11) NOT NULL,
  `category_id` int(11) NOT NULL,
  PRIMARY KEY (`application_id`,`category_id`),
  KEY `FK_Application_Category_Category` (`category_id`),
  KEY `FK_Application_Category_Post` (`application_id`),
  CONSTRAINT `FK_Application_Category_Application` FOREIGN KEY (`application_id`) REFERENCES `applications` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `FK_Application_Category_Category` FOREIGN KEY (`category_id`) REFERENCES `child_categories` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `applications_categories`
--

LOCK TABLES `applications_categories` WRITE;
/*!40000 ALTER TABLE `applications_categories` DISABLE KEYS */;
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
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `applications_educations`
--

LOCK TABLES `applications_educations` WRITE;
/*!40000 ALTER TABLE `applications_educations` DISABLE KEYS */;
INSERT INTO `applications_educations` VALUES (1,1,'TDT University','Computer Science','1568073600000','1686528000000','Nothing to tell'),(2,2,'FPT University','Hacker Lỏ','1568073600000','1686528000000','Nothing to tell');
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
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `applications_experiences`
--

LOCK TABLES `applications_experiences` WRITE;
/*!40000 ALTER TABLE `applications_experiences` DISABLE KEYS */;
INSERT INTO `applications_experiences` VALUES (1,1,'Student','TDT University','1568073600000','1686528000000','Nothing to tell'),(2,2,'Intern','Ai Work','1568073600000','1686528000000','Nothing to tell'),(3,3,'Student','TDT University','1568073600000','1686528000000','Hello'),(4,4,'Student','TDT University','1568073600000','1686528000000','Hello');
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
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `applications_locations`
--

LOCK TABLES `applications_locations` WRITE;
/*!40000 ALTER TABLE `applications_locations` DISABLE KEYS */;
INSERT INTO `applications_locations` VALUES (1,1,1451),(2,1,1655),(3,3,1452),(4,3,1625),(5,4,1452),(6,4,1625);
/*!40000 ALTER TABLE `applications_locations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `applications_rate`
--

DROP TABLE IF EXISTS `applications_rate`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `applications_rate` (
  `application_id` int(11) NOT NULL,
  `rating` enum('1','2','3','4','5') NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `comment` text DEFAULT NULL,
  PRIMARY KEY (`application_id`),
  CONSTRAINT `fk_application_id` FOREIGN KEY (`application_id`) REFERENCES `applications` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `applications_rate`
--

LOCK TABLES `applications_rate` WRITE;
/*!40000 ALTER TABLE `applications_rate` DISABLE KEYS */;
INSERT INTO `applications_rate` VALUES (1,'3','2022-12-15 08:12:52','2022-12-15 08:12:52',NULL);
/*!40000 ALTER TABLE `applications_rate` ENABLE KEYS */;
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
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `banners`
--

LOCK TABLES `banners` WRITE;
/*!40000 ALTER TABLE `banners` DISABLE KEYS */;
INSERT INTO `banners` VALUES (1,'https://gig-app-upload.s3.ap-southeast-1.amazonaws.com/9aae8a05-ec1d-4321-b3a5-ce8d6e627b90-sunset_moment_by_samuel_one_detcf5d.png','sfsf2rfs1.jada.zczc.com',1,3),(2,'https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg','dadadada',1,1),(3,'https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg','dadadada',1,1),(4,'https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg','dadadada',1,2);
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
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `bookmarks`
--

LOCK TABLES `bookmarks` WRITE;
/*!40000 ALTER TABLE `bookmarks` DISABLE KEYS */;
INSERT INTO `bookmarks` VALUES (1,'4d207f7c-d443-476b-af9a-b59da47560a9',15,'2022-12-19 13:51:19'),(2,'4d207f7c-d443-476b-af9a-b59da47560a9',16,'2022-12-19 13:51:25'),(9,'4d207f7c-d443-476b-af9a-b59da47560a9',199,'2022-12-19 14:46:50'),(3,'b0afd13d-e515-4a41-8f85-11837b4df3f5',15,'2022-12-19 14:38:36'),(4,'b0afd13d-e515-4a41-8f85-11837b4df3f5',16,'2022-12-19 14:38:43'),(5,'b0afd13d-e515-4a41-8f85-11837b4df3f5',17,'2022-12-19 14:46:38'),(6,'b0afd13d-e515-4a41-8f85-11837b4df3f5',18,'2022-12-19 14:46:44'),(7,'b0afd13d-e515-4a41-8f85-11837b4df3f5',19,'2022-12-19 14:46:46'),(8,'b0afd13d-e515-4a41-8f85-11837b4df3f5',20,'2022-12-19 14:46:50');
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
) ENGINE=InnoDB AUTO_INCREMENT=167 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `child_categories`
--

LOCK TABLES `child_categories` WRITE;
/*!40000 ALTER TABLE `child_categories` DISABLE KEYS */;
INSERT INTO `child_categories` VALUES (1,2,'Giáo viên toán'),(2,2,'Giáo viên văn học'),(3,2,'Giáo viên khoa học xã hội'),(4,2,'Giáo viên luận văn'),(5,2,'Giáo viên tiếng Anh'),(6,2,'Giáo viên tiếng Nhật'),(7,2,'Giáo viên tiếng Trung'),(8,2,'Giáo viên ngoại ngữ'),(9,2,'Giáo viên luyện thi bằng cấp ngoại ngữ'),(10,2,'Giáo viên luyện thi chuyển cấp'),(11,2,'Giáo viên luyện thi công chức'),(12,2,'Giáo viên luyện thi khác'),(13,2,'Khoá học mỹ thuật'),(14,2,'Khoá học âm nhạc'),(15,2,'Khoá học thanh nhạc/rap'),(16,2,'Khoá học diễn xuất'),(17,2,'Khoá học vũ đạo'),(18,2,'Khoá học sáng tác'),(19,1,'Đánh máy'),(20,1,'Chỉnh sửa tài liệu'),(21,1,'Lập kế hoạch kinh doanh/dự án'),(22,1,'Tạo lập PPT/Keynote'),(23,1,'Tạo lập Excel/Numbers'),(24,1,'Thu thập dữ liệu'),(25,1,'Hiệu chỉnh'),(26,1,'Sách điện tử'),(27,4,'Chuyển căn hộ (1 phòng ngủ)'),(28,4,'Chuyển căn hộ ( từ 2 phòng ngủ)'),(29,4,'Chuyển văn phòng/Nhà xưởng'),(30,4,'Chuyển phát/Chuyển hàng'),(31,4,'Vệ sinh nhà cửa'),(32,4,'Vệ sinh quạt sưởi/máy điều hòa 2 chiều'),(33,4,'Vệ sinh máy lạnh'),(34,4,'Vệ sinh máy giặt'),(35,4,'Vệ sinh tủ lạnh'),(36,4,'Vệ sinh thiết bị điện'),(37,4,'Vệ sinh nội thất'),(38,4,'Vệ sinh giường/nệm'),(39,4,'Vệ sinh sofa'),(40,4,'Vệ sinh quạt thông gió'),(41,4,'Vệ sinh ống thông gió'),(42,4,'Khử mùi hôi'),(43,4,'Khử nấm mốc'),(44,4,'Vệ sinh bên trong tòa nhà (sàn/cầu thang/nhà vệ sinh)'),(45,4,'Vệ sinh bên ngoài tòa nhà ( tường ngoài/cửa kính)'),(46,4,'Phủ bóng sàn nhà (wax coating)'),(47,4,'Vệ sinh cầu thang/nhà vệ sinh'),(48,4,'Phòng chống côn trùng'),(49,3,'Tiếng Anh'),(50,3,'Tiếng Trung'),(51,3,'Tiếng Nhật'),(52,3,'Tiếng Hàn'),(53,3,'Tiếng Tây Ban Nha'),(54,3,'Tiếng Pháp'),(55,3,'Tiếng Đức'),(56,3,'Tiếng Nga'),(57,3,'Tiếng Hà Lan'),(58,3,'Tiếng Mông Cổ'),(59,3,'Tiếng Swahili'),(60,3,'Tiếng Thuỵ Điển'),(61,3,'Tiếng Ả-rập'),(62,3,'Tiếng Ý'),(63,3,'Tiếng Séc'),(64,3,'Tiếng Thái'),(65,3,'Tiếng Thổ Nhĩ Kỳ'),(66,3,'Tiếng Bồ Đào Nha'),(67,5,'Thiết kế nội thất cho nhà đất/căn hộ chung cư'),(68,5,'Cải thiện gian bếp'),(69,5,'Sửa chữa nhà tắm/nhà vệ sinh'),(70,5,'Thi công Giấy dán tường'),(71,5,'Thi công cách âm'),(72,5,'Thi công ngoài trời'),(73,5,'Thi công đèn chiếu sáng'),(74,5,'Thiết kế đồ nội thất ( Tủ giày/tủ quần áo v.v…)'),(75,5,'Lắp ráp đồ nội thất'),(76,5,'Sữa chữa đồ nội thất'),(77,5,'Tân trang đồ nội thất'),(78,6,'Thiết kế App/Web'),(79,6,'Freelancer Design'),(80,6,'Thiết kế đơn giản'),(81,6,'Thiết kế in ấn'),(82,6,'Thiết kế thẻ tên'),(83,6,'Thiết kế logo'),(84,6,'Thiết kế bao bì'),(85,6,'Thiết kế nhãn dán'),(86,6,'Thiết kế sản phẩm'),(87,6,'Thiết kế hình minh hoạ'),(88,6,'Thiết kế thư pháp'),(89,6,'Bản vẽ nội thất(CAD/3D)'),(90,6,'Thiết kế biểu ngữ internet/quảng cáo hiển thị'),(91,9,'Chụp ảnh cá nhân'),(92,9,'Quay phim cá nhân'),(93,9,'Chụp hình doanh nghiệp/thương mại'),(94,9,'Quay phim doanh nghiệp/thương mại'),(95,9,'Chụp ảnh cưới'),(96,9,'Chụp ảnh cưới (studio/ngoại cảnh)'),(97,9,'Quay phim đám cưới'),(98,9,'Chỉnh sửa video'),(99,9,'Chỉnh ảnh photoshop'),(100,10,'Hát đám cưới'),(101,10,'MC đám cưới'),(102,10,'MC sự kiện'),(103,10,'Hát sự kiện'),(104,10,'Tổ chức sự kiện/tiệc'),(105,11,'Dắt thú cưng đi dạo'),(106,11,'Chăm sóc thú cưng (tại gia)'),(107,11,'Làm đẹp thú cưng'),(108,11,'Tổ chức đám tang thú cưng'),(109,13,'Huấn luyện viên cá nhân'),(110,13,'Khóa học Pilates'),(111,13,'Khóa học Yoga'),(112,13,'Khóa học CrossFit'),(113,13,'Khóa học Golf'),(114,13,'Khóa học Bowling'),(115,13,'Khóa học bóng đá'),(116,13,'Khóa học bóng chày'),(117,13,'Khóa học bóng bầu dục'),(118,13,'Khóa học tennis'),(119,13,'Khóa học đấm bốc'),(120,13,'Khóa học leo núi'),(121,13,'Khóa học bóng bàn'),(122,13,'Các môn thể thao khác'),(123,14,'Tư vấn pháp luật'),(124,14,'Khác'),(125,15,'Kiểm tra tâm lý'),(126,15,'Tư vấn tâm lý'),(127,15,'Tư vấn tâm lý người trưởng thành'),(128,15,'Tư vấn tâm lý vợ chồng/cặp đôi'),(129,15,'Tư vấn tâm lý trẻ em/thanh thiếu niên'),(130,15,'Tư vấn tâm lý gia đình'),(131,15,'Điều trị tâm lý'),(132,15,'Trò chơi trị liệu'),(133,15,'Liệu pháp đọc sách'),(134,15,'Liệu pháp ngôn ngữ'),(135,15,'Tư vấn nghề nghiệp tương lai'),(136,15,'Tư vấn việc làm/chuyển đổi công việc'),(137,15,'Tư vấn khởi nghiệp'),(138,15,'Tư vấn đầu tư/cổ phiếu'),(139,16,'Chế tác tiểu phẩm'),(140,16,'Chế tác đồ nội thất/gỗ mỹ nghệ'),(141,16,'Chế tác xà phòng/xà phòng tự nhiên'),(142,16,'Chế tác nến/tinh dầu/sáp thơm'),(143,16,'Làm đẹp/nước hoa/sản xuất mỹ phẩm'),(144,16,'Sản phẩm thủ công cho trẻ em'),(145,16,'Sản xuất văn phòng phẩm/vật tư văn phòng'),(146,16,'Sản xuất đồ dùng cho thú cưng'),(147,16,'Sản xuất thức ăn/đồ ăn nhẹ cho thú cưng'),(148,16,'Chế tác hoa trang trí'),(149,16,'Chế tác đạo cụ đám cưới'),(150,16,'Chế tác giày'),(151,16,'Chế tác phụ kiện'),(152,16,'Làm đồ tráng miệng/bánh'),(153,16,'Pha chế đồ uống'),(154,16,'Thiết kế bưu thiếp (thiệp mời/thiệp cưới)'),(155,16,'Vẽ tranh/vẽ đồ họa'),(156,16,'Sáng tác nhạc'),(157,17,'Tiếp khách'),(158,17,'Khán giả'),(159,17,'Báo thức buổi sáng'),(160,17,'Người soát vé'),(161,17,'Giúp việc vặt/làm hộ việc'),(162,17,'Lồng tiếng'),(163,17,'Nhân viên dọn dẹp nhà cửa'),(164,17,'Chăm sóc sau sinh/bảo mẫu'),(165,17,'Phụ bếp'),(166,17,'Điều dưỡng');
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
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `account_id` varchar(50) NOT NULL,
  `message` text NOT NULL,
  `is_read` enum('0','1') NOT NULL DEFAULT '0',
  `created_at` datetime NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`),
  KEY `fk_noti_account_id` (`account_id`),
  CONSTRAINT `fk_noti_account_id` FOREIGN KEY (`account_id`) REFERENCES `accounts` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
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
INSERT INTO `otps` VALUES ('082891a9-7c42-11ed-85bd-bdae2fe0d690','596ed003-a4f8-4002-8abd-412851703e2e','301431','2022-12-15 13:30:53'),('1072b2e5-6ec8-11ed-a292-f875a4402abd','4d207f7c-d443-476b-af9a-b59da47560a9','660364','2022-11-28 09:54:43'),('195a2284-7142-11ed-8625-bfb3453f6e6c','4d207f7c-d443-476b-af9a-b59da47560a9','753675','2022-12-01 13:33:41'),('2dc68313-7c1e-11ed-85bd-bdae2fe0d690','4d207f7c-d443-476b-af9a-b59da47560a9','811038','2022-12-15 09:14:14'),('3a28e18e-713c-11ed-8625-bfb3453f6e6c','c53fe2a4-52c3-4332-b7e8-9b3baae27764','127726','2022-12-01 12:51:39'),('47d30ae0-708b-11ed-85a7-bdad2acb7d12','c53fe2a4-52c3-4332-b7e8-9b3baae27764','897521','2022-11-30 15:45:00'),('51f78ac4-7141-11ed-8625-bfb3453f6e6c','3f04d917-ddc7-4a49-8854-5fffa2059364','652480','2022-12-01 13:28:06'),('6051ea6f-7444-11ed-865e-bfb651734e2f','3f04d917-ddc7-4a49-8854-5fffa2059364','885058','2022-12-05 09:27:30'),('6a6508f9-75ff-11ed-8651-bfb54e671a4c','4d207f7c-d443-476b-af9a-b59da47560a9','823896','2022-12-07 14:18:55'),('7abf81a6-760c-11ed-8651-bfb54e671a4c','665848b6-6f6c-4b6f-ad9c-440beacb44f4','981837','2022-12-07 15:52:26'),('7f9fab18-75f5-11ed-8651-bfb54e671a4c','c53fe2a4-52c3-4332-b7e8-9b3baae27764','399076','2022-12-07 13:07:56'),('91f1cd3e-713e-11ed-8625-bfb3453f6e6c','b0afd13d-e515-4a41-8f85-11837b4df3f5','311134','2022-12-01 13:08:25'),('ae0e5407-7444-11ed-865e-bfb651734e2f','c53fe2a4-52c3-4332-b7e8-9b3baae27764','554897','2022-12-05 09:29:40'),('b8539549-85c5-11ed-863b-bfb44a54c5e2','c53fe2a4-52c3-4332-b7e8-9b3baae27764','984652','2022-12-27 16:06:15'),('c24b09a3-75ea-11ed-8651-bfb54e671a4c','c53fe2a4-52c3-4332-b7e8-9b3baae27764','837885','2022-12-07 11:51:03'),('c8c4c58b-6cad-11ed-a292-f875a4402abd','4d207f7c-d443-476b-af9a-b59da47560a9','686371','2022-11-25 17:41:45'),('ce275525-85c5-11ed-863b-bfb44a54c5e2','4d207f7c-d443-476b-af9a-b59da47560a9','901779','2022-12-27 16:06:52'),('dce50471-7140-11ed-8625-bfb3453f6e6c','66deb066-7836-4c07-8511-581b68d1fdb3','404193','2022-12-01 13:24:50'),('e0737bea-7140-11ed-8625-bfb3453f6e6c','3f04d917-ddc7-4a49-8854-5fffa2059364','405024','2022-12-01 13:24:56'),('e549fe3f-7444-11ed-865e-bfb651734e2f','b0afd13d-e515-4a41-8f85-11837b4df3f5','335561','2022-12-05 09:31:13'),('e8412418-7c27-11ed-85bd-bdae2fe0d690','4d207f7c-d443-476b-af9a-b59da47560a9','957085','2022-12-15 10:23:53'),('f57dc8a6-7096-11ed-85a7-bdad2acb7d12','4d207f7c-d443-476b-af9a-b59da47560a9','497664','2022-11-30 17:08:36');
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
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `parent_categories`
--

LOCK TABLES `parent_categories` WRITE;
/*!40000 ALTER TABLE `parent_categories` DISABLE KEYS */;
INSERT INTO `parent_categories` VALUES (1,'Công việc giấy tờ, sổ sách'),(2,'Giáo viên/Khóa học'),(3,'Dịch thuật'),(4,'Dịch vụ Chuyển nhà/Dọn vệ sinh'),(5,'Thiết kế nội thất/Nội thất'),(6,'Thiết kế'),(7,'Công nghệ thông tin/Lập trình'),(8,'Marketing'),(9,'Hình ảnh/Video'),(10,'Sự kiện'),(11,'Chăm sóc thú cưng'),(12,'Thời trang/Làm đẹp'),(13,'Thể thao'),(14,'Pháp luật'),(15,'Tư vấn kỹ năng'),(16,'Handmade'),(17,'Sinh hoạt/Giúp việc');
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
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `post_images`
--

LOCK TABLES `post_images` WRITE;
/*!40000 ALTER TABLE `post_images` DISABLE KEYS */;
INSERT INTO `post_images` VALUES (7,15,'https://gig-app-upload.s3.ap-southeast-1.amazonaws.com/896aff4a-8c90-4891-8bce-43be9ec5606b-7edfc0ed-1899-44ee-85ec-a05fb3d07260-kali-logo-16x9-1.png',1),(8,15,'https://gig-app-upload.s3.ap-southeast-1.amazonaws.com/4008c101-1227-4598-96e9-ccd68174333c-b5c0050a-bd08-4cfe-8085-6b7168445b1c-JUST GO 1.jpg',1),(9,15,'https://gig-app-upload.s3.ap-southeast-1.amazonaws.com/45184f5f-562d-4815-a113-178cf8171bfd-1a635477-97a2-4d53-80c5-c56be5729fe5-hou-china-6.jpg',1),(10,15,'https://gig-app-upload.s3.ap-southeast-1.amazonaws.com/36590cd0-4783-4c76-a1db-142ff2c26c93-1a635477-97a2-4d53-80c5-c56be5729fe5-hou-china-6.jpg',1);
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
  `money_type` enum('1','2') NOT NULL DEFAULT '1' COMMENT '1: VND 2: USD',
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
  FULLTEXT KEY `index_fts` (`title`,`company_name`,`description`),
  CONSTRAINT `FK_Post_District` FOREIGN KEY (`district_id`) REFERENCES `districts` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `FK_Post_Profile` FOREIGN KEY (`account_id`) REFERENCES `profiles` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `posts_fk_salary_type` FOREIGN KEY (`salary_type`) REFERENCES `salary_types` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=228 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `posts`
--

LOCK TABLES `posts` WRITE;
/*!40000 ALTER TABLE `posts` DISABLE KEYS */;
INSERT INTO `posts` VALUES (15,'4d207f7c-d443-476b-af9a-b59da47560a9','Title','AIWorks',1462,1,'1669773536554','1669773536554','1669773536554','1669773536554',1,5000,2,'1','Description',NULL,1,'2022-11-30 08:46:57','2022-12-19 15:23:38'),(16,'4d207f7c-d443-476b-af9a-b59da47560a9','Title','AIWorks',1448,1,'1668043800000','1668907800000','86400000','126000000',1,5000,1,'1','Description',NULL,1,'2022-11-30 14:28:42','2022-12-23 15:31:07'),(17,'4d207f7c-d443-476b-af9a-b59da47560a9','Title','AIWorks',1448,1,'1668043800000','1668907800000','86400000','126000000',1,5000,3,'1','Description',NULL,1,'2022-11-30 14:28:45','2022-12-23 15:31:07'),(18,'4d207f7c-d443-476b-af9a-b59da47560a9','Title','AIWorks',1448,1,'1668043800000','1668907800000','86400000','126000000',1,5000,1,'1','Description',NULL,1,'2022-11-30 14:28:46','2022-12-23 15:31:07'),(19,'4d207f7c-d443-476b-af9a-b59da47560a9','Title','AIWorks',1448,1,'1668043800000','1668907800000','86400000','126000000',0,5000,1,'1','Description',NULL,1,'2022-11-30 14:28:47','2022-12-23 15:31:07'),(20,'4d207f7c-d443-476b-af9a-b59da47560a9','Title','AIWorks',1448,1,'1668043800000','1668907800000','86400000','126000000',0,5000,1,'2','Description',NULL,1,'2022-11-30 14:28:47','2022-12-26 16:03:55'),(159,'4d207f7c-d443-476b-af9a-b59da47560a9','Chuyên Viên Tư Vấn / Telesales Khóa Học','Babilala',1448,1,'1668043800000','1668907800000','86400000','126000000',1,5000,1,'1','Description',NULL,1,'2022-11-30 14:28:42','2022-12-23 15:31:07'),(160,'4d207f7c-d443-476b-af9a-b59da47560a9','Kế Toán Tổng Hợp','CÔNG TY CỔ PHẦN SÁNG TẠO VÀ GIẢI PHÁP TRUYỀN THÔNG SỐ Á CHÂU',1448,1,'1668043800000','1668907800000','86400000','126000000',0,5000,3,'1','Description',NULL,1,'2022-11-30 14:28:45','2022-12-23 15:31:07'),(161,'4d207f7c-d443-476b-af9a-b59da47560a9','Nhân viên bán hàng qua điện thoại','Công Ty TNHH TransCosmos Việt Nam',1448,1,'1668043800000','1668907800000','86400000','126000000',1,5000,1,'1','Description',NULL,1,'2022-11-30 14:28:46','2022-12-23 15:31:07'),(162,'4d207f7c-d443-476b-af9a-b59da47560a9','Nhân Viên Nhập Liệu','CÔNG TY TNHH GBG GROUP SERVICES',1448,1,'1668043800000','1668907800000','86400000','126000000',1,5000,4,'1','Description',NULL,1,'2022-11-30 14:28:47','2022-12-23 15:31:07'),(163,'4d207f7c-d443-476b-af9a-b59da47560a9','Trưởng Phòng Thương Mại Điện Tử','Công ty CP Thời trang Bimart',1448,1,'1668043800000','1668907800000','86400000','126000000',1,5000,1,'1','Description',NULL,1,'2022-11-30 14:28:47','2022-12-23 15:31:07'),(164,'4d207f7c-d443-476b-af9a-b59da47560a9','Chuyên Viên An Toàn/ Đào Tạo Bộ Phận Thiết Bị','CÔNG TY TNHH VINA SOLAR TECHNOLOGY',1448,1,'1668043800000','1668907800000','86400000','126000000',1,5000,2,'1','Description',NULL,1,'2022-11-30 14:28:47','2022-12-23 15:31:07'),(165,'4d207f7c-d443-476b-af9a-b59da47560a9','Nhân Viên Kỹ Thuật Thang Máy','CÔNG TY CỔ PHẦN CÔNG NGHỆ THANG MÁY PHÚC LỘC',1448,1,'1668043800000','1668907800000','86400000','126000000',1,5000,2,'1','Bảo trì thang máy định kỳ. Sửa chữa được các lỗi thường gặp của các dòng thang máy. Thi công vận hành đấu nối điện cho các công trình, dự án thang máy đang triển khai.',NULL,1,'2022-11-30 14:28:47','2022-12-23 15:31:07'),(166,'4d207f7c-d443-476b-af9a-b59da47560a9','Nhân Viên Dịch Vụ Khách Hàng','Công ty chuyển phát nhanh Thuận Phong chi nhánh Hồ Chí Minh (J&T Express)',1448,1,'1668043800000','1668907800000','86400000','126000000',1,5000,2,'1','Tiếp nhận và xử lý các khiếu nại về hàng hóa, dịch vụ. Truy xuất và xử lý dữ liệu, số liệu từ hệ thống Công ty, sau đó thống kê, phân tích, giám sát và gửi báo cáo hàng ngày.',NULL,1,'2022-11-30 14:28:47','2022-12-23 15:31:07'),(167,'4d207f7c-d443-476b-af9a-b59da47560a9','Nhân Viên Tiếp Thị Kỹ Thuật Số','CÔNG TY TNHH ĐẢO HẢI SẢN',1448,1,'1668043800000','1668907800000','86400000','126000000',1,5000,4,'1','Tổ chức campaign, chiến dịch bán hàng (30%). Content (20%). Chạy quảng cáo (20%). Thực hiện theo mục tiêu các chỉ số Marketing (20%). Báo cáo, phân tích và cải tiến (10%).',NULL,1,'2022-11-30 14:28:47','2022-12-23 15:31:07'),(168,'4d207f7c-d443-476b-af9a-b59da47560a9','Kiến Trúc Sư (Thiết Kế 3D/ Bổ Kiến Trúc)','CÔNG TY CỔ PHẦN ATAKAI VIỆT NAM',1448,1,'1668043800000','1668907800000','86400000','126000000',1,5000,4,'1','Lập kế hoạch triển khai thiết kế, tiến độ thực hiện công việc thiết kế từ ý tưởng đến thiết kế cơ sở, thiết kế bản vẽ thi công 2D/ 3D cho dự án. Triển khai mô hình 3D theo sự hướng dẫn và thiết kế của kiến trúc sư chủ trì.',NULL,1,'2022-11-30 14:28:47','2022-12-23 15:31:07'),(169,'4d207f7c-d443-476b-af9a-b59da47560a9','Thực Tập Sinh Lập Trình Viên Dotnet','CÔNG TY TNHH W2SOLUTION VIỆT NAM',1448,1,'1668043800000','1668907800000','86400000','126000000',1,5000,4,'1','Tham gia phát triển các dự án phần mềm. Tham gia thực tập Full-time. Tìm hiểu và phát triển chức năng Web E-Commerce',NULL,1,'2022-11-30 14:28:47','2022-12-23 15:31:07'),(170,'4d207f7c-d443-476b-af9a-b59da47560a9','Fullstack Developer (Middle)','Công ty Cổ phần TOPCV Việt Nam',1448,1,'1668043800000','1668907800000','86400000','126000000',0,5000,3,'1','Phát triển các dự án, sản phẩm của công ty TopCV. Công việc chính là phát triển website & server-side cho ứng dụng di động.',NULL,1,'2022-11-30 14:28:47','2022-12-23 15:31:07'),(171,'4d207f7c-d443-476b-af9a-b59da47560a9','Trưởng Trạm Giao Nhận Miền Bắc','Công ty TNHH Shopee Express',1448,1,'1668043800000','1668907800000','86400000','126000000',1,5000,4,'1','Quản lý công việc, ca làm việc cho đội ngũ nhân viên giao hàng, và nhân viên tại trạm. Quản lý quá trình giao, nhận, trả của hàng hóa thuộc khu vực quản lý.',NULL,1,'2022-11-30 14:28:47','2022-12-23 15:31:07'),(172,'4d207f7c-d443-476b-af9a-b59da47560a9','Chuyên Viên Quản Lý Khách Hàng Cao Cấp','De La Sól - Sunlife',1448,1,'1668043800000','1668907800000','86400000','126000000',1,5000,2,'1','Cung cấp và hỗ trợ các giải pháp tài chính chuyên nghiệp cho khách hàng. Tìm kiếm, mở rộng và xây dựng nguồn khách hàng tiềm năng. Lên kế hoạch bán hàng theo tháng, quý để đạt được mục tiêu doanh số được giao.',NULL,1,'2022-11-30 14:28:47','2022-12-23 15:31:07'),(173,'4d207f7c-d443-476b-af9a-b59da47560a9','Điều Dưỡng Viên','CÔNG TY CỔ PHẦN PHÁT TRIỂN CÔNG NGHỆ Y HỌC VIỆT NAM - NHẬT BẢN',1448,1,'1668043800000','1668907800000','86400000','126000000',1,5000,2,'1','Tổ chức đón tiếp và hướng dẫn người bệnh/khách hàng thực hiện các thủ tục khám, chữa bệnh theo đúng nội quy, quy chế của bệnh viện',NULL,1,'2022-11-30 14:28:47','2022-12-23 15:31:07'),(174,'4d207f7c-d443-476b-af9a-b59da47560a9','Nhân Viên Bản Quyền Sách Văn Học Tiếng Anh','Công ty Văn hóa và Truyền thông 1980Books',1448,1,'1668043800000','1668907800000','86400000','126000000',1,5000,4,'1','Quản lý công việc, ca làm việc cho đội ngũ nhân viên giao hàng, và nhân viên tại trạm. Quản lý quá trình giao, nhận, trả của hàng hóa thuộc khu vực quản lý.',NULL,1,'2022-11-30 14:28:47','2022-12-23 15:31:07'),(175,'4d207f7c-d443-476b-af9a-b59da47560a9','Nhân Viên Digital Marketing','Công Ty US Direct IMM',1448,1,'1668043800000','1668907800000','86400000','126000000',1,5000,4,'1','Quản lý công việc, ca làm việc cho đội ngũ nhân viên giao hàng, và nhân viên tại trạm. Quản lý quá trình giao, nhận, trả của hàng hóa thuộc khu vực quản lý.',NULL,1,'2022-11-30 14:28:47','2022-12-23 15:31:07'),(176,'4d207f7c-d443-476b-af9a-b59da47560a9','Nhân Viên Kỹ Thuật Cơ Khí','ECOZEN INTERNATIONAL JSC',1448,1,'1668043800000','1668907800000','86400000','126000000',1,5000,4,'1','Quản lý công việc, ca làm việc cho đội ngũ nhân viên giao hàng, và nhân viên tại trạm. Quản lý quá trình giao, nhận, trả của hàng hóa thuộc khu vực quản lý.',NULL,1,'2022-11-30 14:28:47','2022-12-23 15:31:07'),(177,'4d207f7c-d443-476b-af9a-b59da47560a9','Chuyên Viên Tư Vấn - Telesales','CÔNG TY TNHH THƯƠNG MẠI VÀ XÂY LẮP MEIKO',1448,1,'1668043800000','1668907800000','86400000','126000000',1,5000,4,'1','Quản lý công việc, ca làm việc cho đội ngũ nhân viên giao hàng, và nhân viên tại trạm. Quản lý quá trình giao, nhận, trả của hàng hóa thuộc khu vực quản lý.',NULL,1,'2022-11-30 14:28:47','2022-12-23 15:31:07'),(178,'4d207f7c-d443-476b-af9a-b59da47560a9','Nhân Viên Kỹ Thuật Bảo Trì Điện','CÔNG TY TNHH KCC',1448,1,'1668043800000','1668907800000','86400000','126000000',1,5000,4,'1','Quản lý công việc, ca làm việc cho đội ngũ nhân viên giao hàng, và nhân viên tại trạm. Quản lý quá trình giao, nhận, trả của hàng hóa thuộc khu vực quản lý.',NULL,1,'2022-11-30 14:28:47','2022-12-23 15:31:07'),(179,'4d207f7c-d443-476b-af9a-b59da47560a9','Nhân Viên Kinh Doanh','Công ty Cổ phần Truyền Thông Tập Trung Mặt Trời Vàng',1448,1,'1668043800000','1668907800000','86400000','126000000',1,5000,2,'1','Quản lý công việc, ca làm việc cho đội ngũ nhân viên giao hàng, và nhân viên tại trạm. Quản lý quá trình giao, nhận, trả của hàng hóa thuộc khu vực quản lý.',NULL,1,'2022-11-30 14:28:47','2022-12-23 15:31:07'),(180,'4d207f7c-d443-476b-af9a-b59da47560a9','Quản Lý /Giám Sát Vận Hành Dịch Vụ Rạp Chiếu Phim','Công ty TNHH CJ CGV Việt Nam',1448,1,'1668043800000','1668907800000','86400000','126000000',1,5000,2,'1','Quản lý công việc, ca làm việc cho đội ngũ nhân viên giao hàng, và nhân viên tại trạm. Quản lý quá trình giao, nhận, trả của hàng hóa thuộc khu vực quản lý.',NULL,1,'2022-11-30 14:28:47','2022-12-23 15:31:07'),(181,'4d207f7c-d443-476b-af9a-b59da47560a9','Kế Toán Thuế','CÔNG TY TNHH XUẤT NHẬP KHẨU LIÊN PHONG',1448,1,'1668043800000','1668907800000','86400000','126000000',1,5000,4,'1','Quản lý công việc, ca làm việc cho đội ngũ nhân viên giao hàng, và nhân viên tại trạm. Quản lý quá trình giao, nhận, trả của hàng hóa thuộc khu vực quản lý.',NULL,1,'2022-11-30 14:28:47','2022-12-23 15:31:07'),(182,'4d207f7c-d443-476b-af9a-b59da47560a9','Chuyên Viên Tư Vấn','Tổ chức Giáo dục và Đào tạo Apollo Việt Nam',1448,1,'1668043800000','1668907800000','86400000','126000000',1,5000,4,'1','Quản lý công việc, ca làm việc cho đội ngũ nhân viên giao hàng, và nhân viên tại trạm. Quản lý quá trình giao, nhận, trả của hàng hóa thuộc khu vực quản lý.',NULL,1,'2022-11-30 14:28:47','2022-12-23 15:31:07'),(183,'4d207f7c-d443-476b-af9a-b59da47560a9','Chuyên Viên Quan Hệ Khách Hàng','Ngân hàng LienVietPostBank PGD Hoài Đức',1448,1,'1668043800000','1668907800000','86400000','126000000',1,5000,4,'1','Quản lý công việc, ca làm việc cho đội ngũ nhân viên giao hàng, và nhân viên tại trạm. Quản lý quá trình giao, nhận, trả của hàng hóa thuộc khu vực quản lý.',NULL,1,'2022-11-30 14:28:47','2022-12-23 15:31:07'),(184,'4d207f7c-d443-476b-af9a-b59da47560a9','Chuyên Viên Dịch Vụ - Chăm Sóc Học Viên','CÔNG TY CP CÔNG NGHỆ GIÁO DỤC TRƯỜNG HỌC TRỰC TUYẾN - ONSCHOOL',1448,1,'1668043800000','1668907800000','86400000','126000000',1,5000,1,'1','Quản lý công việc, ca làm việc cho đội ngũ nhân viên giao hàng, và nhân viên tại trạm. Quản lý quá trình giao, nhận, trả của hàng hóa thuộc khu vực quản lý.',NULL,1,'2022-11-30 14:28:47','2022-12-23 15:31:07'),(185,'4d207f7c-d443-476b-af9a-b59da47560a9','Nhân Viên Sale','CÔNG TY TNHH EINSIX VIET NAM',1448,1,'1668043800000','1668907800000','86400000','126000000',1,5000,2,'1','Quản lý công việc, ca làm việc cho đội ngũ nhân viên giao hàng, và nhân viên tại trạm. Quản lý quá trình giao, nhận, trả của hàng hóa thuộc khu vực quản lý.',NULL,1,'2022-11-30 14:28:47','2022-12-23 15:31:07'),(186,'4d207f7c-d443-476b-af9a-b59da47560a9','Chuyên Viên Marketing','CÔNG TY CỔ PHẦN QUỐC TẾ ANH VĂN HỘI VIỆT MỸ',1448,1,'1668043800000','1668907800000','86400000','126000000',1,5000,4,'1','Quản lý công việc, ca làm việc cho đội ngũ nhân viên giao hàng, và nhân viên tại trạm. Quản lý quá trình giao, nhận, trả của hàng hóa thuộc khu vực quản lý.',NULL,1,'2022-11-30 14:28:47','2022-12-23 15:31:07'),(187,'4d207f7c-d443-476b-af9a-b59da47560a9','Nhân Viên Bán Hàng Nội Thất Cao Cấp Hàn Quốc','CÔNG TY TNHH JANG IN FURNITURE VIỆT NAM',1448,1,'1668043800000','1668907800000','86400000','126000000',0,5000,2,'1','Quản lý công việc, ca làm việc cho đội ngũ nhân viên giao hàng, và nhân viên tại trạm. Quản lý quá trình giao, nhận, trả của hàng hóa thuộc khu vực quản lý.',NULL,1,'2022-11-30 14:28:47','2022-12-23 15:31:07'),(188,'4d207f7c-d443-476b-af9a-b59da47560a9','Nhân Viên Kinh Doanh Resort','Công ty CP Thành phố Du lịch Sinh thái Sơn Tiên',1448,1,'1668043800000','1668907800000','86400000','126000000',1,5000,4,'1','Quản lý công việc, ca làm việc cho đội ngũ nhân viên giao hàng, và nhân viên tại trạm. Quản lý quá trình giao, nhận, trả của hàng hóa thuộc khu vực quản lý.',NULL,1,'2022-11-30 14:28:47','2022-12-23 15:31:07'),(189,'4d207f7c-d443-476b-af9a-b59da47560a9','Nhân Viên Marketing','CÔNG TY TNHH GLUCK VIỆT NAM',1449,1,'1668043800000','1668907800000','86400000','126000000',0,5000,2,'1','Quản lý công việc, ca làm việc cho đội ngũ nhân viên giao hàng, và nhân viên tại trạm. Quản lý quá trình giao, nhận, trả của hàng hóa thuộc khu vực quản lý.',NULL,1,'2022-11-30 14:28:47','2022-12-26 13:25:31'),(190,'4d207f7c-d443-476b-af9a-b59da47560a9','Chuyên Viên Telesales Cấp Cao','Công ty TNHH EDUPIA',1448,1,'1668043800000','1668907800000','86400000','126000000',1,5000,2,'1','Quản lý công việc, ca làm việc cho đội ngũ nhân viên giao hàng, và nhân viên tại trạm. Quản lý quá trình giao, nhận, trả của hàng hóa thuộc khu vực quản lý.',NULL,1,'2022-11-30 14:28:47','2022-12-23 15:31:07'),(191,'4d207f7c-d443-476b-af9a-b59da47560a9','Quản Lý Spa Biết Tiếng Hàn','CÔNG TY TNHH DỊCH VỤ DU LỊCH DANANG TRESURE',1448,1,'1668043800000','1668907800000','86400000','126000000',1,5000,2,'1','Quản lý công việc, ca làm việc cho đội ngũ nhân viên giao hàng, và nhân viên tại trạm. Quản lý quá trình giao, nhận, trả của hàng hóa thuộc khu vực quản lý.',NULL,1,'2022-11-30 14:28:47','2022-12-23 15:31:07'),(192,'4d207f7c-d443-476b-af9a-b59da47560a9','Nhân Viên Bán Hàng','CÔNG TY TNHH LONG HUEI',1448,1,'1668043800000','1668907800000','86400000','126000000',1,5000,4,'1','Quản lý công việc, ca làm việc cho đội ngũ nhân viên giao hàng, và nhân viên tại trạm. Quản lý quá trình giao, nhận, trả của hàng hóa thuộc khu vực quản lý.',NULL,1,'2022-11-30 14:28:47','2022-12-23 15:31:07'),(193,'4d207f7c-d443-476b-af9a-b59da47560a9','Nhân Viên Telesales / Tư Vấn','CÔNG TY TNHH TƯ VẤN DỊCH VỤ VINKARIS',1448,1,'1668043800000','1668907800000','86400000','126000000',1,5000,4,'1','Quản lý công việc, ca làm việc cho đội ngũ nhân viên giao hàng, và nhân viên tại trạm. Quản lý quá trình giao, nhận, trả của hàng hóa thuộc khu vực quản lý.',NULL,1,'2022-11-30 14:28:47','2022-12-23 15:31:07'),(194,'4d207f7c-d443-476b-af9a-b59da47560a9','Trưởng Phòng Kinh Doanh','Công ty TNHH VUIHOC',1448,1,'1668043800000','1668907800000','86400000','126000000',1,5000,4,'1','Quản lý công việc, ca làm việc cho đội ngũ nhân viên giao hàng, và nhân viên tại trạm. Quản lý quá trình giao, nhận, trả của hàng hóa thuộc khu vực quản lý.',NULL,1,'2022-11-30 14:28:47','2022-12-23 15:31:07'),(195,'4d207f7c-d443-476b-af9a-b59da47560a9','Chuyên Viên Phát Triển Và Kinh Doanh Dịch Vụ Trên Di Động','Trung tâm Dịch vụ số MobiFone',1448,1,'1668043800000','1668907800000','86400000','126000000',1,5000,4,'1','Quản lý công việc, ca làm việc cho đội ngũ nhân viên giao hàng, và nhân viên tại trạm. Quản lý quá trình giao, nhận, trả của hàng hóa thuộc khu vực quản lý.',NULL,1,'2022-11-30 14:28:47','2022-12-23 15:31:07'),(196,'4d207f7c-d443-476b-af9a-b59da47560a9','Giám Sát Bán Hàng','CÔNG TY TNHH ĐẦU TƯ SB GROUP',1448,1,'1668043800000','1668907800000','86400000','126000000',1,5000,2,'1','Quản lý công việc, ca làm việc cho đội ngũ nhân viên giao hàng, và nhân viên tại trạm. Quản lý quá trình giao, nhận, trả của hàng hóa thuộc khu vực quản lý.',NULL,1,'2022-11-30 14:28:47','2022-12-23 15:31:07'),(197,'4d207f7c-d443-476b-af9a-b59da47560a9','Chuyên Viên Kỹ Thuật','Trung tâm Dịch vụ số MobiFone',1448,1,'1668043800000','1668907800000','86400000','126000000',1,5000,4,'1','Quản lý công việc, ca làm việc cho đội ngũ nhân viên giao hàng, và nhân viên tại trạm. Quản lý quá trình giao, nhận, trả của hàng hóa thuộc khu vực quản lý.',NULL,1,'2022-11-30 14:28:47','2022-12-23 15:31:07'),(198,'4d207f7c-d443-476b-af9a-b59da47560a9','Khai Thác Ứng Dụng & Triển Khai Các Giải Pháp CNTT','TRUNG TÂM CNTT MOBIFONE',1448,1,'1668043800000','1668907800000','86400000','126000000',1,5000,2,'1','Quản lý công việc, ca làm việc cho đội ngũ nhân viên giao hàng, và nhân viên tại trạm. Quản lý quá trình giao, nhận, trả của hàng hóa thuộc khu vực quản lý.',NULL,1,'2022-11-30 14:28:47','2022-12-23 15:31:07'),(199,'4d207f7c-d443-476b-af9a-b59da47560a9','Backend Developer (Golang)','Công ty Cổ phần Tomotek',1448,1,'1668043800000','1668907800000','86400000','126000000',1,5000,4,'1','Quản lý công việc, ca làm việc cho đội ngũ nhân viên giao hàng, và nhân viên tại trạm. Quản lý quá trình giao, nhận, trả của hàng hóa thuộc khu vực quản lý.',NULL,1,'2022-11-30 14:28:47','2022-12-23 15:31:07'),(200,'4d207f7c-d443-476b-af9a-b59da47560a9','Chuyên Viên Kinh Doanh Ngành Quảng Cáo - Truyền Thông','Công ty Cổ phần đầu tư Bizman',1448,1,'1668043800000','1668907800000','86400000','126000000',1,5000,4,'1','Quản lý công việc, ca làm việc cho đội ngũ nhân viên giao hàng, và nhân viên tại trạm. Quản lý quá trình giao, nhận, trả của hàng hóa thuộc khu vực quản lý.',NULL,1,'2022-11-30 14:28:47','2022-12-23 15:31:07'),(201,'4d207f7c-d443-476b-af9a-b59da47560a9','Kế Toán Tổng Hợp','Công ty CP Đầu tư Vàng Phú Quý',1448,1,'1668043800000','1668907800000','86400000','126000000',1,5000,1,'1','Quản lý công việc, ca làm việc cho đội ngũ nhân viên giao hàng, và nhân viên tại trạm. Quản lý quá trình giao, nhận, trả của hàng hóa thuộc khu vực quản lý.',NULL,1,'2022-11-30 14:28:47','2022-12-23 15:31:07'),(202,'4d207f7c-d443-476b-af9a-b59da47560a9','Senior Android Developer','CÔNG TY TNHH THỊ GIÁC META',1449,1,'1668043800000','1668907800000','86400000','126000000',1,5000,4,'1','Quản lý công việc, ca làm việc cho đội ngũ nhân viên giao hàng, và nhân viên tại trạm. Quản lý quá trình giao, nhận, trả của hàng hóa thuộc khu vực quản lý.',NULL,1,'2022-11-30 14:28:47','2022-12-26 13:23:57'),(203,'4d207f7c-d443-476b-af9a-b59da47560a9','Chuyên Viên Tư Vấn Hỗ Trợ Khách Hàng','CÔNG TY TNHH IRON BEE',1449,1,'1668043800000','1668907800000','86400000','126000000',1,5000,2,'1','Quản lý công việc, ca làm việc cho đội ngũ nhân viên giao hàng, và nhân viên tại trạm. Quản lý quá trình giao, nhận, trả của hàng hóa thuộc khu vực quản lý.',NULL,1,'2022-11-30 14:28:47','2022-12-26 13:24:06'),(204,'4d207f7c-d443-476b-af9a-b59da47560a9','Nhân Viên Kế Toán Thanh Toán','ECOZEN INTERNATIONAL JSC',1448,1,'1668043800000','1668907800000','86400000','126000000',1,5000,2,'1','Quản lý công việc, ca làm việc cho đội ngũ nhân viên giao hàng, và nhân viên tại trạm. Quản lý quá trình giao, nhận, trả của hàng hóa thuộc khu vực quản lý.',NULL,1,'2022-11-30 14:28:47','2022-12-23 15:31:07'),(205,'4d207f7c-d443-476b-af9a-b59da47560a9','Chuyên Viên Marketing Online','Công ty TNHH đầu tư công nghệ và dịch vụ Sconnect Việt Nam',1448,1,'1668043800000','1668907800000','86400000','126000000',1,5000,2,'1','Quản lý công việc, ca làm việc cho đội ngũ nhân viên giao hàng, và nhân viên tại trạm. Quản lý quá trình giao, nhận, trả của hàng hóa thuộc khu vực quản lý.',NULL,1,'2022-11-30 14:28:47','2022-12-23 15:31:07'),(206,'4d207f7c-d443-476b-af9a-b59da47560a9','Chuyên Viên Tư Vấn Giáo Dục/ Tư Vấn Tuyển Sinh','TRUNG TÂM ANH NGỮ QUỐC TẾ GIGI',1448,1,'1668043800000','1668907800000','86400000','126000000',1,5000,4,'1','Quản lý công việc, ca làm việc cho đội ngũ nhân viên giao hàng, và nhân viên tại trạm. Quản lý quá trình giao, nhận, trả của hàng hóa thuộc khu vực quản lý.',NULL,1,'2022-11-30 14:28:47','2022-12-23 15:31:07'),(207,'4d207f7c-d443-476b-af9a-b59da47560a9','Chuyên Viên Truyền Thông','Công ty Cổ phần Giáo dục & Đào tạo IMAP Việt Nam',1448,1,'1668043800000','1668907800000','86400000','126000000',1,5000,4,'1','Quản lý công việc, ca làm việc cho đội ngũ nhân viên giao hàng, và nhân viên tại trạm. Quản lý quá trình giao, nhận, trả của hàng hóa thuộc khu vực quản lý.',NULL,1,'2022-11-30 14:28:47','2022-12-23 15:31:07'),(208,'4d207f7c-d443-476b-af9a-b59da47560a9','Nhân Viên Tổ Chức Sự Kiện','CÔNG TY TNHH TRUNG TÂM ANH NGỮ VUS MIỀN BẮC',1448,1,'1668043800000','1668907800000','86400000','126000000',1,5000,1,'1','Quản lý công việc, ca làm việc cho đội ngũ nhân viên giao hàng, và nhân viên tại trạm. Quản lý quá trình giao, nhận, trả của hàng hóa thuộc khu vực quản lý.',NULL,1,'2022-11-30 14:28:47','2022-12-23 15:31:07'),(209,'4d207f7c-d443-476b-af9a-b59da47560a9','Giáo Viên Tiếng Anh','Trung Tâm Anh Ngữ ILA',1448,1,'1668043800000','1668907800000','86400000','126000000',1,5000,1,'1','Quản lý công việc, ca làm việc cho đội ngũ nhân viên giao hàng, và nhân viên tại trạm. Quản lý quá trình giao, nhận, trả của hàng hóa thuộc khu vực quản lý.',NULL,1,'2022-11-30 14:28:47','2022-12-23 15:31:07'),(210,'4d207f7c-d443-476b-af9a-b59da47560a9','Nhân Viên Kinh Doanh Giao Hàng Tận Nhà','CÔNG TY TNHH YAKULT VN',1448,1,'1668043800000','1668907800000','86400000','126000000',1,5000,4,'1','Quản lý công việc, ca làm việc cho đội ngũ nhân viên giao hàng, và nhân viên tại trạm. Quản lý quá trình giao, nhận, trả của hàng hóa thuộc khu vực quản lý.',NULL,1,'2022-11-30 14:28:47','2022-12-23 15:31:07'),(211,'4d207f7c-d443-476b-af9a-b59da47560a9','Lập Trình Viên','TRUNG TÂM CNTT MOBIFONE',1448,1,'1668043800000','1668907800000','86400000','126000000',1,5000,2,'1','Quản lý công việc, ca làm việc cho đội ngũ nhân viên giao hàng, và nhân viên tại trạm. Quản lý quá trình giao, nhận, trả của hàng hóa thuộc khu vực quản lý.',NULL,1,'2022-11-30 14:28:47','2022-12-23 15:31:07'),(212,'4d207f7c-d443-476b-af9a-b59da47560a9','Nhân Viên Tư Vấn Bán Hàng','CÔNG TY TNHH XUẤT NHẬP KHẨU PHÁT TRIỂN ĐÔNG DƯƠNG - TẬP ĐOÀN THỂ THAO KINGSPORT',1448,1,'1668043800000','1668907800000','86400000','126000000',1,5000,2,'1','Quản lý công việc, ca làm việc cho đội ngũ nhân viên giao hàng, và nhân viên tại trạm. Quản lý quá trình giao, nhận, trả của hàng hóa thuộc khu vực quản lý.',NULL,1,'2022-11-30 14:28:47','2022-12-23 15:31:07'),(213,'4d207f7c-d443-476b-af9a-b59da47560a9','Diễn Hoạ Kiến Trúc','Công ty TNHH VACS Việt Nam',1448,1,'1668043800000','1668907800000','86400000','126000000',1,5000,2,'1','Quản lý công việc, ca làm việc cho đội ngũ nhân viên giao hàng, và nhân viên tại trạm. Quản lý quá trình giao, nhận, trả của hàng hóa thuộc khu vực quản lý.',NULL,1,'2022-11-30 14:28:47','2022-12-23 15:31:07'),(214,'4d207f7c-d443-476b-af9a-b59da47560a9','Trưởng Phòng Kinh Doanh Bảo Hiểm','Công Ty TNHH FWM',1448,1,'1668043800000','1668907800000','86400000','126000000',1,5000,4,'1','Quản lý công việc, ca làm việc cho đội ngũ nhân viên giao hàng, và nhân viên tại trạm. Quản lý quá trình giao, nhận, trả của hàng hóa thuộc khu vực quản lý.',NULL,1,'2022-11-30 14:28:47','2022-12-23 15:31:07'),(215,'4d207f7c-d443-476b-af9a-b59da47560a9','Nhân Viên Chăm Sóc Khách Hàng','Công ty TNHH Phước Thọ An Bình',1448,1,'1668043800000','1668907800000','86400000','126000000',1,5000,4,'1','Quản lý công việc, ca làm việc cho đội ngũ nhân viên giao hàng, và nhân viên tại trạm. Quản lý quá trình giao, nhận, trả của hàng hóa thuộc khu vực quản lý.',NULL,1,'2022-11-30 14:28:47','2022-12-23 15:31:07'),(216,'4d207f7c-d443-476b-af9a-b59da47560a9','Trưởng Trạm Giao Nhận Miền Nam','Công ty TNHH Shopee Express',1448,1,'1668043800000','1668907800000','86400000','126000000',1,5000,2,'1','Quản lý công việc, ca làm việc cho đội ngũ nhân viên giao hàng, và nhân viên tại trạm. Quản lý quá trình giao, nhận, trả của hàng hóa thuộc khu vực quản lý.',NULL,1,'2022-11-30 14:28:47','2022-12-23 15:31:07'),(217,'4d207f7c-d443-476b-af9a-b59da47560a9','Nhân Viên Thiết Kế Đồ Họa','CÔNG TY TNHH XUẤT NHẬP KHẨU LIÊN PHONG',1448,1,'1668043800000','1668907800000','86400000','126000000',1,5000,2,'1','Quản lý công việc, ca làm việc cho đội ngũ nhân viên giao hàng, và nhân viên tại trạm. Quản lý quá trình giao, nhận, trả của hàng hóa thuộc khu vực quản lý.',NULL,1,'2022-11-30 14:28:47','2022-12-23 15:31:07'),(218,'4d207f7c-d443-476b-af9a-b59da47560a9','Chuyên Viên Kế Toán','CÔNG TY CỔ PHẦN QUỐC TẾ ANH VĂN HỘI VIỆT MỸ',1448,1,'1668043800000','1668907800000','86400000','126000000',1,5000,2,'1','Quản lý công việc, ca làm việc cho đội ngũ nhân viên giao hàng, và nhân viên tại trạm. Quản lý quá trình giao, nhận, trả của hàng hóa thuộc khu vực quản lý.',NULL,1,'2022-11-30 14:28:47','2022-12-23 15:31:07'),(219,'4d207f7c-d443-476b-af9a-b59da47560a9','Nhân viên kế toán','CÔNG TY TNHH TMDV ADFLY VIỆT NAM',1449,1,'1668043800000','1668907800000','86400000','126000000',1,5000,2,'1','Quản lý công việc, ca làm việc cho đội ngũ nhân viên giao hàng, và nhân viên tại trạm. Quản lý quá trình giao, nhận, trả của hàng hóa thuộc khu vực quản lý.',NULL,1,'2022-11-30 14:28:47','2022-12-26 13:24:10'),(220,'4d207f7c-d443-476b-af9a-b59da47560a9','Nhân Viên Chăm Sóc Khách Hàng','CÔNG TY CP KINH DOANH VÀ THƯƠNG MẠI EVEREST',1448,1,'1668043800000','1668907800000','86400000','126000000',1,5000,4,'1','Quản lý công việc, ca làm việc cho đội ngũ nhân viên giao hàng, và nhân viên tại trạm. Quản lý quá trình giao, nhận, trả của hàng hóa thuộc khu vực quản lý.',NULL,1,'2022-11-30 14:28:47','2022-12-23 15:31:07'),(221,'4d207f7c-d443-476b-af9a-b59da47560a9','IT Support - Hỗ Trợ Kỹ Thuật','Tek Experts Vietnam',1448,1,'1668043800000','1668907800000','86400000','126000000',1,5000,2,'1','Quản lý công việc, ca làm việc cho đội ngũ nhân viên giao hàng, và nhân viên tại trạm. Quản lý quá trình giao, nhận, trả của hàng hóa thuộc khu vực quản lý.',NULL,1,'2022-11-30 14:28:47','2022-12-23 15:31:07'),(222,'4d207f7c-d443-476b-af9a-b59da47560a9','Chuyên Viên Tư Vấn Giáo Dục','CÔNG TY CỔ PHẦN CÔNG NGHỆ & SÁNG TẠO TRẺ TEKY HOLDINGS',1448,1,'1668043800000','1668907800000','86400000','126000000',1,5000,2,'1','Quản lý công việc, ca làm việc cho đội ngũ nhân viên giao hàng, và nhân viên tại trạm. Quản lý quá trình giao, nhận, trả của hàng hóa thuộc khu vực quản lý.',NULL,1,'2022-11-30 14:28:47','2022-12-23 15:31:07'),(223,'4d207f7c-d443-476b-af9a-b59da47560a9','Nhân Viên Tư Vấn Tổng Đài/ Chăm Sóc Khách Hàng','Công ty TNHH Tele247 Global',1448,1,'1668043800000','1668907800000','86400000','126000000',1,5000,2,'1','Quản lý công việc, ca làm việc cho đội ngũ nhân viên giao hàng, và nhân viên tại trạm. Quản lý quá trình giao, nhận, trả của hàng hóa thuộc khu vực quản lý.',NULL,1,'2022-11-30 14:28:47','2022-12-23 15:31:07'),(224,'4d207f7c-d443-476b-af9a-b59da47560a9','Nhân Viên Kinh Doanh Giải Pháp Công Nghệ','Công ty cổ phần Công nghệ Sapo',1448,1,'1668043800000','1668907800000','86400000','126000000',1,5000,1,'1','Quản lý công việc, ca làm việc cho đội ngũ nhân viên giao hàng, và nhân viên tại trạm. Quản lý quá trình giao, nhận, trả của hàng hóa thuộc khu vực quản lý.',NULL,1,'2022-11-30 14:28:47','2022-12-23 15:31:07'),(225,'4d207f7c-d443-476b-af9a-b59da47560a9','Nhân Viên Quan Hệ Khách Hàng Doanh Nghiệp (Tư Vấn Tài Chính)','Công ty Cho thuê tài chính TNHH MTV Quốc tế Chailease',1448,1,'1668043800000','1668907800000','86400000','126000000',1,5000,2,'1','Quản lý công việc, ca làm việc cho đội ngũ nhân viên giao hàng, và nhân viên tại trạm. Quản lý quá trình giao, nhận, trả của hàng hóa thuộc khu vực quản lý.',NULL,1,'2022-11-30 14:28:47','2022-12-23 15:31:07'),(226,'4d207f7c-d443-476b-af9a-b59da47560a9','Nhân Viên Đào Tạo (Điều Phối Lớp Học)','CÔNG TY TNHH BẢO TÍN MINH CHÂU',1449,1,'1668043800000','1668907800000','86400000','126000000',1,5000,4,'1','Quản lý công việc, ca làm việc cho đội ngũ nhân viên giao hàng, và nhân viên tại trạm. Quản lý quá trình giao, nhận, trả của hàng hóa thuộc khu vực quản lý.',NULL,1,'2022-11-30 14:28:47','2022-12-26 13:23:54'),(227,'4d207f7c-d443-476b-af9a-b59da47560a9','Trợ Lý Kinh Doanh','CÔNG TY TNHH DỊCH VỤ VÀ KINH DOANH CÔNG NGHỆ IIC',1448,1,'1668043800000','1668907800000','86400000','126000000',1,5000,5,'1','Quản lý công việc, ca làm việc cho đội ngũ nhân viên giao hàng, và nhân viên tại trạm. Quản lý quá trình giao, nhận, trả của hàng hóa thuộc khu vực quản lý.',NULL,1,'2022-11-30 14:28:47','2022-12-23 15:31:07');
/*!40000 ALTER TABLE `posts` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `posts_categories`
--

DROP TABLE IF EXISTS `posts_categories`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `posts_categories` (
  `post_id` int(11) NOT NULL,
  `category_id` int(11) NOT NULL,
  PRIMARY KEY (`post_id`,`category_id`),
  KEY `FK_Post_Category_Category` (`category_id`),
  KEY `FK_Post_Category_Post` (`post_id`),
  CONSTRAINT `FK_Post_Category_Category` FOREIGN KEY (`category_id`) REFERENCES `child_categories` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `FK_Post_Category_Post` FOREIGN KEY (`post_id`) REFERENCES `posts` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `posts_categories`
--

LOCK TABLES `posts_categories` WRITE;
/*!40000 ALTER TABLE `posts_categories` DISABLE KEYS */;
INSERT INTO `posts_categories` VALUES (16,1),(17,1),(17,2),(19,8),(19,9),(19,10),(20,11),(20,12),(20,13),(159,1),(159,20),(159,21),(159,22),(160,2),(160,23),(160,24),(160,25),(161,3),(161,26),(161,27),(161,28),(162,4),(162,29),(162,30),(162,31),(163,5),(163,32),(163,33),(163,34),(164,6),(164,35),(164,36),(164,37),(165,7),(166,8),(167,9),(168,10),(169,11),(170,12),(171,13),(172,14),(173,15),(174,16),(175,17),(176,18),(177,19),(178,20),(179,21),(180,22),(181,23),(182,24),(183,25),(184,26),(185,27),(186,28),(187,29),(188,30),(189,31),(190,32),(191,33),(192,34),(193,35),(194,36),(195,37),(196,38),(197,39),(198,40),(199,41),(200,42),(201,43),(202,1),(202,2),(202,44);
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
  `introduction` varchar(500) DEFAULT NULL,
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
INSERT INTO `profiles` VALUES ('3f04d917-ddc7-4a49-8854-5fffa2059364','Nguyen The Truong','995130000000',201,1,'My intro','0919004743','truong@gmail.com','facebook.com','linkedin.com',NULL,'2022-12-01 13:24:56','2022-12-07 13:10:37'),('4d207f7c-d443-476b-af9a-b59da47560a9','Nguyen The Truong new','995130000000',259,0,'My introduction new','0919004743','nttruong10101@gmail.com',NULL,NULL,'https://gig-app-upload.s3.ap-southeast-1.amazonaws.com/481b5604-6830-40cf-a00a-c5b0c07585e6-IMG_1962.JPG','2022-11-25 17:41:45','2022-11-30 14:31:37'),('596ed003-a4f8-4002-8abd-412851703e2e',NULL,NULL,NULL,0,NULL,NULL,NULL,NULL,NULL,NULL,'2022-12-15 13:30:53','2022-12-15 13:30:53'),('665848b6-6f6c-4b6f-ad9c-440beacb44f4',NULL,NULL,NULL,0,NULL,'84386958079',NULL,NULL,NULL,NULL,'2022-12-07 15:52:26','2022-12-07 15:52:26'),('66deb066-7836-4c07-8511-581b68d1fdb3',NULL,NULL,NULL,0,NULL,'84935743377',NULL,NULL,NULL,NULL,'2022-12-01 13:24:50','2022-12-01 13:24:50'),('b0afd13d-e515-4a41-8f85-11837b4df3f5','Nguyen The Truong','995130000000',201,1,'My intro','012345','phanthang053@gmail.com','facebook.com','linkedin.com',NULL,'2022-12-01 13:08:25','2022-12-08 10:29:32'),('c53fe2a4-52c3-4332-b7e8-9b3baae27764','PCT','995130000000',201,1,'My intro','0835743377','phanthang052@gmail.com','facebook.com','linkedin.com',NULL,'2022-11-30 15:45:00','2022-12-07 16:43:37');
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
  KEY `FK_ProfileAndCategory_Profile` (`account_id`),
  KEY `FK_ProfileAndCategory_ChildCategory` (`category_id`),
  CONSTRAINT `FK_ProfileAndCategory_ChildCategory` FOREIGN KEY (`category_id`) REFERENCES `child_categories` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `FK_ProfileAndCategory_Profile` FOREIGN KEY (`account_id`) REFERENCES `profiles` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=31 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `profiles_categories`
--

LOCK TABLES `profiles_categories` WRITE;
/*!40000 ALTER TABLE `profiles_categories` DISABLE KEYS */;
INSERT INTO `profiles_categories` VALUES (14,'4d207f7c-d443-476b-af9a-b59da47560a9',25),(20,'4d207f7c-d443-476b-af9a-b59da47560a9',52),(21,'3f04d917-ddc7-4a49-8854-5fffa2059364',25),(22,'3f04d917-ddc7-4a49-8854-5fffa2059364',12),(23,'3f04d917-ddc7-4a49-8854-5fffa2059364',9),(24,'c53fe2a4-52c3-4332-b7e8-9b3baae27764',20),(25,'c53fe2a4-52c3-4332-b7e8-9b3baae27764',21),(26,'c53fe2a4-52c3-4332-b7e8-9b3baae27764',22),(27,'b0afd13d-e515-4a41-8f85-11837b4df3f5',25),(29,'b0afd13d-e515-4a41-8f85-11837b4df3f5',9),(30,'b0afd13d-e515-4a41-8f85-11837b4df3f5',25);
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
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `profiles_educations`
--

LOCK TABLES `profiles_educations` WRITE;
/*!40000 ALTER TABLE `profiles_educations` DISABLE KEYS */;
INSERT INTO `profiles_educations` VALUES (15,'4d207f7c-d443-476b-af9a-b59da47560a9','TDT University new','Computer Science new','1568332800000','1686441600000','Nothing to tell new','2022-11-25 17:52:12','2022-11-25 17:52:57'),(16,'4d207f7c-d443-476b-af9a-b59da47560a9','TDT University','Computer Science','1568073600000','1686528000000','Nothing to tell','2022-11-28 13:45:17','2022-11-28 13:45:17'),(19,'3f04d917-ddc7-4a49-8854-5fffa2059364','TDT University','Computer Science','1568073600000','1686528000000','Nothing to tell','2022-12-07 13:10:44','2022-12-07 13:10:44'),(20,'c53fe2a4-52c3-4332-b7e8-9b3baae27764','FPT University','Hacker Lỏ','1568073600000','1686528000000','Nothing to tell','2022-12-07 16:36:23','2022-12-07 16:36:23');
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
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `profiles_experiences`
--

LOCK TABLES `profiles_experiences` WRITE;
/*!40000 ALTER TABLE `profiles_experiences` DISABLE KEYS */;
INSERT INTO `profiles_experiences` VALUES (8,'4d207f7c-d443-476b-af9a-b59da47560a9','Project Manager','TDT University - Vietnam','1570838400000','1686787200000','Nothing','2022-11-25 17:53:20','2022-11-25 17:53:43'),(9,'4d207f7c-d443-476b-af9a-b59da47560a9','Student','TDT University','1568073600000','1686528000000','Nothing to tell','2022-11-28 13:52:42','2022-11-28 13:52:42'),(10,'4d207f7c-d443-476b-af9a-b59da47560a9','Student','TDT University','1568073600000','1686528000000','Nothing to tell','2022-11-28 16:47:44','2022-11-28 16:47:44'),(13,'3f04d917-ddc7-4a49-8854-5fffa2059364','Student','TDT University','1568073600000','1686528000000','Nothing to tell','2022-12-07 13:11:27','2022-12-07 13:11:27'),(14,'c53fe2a4-52c3-4332-b7e8-9b3baae27764','Intern','Ai Work','1568073600000','1686528000000','Nothing to tell','2022-12-07 16:36:56','2022-12-07 16:36:56'),(15,'b0afd13d-e515-4a41-8f85-11837b4df3f5','Student','TDT University','1568073600000','1686528000000','Hello','2022-12-08 10:31:19','2022-12-08 10:31:19');
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
  KEY `FK_Profile_Location_District` (`location_id`),
  KEY `FK_Profile_Location_Account` (`account_id`),
  CONSTRAINT `FK_Profile_Location_Account` FOREIGN KEY (`account_id`) REFERENCES `profiles` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `FK_Profile_Location_District` FOREIGN KEY (`location_id`) REFERENCES `districts` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `profiles_locations`
--

LOCK TABLES `profiles_locations` WRITE;
/*!40000 ALTER TABLE `profiles_locations` DISABLE KEYS */;
INSERT INTO `profiles_locations` VALUES (7,1451,'4d207f7c-d443-476b-af9a-b59da47560a9'),(12,1655,'4d207f7c-d443-476b-af9a-b59da47560a9'),(13,1451,'3f04d917-ddc7-4a49-8854-5fffa2059364'),(14,1655,'3f04d917-ddc7-4a49-8854-5fffa2059364'),(15,1452,'b0afd13d-e515-4a41-8f85-11837b4df3f5'),(16,1625,'b0afd13d-e515-4a41-8f85-11837b4df3f5');
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
-- Table structure for table `system_notifications`
--

DROP TABLE IF EXISTS `system_notifications`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `system_notifications` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `message` text NOT NULL,
  `status` enum('0','1') NOT NULL DEFAULT '0',
  `created_at` datetime NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `system_notifications`
--

LOCK TABLES `system_notifications` WRITE;
/*!40000 ALTER TABLE `system_notifications` DISABLE KEYS */;
/*!40000 ALTER TABLE `system_notifications` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `system_notifications_read`
--

DROP TABLE IF EXISTS `system_notifications_read`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `system_notifications_read` (
  `noti_id` int(11) NOT NULL,
  `account_id` varchar(50) NOT NULL,
  PRIMARY KEY (`noti_id`,`account_id`),
  KEY `fk_account_id` (`account_id`),
  CONSTRAINT `fk_account_id` FOREIGN KEY (`account_id`) REFERENCES `accounts` (`id`),
  CONSTRAINT `fk_noti_id` FOREIGN KEY (`noti_id`) REFERENCES `system_notifications` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `system_notifications_read`
--

LOCK TABLES `system_notifications_read` WRITE;
/*!40000 ALTER TABLE `system_notifications_read` DISABLE KEYS */;
/*!40000 ALTER TABLE `system_notifications_read` ENABLE KEYS */;
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
  `district_id` int(11) DEFAULT NULL,
  `status` tinyint(4) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`),
  KEY `FK_Theme_District` (`district_id`),
  CONSTRAINT `FK_Theme_District` FOREIGN KEY (`district_id`) REFERENCES `districts` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `themes`
--

LOCK TABLES `themes` WRITE;
/*!40000 ALTER TABLE `themes` DISABLE KEYS */;
INSERT INTO `themes` VALUES (1,'Quận 1','https://gig-app-upload.s3.ap-southeast-1.amazonaws.com/a860b922-d077-4190-9471-5316230b31a6-dog.jpg',3440,1),(2,'Quận 2','https://gig-app-upload.s3.ap-southeast-1.amazonaws.com/381f9c5b-9963-4989-b61e-86fb6e7a735a-01.jpg',1490,1),(4,'Quận 4','https://gig-app-upload.s3.ap-southeast-1.amazonaws.com/74103d86-5e49-4e48-ae71-5281c5f8c8ee-01.jpg',1587,1),(5,'Quận 2','https://gig-app-upload.s3.ap-southeast-1.amazonaws.com/77c600ce-338b-4dc3-a105-9096831ca899-dog.jpg',1587,1),(6,'Quận 7','https://gig-app-upload.s3.ap-southeast-1.amazonaws.com/99b57dd6-1b72-4bb4-a301-73a481e5b7b3-dog.jpg',3440,1);
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
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `themes_posts`
--

LOCK TABLES `themes_posts` WRITE;
/*!40000 ALTER TABLE `themes_posts` DISABLE KEYS */;
INSERT INTO `themes_posts` VALUES (1,1,20),(2,1,21),(3,1,22),(4,6,20),(5,6,21),(6,6,22);
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

-- Dump completed on 2022-12-28 10:44:54
