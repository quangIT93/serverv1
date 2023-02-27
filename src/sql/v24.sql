/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

CREATE DATABASE IF NOT EXISTS `aiwork_gig_app_v2` /*!40100 DEFAULT CHARACTER SET utf8mb4 */;
USE `aiwork_gig_app_v2`;

CREATE TABLE IF NOT EXISTS `accounts` (
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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

/*!40000 ALTER TABLE `accounts` DISABLE KEYS */;


CREATE TABLE IF NOT EXISTS `applications` (
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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

/*!40000 ALTER TABLE `applications` DISABLE KEYS */;
/*!40000 ALTER TABLE `applications` ENABLE KEYS */;

CREATE TABLE IF NOT EXISTS `applications_categories` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `application_id` int(11) DEFAULT NULL,
  `category_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`),
  KEY `FK_Application_Category` (`application_id`),
  KEY `FK_Category_Application` (`category_id`),
  CONSTRAINT `FK_Application_Category` FOREIGN KEY (`application_id`) REFERENCES `applications` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `FK_Category_Application` FOREIGN KEY (`category_id`) REFERENCES `child_categories` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

/*!40000 ALTER TABLE `applications_categories` DISABLE KEYS */;
/*!40000 ALTER TABLE `applications_categories` ENABLE KEYS */;

CREATE TABLE IF NOT EXISTS `applications_educations` (
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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

/*!40000 ALTER TABLE `applications_educations` DISABLE KEYS */;
/*!40000 ALTER TABLE `applications_educations` ENABLE KEYS */;

CREATE TABLE IF NOT EXISTS `applications_experiences` (
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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

/*!40000 ALTER TABLE `applications_experiences` DISABLE KEYS */;
/*!40000 ALTER TABLE `applications_experiences` ENABLE KEYS */;

CREATE TABLE IF NOT EXISTS `applications_locations` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `application_id` int(11) DEFAULT NULL,
  `location_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`),
  KEY `FK_Application_Location` (`application_id`),
  KEY `FK_Location_Application` (`location_id`),
  CONSTRAINT `FK_Application_Location` FOREIGN KEY (`application_id`) REFERENCES `applications` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `FK_Location_Application` FOREIGN KEY (`location_id`) REFERENCES `districts` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

/*!40000 ALTER TABLE `applications_locations` DISABLE KEYS */;
/*!40000 ALTER TABLE `applications_locations` ENABLE KEYS */;

CREATE TABLE IF NOT EXISTS `banners` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `image` varchar(300) DEFAULT NULL,
  `redirect_url` varchar(200) DEFAULT NULL,
  `status` tinyint(4) DEFAULT 1,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4;


CREATE TABLE IF NOT EXISTS `bookmarks` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `account_id` varchar(50) DEFAULT NULL,
  `post_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`),
  KEY `FK_Bookmark_Account` (`account_id`),
  KEY `FK_Bookmark_Post` (`post_id`),
  CONSTRAINT `FK_Bookmark_Account` FOREIGN KEY (`account_id`) REFERENCES `accounts` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `FK_Bookmark_Post` FOREIGN KEY (`post_id`) REFERENCES `posts` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4;



CREATE TABLE IF NOT EXISTS `child_categories` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `parent_category_id` int(11) DEFAULT NULL,
  `name` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`),
  KEY `FK_Child_Category_Parent_Category` (`parent_category_id`),
  CONSTRAINT `FK_Child_Category_Parent_Category` FOREIGN KEY (`parent_category_id`) REFERENCES `parent_categories` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=167 DEFAULT CHARSET=utf8mb4;


CREATE TABLE IF NOT EXISTS `majors` (
  `id` varchar(50) NOT NULL DEFAULT uuid(),
  `name` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

/*!40000 ALTER TABLE `majors` DISABLE KEYS */;
/*!40000 ALTER TABLE `majors` ENABLE KEYS */;

CREATE TABLE IF NOT EXISTS `otps` (
  `id` varchar(50) NOT NULL DEFAULT uuid(),
  `account_id` varchar(50) DEFAULT NULL,
  `otp` varchar(6) DEFAULT NULL,
  `created_at` datetime DEFAULT current_timestamp(),
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`),
  KEY `FK_Otp_Account` (`account_id`),
  CONSTRAINT `FK_Otp_Account` FOREIGN KEY (`account_id`) REFERENCES `accounts` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;



