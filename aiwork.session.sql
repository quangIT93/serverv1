| posts | CREATE TABLE `posts` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `account_id` varchar(50) DEFAULT NULL,
  `title` varchar(100) DEFAULT NULL,
  `company_name` varchar(100) DEFAULT NULL,
  `address` varchar(255) DEFAULT NULL,
  `latitude` decimal(8,6) DEFAULT NULL,
  `longitude` decimal(9,6) DEFAULT NULL,
  `ward_id` varchar(20) DEFAULT NULL,
  `is_date_period` tinyint(4) DEFAULT 0,
  `start_date` varchar(20) DEFAULT NULL,
  `end_date` varchar(20) DEFAULT NULL,
  `start_time` varchar(20) DEFAULT NULL,
  `end_time` varchar(20) DEFAULT NULL,
  `is_working_weekend` tinyint(4) DEFAULT 0,
  `is_remotely` enum('0','1') NOT NULL DEFAULT '0',
  `salary_min` double NOT NULL DEFAULT 0,
  `salary_max` double NOT NULL DEFAULT 0,
  `salary_type` int(11) DEFAULT NULL,
  `money_type` enum('1','2') NOT NULL DEFAULT '1' COMMENT '1: VND 2: USD',
  `description` varchar(4000) DEFAULT NULL,
  `phone_contact` varchar(15) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `site_url` varchar(255) DEFAULT NULL,
  `status` tinyint(4) DEFAULT 0,
  `is_inhouse_data` enum('0','1') DEFAULT '0',
  `created_at` datetime DEFAULT current_timestamp(),
  `updated_at` datetime DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`),
  KEY `FK_Post_Profile` (`account_id`),
  KEY `posts_fk_salary_type` (`salary_type`),
  KEY `FK_Posts_Ward` (`ward_id`),
  FULLTEXT KEY `fts_index` (`title`,`company_name`),
  CONSTRAINT `FK_Post_Account` FOREIGN KEY (`account_id`) REFERENCES `accounts` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `FK_Posts_Ward` FOREIGN KEY (`ward_id`) REFERENCES `wards` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `posts_fk_salary_type` FOREIGN KEY (`salary_type`) REFERENCES `salary_types` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=11682 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci |



| post_resource | CREATE TABLE `post_resource` (
  `post_id` int(11) NOT NULL,
  `url` varchar(255) NOT NULL DEFAULT 'https://neoworks.vn',
  `company` tinyint(4) NOT NULL DEFAULT 1,
  PRIMARY KEY (`post_id`),
  KEY `FK_Resource_Company` (`company`),
  CONSTRAINT `FK_Post_Reource` FOREIGN KEY (`post_id`) REFERENCES `posts` (`id`) ON DELETE CASCADE,
  CONSTRAINT `FK_Resource_Company` FOREIGN KEY (`company`) REFERENCES `company_resource` (`id`) ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci |


| company_resource | CREATE TABLE `company_resource` (
  `id` tinyint(4) NOT NULL AUTO_INCREMENT,
  `name` varchar(50) DEFAULT 'Other',
  `icon` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci |
