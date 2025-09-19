INSERT INTO Funcionario (nome, cargo, telefone, id_gerente)
VALUES ('Roberto Souza', 'Gerente', '11977776666', NULL);

SET @id_gerente := (
    SELECT id_funcionario
    FROM Funcionario
    WHERE nome = 'Roberto Souza'
    ORDER BY id_funcionario DESC
    LIMIT 1
);

INSERT INTO Funcionario (nome, cargo, telefone, id_gerente)
VALUES
  ('Carlos Pereira', 'Garçom', '11999998888', @id_gerente),
  ('Fernanda Lima', 'Cozinheira', '11988887777', @id_gerente),
  ('Ana Oliveira', 'Garçom', '11966665555', @id_gerente),
  ('Pedro Santos', 'Barman', '11955554444', @id_gerente),
  ('Mariana Costa', 'Garçom', '11944443333', @id_gerente),
  ('João Silva', 'Cozinheiro', '11933332222', @id_gerente),
  ('Juliana Ribeiro', 'Garçom', '11922221111', @id_gerente),
  ('Rafael Fernandes', 'Barman', '11911110000', @id_gerente),
  ('Patrícia Almeida', 'Garçom', '11900009999', @id_gerente),
  ('Guilherme Martins', 'Cozinheiro', '11899998888', @id_gerente),
  ('Beatriz Nunes', 'Garçom', '11888887777', @id_gerente),
  ('Daniel Gomes', 'Garçom', '11877776666', @id_gerente),
  ('Leticia Barbosa', 'Cozinheira', '11866665555', @id_gerente),
  ('Fábio Rodrigues', 'Barman', '11855554444', @id_gerente),
  ('Amanda Silva', 'Garçom', '11844443333', @id_gerente),
  ('Thiago Oliveira', 'Cozinheiro', '11833332222', @id_gerente),
  ('Larissa Pereira', 'Garçom', '11822221111', @id_gerente),
  ('Lucas Fernandes', 'Barman', '11811110000', @id_gerente),
  ('Carla Souza', 'Garçom', '11800009999', @id_gerente),
  ('Gustavo Lima', 'Cozinheiro', '11799998888', @id_gerente),
  ('Camila Costa', 'Garçom', '11788887777', @id_gerente),
  ('Ricardo Santos', 'Garçom', '11777776666', @id_gerente),
  ('Vivian Mendes', 'Cozinheira', '11766665555', @id_gerente),
  ('André Almeida', 'Barman', '11755554444', @id_gerente),
  ('Isabela Ribeiro', 'Garçom', '11744443333', @id_gerente),
  ('Felipe Gonçalves', 'Cozinheiro', '11733332222', @id_gerente),
  ('Sofia Barbosa', 'Garçom', '11722221111', @id_gerente),
  ('Bruno Morais', 'Barman', '11711110000', @id_gerente),
  ('Gabriela Castro', 'Garçom', '11700009999', @id_gerente),
  ('Eduardo Martins', 'Cozinheiro', '11699998888', @id_gerente),
  ('Clara Nunes', 'Garçom', '11688887777', @id_gerente),
  ('Marcelo Gomes', 'Garçom', '11677776666', @id_gerente),
  ('Larissa Oliveira', 'Cozinheira', '11666665555', @id_gerente),
  ('Diego Rodrigues', 'Barman', '11655554444', @id_gerente),
  ('Carolina Souza', 'Garçom', '11644443333', @id_gerente),
  ('Thiago Lima', 'Cozinheiro', '11633332222', @id_gerente),
  ('Vanessa Costa', 'Garçom', '11622221111', @id_gerente),
  ('Matheus Santos', 'Barman', '11611110000', @id_gerente),
  ('Beatriz Pereira', 'Garçom', '11600009999', @id_gerente);
