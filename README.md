# 1. Instalar dependências
npm install

# 2. Configurar o .env com suas credenciais do MariaDB
# (editar manualmente o arquivo .env)

# 3. Criar o banco de dados
node criar-banco.js

# 4. Popular o banco com dados de teste
node seed-dados.js

# 5. Criar as Views, Trigger e Stored Procedure
# Execute os arquivos SQL linha de comando:
* mysql -u root -p loja_db < database/views.sql
* mysql -u root -p loja_db < database/trigger.sql
* mysql -u root -p loja_db < database/procedure.sql

# 6. Iniciar o servidor
npm run dev

# 7. Resetar e popular novamente
node seed-dados.js

* criar-banco.js só precisa rodar UMA VEZ (cria o banco vazio)
* seed-dados.js você roda quando quiser popular/resetar os dados
* npm run dev é para iniciar o servidor sempre que for testar