require('dotenv').config();
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASS,
    {
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        dialect: 'mysql',
        logging: console.log
    }
);

async function testarConexao() {
    try {
        await sequelize.authenticate();
        console.log('✅ Conexão com MariaDB estabelecida com sucesso!');
        console.log('📋 Configurações:');
        console.log('   Host:', process.env.DB_HOST);
        console.log('   Porta:', process.env.DB_PORT);
        console.log('   Banco:', process.env.DB_NAME);
        console.log('   Usuário:', process.env.DB_USER);
        process.exit(0);
    } catch (error) {
        console.error('❌ Erro na conexão:', error.message);
        console.log('\n🔧 Verifique:');
        console.log('   1. MariaDB está rodando?');
        console.log('   2. Senha está correta no .env?');
        console.log('   3. Banco de dados "loja_db" existe?');
        console.log('   4. Porta 3306 está disponível?');
        console.log('   5. mysql2 está instalado? (npm install mysql2)');
        process.exit(1);
    }
}

testarConexao();