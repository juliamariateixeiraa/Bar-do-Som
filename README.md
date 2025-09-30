# 🍸 Projeto de Banco de Dados e Estatística — Sistema de Gestão de Bar com Eventos Musicais

## 📋 Descrição do Projeto

Este projeto tem como objetivo o desenvolvimento de um **sistema de gerenciamento para um bar que organiza eventos de música ao vivo**, permitindo o controle de mesas, cardápio, estoque de bebidas, reservas de clientes, pagamentos e agenda de apresentações musicais.

A aplicação foi projetada para **otimizar o funcionamento do bar**, oferecendo uma visão integrada das operações e facilitando a tomada de decisões baseadas em dados.

---

## 🎯 Objetivos da Aplicação

- Facilitar **reservas de mesas** por clientes  
- Controlar **pedidos de bebidas e comidas**  
- Gerenciar **estoque de bebidas e insumos**  
- Cadastrar **bandas e artistas**  
- Programar **eventos e apresentações musicais**  
- Gerar **relatórios financeiros e de público**  
- Organizar **agenda de shows e apresentações**  
- Registrar **pagamentos e histórico de consumo dos clientes**

---

## 📊 Perguntas e Relatórios Importantes

- Qual bebida é mais vendida por período?  
- Qual banda/artista atrai mais público?  
- Qual foi o lucro de cada evento?  
- Qual cliente frequenta mais o bar?  
- Quais mesas estão disponíveis para reserva?  
- Quais produtos estão com estoque baixo?  
- Qual funcionário realizou mais atendimentos/pedidos?

---

## 🧩 Modelagem de Dados

### **Entidades Principais**

1. **Cliente** — id_cliente, nome, email, telefone, data_nascimento  
2. **Mesa** — id_mesa, número, capacidade, status  
3. **Pedido** — id_pedido, data_hora, total, status  
4. **Produto** — id_produto, nome, tipo, preço, estoque  
5. **Funcionário** — id_funcionario, nome, cargo, telefone  
6. **Evento** — id_evento, nome, data, hora, valor_ingresso, público_estimado  
7. **Banda/Artista** — id_banda, nome, estilo, integrantes  
8. **Participação** *(entidade fraca)* — id_participacao, função

### **Relacionamentos Importantes**

- Cliente **faz** Pedido  
- Mesa **possui** Pedido  
- Pedido **contém** Produto *(N:M)*  
- Cliente **reserva** Mesa **para** Evento *(relacionamento ternário)*  
- Banda/Artista **participa de** Evento *(via entidade fraca Participação)*  
- Funcionário **gerencia** outro Funcionário *(auto-relacionamento)*

---

## ⚙️ Requisitos Funcionais

- [x] Cadastrar clientes  
- [x] Registrar reservas de mesas  
- [x] Registrar pedidos de clientes  
- [x] Controlar estoque de produtos e bebidas  
- [x] Cadastrar bandas e artistas  
- [x] Programar eventos e apresentações  
- [x] Associar bandas/artistas a eventos  
- [x] Emitir relatórios de vendas, público e estoque  
- [x] Registrar pagamentos

---

## 📈 Parte Estatística

A parte estatística do projeto visa **analisar os dados gerados pelo sistema**, como:

- Volume de vendas por período  
- Produtos mais vendidos  
- Eventos com maior público  
- Lucro médio por evento  
- Frequência de clientes  
- Eficiência de funcionários

Essas análises ajudam a compreender padrões de consumo e apoiar decisões estratégicas do bar.

---

## 👩‍💻 Integrantes do Projeto

| Nome | E-mail |
|------|---------|
| **Amanda Montarroios** | amo@cesar.school |
| **Fabiana Coelho** | fcsls@cesar.school |
| **Júlia Maria Teixeira** | jmst@cesar.school |

---

## 🧠 Tecnologias e Ferramentas

- **Modelagem Conceitual e Lógica:** DER / MER  
- **Banco de Dados:** PostgreSQL ou MySQL  
- **Ferramentas de Análise:** Excel, Python (Pandas, Matplotlib), SQL  
- **Visualização de Dados:** Power BI ou Dashboards personalizados  

---

## 🚀 Próximos Passos

- Implementar o banco de dados relacional completo  
- Popular o banco com dados reais ou simulados  
- Realizar consultas SQL complexas e geração de relatórios  
- Analisar estatisticamente os dados coletados  
- Apresentar os resultados e insights obtidos  

---

## 📜 Licença

Este projeto foi desenvolvido para fins acadêmicos na disciplina de **Banco de Dados e Estatística**, do curso **CESAR School**.

---

✨ *“Transformando dados em decisões inteligentes.”*  
