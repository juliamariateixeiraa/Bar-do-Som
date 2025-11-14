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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `banda_artista`
--

LOCK TABLES `banda_artista` WRITE;
/*!40000 ALTER TABLE `banda_artista` DISABLE KEYS */;
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
) ENGINE=InnoDB AUTO_INCREMENT=169 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
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
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-11-14 19:39:30
