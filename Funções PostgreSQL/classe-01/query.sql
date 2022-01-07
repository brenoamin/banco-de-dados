SELECT distinct count(estoque) as quantidade from farmacia;
SELECT min(idade) as menor from usuarios;
SELECT max(idade) as maior from usuarios;
SELECT avg (idade) from usuarios WHERE idade >=18;
SELECT sum(estoque) from farmacia WHERE categoria='blue' OR categoria='black';
SELECT categoria, sum(estoque) from farmacia WHERE categoria is NOT NULL GROUP BY categoria ;
SELECT sum(estoque) from farmacia WHERE categoria is NULL or categoria='';
SELECT count(estoque) from farmacia WHERE categoria is NULL or categoria='';
SELECT concat(medicamento || '  ' || '(' || categoria || ')') from farmacia WHERE categoria is not NULL;
SELECT id || ' - ' || medicamento || ' ' || COALESCE ('(' || categoria || ')','(sem categoria) ') from farmacia;
SELECT nome,idade, CAST(cadastro AS date) from usuarios WHERE cadastro>='2020' AND cadastro<'2021';
SELECT nome,idade,email, AGE(CAST(cadastro AS timestamp)) FROM usuarios WHERE idade<18;
SELECT nome,idade,email, AGE(CAST(cadastro AS date)) FROM usuarios WHERE idade>=60;
SELECT categoria, count(estoque) from farmacia WHERE categoria is NOT NULL GROUP BY categoria;
SELECT idade, count(*) as registros from usuarios where idade>=18 GROUP BY idade;
SELECT distinct categoria, sum(estoque) from farmacia WHERE categoria is NOT NULL GROUP BY categoria LIMIT 3;







