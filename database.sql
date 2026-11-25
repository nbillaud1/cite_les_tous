-- MySQL dump 10.13  Distrib 9.1.0, for Win64 (x86_64)
--
-- Host: localhost    Database: cite_les_tous
-- ------------------------------------------------------
-- Server version	9.1.0

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
-- Current Database: `cite_les_tous`
--

CREATE DATABASE /*!32312 IF NOT EXISTS*/ `cite_les_tous` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;

USE `cite_les_tous`;

--
-- Table structure for table `jeux`
--

DROP TABLE IF EXISTS `jeux`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `jeux` (
  `idJeux` int NOT NULL AUTO_INCREMENT,
  `nom` varchar(255) NOT NULL,
  PRIMARY KEY (`idJeux`)
) ENGINE=MyISAM AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `jeux`
--

LOCK TABLES `jeux` WRITE;
/*!40000 ALTER TABLE `jeux` DISABLE KEYS */;
INSERT INTO `jeux` VALUES (1,'SSB');
/*!40000 ALTER TABLE `jeux` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `persos`
--

DROP TABLE IF EXISTS `persos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `persos` (
  `idPerso` int NOT NULL AUTO_INCREMENT,
  `idJeux` int NOT NULL,
  `nom` varchar(100) NOT NULL,
  `alias` varchar(255) NOT NULL DEFAULT '',
  `image` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`idPerso`),
  KEY `idJeux` (`idJeux`)
) ENGINE=MyISAM AUTO_INCREMENT=87 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `persos`
--

LOCK TABLES `persos` WRITE;
/*!40000 ALTER TABLE `persos` DISABLE KEYS */;
INSERT INTO `persos` VALUES (1,1,'Amphinobi','Greninja','amphinobi.png'),(2,1,'Banjo et Kazooie','Banjo|Banjo and Kazooie','banjo_et_kazooie.png'),(3,1,'Bayonetta','Bayo','bayonetta.png'),(4,1,'Bowser','','bowser.png'),(5,1,'Bowser Jr','Bowser Junior|BJR','bowser_jr.png'),(6,1,'Boxeur Mii','Mii Brawler|Brawler','boxeur_mii.png'),(7,1,'Byleth','','byleth.png'),(8,1,'Captain Falcon','Falcon|CF','captain_falcon.png'),(9,1,'Chrom','','chrom.png'),(10,1,'Cloud','','cloud.png'),(11,1,'Corrin','Kamui','corrin.png'),(12,1,'Daisy','','daisy.png'),(13,1,'Daraen','Robin','daraen.png'),(14,1,'Diddy Kong','Diddy','diddy_kong.png'),(15,1,'Donkey Kong','DK','donkey_kong.png'),(16,1,'Dr. Mario','Doc|Docteur Mario|Doctor Mario','dr_mario.png'),(17,1,'Dresseur Pokémon','Pokemon Trainer|PT|Dresseuse Pokémon','dresseur_pokemon.png'),(18,1,'Duo Duck Hunt','Duck Hunt|Duck Hunt Duo|DHD','duo_duck_hunt.png'),(19,1,'Entraîneuse Wii Fit','Wii Fit Trainer|Wii Fit|WFT','entraineuse_wii_fit.png'),(20,1,'Épéiste Mii','Mii Swordfighter|Swordfighter|Épéiste','epeiste_mii.png'),(21,1,'Falco','','falco.png'),(22,1,'Félinferno','Incineroar|Incin','felinferno.png'),(23,1,'Fox','','fox.png'),(24,1,'Ganondorf','Ganon','ganondorf.png'),(25,1,'Harmonie et Luma','Rosalina|Rosalina and Luma|Harmonie|Rosa','harmonie_et_luma'),(26,1,'Héros','Hero','heros.png'),(27,1,'Ice Climbers','Ice Climber|IC|ICs','ice_climbers.png'),(28,1,'Ike','','ike.png'),(29,1,'Inkling','','inkling.png'),(30,1,'Joker','','joker.png'),(31,1,'Kazuya','','kazuya.png'),(32,1,'Ken','','ken.png'),(33,1,'King K. Rool','K. Rool|KKR','king_k_rool.png'),(34,1,'Kirby','','kirby.png'),(35,1,'Link','','link.png'),(36,1,'Link cartoon','Toon Link|TL','link_cartoon.png'),(37,1,'Link enfant','Young Link|YL','link_enfant.png'),(38,1,'Little Mac','Mac|LM','little_mac.png'),(39,1,'Lucario','','lucario.png'),(40,1,'Lucas','','lucas.png'),(41,1,'Lucina','','lucina.png'),(42,1,'Luigi','','luigi.png'),(43,1,'Marie','Isabelle','marie.png'),(44,1,'Mario','','mario.png'),(45,1,'Marth','','marth.png'),(46,1,'Mega Man','','mega_man.png'),(47,1,'Meta Knight','MK','meta_knight.png'),(48,1,'Mewtwo','','mewtwo.png'),(49,1,'Min Min','','min_min.png'),(50,1,'Mr. Game & Watch','Game and Watch|G&W|GW|GnW','mr_game_watch.png'),(51,1,'Ness','','ness.png'),(52,1,'Olimar','Alph','olimar.png'),(53,1,'Pac-Man','','pac_man.png'),(54,1,'Palutena','Palu','palutena.png'),(55,1,'Peach','','peach.png'),(56,1,'Pichu','','pichu.png'),(57,1,'Pikachu','Pika','pikachu.png'),(58,1,'Pit','','pit.png'),(59,1,'Pit maléfique','Dark Pit','pit_malefique.png'),(60,1,'Plante Piranha','Piranha Plant|PP','plante_piranha.png'),(61,1,'Pyra et Mythra','Pyra|Mythra|Aegis|Homura|Hikari','pyra_et_mythra.png'),(62,1,'Richter','','richter.png'),(63,1,'Ridley','','ridley.png'),(64,1,'ROB','Robot','rob.png'),(65,1,'Roi Dadidou','King Dedede|King DDD|DDD|Dedede|Roi DDD','roi_dadidou.png'),(66,1,'Rondoudou','Jigglypuff|Puff|Jiggly','rondoudou.png'),(67,1,'Roy','','roy.png'),(68,1,'Ryu','','ryu.png'),(69,1,'Samus','','samus.png'),(70,1,'Samus sans armure','Zero Suit Samus|ZSS|Zero Suit','samus_sans_armure.png'),(71,1,'Samus sombre','Dark Samus','samus_sombre.png'),(72,1,'Sephiroth','Seph','sephiroth.png'),(73,1,'Sheik','','sheik.png'),(74,1,'Shulk','','shulk.png'),(75,1,'Simon','','simon.png'),(76,1,'Snake','','snake.png'),(77,1,'Sonic','','sonic.png'),(78,1,'Sora','','sora.png'),(79,1,'Steve','Alex','steve.png'),(80,1,'Terry','','terry.png'),(81,1,'Tireur Mii','Mii Gunner|Gunner','tireur_mii.png'),(82,1,'Villageois','Villager|Villageoise','villageois.png'),(83,1,'Wario','','wario.png'),(84,1,'Wolf','','wolf.png'),(85,1,'Yoshi','','yoshi.png'),(86,1,'Zelda','','zelda.png');
/*!40000 ALTER TABLE `persos` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed
