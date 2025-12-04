-- Trigger para atualizar automaticamente o estoque quando um pedido é criado
-- Objetivo: Simular que quando um pedido é registrado, o estoque aumenta

CREATE OR REPLACE FUNCTION atualizar_estoque_apos_pedido()
RETURNS TRIGGER AS $$
BEGIN
    UPDATE produtos 
    SET qtde_produto = qtde_produto + NEW.qtde_pedido,
        updated_at = NOW()
    WHERE cod_produto = NEW.cod_produto;
    
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_atualizar_estoque
AFTER INSERT ON pedidos
FOR EACH ROW
EXECUTE FUNCTION atualizar_estoque_apos_pedido();

-- Teste do trigger:
-- Ao inserir um pedido: INSERT INTO pedidos (cod_produto, qtde_pedido) VALUES (1, 4);
-- O estoque do produto 1 será automaticamente incrementado em 4 unidades