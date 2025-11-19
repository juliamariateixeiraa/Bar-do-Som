# 🍸 Projeto de Banco de Dados e Estatística — Sistema de Gestão de Bar com Eventos Musicais

## 📋 Descrição do Projeto

Este projeto tem como objetivo o desenvolvimento de um **sistema de gerenciamento para um bar que organiza eventos de música ao vivo**, permitindo o controle de mesas, cardápio, estoque de bebidas, reservas de clientes, pagamentos e agenda de apresentações musicais.

A aplicação foi projetada para **otimizar o funcionamento do bar**, oferecendo uma visão integrada das operações e facilitando a tomada de decisões baseadas em dados.

-----

### Importante\!

  - Projeto principal na Branch Main e arquivos do Banco de Dados na Branch Arquivos Importantes

-----

## 🎯 Objetivos da Aplicação

  - Facilitar **reservas de mesas** por clientes
  - Controlar **pedidos de bebidas e comidas**
  - Gerenciar **estoque de bebidas e insumos**
  - Cadastrar **bandas e artistas**
  - Programar **eventos e apresentações musicais**
  - Gerar **relatórios financeiros e de público**
  - Organizar **agenda de shows e apresentações**
  - Registrar **pagamentos e histórico de consumo dos clientes**

-----

## ⚙️ REQUISITOS ESTRUTURAIS: MAPEAMENTO COMPLETO DE FUNCIONALIDADES

Esta tabela mapeia os requisitos técnicos solicitados diretamente para os arquivos do projeto.

### 1\. CRUD (Create, Read, Update, Delete)

O CRUD completo para **ao menos 04 tabelas** é implementado através dos seguintes Controladores e Telas:

| Entidade | Ações (CRUD) | Controller (Backend Java) | Interface (Frontend JSX) |
| :--- | :--- | :--- | :--- |
| **Cliente** | Completo | `Backend/src/main/java/br/com/bardosom/api/controller/ClienteController.java` | `Frontend/my-react-app/src/ClientesPage.jsx` |
| **Evento** | Completo | `Backend/src/main/java/br/com/bardosom/api/controller/EventoController.java` | `Frontend/my-react-app/src/EventosPage.jsx` |
| **Produto** | Completo | `Backend/src/main/java/br/com/bardosom/api/controller/ProdutoController.java` | `Frontend/my-react-app/src/ProdutosPage.jsx` |
| **Funcionário** | Completo | `Backend/src/main/java/br/com/bardosom/api/controller/FuncionarioController.java` | `Frontend/my-react-app/src/FuncionariosPage.jsx` |

### 2\. Integração com Funções, Procedimentos e Triggers

As rotinas avançadas de banco de dados (`Etapa 05`) são definidas nos scripts SQL da branch `Arquivos Importantes` e acessadas pela lógica de Backend:

| Elemento do BD | Detalhe | Arquivo de Definição (SQL) | Arquivo de Execução/Lógica (Backend) | Interface de Visualização (Frontend) |
| :--- | :--- | :--- | :--- | :--- |
| **Funções/Procedimentos** | Lógica de cálculo (ex: totais, fechamento) e rotinas de BD. | `Bar-do-Som-Arquivos_Importantes/03_avancado_etapa05.sql` e `Backend/database/bar_do_som.sql` | `PedidoController.java` (Métodos que chamam as funções SQL) | `Frontend/my-react-app/src/FuncoesProcedures.jsx` |
| **Triggers** | Rotinas automáticas (ex: atualização de estoque, logs). | `Bar-do-Som-Arquivos_Importantes/03_avancado_etapa05.sql` e `Backend/database/bar_do_som.sql` | `PedidoDAO.java` (Gatilho na inserção/edição de pedidos) | As páginas de **Pedidos** e **Produtos** refletem as mudanças automáticas de status/estoque. |

### 3\. Consultas e Views

As consultas e *Views* avançadas (`Etapas 03 e 04`) que geram dados para relatórios são definidas no SQL e acessadas via `RelatorioController` para exibição na interface:

| Requisito | Detalhe | Arquivo de Definição (SQL) | Arquivo de Acesso (Backend DAO/Controller) | Interface de Visualização (Frontend) |
| :--- | :--- | :--- | :--- | :--- |
| **Consultas/Views** | Acesso e visualização das consultas/views criadas nas etapas 03 e 04, com filtros. | `Bar-do-Som-Arquivos_Importantes/02_avancado_etapa04.sql` e `Backend/database/bar_do_som.sql` | `RelatorioController.java` e `RelatorioDAO.java` | `Frontend/my-react-app/src/RelatoriosPage.jsx` |
| **Apresentação Visual** | Visualização clara de dados, com gráficos e indicadores. | N/A | `DashboardController.java` | `Frontend/my-react-app/src/DashboardPage.jsx` |

### 4\. Dashboard Estatístico Integrado

O Dashboard consolida a análise estatística dos **dados presentes no banco de dados**, acessível em **`http://localhost:5173/dashboard`**.

