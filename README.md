📚 Sistema de Gerenciamento de Vagas – Frameworks Web II

Aplicação Full Stack desenvolvida para a disciplina Frameworks Web II, integrando Spring Boot, React, MySQL/PostgreSQL, Deploy e boas práticas de desenvolvimento.

👥 Integrantes do Grupo
Nome	Função
Leonardo Alvarenga	Backend (API Spring Boot)
Amanda	Frontend (React)
Matheus	Modelagem do Banco (DER)
Eduarda	Documentação, README, prints, PDF e envio final
🛠️ Tecnologias Utilizadas
Frontend

React.js

React Router

Axios

Material-UI (ou Tailwind, dependendo do grupo)

Vercel (deploy)

Backend

Java 17+

Spring Boot

Spring Web

Spring Data JPA

Banco de dados: MySQL/PostgreSQL no Aiven

H2 Database (testes locais)

Render (deploy)

▶️ Como Rodar o Backend Localmente
1. Entrar na pasta do backend
cd backend

2. Configurar o application.properties

Edite com suas variáveis locais:

spring.datasource.url=jdbc:mysql://localhost:3306/vagasdb
spring.datasource.username=seu_usuario
spring.datasource.password=sua_senha
spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true

3. Rodar o projeto
mvn spring-boot:run


Backend disponível em:

http://localhost:8080

▶️ Como Rodar o Frontend Localmente
1. Entrar na pasta do frontend
cd frontend

2. Instalar dependências
npm install

3. Iniciar o servidor
npm run dev


Frontend disponível em:

http://localhost:5173

🗂️ Modelagem do Banco (DER)

O sistema possui as entidades principais:

Vaga

id

titulo

descricao

salario

localidade

Candidato (se existir)

id

nome

email

vaga_id

📌 Print do DER está disponível na pasta docs/prints/der.png.

🔗 Endpoints da API (Resumo)
/vagas
Método	Rota	Descrição
POST	/vagas	Criar vaga
GET	/vagas	Listar vagas
GET	/vagas/{id}	Buscar vaga por ID
PUT	/vagas/{id}	Atualizar vaga
DELETE	/vagas/{id}	Deletar vaga

(Adicionar mais endpoints quando o backend estiver finalizado.)

🖼️ Prints da Aplicação

Os prints estão organizados em:

docs/prints/


Incluindo:

✔ Print do Postman criando vaga (postman-create.png)

✔ Listagem no frontend (frontend-listagem.png)

✔ DER (der.png)

✔ Console com resposta 200 (opcional)

☁️ Links de Deploy

(serão adicionados após deploy)

Frontend (Vercel): —

Backend (Render): —

Swagger UI: —

🎥 Vídeo de Demonstração

(adicionar quando gravarem)

Link do vídeo (Drive/YouTube): —

🔄 Como Contribuir – Git Workflow do Grupo
1. Criar branch
git checkout -b feat/seu-nome-sua-tarefa

2. Fazer commits pequenos
git add .
git commit -m "descrição da tarefa"

3. Enviar branch
git push origin feat/seu-nome-sua-tarefa

4. Abrir Pull Request

Abrir PR para main

Marcar um colega para revisar

Aguardar aprovação e merge

✅ Status do Projeto

✔ Estrutura inicial criada
✔ Documentação iniciada
⬜ Backend finalizado
⬜ Frontend finalizado
⬜ Deploy
⬜ Vídeo
⬜ Entrega final