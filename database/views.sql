USE loja_db;

-- Remover views se existirem
DROP VIEW IF EXISTS vw_dashboard_estoque;
DROP VIEW IF EXISTS vw_relatorio_pedidos_produto;

-- VIEW 1: Dashboard de Estoque Crítico
-- Objetivo: Visão consolidada para gestão de estoque
CREATE VIEW vw_dashboard_estoque AS
SELECT 
    p.cod_produto,
    p.nome_produto,
    c.nome_categoria,
    p.qtde_produto AS estoque_disponivel,
    CASE 
        WHEN p.qtde_produto <= 3 THEN 'CRÍTICO - Repor 4 unidades'
        WHEN p.qtde_produto BETWEEN 4 AND 6 THEN 'ALERTA - Repor 3 unidades'
        ELSE 'NORMAL'
    END AS status_estoque,
    CASE 
        WHEN p.qtde_produto <= 3 THEN 4
        WHEN p.qtde_produto BETWEEN 4 AND 6 THEN 3
        ELSE 0
    END AS quantidade_recomendada_pedido,
    p.updated_at AS ultima_atualizacao
FROM produtos p
INNER JOIN categorias c ON p.id_categoria = c.id_categoria
ORDER BY p.qtde_produto ASC;


-- VIEW 2: Relatório Consolidado de Pedidos por Produto
-- Objetivo: Análise de padrão de reposição por produto
CREATE VIEW vw_relatorio_pedidos_produto AS
SELECT 
    p.cod_produto,
    p.nome_produto,
    c.nome_categoria,
    COUNT(ped.num_pedido) AS total_pedidos,
    MIN(ped.qtde_pedido) AS menor_quantidade_pedida,
    MAX(ped.qtde_pedido) AS maior_quantidade_pedida,
    AVG(ped.qtde_pedido) AS media_quantidade_pedida,
    SUM(ped.qtde_pedido) AS total_unidades_pedidas,
    MIN(ped.created_at) AS primeiro_pedido,
    MAX(ped.created_at) AS ultimo_pedido,
    p.qtde_produto AS estoque_atual
FROM produtos p
INNER JOIN categorias c ON p.id_categoria = c.id_categoria
INNER JOIN pedidos ped ON p.cod_produto = ped.cod_produto
GROUP BY p.cod_produto, p.nome_produto, c.nome_categoria, p.qtde_produto
ORDER BY total_pedidos DESC, total_unidades_pedidas DESC;


-- Consultas
-- Ver TODOS os produtos no dashboard
-- SELECT * FROM vw_dashboard_estoque;

-- Ver apenas produtos CRÍTICOS e em ALERTA
--SELECT * FROM vw_dashboard_estoque WHERE status_estoque IN ('CRÍTICO - Repor 4 unidades', 'ALERTA - Repor 3 unidades');

-- Ver relatório de pedidos
-- SELECT * FROM vw_relatorio_pedidos_produto;