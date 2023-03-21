-- --------------------------------------------------------
-- Host:                         127.0.0.1
-- Server version:               10.4.24-MariaDB - mariadb.org binary distribution
-- Server OS:                    Win64
-- HeidiSQL Version:             12.1.0.6537
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

-- Dumping structure for table ccitub_api.foro_messages
CREATE TABLE IF NOT EXISTS `foro_messages` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username_id` int(11) NOT NULL DEFAULT 0,
  `message` varchar(10000) NOT NULL DEFAULT '0',
  `id_subgroup` int(11) NOT NULL DEFAULT 0,
  `time` varchar(100) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_foro_messages_user_accounts` (`username_id`),
  KEY `FK_foro_messages_groups_secundary` (`id_subgroup`),
  CONSTRAINT `FK_foro_messages_groups_secundary` FOREIGN KEY (`id_subgroup`) REFERENCES `groups_secundary` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `FK_foro_messages_user_accounts` FOREIGN KEY (`username_id`) REFERENCES `user_accounts` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf16;

-- Dumping data for table ccitub_api.foro_messages: ~6 rows (approximately)
INSERT INTO `foro_messages` (`id`, `username_id`, `message`, `id_subgroup`, `time`) VALUES
	(1, 24, 'Hola', 4, '2023-03-08 11:33:19'),
	(2, 24, 'que tal?¿', 4, '2023-03-08 11:33:24'),
	(3, 25, 'papure', 4, '2023-03-08 11:33:48'),
	(5, 22, 'JAJAJAJAJA TENGO PODER', 4, '2023-03-08 11:58:07'),
	(6, 24, 'pene', 4, '2023-03-09 09:30:44'),
	(7, 22, 'xdddddddd', 4, '2023-03-09 11:18:54');