CREATE TABLE IF NOT EXISTS `parent_categories` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS `posts` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `account_id` varchar(50) DEFAULT NULL,
  `title` varchar(50) DEFAULT NULL,
  `company_name` varchar(50) DEFAULT NULL,
  `district_id` int(11) DEFAULT NULL,
  `is_date_period` tinyint(4) DEFAULT 0,
  `start_date` varchar(20) DEFAULT NULL,
  `end_date` varchar(20) DEFAULT NULL,
  `start_time` varchar(20) DEFAULT NULL,
  `end_time` varchar(20) DEFAULT NULL,
  `is_working_weekend` tinyint(4) DEFAULT 0,
  `salary` double DEFAULT NULL,
  `salary_type` varchar(10) DEFAULT NULL,
  `description` varchar(1000) DEFAULT NULL,
  `status` tinyint(4) DEFAULT 0,
  `created_at` datetime DEFAULT current_timestamp(),
  `updated_at` datetime DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`),
  KEY `FK_Post_Profile` (`account_id`),
  KEY `FK_Post_Province` (`district_id`) USING BTREE,
  CONSTRAINT `FK_Post_District` FOREIGN KEY (`district_id`) REFERENCES `districts` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `FK_Post_Profile` FOREIGN KEY (`account_id`) REFERENCES `profiles` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=25 DEFAULT CHARSET=utf8mb4;

/*!40000 ALTER TABLE `posts` DISABLE KEYS */;

CREATE TABLE IF NOT EXISTS `posts_categories` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `post_id` int(11) DEFAULT NULL,
  `category_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`),
  KEY `FK_Post_Category_Category` (`category_id`),
  KEY `FK_Post_Category_Post` (`post_id`),
  CONSTRAINT `FK_Post_Category_Category` FOREIGN KEY (`category_id`) REFERENCES `child_categories` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `FK_Post_Category_Post` FOREIGN KEY (`post_id`) REFERENCES `posts` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=51 DEFAULT CHARSET=utf8mb4;

/*!40000 ALTER TABLE `posts_categories` DISABLE KEYS */;

CREATE TABLE IF NOT EXISTS `post_images` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `post_id` int(11) DEFAULT NULL,
  `image` varchar(200) DEFAULT NULL,
  `status` tinyint(4) DEFAULT 1,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`),
  KEY `FK_Post_Image` (`post_id`),
  CONSTRAINT `FK_Post_Image` FOREIGN KEY (`post_id`) REFERENCES `posts` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4;


CREATE TABLE IF NOT EXISTS `profiles` (
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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;


CREATE TABLE IF NOT EXISTS `profiles_categories` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `account_id` varchar(50) DEFAULT NULL,
  `category_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`),
  KEY `FK_ProfileAndCategory_ChildCategory` (`category_id`),
  KEY `FK_ProfileAndCategory_Profile` (`account_id`),
  CONSTRAINT `FK_ProfileAndCategory_ChildCategory` FOREIGN KEY (`category_id`) REFERENCES `child_categories` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `FK_ProfileAndCategory_Profile` FOREIGN KEY (`account_id`) REFERENCES `profiles` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8mb4;


CREATE TABLE IF NOT EXISTS `profiles_educations` (
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
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8mb4;


CREATE TABLE IF NOT EXISTS `profiles_experiences` (
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
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4;


CREATE TABLE IF NOT EXISTS `profiles_locations` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `location_id` int(11) DEFAULT NULL,
  `account_id` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`),
  KEY `FK_Profile_Location_Account` (`account_id`),
  KEY `FK_Profile_Location_District` (`location_id`),
  CONSTRAINT `FK_Profile_Location_Account` FOREIGN KEY (`account_id`) REFERENCES `profiles` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `FK_Profile_Location_District` FOREIGN KEY (`location_id`) REFERENCES `districts` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4;

/*!40000 ALTER TABLE `profiles_locations` DISABLE KEYS */;

CREATE TABLE IF NOT EXISTS `provinces` (
  `id` int(11) NOT NULL,
  `name` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

/*!40000 ALTER TABLE `provinces` DISABLE KEYS */;

CREATE TABLE IF NOT EXISTS `themes` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(200) DEFAULT NULL,
  `image` varchar(200) DEFAULT NULL,
  `district_id` int(11) DEFAULT NULL,
  `status` tinyint(4) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`),
  KEY `FK_Theme_District` (`district_id`),
  CONSTRAINT `FK_Theme_District` FOREIGN KEY (`district_id`) REFERENCES `districts` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4;

/*!40000 ALTER TABLE `themes` DISABLE KEYS */;
INSERT INTO `themes` (`id`, `title`, `image`, `district_id`, `status`) VALUES
	(1, 'Quận 1', 'https://gig-app-upload.s3.ap-southeast-1.amazonaws.com/a860b922-d077-4190-9471-5316230b31a6-dog.jpg', 3440, 1),
	(2, 'Quận 2', 'https://gig-app-upload.s3.ap-southeast-1.amazonaws.com/381f9c5b-9963-4989-b61e-86fb6e7a735a-01.jpg', 1490, 1),
	(4, 'Quận 4', 'https://gig-app-upload.s3.ap-southeast-1.amazonaws.com/74103d86-5e49-4e48-ae71-5281c5f8c8ee-01.jpg', 1587, 1),
	(5, 'Quận 2', 'https://gig-app-upload.s3.ap-southeast-1.amazonaws.com/77c600ce-338b-4dc3-a105-9096831ca899-dog.jpg', 1587, 1),
	(6, 'Quận 7', 'https://gig-app-upload.s3.ap-southeast-1.amazonaws.com/99b57dd6-1b72-4bb4-a301-73a481e5b7b3-dog.jpg', 3440, 1);
/*!40000 ALTER TABLE `themes` ENABLE KEYS */;

CREATE TABLE IF NOT EXISTS `themes_posts` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `theme_id` int(11) DEFAULT NULL,
  `post_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`),
  KEY `FK_Theme_Post` (`theme_id`),
  KEY `FK_Post_Theme` (`post_id`),
  CONSTRAINT `FK_Post_Theme` FOREIGN KEY (`post_id`) REFERENCES `posts` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `FK_Theme_Post` FOREIGN KEY (`theme_id`) REFERENCES `themes` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4;

/*!40000 ALTER TABLE `themes_posts` DISABLE KEYS */;
INSERT INTO `themes_posts` (`id`, `theme_id`, `post_id`) VALUES
	(1, 1, 20),
	(2, 1, 21),
	(3, 1, 22),
	(4, 6, 20),
	(5, 6, 21),
	(6, 6, 22);
/*!40000 ALTER TABLE `themes_posts` ENABLE KEYS */;

/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
