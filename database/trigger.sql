DROP TRIGGER IF EXISTS trigger_atualizar_estoque;

DELIMITER //

CREATE TRIGGER trigger_atualizar_estoque
AFTER INSERT ON pedidos
FOR EACH ROW
BEGIN
    UPDATE produtos 
    SET qtde_produto = qtde_produto + NEW.qtde_pedido,
        updated_at = NOW()
    WHERE cod_produto = NEW.cod_produto;
END//

DELIMITER ;

-- Teste do trigger:
-- Ver o estoque atual de um produto
-- SELECT cod_produto, nome_produto, qtde_produto FROM produtos WHERE cod_produto = 1;

-- Inserir um pedido
-- INSERT INTO pedidos (cod_produto, qtde_pedido, created_at, updated_at) VALUES (1, 5, NOW(), NOW());

-- Verificar que o estoque aumentou em 5 unidades
-- SELECT cod_produto, nome_produto, qtde_produto FROM produtos WHERE cod_produto = 1;

-- Ver o pedido criado
-- SELECT * FROM pedidos ORDER BY num_pedido DESC LIMIT 1;