-- Dumping structure for table ccitub_api.groups_primary
CREATE TABLE IF NOT EXISTS `groups_primary` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `id_tutor` int(11) DEFAULT NULL,
  `label` varchar(255) COLLATE armscii8_bin DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK__user_accounts` (`id_tutor`),
  CONSTRAINT `FK__user_accounts` FOREIGN KEY (`id_tutor`) REFERENCES `user_accounts` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=armscii8 COLLATE=armscii8_bin;

-- Dumping data for table ccitub_api.groups_primary: ~5 rows (approximately)
INSERT INTO `groups_primary` (`id`, `id_tutor`, `label`) VALUES
	(1, 5, '1'),
	(2, 7, 'Gripo 2'),
	(3, 5, 'Grupo 3'),
	(4, 14, 'Grupo2'),
	(5, 12, 'test5'),
	(6, 18, 'test6'),
	(8, 19, 'test7');

-- Dumping structure for table ccitub_api.groups_secundary
CREATE TABLE IF NOT EXISTS `groups_secundary` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `id_primary` int(11) DEFAULT NULL,
  `label` varchar(50) COLLATE armscii8_bin DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `id` (`id_primary`) USING BTREE,
  CONSTRAINT `FK__groups_primary` FOREIGN KEY (`id_primary`) REFERENCES `groups_primary` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=armscii8 COLLATE=armscii8_bin;

-- Dumping data for table ccitub_api.groups_secundary: ~5 rows (approximately)
INSERT INTO `groups_secundary` (`id`, `id_primary`, `label`) VALUES
	(1, 1, '1'),
	(2, 1, '2'),
	(3, 2, 'sub group 1 G2'),
	(4, 4, 'subgrupo g2'),
	(5, 4, 'test2g2'),
	(6, 4, 'test subgrupo 3');

-- Dumping structure for table ccitub_api.quest
CREATE TABLE IF NOT EXISTS `quest` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `label` varchar(255) DEFAULT NULL,
  `description` varchar(10000) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf16;

-- Dumping data for table ccitub_api.quest: ~2 rows (approximately)
INSERT INTO `quest` (`id`, `label`, `description`) VALUES
	(1, 'Test', 'Hola buenas tardes'),
	(2, 'Test2', 'Gancha ipa');

-- Dumping structure for table ccitub_api.quest_activity
CREATE TABLE IF NOT EXISTS `quest_activity` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(100) NOT NULL DEFAULT '0',
  `description` varchar(1000) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf16;

-- Dumping data for table ccitub_api.quest_activity: ~10 rows (approximately)
INSERT INTO `quest_activity` (`id`, `title`, `description`) VALUES
	(1, 'Hola', 'Mandar 5 holas'),
	(2, 'Hola1', 'Mandar 5 holas'),
	(3, '2', 'Mandar 5 holas'),
	(4, '321', 'Mandar 5 holas'),
	(5, '31231', 'Mandar 5 holas'),
	(6, 'dsaf', 'Mandar 5 holas'),
	(7, 'Holfsaa', 'Mandar 5 holas'),
	(8, 'nyth', 'Mandar 5 holas'),
	(9, 'hywew', 'Mandar 5 holas'),
	(10, 'hyehhbb', 'Mandar 5 holas');

-- Dumping structure for table ccitub_api.quest_activity_status
CREATE TABLE IF NOT EXISTS `quest_activity_status` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `id_quest` int(11) DEFAULT 0,
  `id_subgroup` int(11) DEFAULT 0,
  `id activity` int(11) DEFAULT NULL,
  `status` int(11) DEFAULT 1,
  PRIMARY KEY (`id`),
  KEY `FK_quest_activity_status_quest_activity` (`id_quest`),
  KEY `FK_quest_activity_status_groups_secundary` (`id_subgroup`),
  KEY `FK_quest_activity_status_quest` (`id activity`),
  CONSTRAINT `FK_quest_activity_status_groups_secundary` FOREIGN KEY (`id_subgroup`) REFERENCES `groups_secundary` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `FK_quest_activity_status_quest` FOREIGN KEY (`id activity`) REFERENCES `quest` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `FK_quest_activity_status_quest_activity` FOREIGN KEY (`id_quest`) REFERENCES `quest_activity` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf16;

-- Dumping data for table ccitub_api.quest_activity_status: ~10 rows (approximately)
INSERT INTO `quest_activity_status` (`id`, `id_quest`, `id_subgroup`, `id activity`, `status`) VALUES
	(2, 1, 4, 1, 1),
	(3, 2, 4, 1, 1),
	(4, 3, 4, 1, 1),
	(5, 4, 4, 2, 1),
	(6, 5, 4, 2, 1),
	(7, 6, 4, 1, 1),
	(8, 7, 4, 2, 1),
	(9, 8, 4, 1, 1),
	(10, 9, 4, 1, 1),
	(11, 10, 4, 1, 1);

-- Dumping structure for table ccitub_api.quest_groups
CREATE TABLE IF NOT EXISTS `quest_groups` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `id_group` int(11) DEFAULT NULL,
  `id_quest` int(11) DEFAULT NULL,
  `status` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_quest_user_user_accounts` (`id_group`) USING BTREE,
  KEY `FK_quest_user_quest_activitis` (`id_quest`),
  CONSTRAINT `FK_quest_user_groups_primary` FOREIGN KEY (`id_group`) REFERENCES `groups_primary` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `FK_quest_user_quest_activitis` FOREIGN KEY (`id_quest`) REFERENCES `quest` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf16;

-- Dumping data for table ccitub_api.quest_groups: ~0 rows (approximately)
INSERT INTO `quest_groups` (`id`, `id_group`, `id_quest`, `status`) VALUES
	(1, 3, 1, 0),
	(2, 4, 1, 1),
	(3, 4, 2, 1);

