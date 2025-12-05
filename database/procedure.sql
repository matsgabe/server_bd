DROP PROCEDURE IF EXISTS processar_reposicao_categoria;

DELIMITER //

CREATE PROCEDURE processar_reposicao_categoria(
    IN p_id_categoria INT
)
BEGIN
    DECLARE v_cod_produto INT;
    DECLARE v_nome_produto VARCHAR(150);
    DECLARE v_qtde_produto INT;
    DECLARE v_qtde_pedido INT;
    DECLARE v_total_pedidos INT DEFAULT 0;
    DECLARE done INT DEFAULT FALSE;
    
    DECLARE cur_produtos CURSOR FOR 
        SELECT cod_produto, nome_produto, qtde_produto 
        FROM produtos 
        WHERE id_categoria = p_id_categoria;
    
    DECLARE CONTINUE HANDLER FOR NOT FOUND SET done = TRUE;
    
    OPEN cur_produtos;
    
    read_loop: LOOP
        FETCH cur_produtos INTO v_cod_produto, v_nome_produto, v_qtde_produto;
        
        IF done THEN
            LEAVE read_loop;
        END IF;
        
        IF v_qtde_produto <= 3 THEN
            SET v_qtde_pedido = 4;
        ELSEIF v_qtde_produto > 3 AND v_qtde_produto < 7 THEN
            SET v_qtde_pedido = 3;
        ELSE
            SET v_qtde_pedido = 0;
        END IF;
        
        IF v_qtde_pedido > 0 THEN
            INSERT INTO pedidos (cod_produto, qtde_pedido, created_at, updated_at)
            VALUES (v_cod_produto, v_qtde_pedido, NOW(), NOW());
            
            SET v_total_pedidos = v_total_pedidos + 1;
        END IF;
        
    END LOOP;
    
    CLOSE cur_produtos;
    
    SELECT v_total_pedidos AS total_pedidos_criados;
    
END//

DELIMITER ;

-- CALL processar_reposicao_categoria(1);
-- Isso criará pedidos para todos os produtos da categoria 1 que necessitem reposição

-- Execução do procedure

-- SELECT p.cod_produto, p.nome_produto, p.qtde_produto, c.nome_categoria FROM produtos p JOIN categorias c ON p.id_categoria = c.id_categoria WHERE p.id_categoria = 1;

-- CALL processar_reposicao_categoria(1);

-- Ver pedidos criados
-- SELECT ped.num_pedido, p.nome_produto, ped.qtde_pedido, ped.created_at FROM pedidos ped JOIN produtos p ON ped.cod_produto = p.cod_produto WHERE p.id_categoria = 1 ORDER BY ped.num_pedido DESC;