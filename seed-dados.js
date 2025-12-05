require('dotenv').config();
const { sequelize, Categoria, Produto } = require('./models');
const produtoController = require('./controllers/produtoController');

async function popularDados() {
    try {
        await sequelize.authenticate();
        console.log('Conectado ao banco!\n');

        await sequelize.sync({ force: true });
        console.log('Banco resetado!\n');

        const cat1 = await Categoria.create({ nome_categoria: 'Eletrônicos' });
        const cat2 = await Categoria.create({ nome_categoria: 'Alimentos' });
        const cat3 = await Categoria.create({ nome_categoria: 'Vestuário' });
        console.log('Categorias criadas!\n');

        const produtos = [
            { nome_produto: 'Mouse Gamer', qtde_produto: 2, id_categoria: cat1.id_categoria },
            { nome_produto: 'Teclado Mecânico', qtde_produto: 5, id_categoria: cat1.id_categoria },
            { nome_produto: 'Monitor 24"', qtde_produto: 10, id_categoria: cat1.id_categoria },
            { nome_produto: 'Webcam HD', qtde_produto: 3, id_categoria: cat1.id_categoria },
            { nome_produto: 'Arroz Integral 1kg', qtde_produto: 3, id_categoria: cat2.id_categoria },
            { nome_produto: 'Feijão Preto 1kg', qtde_produto: 8, id_categoria: cat2.id_categoria },
            { nome_produto: 'Macarrão 500g', qtde_produto: 6, id_categoria: cat2.id_categoria },
            { nome_produto: 'Camiseta Básica', qtde_produto: 1, id_categoria: cat3.id_categoria },
            { nome_produto: 'Calça Jeans', qtde_produto: 4, id_categoria: cat3.id_categoria }
        ];

        let totalPedidos = 0;
        for (const produtoData of produtos) {
            const transaction = await sequelize.transaction();
            try {
                const produto = await Produto.create(produtoData, { transaction });
                
                await produtoController.verificarECriarPedido(produto, transaction);
                
                await transaction.commit();
                
                let statusPedido = '';
                if (produto.qtde_produto <= 3) {
                    statusPedido = ' Pedido de 4 unidades criado';
                    totalPedidos++;
                } else if (produto.qtde_produto > 3 && produto.qtde_produto < 7) {
                    statusPedido = ' Pedido de 3 unidades criado';
                    totalPedidos++;
                } else {
                    statusPedido = ' Estoque OK (sem pedido)';
                }
                
                console.log(`   ${produto.nome_produto} (Qtd: ${produto.qtde_produto})${statusPedido}`);
            } catch (error) {
                await transaction.rollback();
                console.error(`Erro ao criar produto: ${error.message}`);
            }
        }

        console.log(`\nBanco populado com sucesso!`);
        console.log(`Total de pedidos criados: ${totalPedidos}`);
        console.log(`\nComandos úteis:`);
        console.log(`   - npm run dev (iniciar servidor)`);

        await sequelize.close();
    } catch (error) {
        console.error('Erro:', error.message);
    }
}

popularDados();