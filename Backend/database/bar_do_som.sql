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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `clientes`
--

LOCK TABLES `clientes` WRITE;
/*!40000 ALTER TABLE `clientes` DISABLE KEYS */;
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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `estoque`
--

LOCK TABLES `estoque` WRITE;
/*!40000 ALTER TABLE `estoque` DISABLE KEYS */;
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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `eventos`
--

LOCK TABLES `eventos` WRITE;
/*!40000 ALTER TABLE `eventos` DISABLE KEYS */;
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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `funcionarios`
--

LOCK TABLES `funcionarios` WRITE;
/*!40000 ALTER TABLE `funcionarios` DISABLE KEYS */;
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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `mesas`
--

LOCK TABLES `mesas` WRITE;
/*!40000 ALTER TABLE `mesas` DISABLE KEYS */;
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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `participacao`
--

LOCK TABLES `participacao` WRITE;
/*!40000 ALTER TABLE `participacao` DISABLE KEYS */;
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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `pedidos`
--

LOCK TABLES `pedidos` WRITE;
/*!40000 ALTER TABLE `pedidos` DISABLE KEYS */;
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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `produtos`
--

LOCK TABLES `produtos` WRITE;
/*!40000 ALTER TABLE `produtos` DISABLE KEYS */;
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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `reservas`
--

LOCK TABLES `reservas` WRITE;
/*!40000 ALTER TABLE `reservas` DISABLE KEYS */;
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

-- Dump completed on 2025-11-15  1:56:34
