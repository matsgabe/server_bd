require('dotenv').config();
const mysql = require('mysql2/promise');

async function criarBanco() {
    try {
        const connection = await mysql.createConnection({
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASS,
            port: process.env.DB_PORT || 3306
        });

        console.log('Conectado ao MariaDB!');
        await connection.query(
            `CREATE DATABASE IF NOT EXISTS ${process.env.DB_NAME} 
             CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci`
        );

        console.log(`Banco de dados "${process.env.DB_NAME}" criado com sucesso!`);

        const [databases] = await connection.query('SHOW DATABASES');
        console.log('\nBancos de dados disponíveis:');
        databases.forEach(db => {
            console.log(`   - ${db.Database}`);
        });

        await connection.end();
        console.log('\nTudo pronto! Agora execute: npm run dev');
        
    } catch (error) {
        console.error('Erro:', error.message);
    }
}

criarBanco();