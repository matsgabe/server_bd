require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { sequelize } = require('./models');

// Importar rotas
const categoriaRoutes = require('./routes/categorias');

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/categorias', categoriaRoutes);

// Rota de teste
app.get('/', (req, res) => {
    res.json({ 
        mensagem: 'API REST - Sistema de Gestão de Produtos',
        status: 'Online',
        endpoints: {
            categorias: '/api/categorias'
        }
    });
});

// Sincronizar banco e iniciar servidor
const iniciarServidor = async () => {
    try {
        await sequelize.authenticate();
        console.log('✅ Conexão com banco de dados estabelecida!');
        
        await sequelize.sync({ alter: true });
        console.log('✅ Modelos sincronizados!');
        
        app.listen(PORT, () => {
            console.log(`🚀 Servidor rodando em http://localhost:${PORT}`);
        });
    } catch (error) {
        console.error('❌ Erro ao iniciar servidor:', error);
        process.exit(1);
    }
};

iniciarServidor();