-- Dumping structure for table ccitub_api.user_accounts
CREATE TABLE IF NOT EXISTS `user_accounts` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE armscii8_bin NOT NULL,
  `lastname` varchar(255) COLLATE armscii8_bin NOT NULL,
  `password` varchar(255) COLLATE armscii8_bin NOT NULL,
  `email` varchar(255) COLLATE armscii8_bin NOT NULL,
  `role` int(11) NOT NULL DEFAULT 4,
  `group` int(11) DEFAULT NULL,
  `subgroup` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_user_accounts_user_type` (`role`),
  KEY `FK_user_accounts_groups_primary` (`group`),
  KEY `FK_user_accounts_groups_secundary` (`subgroup`),
  CONSTRAINT `FK_user_accounts_groups_primary` FOREIGN KEY (`group`) REFERENCES `groups_primary` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `FK_user_accounts_groups_secundary` FOREIGN KEY (`subgroup`) REFERENCES `groups_secundary` (`id_primary`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `FK_user_accounts_user_type` FOREIGN KEY (`role`) REFERENCES `user_type` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=33 DEFAULT CHARSET=armscii8 COLLATE=armscii8_bin;

-- Dumping data for table ccitub_api.user_accounts: ~21 rows (approximately)
INSERT INTO `user_accounts` (`id`, `name`, `lastname`, `password`, `email`, `role`, `group`, `subgroup`) VALUES
	(4, 'admin', 'admin', 'admin', 'admin@gmail.com', 1, NULL, NULL),
	(5, 'Tutor', 'tutor', 'tutor', 'tutor@gmail.com', 2, NULL, NULL),
	(6, 'profesor', 'profesor', 'profesor', 'profesor@gmail.com', 3, 1, 1),
	(7, 'Tetravol', 'Tetravol', 'f9t79X', 'tetravolgithub@gmail.com', 1, 1, 1),
	(12, 'nuevotutor', 'jajaja', '48sFpM', 'a@a.com', 2, 1, NULL),
	(13, 'Tetravol', 'Tetravol', 'BQVIr0', 'admin@gmail.com', 1, 1, NULL),
	(14, 'tutor2', 'tutor', 'tutor2', 'tutor2@tutor2.com', 2, 4, NULL),
	(18, 'tutor3', 'test3', '43xdsG', 'tutor3@tutor3.com', 2, 6, NULL),
	(19, 'tutor4', 'test5', 'SYy0S2', 'tutor4@tutor4.com', 2, 8, NULL),
	(20, 'profe44', 'grupo4', 'zBJTYB', 'profe44@profe44.com', 3, 4, NULL),
	(22, 'profe55', 'subg', 'profe55', 'profe55@profe55.com', 3, 4, 4),
	(23, 'estudianteg4', 'eeee', 'iGIM6r', 'estudianteg4@estudianteg4.com', 4, 4, 4),
	(24, 'Nombre 1', 'Apellido 1', 'nombre1', 'correo1@correo1.com', 4, 4, 4),
	(25, 'Nombre 2', 'Apellido 2', 'Rh4nzY', 'correo2@correo2.com', 4, 4, 4),
	(26, 'Nombre 3', 'Apellido 3', 'GsKM3A', 'correo3@correo3.com', 4, 4, 4),
	(27, 'Nombre 4', 'Apellido 4', 'qe8e1M', 'correo4@correo4.com', 4, 4, 4),
	(28, 'Nombre 6', 'Apellido 6', 'LOTTKy', 'correo6@correo6.com', 4, 4, 4),
	(29, 'Nombre 5', 'Apellido 5', 'ikpJ5h', 'correo5@correo5.com', 4, 4, 4),
	(30, 'Nombre 7', 'Apellido 7', 'T72i1w', 'correo7@correo7.com', 4, 4, 4),
	(31, 'Nombre 8', 'Apellido 8', 'pebqUn', 'correo8@correo8.com', 4, 4, 4),
	(32, 'Nombre 9', 'Apellido 9', 'Jgxcwf', 'correo9@correo9.com', 4, 4, 4);

-- Dumping structure for table ccitub_api.user_levels
CREATE TABLE IF NOT EXISTS `user_levels` (
  `id` int(11) DEFAULT NULL,
  `level_1` int(11) DEFAULT 1,
  `level_2` int(11) DEFAULT 0,
  `level_3` int(11) DEFAULT 0,
  KEY `id_user` (`id`) USING BTREE,
  CONSTRAINT `FK_user_levels_user_accounts` FOREIGN KEY (`id`) REFERENCES `user_accounts` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf16;

-- Dumping data for table ccitub_api.user_levels: ~4 rows (approximately)
INSERT INTO `user_levels` (`id`, `level_1`, `level_2`, `level_3`) VALUES
	(4, 1, 0, 1),
	(14, 1, 0, 0),
	(22, 1, 0, 0),
	(24, 1, 0, 0);

-- Dumping structure for table ccitub_api.user_type
CREATE TABLE IF NOT EXISTS `user_type` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `label` varchar(255) COLLATE armscii8_bin DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=armscii8 COLLATE=armscii8_bin;

-- Dumping data for table ccitub_api.user_type: ~4 rows (approximately)
INSERT INTO `user_type` (`id`, `label`) VALUES
	(1, 'Admin'),
	(2, 'Tutor'),
	(3, 'Profesor'),
	(4, 'Estudiante');

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