| Componente | Detalhe | Lógica de Dados (Backend DAO/Controller) | Interface de Visualização (Frontend) |
| :--- | :--- | :--- | :--- |
| **Indicadores Resumidos** | Métricas chave (total de registros, médias, percentuais) como Total de Clientes, Vendas por Período, etc. | `DashboardController.java` e `DashboardDAO.java` | `Frontend/my-react-app/src/DashboardContent.jsx` |
| **Gráficos Dinâmicos (Mínimo 6)** | Apresentação de análises estatísticas (média, mediana, moda, variância e desvio padrão) com gráficos (barras, pizza, linha). | `DashboardController.java` | `Frontend/my-react-app/src/DashboardContent.jsx` |
| **Visualizações Interativas** | Permite seleção de períodos e categorias via filtros. | `DashboardController.java` (Métodos com parâmetros de filtro) | `Frontend/my-react-app/src/DashboardPage.jsx` |

-----

## 🧩 Modelagem de Dados

### **Entidades Principais**

1.  **Cliente** — id\_cliente, nome, email, telefone, data\_nascimento
2.  **Mesa** — id\_mesa, número, capacidade, status
3.  **Pedido** — id\_pedido, data\_hora, total, status
4.  **Produto** — id\_produto, nome, tipo, preço, estoque
5.  **Funcionário** — id\_funcionario, nome, cargo, telefone
6.  **Evento** — id\_evento, nome, data, hora, valor\_ingresso, público\_estimado
7.  **Banda/Artista** — id\_banda, nome, estilo, integrantes
8.  **Participação** *(entidade fraca)* — id\_participacao, função

-----

## 🛠️ Pré-requisitos

Antes de começar, garanta que tem as seguintes ferramentas instaladas:

  - [Git](https://git-scm.com/) (para clonar o repositório)
  - [Java JDK](https://www.oracle.com/java/technologies/downloads/) (o projeto usa Spring Boot; **versão 17 ou 21** é recomendada)
  - [React](https://react.dev/) (framework usado no Frontend; requer [Node.js](https://nodejs.org/) **versão 18.x ou 20.x**)
  - [MySQL Workbench](https://dev.mysql.com/downloads/workbench/) (Recomendado para importar o `.sql`)

> **Nota sobre o Maven:** O projeto inclui o *Maven Wrapper* (`mvnw` e `mvnw.cmd`). Significa que os utilizadores não precisam de instalar o Apache Maven manualmente. Podem usar `./mvnw spring-boot:run` (em Mac/Linux) ou `mvnw.cmd spring-boot:run` (em Windows) e o wrapper descarregará a versão correta do Maven automaticamente.

-----

## 🚀 Como clonar e rodar o projeto

### 1️⃣ Clone o repositório

```bash
git clone https://github.com/juliamariateixeiraa/Bar-do-Som.git
cd bar-do-som
```

### 2️⃣ Importe o banco de dados

O arquivo SQL principal para importação, que contém toda a estrutura, dados, **funções, procedimentos, triggers e views**, é: `Backend/database/bar_do_som.sql`.

> Para acessar os scripts SQL originais com a definição de tabelas, consultas, views, funções, procedimentos e triggers (Etapas 03, 04 e 05), consulte a branch Arquivos Importantes.

1.  Abra o MySQL Workbench
2.  Server → Data Import
3.  Import from Self-Contained File
4.  Selecione: `Backend/database/bar_do_som.sql`
5.  Start Import

**Ou via terminal:**

```bash
mysql -u root -p < Backend/database/bar_do_som.sql
```

### 3️⃣ Configure o Backend

Edite: `Backend/src/main/resources/application.properties`

```properties
spring.datasource.password=Bardosom1234
```

❗ **Importante:** Garanta que a sua base de dados `bar_do_som`, que importamos no passo 2, está a ser executada em `localhost:3306`.

O conteúdo do ficheiro `application.properties` deve ser:

```properties
spring.datasource.url=jdbc:mysql://localhost:3306/bar_do_som
spring.datasource.username=root
spring.datasource.password=Bardosom1234
```

### 4️⃣ Rode o Backend

```bash
cd Backend
mvn spring-boot:run
```

Backend: `http://localhost:8080`

### 5️⃣ Rode o Frontend

```bash
cd ..
npm install
npm run dev
```

Frontend: `http://localhost:5173`

-----

## 👩‍💻 Integrantes do Projeto

| Nome | E-mail |
| :--- | :--- |
| **Amanda Montarroios** | amo@cesar.school |
| **Fabiana Coelho** | fcsls@cesar.school |
| **Júlia Maria Teixeira** | jmst@cesar.school |

-----

## 🚀 Próximos Passos

  - Implementar o banco de dados relacional completo
  - Popular o banco com dados reais ou simulados
  - Realizar consultas SQL complexas e geração de relatórios
  - Analisar estatisticamente os dados coletados
  - Apresentar os resultados e insights obtidos

-----

