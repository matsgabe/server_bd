-- Procedure para processar reposição de estoque de múltiplos produtos de uma categoria
-- Objetivo: Automatizar o processo de criação de pedidos para todos os produtos 
-- de uma categoria que estejam com estoque baixo

CREATE OR REPLACE PROCEDURE processar_reposicao_categoria(
    p_id_categoria INTEGER
)
LANGUAGE plpgsql
AS $$
DECLARE
    v_produto RECORD;
    v_