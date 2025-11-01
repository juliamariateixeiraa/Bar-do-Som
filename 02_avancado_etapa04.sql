CREATE INDEX idx_pedidos_data_hora ON pedidos(data_hora);

CREATE INDEX idx_produtos_nome ON produtos(nome);


SELECT
    c.id_cliente,
    c.nome,
    c.email
FROM
    clientes c
LEFT JOIN
    pedidos p ON c.id_cliente = p.id_cliente
WHERE
    p.id_pedido IS NULL;


(
    SELECT
        c.nome AS nome_cliente,
        r.id_reserva,
        r.data_reserva
    FROM
        clientes c
    LEFT JOIN
        reservas r ON c.id_cliente = r.id_cliente
)
UNION
(
    SELECT
        'Cliente Excluído/Desconhecido' AS nome_cliente,
        r.id_reserva,
        r.data_reserva
    FROM
        reservas r
    LEFT JOIN
        clientes c ON r.id_cliente = c.id_cliente
    WHERE
        c.id_cliente IS NULL
);


SELECT
    p.id_produto,
    p.nome,
    p.estoque
FROM
    produtos p
WHERE
    p.id_produto NOT IN (
        SELECT DISTINCT id_produto
        FROM pedido_produto
    );


SELECT
    c.nome AS nome_cliente_do_maior_pedido,
    p.total AS maior_valor_pedido
FROM
    clientes c
JOIN
    pedidos p ON c.id_cliente = p.id_cliente
WHERE
    p.total = (
        SELECT MAX(total)
        FROM pedidos
    );


CREATE VIEW VisaoDetalhesPedidos AS
SELECT
    p.id_pedido,
    p.data_hora AS data_hora_pedido,
    c.nome AS nome_cliente,
    m.numero AS numero_mesa,
    pr.nome AS nome_produto,
    pp.quantidade,
    pr.preco AS preco_unitario,
    (pp.quantidade * pr.preco) AS subtotal_item,
    p.total AS total_pedido
FROM
    pedidos p
JOIN clientes c ON p.id_cliente = c.id_cliente
JOIN mesas m ON p.id_mesa = m.id_mesa
JOIN pedido_produto pp ON p.id_pedido = pp.id_pedido
JOIN produtos pr ON pp.id_produto = pr.id_produto;

CREATE VIEW VisaoEventosArtistas AS
SELECT
    e.nome AS nome_evento,
    e.data AS data_evento,
    e.hora AS hora_evento,
    e.valor_ingresso,
    ba.nome AS nome_banda_artista,
    ba.tipo AS tipo_artista,
    ba.estilo
FROM
    eventos e
JOIN participacao pa ON e.id_evento = pa.id_evento
JOIN banda_artista ba ON pa.id_banda = ba.id_banda;
