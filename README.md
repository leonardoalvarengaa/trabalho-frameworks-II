NOME DO PROJETO: Sistema de Vagas – React + Spring Boot + JWT

DESCRIÇÃO DO PROJETO:
Este projeto é um sistema completo de gerenciamento de vagas de emprego. Possui autenticação de usuários via JWT, telas de login e registro, listagem de vagas, criação, edição e exclusão. O frontend foi desenvolvido em React e o backend em Spring Boot. O deploy foi realizado utilizando Vercel (frontend) e Render (backend).

INTEGRANTES DO GRUPO:
Leonardo Alvarenga Ferreira
Eduarda Andrade
Matheus Vieira
Amanda Soares

INSTRUÇÕES PARA EXECUTAR O PROJETO LOCALMENTE
FRONTEND:

Acesse a pasta "frontend".

Execute os comandos:
npm install
npm run dev

Crie o arquivo .env dentro da pasta frontend com o conteúdo:
VITE_API_URL=http://localhost:8080

A aplicação ficará disponível em:
http://localhost:5173

BACKEND:

Acesse a pasta "backend".

Execute o comando:
./mvnw spring-boot:run

O backend ficará disponível em:
http://localhost:8080

Caso utilize variáveis de ambiente no backend, configure-as conforme necessário.

LINKS IMPORTANTES
LINK DO FRONTEND (Vercel):
https://trab-frameworks-ii.vercel.app/

LINK DO BACKEND (Render):
https://projeto-vagas-backend-9i0c.onrender.com/

LINK DO VÍDEO DE DEMONSTRAÇÃO:
https://unilavrasedu-my.sharepoint.com/:v:/g/personal/leonardo2016_lf13_sou_unilavras_edu_br/IQB9oVXM9o2FSoHIhQTWpah4ASD7aQhvSQrJb5U8jTR-9BY?nav=eyJyZWZlcnJhbEluZm8iOnsicmVmZXJyYWxBcHAiOiJPbmVEcml2ZUZvckJ1c2luZXNzIiwicmVmZXJyYWxBcHBQbGF0Zm9ybSI6IldlYiIsInJlZmVycmFsTW9kZSI6InZpZXciLCJyZWZlcnJhbFZpZXciOiJNeUZpbGVzTGlua0NvcHkifX0&e=mkcop1

FUNCIONALIDADES PRINCIPAIS
Registro de usuário

Login com autenticação JWT

Listagem de vagas

Criação de novas vagas

Edição de vagas existentes

Exclusão de vagas

Comunicação entre frontend e backend usando Axios

Deploy completo em produção (Render + Vercel)

COMO O SISTEMA FUNCIONA
O backend autentica o usuário e entrega um token JWT. O frontend armazena esse token e envia automaticamente em todas as requisições protegidas. O sistema permite realizar o CRUD completo de vagas de emprego, com as informações sempre sincronizadas com o backend.

VÍDEO DE DEMONSTRAÇÃO
O vídeo apresenta:

Login e registro

Listagem de vagas

Criação de uma nova vaga

Edição de uma vaga

Exclusão de uma vaga

Fluxo completo funcionando em deploy
