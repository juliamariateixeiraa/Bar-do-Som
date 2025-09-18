DROP DATABASE IF EXISTS bar_do_som;
CREATE DATABASE bar_do_som;
USE bar_do_som;

CREATE TABLE Cliente (
    id_cliente INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE,
    data_nascimento DATE,
    telefone VARCHAR(15)
);

CREATE TABLE Mesa (
    id_mesa INT AUTO_INCREMENT PRIMARY KEY,
    numero INT UNIQUE NOT NULL,
    capacidade INT CHECK (capacidade > 0),
    status VARCHAR(20) DEFAULT 'disponivel'
);

CREATE TABLE Funcionario (
    id_funcionario INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    cargo VARCHAR(50) NOT NULL,
    telefone VARCHAR(15),
    id_gerente INT,
    FOREIGN KEY (id_gerente) REFERENCES Funcionario(id_funcionario) ON DELETE SET NULL
);

CREATE TABLE Produto (
    id_produto INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    tipo VARCHAR(50),
    preco DECIMAL(10,2) CHECK (preco >= 0),
    estoque INT DEFAULT 0 CHECK (estoque >= 0)
);

CREATE TABLE Pedido (
    id_pedido INT AUTO_INCREMENT PRIMARY KEY,
    data_hora DATETIME NOT NULL,
    total DECIMAL(10,2) DEFAULT 0 CHECK (total >= 0),
    status VARCHAR(20) DEFAULT 'em andamento',
    id_cliente INT,
    id_mesa INT,
    FOREIGN KEY (id_cliente) REFERENCES Cliente(id_cliente),
    FOREIGN KEY (id_mesa) REFERENCES Mesa(id_mesa) ON UPDATE CASCADE
);

CREATE TABLE Evento (
    id_evento INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    data DATE NOT NULL,
    hora TIME NOT NULL,
    valor_ingresso DECIMAL(10,2) DEFAULT 0 CHECK (valor_ingresso >= 0),
    publico_estimado INT DEFAULT 0 CHECK (publico_estimado >= 0)
);

CREATE TABLE Banda_Artista (
    id_banda INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    estilo VARCHAR(50),
    integrantes INT CHECK (integrantes >= 1),
    tipo ENUM('Banda','Artista Solo') NOT NULL
);

CREATE TABLE Participacao (
    id_participacao INT AUTO_INCREMENT PRIMARY KEY,
    funcao VARCHAR(50),
    id_banda INT,
    id_evento INT,
    FOREIGN KEY (id_banda) REFERENCES Banda_Artista(id_banda) ON DELETE CASCADE,
    FOREIGN KEY (id_evento) REFERENCES Evento(id_evento) ON DELETE CASCADE
);

CREATE TABLE Pedido_Produto (
    id_pedido INT,
    id_produto INT,
    quantidade INT DEFAULT 1 CHECK (quantidade > 0),
    PRIMARY KEY (id_pedido, id_produto),
    FOREIGN KEY (id_pedido) REFERENCES Pedido(id_pedido) ON DELETE CASCADE,
    FOREIGN KEY (id_produto) REFERENCES Produto(id_produto)
);

CREATE TABLE Reserva (
    id_reserva INT AUTO_INCREMENT PRIMARY KEY,
    id_cliente INT,
    id_mesa INT,
    id_evento INT,
    data_reserva DATE NOT NULL,
    FOREIGN KEY (id_cliente) REFERENCES Cliente(id_cliente) ON DELETE SET NULL,
    FOREIGN KEY (id_mesa) REFERENCES Mesa(id_mesa) ON UPDATE CASCADE,
    FOREIGN KEY (id_evento) REFERENCES Evento(id_evento)
);

CREATE TABLE Estoque (
    id_estoque INT AUTO_INCREMENT PRIMARY KEY,
    id_produto INT,
    quantidade INT DEFAULT 0 CHECK (quantidade >= 0),
    data_registro DATE NOT NULL,
    FOREIGN KEY (id_produto) REFERENCES Produto(id_produto)
);
