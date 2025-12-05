require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { sequelize } = require('./models');

// Importar rotas
const authRoutes = require('./routes/auth');
const categoriaRoutes = require('./routes/categorias');
const produtoRoutes = require('./routes/produtos');
const pedidoRoutes = require('./routes/pedidos');

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/categorias', categoriaRoutes);
app.use('/api/produtos', produtoRoutes);
app.use('/api/pedidos', pedidoRoutes);

app.get('/', (req, res) => {
    res.json({ 
        mensagem: 'API REST - Sistema de Gestão de Produtos',
        status: 'Online',
        endpoints: {
            auth: '/api/auth',
            categorias: '/api/categorias',
            produtos: '/api/produtos',
            pedidos: '/api/pedidos'
        }
    });
});

const iniciarServidor = async () => {
    try {
        await sequelize.authenticate();
        console.log('Conexão com banco de dados estabelecida!');
        
        await sequelize.sync({ alter: true });
        console.log('Modelos sincronizados!');
        
        app.listen(PORT, () => {
            console.log(`Servidor rodando em http://localhost:${PORT}`);
            console.log('\n📋 Rotas disponíveis:');
            console.log('   POST   /api/auth/registrar');
            console.log('   POST   /api/auth/login');
            console.log('   GET    /api/categorias');
            console.log('   POST   /api/categorias (requer token)');
            console.log('   GET    /api/produtos');
            console.log('   POST   /api/produtos');
            console.log('   GET    /api/pedidos');
        });
    } catch (error) {
        console.error('Erro ao iniciar servidor:', error);
        process.exit(1);
    }
};

iniciarServidor();