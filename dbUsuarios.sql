-- MariaDB dump 10.18  Distrib 10.4.17-MariaDB, for Win64 (AMD64)
--
-- Host: localhost    Database: encuestas
-- ------------------------------------------------------
-- Server version	10.4.17-MariaDB

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
-- Table structure for table `encuesta`
--

DROP TABLE IF EXISTS `encuesta`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `encuesta` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(255) NOT NULL,
  `descripcion` varchar(255) NOT NULL,
  `img` varchar(255) DEFAULT NULL,
  `user_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `encuesta_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=28 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `encuesta`
--

LOCK TABLES `encuesta` WRITE;
/*!40000 ALTER TABLE `encuesta` DISABLE KEYS */;
INSERT INTO `encuesta` VALUES (1,'Mi encuesta de ajedrez','preguntaremos sobre variantes divertidas de ajedrez','http://127.0.0.1:5000/static/uploads/calculo.png',1),(5,'prueba','otravez','http://127.0.0.1:5000/static/uploads/Alcor-Mizar-620x381.jpg',1),(6,'una mas','una mas descripcion','http://127.0.0.1:5000/static/uploads/arania-arcoiris.jpg',2),(7,'test 1 ','descripcion del test 1','http://127.0.0.1:5000/static/uploads/Cara_Delevingne_by_Gage_Skidmore.jpg',1),(8,'ajedrez para ninos menores de 10 anios','en esta encuesta trataremos temas de ajedrez para ninos','http://127.0.0.1:5000/static/uploads/alexandra-kosteniuk-child.jpg',5),(10,'prueba de encuesta','esta encuesta es una prueba','http://127.0.0.1:5000/static/uploads/alexandra-kosteniuk-child.jpg',1),(12,'math','Conocimientos o habilidades basadas en el disenio','http://127.0.0.1:5000/static/uploads/77051339_p0.jpg',1),(13,'one more time','blah blahb blah ','http://127.0.0.1:5000/static/uploads/ajja.jpg',1),(14,'math','some description','http://127.0.0.1:5000/static/uploads/Alyssa-Carson-marte-marss.jpg',1),(15,'test2','descripcion del test 12','http://127.0.0.1:5000/static/uploads/alma.jpg',1),(16,'eliana','descripcion del test 1','http://127.0.0.1:5000/static/uploads/afgana.jpg',1),(17,'adsfasf','asdfsadf','http://127.0.0.1:5000/static/uploads/aguila.jpg',1),(18,'asdfsad','asdfsadf','http://127.0.0.1:5000/static/uploads/arta.png',1),(19,'one more time','dddd','http://127.0.0.1:5000/static/uploads/bebe_hamstern.jpg',1),(20,'none','none','http://127.0.0.1:5000/static/uploads/back.png',1),(21,'prueba','quiza si','http://127.0.0.1:5000/static/uploads/bukowski.jpg',1),(22,'title','tuesday','http://127.0.0.1:5000/static/uploads/bukowski.jpg',1),(23,'esta es la correcta','si que is','http://127.0.0.1:5000/static/uploads/brigitte_bardot_sentada.jpg',1),(26,'prueba','prueba','http://127.0.0.1:5000/static/uploads/aguila.jpg',2),(27,'esta bien','parece','http://127.0.0.1:5000/static/uploads/baikal-sen.jpg',2);
/*!40000 ALTER TABLE `encuesta` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `opcion`
--

DROP TABLE IF EXISTS `opcion`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `opcion` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `descripcion` varchar(255) NOT NULL,
  `id_pregunta` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `id_pregunta` (`id_pregunta`),
  CONSTRAINT `opcion_ibfk_1` FOREIGN KEY (`id_pregunta`) REFERENCES `pregunta` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `opcion`
--

LOCK TABLES `opcion` WRITE;
/*!40000 ALTER TABLE `opcion` DISABLE KEYS */;
INSERT INTO `opcion` VALUES (1,'c) el ataque loco',1),(2,'a) el ataque loco2',1),(3,'b) ninguna de las anteriores',1),(5,'a) 1992',9),(6,'b) 1512',9),(7,'12 octubre 1492',9);
/*!40000 ALTER TABLE `opcion` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `pregunta`
--

DROP TABLE IF EXISTS `pregunta`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `pregunta` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `pregunta` varchar(255) NOT NULL,
  `id_seccion` int(11) DEFAULT NULL,
  `id_tipo_pregunta` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `id_seccion` (`id_seccion`),
  KEY `id_tipo_pregunta` (`id_tipo_pregunta`),
  CONSTRAINT `pregunta_ibfk_1` FOREIGN KEY (`id_seccion`) REFERENCES `seccion` (`id`),
  CONSTRAINT `pregunta_ibfk_2` FOREIGN KEY (`id_tipo_pregunta`) REFERENCES `tipo_pregunta` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `pregunta`
--

LOCK TABLES `pregunta` WRITE;
/*!40000 ALTER TABLE `pregunta` DISABLE KEYS */;
INSERT INTO `pregunta` VALUES (1,'update32',1,2),(2,'otra pregunta?',1,3),(3,'que hacer ahora?',1,1),(4,'one more timed',1,2),(6,'pregunta de oro',1,1),(9,'fecha de el descubrimiento de america?',1,2);
/*!40000 ALTER TABLE `pregunta` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `pregunta_respuesta`
--

DROP TABLE IF EXISTS `pregunta_respuesta`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `pregunta_respuesta` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `respuesta` varchar(255) NOT NULL,
  `id_pregunta` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `id_pregunta` (`id_pregunta`),
  CONSTRAINT `pregunta_respuesta_ibfk_1` FOREIGN KEY (`id_pregunta`) REFERENCES `pregunta` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `pregunta_respuesta`
--

LOCK TABLES `pregunta_respuesta` WRITE;
/*!40000 ALTER TABLE `pregunta_respuesta` DISABLE KEYS */;
INSERT INTO `pregunta_respuesta` VALUES (2,'a) otra opcion',1),(3,'a) otra opcion',2);
/*!40000 ALTER TABLE `pregunta_respuesta` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `seccion`
--

DROP TABLE IF EXISTS `seccion`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `seccion` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(255) NOT NULL,
  `id_encuesta` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `id_encuesta` (`id_encuesta`),
  CONSTRAINT `seccion_ibfk_1` FOREIGN KEY (`id_encuesta`) REFERENCES `encuesta` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `seccion`
--

LOCK TABLES `seccion` WRITE;
/*!40000 ALTER TABLE `seccion` DISABLE KEYS */;
INSERT INTO `seccion` VALUES (1,'el hipocampo',1),(4,'conclusiones',1),(5,'asimov',1),(6,'fron the top',1),(8,'modelos',7),(9,'modelamientos',7),(10,'una mas',7),(11,'conclusiones',7),(12,'nueva seccion ',5),(13,'flash',1),(14,'historia del ajedrez',8),(16,'otra',1);
/*!40000 ALTER TABLE `seccion` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tipo_pregunta`
--

DROP TABLE IF EXISTS `tipo_pregunta`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tipo_pregunta` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tipo_pregunta`
--

LOCK TABLES `tipo_pregunta` WRITE;
/*!40000 ALTER TABLE `tipo_pregunta` DISABLE KEYS */;
INSERT INTO `tipo_pregunta` VALUES (1,'Multiples respuestas'),(2,'Respuesta unica'),(3,'Respuesta abierta');
/*!40000 ALTER TABLE `tipo_pregunta` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `contrasenia` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (1,'eliana','eliana@gmail.com','591676011ae01aae221c6c4d80899318c2f529dd'),(2,'maria','maria@gmail.com','e21fc56c1a272b630e0d1439079d0598cf8b8329'),(3,'ariana','ariana@gmail.com','1833852f924c391bf756bebf0a355bc55ef9a483'),(4,'carmela','carmela@gmail.com','5e17213a1272680ab06db673beaf4c3da66d4a2e'),(5,'sara','sara@gmail.com','dea04453c249149b5fc772d9528fe61afaf7441c');
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2021-10-18 20:14:04
