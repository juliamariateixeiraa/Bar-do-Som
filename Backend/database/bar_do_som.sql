CREATE DATABASE  IF NOT EXISTS `bar_do_som` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `bar_do_som`;
-- MySQL dump 10.13  Distrib 8.0.14, for Win64 (x86_64)
--
-- Host: localhost    Database: bar_do_som
-- ------------------------------------------------------
-- Server version	8.0.43

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
 SET NAMES utf8 ;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `banda_artista`
--

DROP TABLE IF EXISTS `banda_artista`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `banda_artista` (
  `id_banda` int NOT NULL AUTO_INCREMENT,
  `nome` varchar(100) NOT NULL,
  `estilo` varchar(50) DEFAULT NULL,
  `integrantes` int DEFAULT NULL,
  `tipo` enum('Banda','Artista Solo') NOT NULL,
  PRIMARY KEY (`id_banda`),
  CONSTRAINT `banda_artista_chk_1` CHECK ((`integrantes` >= 1))
) ENGINE=InnoDB AUTO_INCREMENT=41 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `banda_artista`
--

LOCK TABLES `banda_artista` WRITE;
/*!40000 ALTER TABLE `banda_artista` DISABLE KEYS */;
INSERT INTO `banda_artista` VALUES (1,'Legião Urbana Cover','Rock',4,'Banda'),(2,'João Bosco','MPB',1,'Artista Solo'),(3,'Samba da Lapa','Samba',6,'Banda'),(4,'Blues Brothers Brasil','Blues',5,'Banda'),(5,'Marina Lima','Pop Rock',1,'Artista Solo'),(6,'Os Mutantes Cover','Rock Psicodélico',3,'Banda'),(7,'Djavan Acústico','MPB',1,'Artista Solo'),(8,'Raul Seixas Tributo','Rock',4,'Banda'),(9,'Tom Jobim Experience','Jazz',5,'Banda'),(10,'Rock n Roll All Stars','Rock Clássico',6,'Banda'),(11,'Charlie Brown Jr Cover','Rock',4,'Banda'),(12,'Maria Rita','Samba',1,'Artista Solo'),(13,'Skank Tributo','Pop Rock',4,'Banda'),(14,'Toni Garrido','Reggae',1,'Artista Solo'),(15,'Mamonas Assassinas Cover','Rock Cômico',5,'Banda'),(16,'Tim Maia Cover','Soul',7,'Banda'),(17,'Alceu Valença','Forró',1,'Artista Solo'),(18,'System of a Down Cover','Rock Pesado',4,'Banda'),(19,'Dj Khaled','Hip Hop',1,'Artista Solo'),(20,'Cazuza Tributo','Rock',3,'Banda'),(21,'Festa da Bossa Nova','Bossa Nova',2,'Banda'),(22,'Pitty','Rock',1,'Artista Solo'),(23,'Capital Inicial Cover','Rock',4,'Banda'),(24,'Zé Ramalho','Folk',1,'Artista Solo'),(25,'Titãs Tributo','Rock',4,'Banda'),(26,'Banda do Mar Cover','Indie',3,'Banda'),(27,'O Rappa Tributo','Rock',5,'Banda'),(28,'Rita Lee Cover','Rock',4,'Banda'),(29,'Barão Vermelho Cover','Rock',4,'Banda'),(30,'Caetano Veloso','MPB',1,'Artista Solo'),(31,'Chico Buarque','MPB',1,'Artista Solo'),(32,'Gilberto Gil','MPB',1,'Artista Solo'),(33,'Mutantes do Sertão','Forró',3,'Banda'),(34,'Marisa Monte','MPB',1,'Artista Solo'),(35,'Seu Jorge','Samba',1,'Artista Solo'),(36,'Jorge Ben Jor','Samba',1,'Artista Solo'),(37,'Tribalistas Tributo','MPB',3,'Banda'),(38,'Roupa Nova Cover','Pop',5,'Banda'),(39,'Dj Alok','Eletrônica',1,'Artista Solo'),(40,'Jota Quest Cover','Pop Rock',5,'Banda');
/*!40000 ALTER TABLE `banda_artista` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `clientes`
--

DROP TABLE IF EXISTS `clientes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `clientes` (
  `id_cliente` int NOT NULL AUTO_INCREMENT,
  `nome` varchar(100) NOT NULL,
  `email` varchar(100) DEFAULT NULL,
  `data_nascimento` date DEFAULT NULL,
  `telefone` varchar(15) DEFAULT NULL,
  PRIMARY KEY (`id_cliente`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=85 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `clientes`
--

LOCK TABLES `clientes` WRITE;
/*!40000 ALTER TABLE `clientes` DISABLE KEYS */;
INSERT INTO `clientes` VALUES (1,'Carlos Oliveira','carlos.oliveira@gmail.com','1982-07-18','11987651234'),(2,'Fernanda Lima','fernanda.lima@gmail.com','1995-12-05','21981234567'),(3,'Paulo Almeida','paulo.almeida@gmail.com','1978-01-20','11999887766'),(4,'Juliana Ribeiro','juliana.ribeiro@gmail.com','1992-08-30','21998765432'),(5,'Ricardo Ferreira','ricardo.ferreira@gmail.com','1988-05-14','11991234567'),(6,'Carla Martins','carla.martins@gmail.com','1999-03-03','21987654321'),(7,'Rafael Souza','rafael.souza@gmail.com','1991-06-22','11992345678'),(8,'Amanda Rocha','amanda.rocha@gmail.com','1987-11-11','21987659876'),(9,'Lucas Gomes','lucas.gomes@gmail.com','1996-09-09','11988776655'),(10,'Patrícia Barbosa','patricia.barbosa@gmail.com','1983-02-28','21981239876'),(11,'Marcos Pinto','marcos.pinto@gmail.com','1990-04-16','11991239876'),(12,'Camila Dias','camila.dias@gmail.com','1997-12-21','21987651245'),(13,'Bruno Castro','bruno.castro@gmail.com','1985-07-07','11999881234'),(14,'Renata Moraes','renata.moraes@gmail.com','1993-01-30','21998761234'),(15,'Diego Carvalho','diego.carvalho@gmail.com','1989-10-05','11991234589'),(16,'Aline Teixeira','aline.teixeira@gmail.com','1994-06-12','21987651236'),(17,'Felipe Azevedo','felipe.azevedo@gmail.com','1986-03-25','11999876543'),(18,'Juliana Nunes','juliana.nunes@gmail.com','1998-09-18','21981234568'),(19,'Vinicius Santos','vinicius.santos@gmail.com','1992-12-01','11998765432'),(20,'Sabrina Lopes','sabrina.lopes@gmail.com','1991-05-09','21987659877'),(21,'Gustavo Fernandes','gustavo.fernandes@gmail.com','1984-11-23','11992345679'),(22,'Larissa Moreira','larissa.moreira@gmail.com','1990-08-02','21981239877'),(23,'Thiago Costa','thiago.costa@gmail.com','1987-01-15','11999881235'),(24,'Beatriz Santos','beatriz.santos@gmail.com','1995-03-19','21998761235'),(25,'Mateus Ribeiro','mateus.ribeiro@gmail.com','1993-07-07','11991234590'),(26,'Priscila Rocha','priscila.rocha@gmail.com','1988-12-28','21987651237'),(27,'Eduardo Lima','eduardo.lima@gmail.com','1996-09-14','11999876544'),(28,'Tatiana Oliveira','tatiana.oliveira@gmail.com','1990-04-11','21981234569'),(29,'André Martins','andre.martins@gmail.com','1985-06-20','11998765433'),(30,'Simone Castro','simone.castro@gmail.com','1992-11-17','21987659878'),(31,'Leandro Fernandes','leandro.fernandes@gmail.com','1989-08-29','11992345680'),(32,'Camila Santos','camila.santos@gmail.com','1997-05-05','21981239878'),(33,'Rodrigo Pinto','rodrigo.pinto@gmail.com','1994-02-02','11999881236'),(34,'Vanessa Teixeira','vanessa.teixeira@gmail.com','1986-12-12','21998761236'),(35,'Igor Almeida','igor.almeida@gmail.com','1991-09-09','11991234591'),(36,'Mariana Gomes','mariana.gomes@gmail.com','1983-03-23','21987651238'),(37,'Daniela Costa','daniela.costa@gmail.com','1995-07-14','11999876545'),(38,'Ricardo Azevedo','ricardo.azevedo@gmail.com','1988-01-10','21981234570'),(39,'Natália Moraes','natalia.moraes@gmail.com','1996-11-11','11998765434'),(40,'Felipe Souza','felipe.souza@gmail.com','1990-06-06','21987659879'),(41,'Gabriela Barbosa','gabriela.barbosa@gmail.com','1993-08-08','11992345681'),(42,'Rafael Dias','rafael.dias@gmail.com','1987-10-10','21981239879');
/*!40000 ALTER TABLE `clientes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `estoque`
--

DROP TABLE IF EXISTS `estoque`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `estoque` (
  `id_estoque` int NOT NULL AUTO_INCREMENT,
  `id_produto` int DEFAULT NULL,
  `quantidade` int DEFAULT '0',
  `data_registro` date NOT NULL,
  PRIMARY KEY (`id_estoque`),
  KEY `id_produto` (`id_produto`),
  CONSTRAINT `estoque_ibfk_1` FOREIGN KEY (`id_produto`) REFERENCES `produtos` (`id_produto`),
  CONSTRAINT `estoque_chk_1` CHECK ((`quantidade` >= 0))
) ENGINE=InnoDB AUTO_INCREMENT=81 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `estoque`
--

LOCK TABLES `estoque` WRITE;
/*!40000 ALTER TABLE `estoque` DISABLE KEYS */;
INSERT INTO `estoque` VALUES (41,1,50,'2025-01-01'),(42,2,120,'2025-01-02'),(43,3,80,'2025-01-03'),(44,4,200,'2025-01-04'),(45,5,95,'2025-01-05'),(46,6,60,'2025-01-06'),(47,7,140,'2025-01-07'),(48,8,100,'2025-01-08'),(49,9,75,'2025-01-09'),(50,10,180,'2025-01-10'),(51,11,110,'2025-01-11'),(52,12,90,'2025-01-12'),(53,13,160,'2025-01-13'),(54,14,70,'2025-01-14'),(55,15,130,'2025-01-15'),(56,16,85,'2025-01-16'),(57,17,150,'2025-01-17'),(58,18,95,'2025-01-18'),(59,19,170,'2025-01-19'),(60,20,60,'2025-01-20'),(61,21,190,'2025-01-21'),(62,22,75,'2025-01-22'),(63,23,120,'2025-01-23'),(64,24,100,'2025-01-24'),(65,25,135,'2025-01-25'),(66,26,65,'2025-01-26'),(67,27,145,'2025-01-27'),(68,28,105,'2025-01-28'),(69,29,80,'2025-01-29'),(70,30,160,'2025-01-30'),(71,31,115,'2025-01-31'),(72,32,90,'2025-02-01'),(73,33,175,'2025-02-02'),(74,34,70,'2025-02-03'),(75,35,155,'2025-02-04'),(76,36,85,'2025-02-05'),(77,37,140,'2025-02-06'),(78,38,95,'2025-02-07'),(79,39,185,'2025-02-08'),(80,40,100,'2025-02-09');
/*!40000 ALTER TABLE `estoque` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `eventos`
--

DROP TABLE IF EXISTS `eventos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `eventos` (
  `id_evento` int NOT NULL AUTO_INCREMENT,
  `nome` varchar(100) NOT NULL,
  `data` date NOT NULL,
  `hora` time NOT NULL,
  `valor_ingresso` decimal(10,2) DEFAULT '0.00',
  `publico_estimado` int DEFAULT '0',
  PRIMARY KEY (`id_evento`),
  CONSTRAINT `eventos_chk_1` CHECK ((`valor_ingresso` >= 0)),
  CONSTRAINT `eventos_chk_2` CHECK ((`publico_estimado` >= 0))
) ENGINE=InnoDB AUTO_INCREMENT=41 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `eventos`
--

LOCK TABLES `eventos` WRITE;
/*!40000 ALTER TABLE `eventos` DISABLE KEYS */;
INSERT INTO `eventos` VALUES (1,'Show de Rock','2024-09-20','21:00:00',50.00,200),(2,'Samba ao Vivo','2024-09-27','20:30:00',30.00,150),(3,'MPB Acústico','2024-10-05','19:00:00',40.00,100),(4,'Noite de Blues','2024-10-12','22:00:00',45.00,120),(5,'Festival de Jazz','2024-10-19','18:00:00',70.00,250),(6,'Karaokê e Pop Anos 80','2024-10-26','20:00:00',25.00,180),(7,'Forró e Sertanejo','2024-11-02','21:30:00',35.00,170),(8,'Tributo a Bandas de Rock Clássico','2024-11-09','21:00:00',55.00,210),(9,'Show de Pagode','2024-11-16','20:00:00',30.00,160),(10,'Sexta do Vinil e Reggae','2024-11-23','22:00:00',20.00,130),(11,'Stand-up Comedy','2024-11-30','20:30:00',40.00,90),(12,'Festa da Virada','2024-12-31','23:00:00',150.00,300),(13,'Rock Alternativo','2025-01-10','21:00:00',45.00,150),(14,'Samba de Raiz','2025-01-17','20:00:00',30.00,140),(15,'Indie Folk Night','2025-01-24','22:00:00',35.00,110),(16,'Noite do Hip Hop','2025-01-31','21:30:00',40.00,190),(17,'Aniversário do Bar','2025-02-07','19:00:00',60.00,280),(18,'Eletrônica Chill','2025-02-14','22:30:00',50.00,220),(19,'Pop Latino','2025-02-21','20:00:00',25.00,160),(20,'Rockabilly e Swing','2025-02-28','21:00:00',35.00,130),(21,'Noite de Poesia e Música','2025-03-07','19:30:00',20.00,80),(22,'Show de Bossa Nova','2025-03-14','20:00:00',40.00,90),(23,'Festa à Fantasia','2025-03-21','22:00:00',50.00,200),(24,'Tributo ao Reggae','2025-03-28','21:00:00',35.00,180),(25,'Cabaré Acústico','2025-04-04','20:30:00',45.00,110),(26,'Noite de Rock Pesado','2025-04-11','21:00:00',55.00,140),(27,'Sexta do Jazz Fusion','2025-04-18','22:00:00',60.00,100),(28,'Festival de Cerveja Artesanal','2025-04-25','17:00:00',25.00,250),(29,'Pé de Serra','2025-05-02','20:00:00',30.00,150),(30,'Música Clássica Bar','2025-05-09','19:00:00',50.00,80),(31,'Noite da Música Brasileira','2025-05-16','21:00:00',40.00,170),(32,'Roda de Samba','2025-05-23','19:30:00',25.00,130),(33,'Show de Artista Local','2025-05-30','20:00:00',30.00,100),(34,'Festa Junina','2025-06-06','18:00:00',40.00,200),(35,'Pop Punk Night','2025-06-13','21:00:00',45.00,150),(36,'Blues e Soul','2025-06-20','22:00:00',50.00,120),(37,'Karaokê e Funk','2025-06-27','21:30:00',25.00,160),(38,'Festa Anos 90','2025-07-04','22:00:00',35.00,190),(39,'Noite de Comédia Improvisada','2025-07-11','20:30:00',30.00,90),(40,'Show de Tributo a Beatles','2025-07-18','21:00:00',60.00,250);
/*!40000 ALTER TABLE `eventos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `funcionarios`
--

DROP TABLE IF EXISTS `funcionarios`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `funcionarios` (
  `id_funcionario` int NOT NULL AUTO_INCREMENT,
  `nome` varchar(100) NOT NULL,
  `cargo` varchar(50) NOT NULL,
  `telefone` varchar(15) DEFAULT NULL,
  `id_gerente` int DEFAULT NULL,
  PRIMARY KEY (`id_funcionario`),
  KEY `id_gerente` (`id_gerente`),
  CONSTRAINT `funcionarios_ibfk_1` FOREIGN KEY (`id_gerente`) REFERENCES `funcionarios` (`id_funcionario`) ON DELETE SET NULL
) ENGINE=InnoDB AUTO_INCREMENT=44 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `funcionarios`
--

LOCK TABLES `funcionarios` WRITE;
/*!40000 ALTER TABLE `funcionarios` DISABLE KEYS */;
INSERT INTO `funcionarios` VALUES (1,'Roberto Souza','Gerente','11977776666',NULL),(2,'Roberto Souza','Gerente','11977776666',NULL),(3,'Roberto Souza','Gerente','11977776666',NULL),(4,'Roberto Souza','Gerente','11977776666',NULL),(5,'Carlos Pereira','Garçom','11999998888',4),(6,'Fernanda Lima','Cozinheira','11988887777',4),(7,'Ana Oliveira','Garçom','11966665555',4),(8,'Pedro Santos','Barman','11955554444',4),(9,'Mariana Costa','Garçom','11944443333',4),(10,'João Silva','Cozinheiro','11933332222',4),(11,'Juliana Ribeiro','Garçom','11922221111',4),(12,'Rafael Fernandes','Barman','11911110000',4),(13,'Patrícia Almeida','Garçom','11900009999',4),(14,'Guilherme Martins','Cozinheiro','11899998888',4),(15,'Beatriz Nunes','Garçom','11888887777',4),(16,'Daniel Gomes','Garçom','11877776666',4),(17,'Leticia Barbosa','Cozinheira','11866665555',4),(18,'Fábio Rodrigues','Barman','11855554444',4),(19,'Amanda Silva','Garçom','11844443333',4),(20,'Thiago Oliveira','Cozinheiro','11833332222',4),(21,'Larissa Pereira','Garçom','11822221111',4),(22,'Lucas Fernandes','Barman','11811110000',4),(23,'Carla Souza','Garçom','11800009999',4),(24,'Gustavo Lima','Cozinheiro','11799998888',4),(25,'Camila Costa','Garçom','11788887777',4),(26,'Ricardo Santos','Garçom','11777776666',4),(27,'Vivian Mendes','Cozinheira','11766665555',4),(28,'André Almeida','Barman','11755554444',4),(29,'Isabela Ribeiro','Garçom','11744443333',4),(30,'Felipe Gonçalves','Cozinheiro','11733332222',4),(31,'Sofia Barbosa','Garçom','11722221111',4),(32,'Bruno Morais','Barman','11711110000',4),(33,'Gabriela Castro','Garçom','11700009999',4),(34,'Eduardo Martins','Cozinheiro','11699998888',4),(35,'Clara Nunes','Garçom','11688887777',4),(36,'Marcelo Gomes','Garçom','11677776666',4),(37,'Larissa Oliveira','Cozinheira','11666665555',4),(38,'Diego Rodrigues','Barman','11655554444',4),(39,'Carolina Souza','Garçom','11644443333',4),(40,'Thiago Lima','Cozinheiro','11633332222',4),(41,'Vanessa Costa','Garçom','11622221111',4),(42,'Matheus Santos','Barman','11611110000',4),(43,'Beatriz Pereira','Garçom','11600009999',4);
/*!40000 ALTER TABLE `funcionarios` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `mesas`
--

DROP TABLE IF EXISTS `mesas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `mesas` (
  `id_mesa` int NOT NULL AUTO_INCREMENT,
  `numero` int NOT NULL,
  `capacidade` int DEFAULT NULL,
  `status` varchar(20) DEFAULT 'disponivel',
  PRIMARY KEY (`id_mesa`),
  UNIQUE KEY `numero` (`numero`),
  CONSTRAINT `mesas_chk_1` CHECK ((`capacidade` > 0))
) ENGINE=InnoDB AUTO_INCREMENT=42 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `mesas`
--

LOCK TABLES `mesas` WRITE;
/*!40000 ALTER TABLE `mesas` DISABLE KEYS */;
INSERT INTO `mesas` VALUES (1,4,4,'disponivel'),(2,5,6,'ocupada'),(3,6,2,'reservada'),(4,7,4,'disponivel'),(5,8,6,'ocupada'),(6,9,2,'reservada'),(7,10,4,'disponivel'),(8,11,6,'ocupada'),(9,12,2,'reservada'),(10,13,4,'disponivel'),(11,14,6,'ocupada'),(12,15,2,'reservada'),(13,16,4,'disponivel'),(14,17,6,'ocupada'),(15,18,2,'reservada'),(16,19,4,'disponivel'),(17,20,6,'ocupada'),(18,21,2,'reservada'),(19,22,4,'disponivel'),(20,23,6,'ocupada'),(21,24,2,'reservada'),(22,25,4,'disponivel'),(23,26,6,'ocupada'),(24,27,2,'reservada'),(25,28,4,'disponivel'),(26,29,6,'ocupada'),(27,30,2,'reservada'),(28,31,4,'disponivel'),(29,32,6,'ocupada'),(30,33,2,'reservada'),(31,34,4,'disponivel'),(32,35,6,'ocupada'),(33,36,2,'reservada'),(34,37,4,'disponivel'),(35,38,6,'ocupada'),(36,39,2,'reservada'),(37,40,4,'disponivel'),(38,41,6,'ocupada'),(39,42,2,'reservada'),(40,43,4,'disponivel'),(41,44,6,'ocupada');
/*!40000 ALTER TABLE `mesas` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `participacao`
--

DROP TABLE IF EXISTS `participacao`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `participacao` (
  `id_participacao` int NOT NULL AUTO_INCREMENT,
  `funcao` varchar(50) DEFAULT NULL,
  `id_banda` int DEFAULT NULL,
  `id_evento` int DEFAULT NULL,
  PRIMARY KEY (`id_participacao`),
  KEY `id_banda` (`id_banda`),
  KEY `id_evento` (`id_evento`),
  CONSTRAINT `participacao_ibfk_1` FOREIGN KEY (`id_banda`) REFERENCES `banda_artista` (`id_banda`) ON DELETE CASCADE,
  CONSTRAINT `participacao_ibfk_2` FOREIGN KEY (`id_evento`) REFERENCES `eventos` (`id_evento`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=41 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `participacao`
--

LOCK TABLES `participacao` WRITE;
/*!40000 ALTER TABLE `participacao` DISABLE KEYS */;
INSERT INTO `participacao` VALUES (1,'principal',1,1),(2,'convidado',2,2),(3,'abertura',3,3),(4,'encerramento',4,4),(5,'principal',5,5),(6,'convidado',6,6),(7,'abertura',7,7),(8,'encerramento',8,8),(9,'principal',9,9),(10,'convidado',10,10),(11,'abertura',11,11),(12,'encerramento',12,12),(13,'principal',13,13),(14,'convidado',14,14),(15,'abertura',15,15),(16,'encerramento',16,16),(17,'principal',17,17),(18,'convidado',18,18),(19,'abertura',19,19),(20,'encerramento',20,20),(21,'principal',21,21),(22,'convidado',22,22),(23,'abertura',23,23),(24,'encerramento',24,24),(25,'principal',25,25),(26,'convidado',26,26),(27,'abertura',27,27),(28,'encerramento',28,28),(29,'principal',29,29),(30,'convidado',30,30),(31,'abertura',31,31),(32,'encerramento',32,32),(33,'principal',33,33),(34,'convidado',34,34),(35,'abertura',35,35),(36,'encerramento',36,36),(37,'principal',37,37),(38,'convidado',38,38),(39,'abertura',39,39),(40,'encerramento',40,40);
/*!40000 ALTER TABLE `participacao` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `pedido_produto`
--

DROP TABLE IF EXISTS `pedido_produto`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `pedido_produto` (
  `id_pedido` int NOT NULL,
  `id_produto` int NOT NULL,
  `quantidade` int DEFAULT '1',
  PRIMARY KEY (`id_pedido`,`id_produto`),
  KEY `id_produto` (`id_produto`),
  CONSTRAINT `pedido_produto_ibfk_1` FOREIGN KEY (`id_pedido`) REFERENCES `pedidos` (`id_pedido`) ON DELETE CASCADE,
  CONSTRAINT `pedido_produto_ibfk_2` FOREIGN KEY (`id_produto`) REFERENCES `produtos` (`id_produto`),
  CONSTRAINT `pedido_produto_chk_1` CHECK ((`quantidade` > 0))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `pedido_produto`
--

LOCK TABLES `pedido_produto` WRITE;
/*!40000 ALTER TABLE `pedido_produto` DISABLE KEYS */;
INSERT INTO `pedido_produto` VALUES (1,1,3),(1,4,1),(1,5,1),(2,2,5),(2,6,2),(2,8,2),(3,3,2),(3,4,1),(3,9,1),(4,1,4),(4,5,1),(4,7,1),(5,2,8),(5,6,3),(5,10,5),(6,3,3),(6,4,2),(7,1,5),(7,5,2),(7,8,3),(8,2,4),(8,6,2),(8,9,2);
/*!40000 ALTER TABLE `pedido_produto` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `pedidos`
--

DROP TABLE IF EXISTS `pedidos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `pedidos` (
  `id_pedido` int NOT NULL AUTO_INCREMENT,
  `data_hora` datetime NOT NULL,
  `total` decimal(10,2) DEFAULT '0.00',
  `status` varchar(20) DEFAULT 'em andamento',
  `id_cliente` int DEFAULT NULL,
  `id_mesa` int DEFAULT NULL,
  PRIMARY KEY (`id_pedido`),
  KEY `id_cliente` (`id_cliente`),
  KEY `id_mesa` (`id_mesa`),
  KEY `idx_pedidos_data_hora` (`data_hora`),
  CONSTRAINT `pedidos_ibfk_1` FOREIGN KEY (`id_cliente`) REFERENCES `clientes` (`id_cliente`),
  CONSTRAINT `pedidos_ibfk_2` FOREIGN KEY (`id_mesa`) REFERENCES `mesas` (`id_mesa`) ON UPDATE CASCADE,
  CONSTRAINT `pedidos_chk_1` CHECK ((`total` >= 0))
) ENGINE=InnoDB AUTO_INCREMENT=41 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `pedidos`
--

LOCK TABLES `pedidos` WRITE;
/*!40000 ALTER TABLE `pedidos` DISABLE KEYS */;
INSERT INTO `pedidos` VALUES (1,'2025-01-10 12:30:00',120.50,'concluído',1,3),(2,'2025-01-11 18:45:00',89.90,'concluído',2,5),(3,'2025-01-12 20:15:00',45.00,'em andamento',3,2),(4,'2025-01-13 13:20:00',150.75,'concluído',4,6),(5,'2025-01-14 19:40:00',230.00,'cancelado',5,1),(6,'2025-01-15 11:10:00',60.25,'concluído',6,7),(7,'2025-01-16 17:00:00',99.99,'em andamento',7,4),(8,'2025-01-17 14:50:00',75.60,'concluído',8,8),(9,'2025-01-18 21:05:00',180.00,'concluído',9,2),(10,'2025-01-19 12:00:00',55.30,'em andamento',10,5),(11,'2025-01-20 15:15:00',210.40,'concluído',11,9),(12,'2025-01-21 19:25:00',135.00,'cancelado',12,3),(13,'2025-01-22 20:00:00',90.70,'concluído',13,6),(14,'2025-01-23 13:30:00',45.90,'em andamento',14,1),(15,'2025-01-24 11:45:00',160.00,'concluído',15,10),(16,'2025-01-25 18:10:00',78.25,'concluído',16,4),(17,'2025-01-26 20:20:00',200.00,'concluído',17,7),(18,'2025-01-27 12:50:00',65.80,'em andamento',18,2),(19,'2025-01-28 19:15:00',250.60,'concluído',19,5),(20,'2025-01-29 14:10:00',88.90,'cancelado',20,6),(21,'2025-01-30 13:40:00',99.50,'concluído',21,8),(22,'2025-01-31 21:35:00',190.00,'em andamento',22,9),(23,'2025-02-01 12:25:00',72.40,'concluído',23,3),(24,'2025-02-02 18:55:00',180.75,'concluído',24,10),(25,'2025-02-03 20:45:00',140.00,'em andamento',25,7),(26,'2025-02-04 11:20:00',65.90,'cancelado',26,4),(27,'2025-02-05 17:30:00',210.00,'concluído',27,2),(28,'2025-02-06 19:50:00',95.25,'em andamento',28,1),(29,'2025-02-07 12:35:00',160.80,'concluído',29,5),(30,'2025-02-08 18:15:00',87.00,'concluído',30,6),(31,'2025-02-09 20:30:00',220.50,'concluído',31,8),(32,'2025-02-10 14:05:00',78.75,'em andamento',32,9),(33,'2025-02-11 13:10:00',135.60,'concluído',33,10),(34,'2025-02-12 21:00:00',245.00,'cancelado',34,7),(35,'2025-02-13 11:40:00',99.30,'concluído',35,3),(36,'2025-02-14 15:25:00',55.80,'em andamento',36,1),(37,'2025-02-15 19:05:00',185.40,'concluído',37,6),(38,'2025-02-16 20:55:00',110.00,'concluído',38,2),(39,'2025-02-17 12:15:00',70.25,'em andamento',39,4),(40,'2025-02-18 18:40:00',205.90,'concluído',40,5);
/*!40000 ALTER TABLE `pedidos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `produtos`
--

DROP TABLE IF EXISTS `produtos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `produtos` (
  `id_produto` int NOT NULL AUTO_INCREMENT,
  `nome` varchar(100) NOT NULL,
  `tipo` varchar(50) DEFAULT NULL,
  `preco` decimal(10,2) DEFAULT NULL,
  `estoque` int DEFAULT '0',
  PRIMARY KEY (`id_produto`),
  KEY `idx_produtos_nome` (`nome`),
  CONSTRAINT `produtos_chk_1` CHECK ((`preco` >= 0)),
  CONSTRAINT `produtos_chk_2` CHECK ((`estoque` >= 0))
) ENGINE=InnoDB AUTO_INCREMENT=81 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `produtos`
--

LOCK TABLES `produtos` WRITE;
/*!40000 ALTER TABLE `produtos` DISABLE KEYS */;
INSERT INTO `produtos` VALUES (1,'Cerveja Pilsen 600ml','Bebida',12.00,50),(2,'Caipirinha de Limão','Bebida',18.00,30),(3,'Batata Frita','Comida',25.00,20),(4,'Cerveja IPA 500ml','Bebida',15.50,45),(5,'Refrigerante Lata','Bebida',6.00,80),(6,'Água Mineral','Bebida',5.00,100),(7,'Porção de Calabresa Acebolada','Comida',35.00,15),(8,'Suco Natural de Laranja','Bebida',10.00,25),(9,'Whisky Dose','Bebida',20.00,60),(10,'Martini','Bebida',22.00,20),(11,'Mandioca Frita','Comida',28.00,18),(12,'Cerveja Malzbier 350ml','Bebida',10.00,40),(13,'Gin Tônica','Bebida',25.00,35),(14,'Porção de Frango à Passarinho','Comida',40.00,12),(15,'Água de Coco','Bebida',8.00,50),(16,'Chopp Claro','Bebida',9.50,90),(17,'Tábua de Frios','Comida',55.00,10),(18,'Cuba Libre','Bebida',20.00,25),(19,'Cerveja Escura 600ml','Bebida',13.00,30),(20,'Mojito','Bebida',24.00,28),(21,'Pastel de Carne','Comida',15.00,50),(22,'Refrigerante Zero Lata','Bebida',6.00,70),(23,'Salada de Frutas','Comida',18.00,15),(24,'Tequila Shot','Bebida',16.00,50),(25,'Feijoada (Sexta-feira)','Comida',60.00,5),(26,'Porção de Camarão Frito','Comida',75.00,8),(27,'Caipirinha de Morango','Bebida',20.00,30),(28,'Cerveja Sem Álcool','Bebida',11.00,20),(29,'Milkshake de Chocolate','Bebida',25.00,15),(30,'Caldo de Feijão','Comida',18.00,25),(31,'Gin com Especiarias','Bebida',30.00,18),(32,'Porção de Bolinho de Queijo','Comida',32.00,22),(33,'Espumante Garrafa','Bebida',80.00,5),(34,'Vinho Tinto Taça','Bebida',25.00,10),(35,'Filé com Fritas','Comida',65.00,10),(36,'Chocolate Quente','Bebida',12.00,20),(37,'Torta Holandesa','Comida',16.00,15),(38,'Porção de Iscas de Peixe','Comida',48.00,13),(39,'Espresso','Bebida',6.00,40),(40,'Pudim de Leite Condensado','Comida',14.00,10),(41,'Cerveja Pilsen 600ml','Bebida',12.00,50),(42,'Caipirinha de Limão','Bebida',18.00,30),(43,'Batata Frita','Comida',25.00,20),(44,'Cerveja IPA 500ml','Bebida',15.50,45),(45,'Refrigerante Lata','Bebida',6.00,80),(46,'Água Mineral','Bebida',5.00,100),(47,'Porção de Calabresa Acebolada','Comida',35.00,15),(48,'Suco Natural de Laranja','Bebida',10.00,25),(49,'Whisky Dose','Bebida',20.00,60),(50,'Martini','Bebida',22.00,20),(51,'Mandioca Frita','Comida',28.00,18),(52,'Cerveja Malzbier 350ml','Bebida',10.00,40),(53,'Gin Tônica','Bebida',25.00,35),(54,'Porção de Frango à Passarinho','Comida',40.00,12),(55,'Água de Coco','Bebida',8.00,50),(56,'Chopp Claro','Bebida',9.50,90),(57,'Tábua de Frios','Comida',55.00,10),(58,'Cuba Libre','Bebida',20.00,25),(59,'Cerveja Escura 600ml','Bebida',13.00,30),(60,'Mojito','Bebida',24.00,28),(61,'Pastel de Carne','Comida',15.00,50),(62,'Refrigerante Zero Lata','Bebida',6.00,70),(63,'Salada de Frutas','Comida',18.00,15),(64,'Tequila Shot','Bebida',16.00,50),(65,'Feijoada (Sexta-feira)','Comida',60.00,5),(66,'Porção de Camarão Frito','Comida',75.00,8),(67,'Caipirinha de Morango','Bebida',20.00,30),(68,'Cerveja Sem Álcool','Bebida',11.00,20),(69,'Milkshake de Chocolate','Bebida',25.00,15),(70,'Caldo de Feijão','Comida',18.00,25),(71,'Gin com Especiarias','Bebida',30.00,18),(72,'Porção de Bolinho de Queijo','Comida',32.00,22),(73,'Espumante Garrafa','Bebida',80.00,5),(74,'Vinho Tinto Taça','Bebida',25.00,10),(75,'Filé com Fritas','Comida',65.00,10),(76,'Chocolate Quente','Bebida',12.00,20),(77,'Torta Holandesa','Comida',16.00,15),(78,'Porção de Iscas de Peixe','Comida',48.00,13),(79,'Espresso','Bebida',6.00,40),(80,'Pudim de Leite Condensado','Comida',14.00,10);
/*!40000 ALTER TABLE `produtos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `reservas`
--

DROP TABLE IF EXISTS `reservas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `reservas` (
  `id_reserva` int NOT NULL AUTO_INCREMENT,
  `id_cliente` int DEFAULT NULL,
  `id_mesa` int DEFAULT NULL,
  `id_evento` int DEFAULT NULL,
  `data_reserva` date NOT NULL,
  PRIMARY KEY (`id_reserva`),
  KEY `id_cliente` (`id_cliente`),
  KEY `id_mesa` (`id_mesa`),
  KEY `id_evento` (`id_evento`),
  CONSTRAINT `reservas_ibfk_1` FOREIGN KEY (`id_cliente`) REFERENCES `clientes` (`id_cliente`) ON DELETE SET NULL,
  CONSTRAINT `reservas_ibfk_2` FOREIGN KEY (`id_mesa`) REFERENCES `mesas` (`id_mesa`) ON UPDATE CASCADE,
  CONSTRAINT `reservas_ibfk_3` FOREIGN KEY (`id_evento`) REFERENCES `eventos` (`id_evento`)
) ENGINE=InnoDB AUTO_INCREMENT=41 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `reservas`
--

LOCK TABLES `reservas` WRITE;
/*!40000 ALTER TABLE `reservas` DISABLE KEYS */;
INSERT INTO `reservas` VALUES (1,1,1,1,'2025-01-01'),(2,2,2,2,'2025-01-02'),(3,3,3,3,'2025-01-03'),(4,4,4,4,'2025-01-04'),(5,5,5,5,'2025-01-05'),(6,6,6,6,'2025-01-06'),(7,7,7,7,'2025-01-07'),(8,8,8,8,'2025-01-08'),(9,9,9,9,'2025-01-09'),(10,10,10,10,'2025-01-10'),(11,11,11,11,'2025-01-11'),(12,12,12,12,'2025-01-12'),(13,13,13,13,'2025-01-13'),(14,14,14,14,'2025-01-14'),(15,15,15,15,'2025-01-15'),(16,16,16,16,'2025-01-16'),(17,17,17,17,'2025-01-17'),(18,18,18,18,'2025-01-18'),(19,19,19,19,'2025-01-19'),(20,20,20,20,'2025-01-20'),(21,21,21,21,'2025-01-21'),(22,22,22,22,'2025-01-22'),(23,23,23,23,'2025-01-23'),(24,24,24,24,'2025-01-24'),(25,25,25,25,'2025-01-25'),(26,26,26,26,'2025-01-26'),(27,27,27,27,'2025-01-27'),(28,28,28,28,'2025-01-28'),(29,29,29,29,'2025-01-29'),(30,30,30,30,'2025-01-30'),(31,31,31,31,'2025-01-31'),(32,32,32,32,'2025-02-01'),(33,33,33,33,'2025-02-02'),(34,34,34,34,'2025-02-03'),(35,35,35,35,'2025-02-04'),(36,36,36,36,'2025-02-05'),(37,37,37,37,'2025-02-06'),(38,38,38,38,'2025-02-07'),(39,39,39,39,'2025-02-08'),(40,40,40,40,'2025-02-09');
/*!40000 ALTER TABLE `reservas` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Temporary view structure for view `visaodetalhespedidos`
--

DROP TABLE IF EXISTS `visaodetalhespedidos`;
/*!50001 DROP VIEW IF EXISTS `visaodetalhespedidos`*/;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8mb4;
/*!50001 CREATE VIEW `visaodetalhespedidos` AS SELECT 
 1 AS `id_pedido`,
 1 AS `data_hora_pedido`,
 1 AS `nome_cliente`,
 1 AS `numero_mesa`,
 1 AS `nome_produto`,
 1 AS `quantidade`,
 1 AS `preco_unitario`,
 1 AS `subtotal_item`,
 1 AS `total_pedido`*/;
