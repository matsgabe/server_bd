-- Acessar a database loja_db para validar as consultas

-- CONSULTA 1: Produtos com baixo estoque, suas categorias e pedidos relacionados (3 tabelas)
-- Objetivo: Identificar produtos críticos e o histórico de reposição
SELECT 
    p.cod_produto,
    p.nome_produto,
    p.qtde_produto AS estoque_atual,
    c.nome_categoria,
    COUNT(ped.num_pedido) AS total_pedidos,
    COALESCE(SUM(ped.qtde_pedido), 0) AS quantidade_total_pedida,
    CASE 
        WHEN p.qtde_produto <= 3 THEN 'CRÍTICO'
        WHEN p.qtde_produto BETWEEN 4 AND 6 THEN 'ALERTA'
        ELSE 'NORMAL'
    END AS status_estoque
FROM produtos p
INNER JOIN categorias c ON p.id_categoria = c.id_categoria
LEFT JOIN pedidos ped ON p.cod_produto = ped.cod_produto
WHERE p.qtde_produto < 10
GROUP BY p.cod_produto, p.nome_produto, p.qtde_produto, c.nome_categoria
ORDER BY p.qtde_produto ASC, total_pedidos DESC;


-- CONSULTA 2: Análise de pedidos por categoria (2 tabelas)
-- Objetivo: Entender quais categorias demandam mais reposição
SELECT 
    c.id_categoria,
    c.nome_categoria,
    COUNT(DISTINCT p.cod_produto) AS produtos_na_categoria,
    COUNT(ped.num_pedido) AS total_pedidos,
    AVG(ped.qtde_pedido) AS media_quantidade_pedido,
    SUM(ped.qtde_pedido) AS quantidade_total_pedida
FROM categorias c
INNER JOIN produtos p ON c.id_categoria = p.id_categoria
LEFT JOIN pedidos ped ON p.cod_produto = ped.cod_produto
GROUP BY c.id_categoria, c.nome_categoria
HAVING COUNT(ped.num_pedido) > 0
ORDER BY quantidade_total_pedida DESC;


-- CONSULTA 3: Produtos sem pedidos recentes e seu status de estoque (2 tabelas)
-- Objetivo: Identificar produtos que podem estar com estoque adequado ou sem movimentação
SELECT 
    p.cod_produto,
    p.nome_produto,
    c.nome_categoria,
    p.qtde_produto,
    COALESCE(MAX(ped.created_at), p.created_at) AS ultima_movimentacao,
    COUNT(ped.num_pedido) AS total_pedidos_historico,
    CASE 
        WHEN COUNT(ped.num_pedido) = 0 AND p.qtde_produto > 7 THEN 'Estoque Alto Sem Demanda'
        WHEN COUNT(ped.num_pedido) = 0 AND p.qtde_produto <= 7 THEN 'Sem Histórico de Pedidos'
        ELSE 'Com Pedidos'
    END AS situacao
FROM produtos p
INNER JOIN categorias c ON p.id_categoria = c.id_categoria
LEFT JOIN pedidos ped ON p.cod_produto = ped.cod_produto
GROUP BY p.cod_produto, p.nome_produto, c.nome_categoria, p.qtde_produto
ORDER BY total_pedidos_historico ASC, p.qtde_produto DESC;