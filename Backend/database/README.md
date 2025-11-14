\# 📊 Banco de Dados - Bar do Som



\## Como importar o banco de dados:



\### Opção 1: MySQL Workbench (Recomendado)

1\. Abra o MySQL Workbench

2\. Conecte ao servidor MySQL

3\. Vá em \*\*Server\*\* → \*\*Data Import\*\*

4\. Selecione \*\*"Import from Self-Contained File"\*\*

5\. Escolha o arquivo `bar\_do\_som.sql`

6\. Clique em \*\*"Start Import"\*\*



\### Opção 2: Linha de comando

```bash

mysql -u root -p < bar\_do\_som.sql

```



\## ⚙️ Configuração



Após importar o banco, configure:

`Backend/src/main/resources/application.properties`

```properties

spring.datasource.url=jdbc:mysql://localhost:3306/bar\_do\_som

spring.datasource.username=root

spring.datasource.password=SUA\_SENHA\_AQUI

```



\## 📋 Estrutura do Banco



\- \*\*clientes\*\* - Cadastro de clientes (44 registros)

\- \*\*produtos\*\* - Catálogo de produtos  

\- \*\*eventos\*\* - Eventos do bar

\- \*\*pedidos\*\* - Controle de pedidos

\- \*\*mesas\*\* - Gerenciamento de mesas

\- \*\*banda\_artista\*\* - Artistas e bandas

\- \*\*reservas\*\* - Reservas de mesas

\- E outras tabelas relacionadas...