SET character_set_client = @saved_cs_client;

--
-- Temporary view structure for view `visaoeventosartistas`
--

DROP TABLE IF EXISTS `visaoeventosartistas`;
/*!50001 DROP VIEW IF EXISTS `visaoeventosartistas`*/;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8mb4;
/*!50001 CREATE VIEW `visaoeventosartistas` AS SELECT 
 1 AS `nome_evento`,
 1 AS `data_evento`,
 1 AS `hora_evento`,
 1 AS `valor_ingresso`,
 1 AS `nome_banda_artista`,
 1 AS `tipo_artista`,
 1 AS `estilo`*/;
SET character_set_client = @saved_cs_client;

--
-- Final view structure for view `visaodetalhespedidos`
--

/*!50001 DROP VIEW IF EXISTS `visaodetalhespedidos`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8mb4 */;
/*!50001 SET character_set_results     = utf8mb4 */;
/*!50001 SET collation_connection      = utf8mb4_0900_ai_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `visaodetalhespedidos` AS select `p`.`id_pedido` AS `id_pedido`,`p`.`data_hora` AS `data_hora_pedido`,`c`.`nome` AS `nome_cliente`,`m`.`numero` AS `numero_mesa`,`pr`.`nome` AS `nome_produto`,`pp`.`quantidade` AS `quantidade`,`pr`.`preco` AS `preco_unitario`,(`pp`.`quantidade` * `pr`.`preco`) AS `subtotal_item`,`p`.`total` AS `total_pedido` from ((((`pedidos` `p` join `clientes` `c` on((`p`.`id_cliente` = `c`.`id_cliente`))) join `mesas` `m` on((`p`.`id_mesa` = `m`.`id_mesa`))) join `pedido_produto` `pp` on((`p`.`id_pedido` = `pp`.`id_pedido`))) join `produtos` `pr` on((`pp`.`id_produto` = `pr`.`id_produto`))) */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `visaoeventosartistas`
--

/*!50001 DROP VIEW IF EXISTS `visaoeventosartistas`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8mb4 */;
/*!50001 SET character_set_results     = utf8mb4 */;
/*!50001 SET collation_connection      = utf8mb4_0900_ai_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `visaoeventosartistas` AS select `e`.`nome` AS `nome_evento`,`e`.`data` AS `data_evento`,`e`.`hora` AS `hora_evento`,`e`.`valor_ingresso` AS `valor_ingresso`,`ba`.`nome` AS `nome_banda_artista`,`ba`.`tipo` AS `tipo_artista`,`ba`.`estilo` AS `estilo` from ((`eventos` `e` join `participacao` `pa` on((`e`.`id_evento` = `pa`.`id_evento`))) join `banda_artista` `ba` on((`pa`.`id_banda` = `ba`.`id_banda`))) */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-11-14 21:16:57
