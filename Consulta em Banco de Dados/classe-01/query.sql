SELECT * FROM musicas;
SELECT compositor, id FROM musicas;
SELECT composicao, tempo FROM musicas WHERE tempo>240;
SELECT compositor, composicao FROM musicas WHERE id BETWEEN 47 AND 123;
SELECT * FROM musicas WHERE compositor IS NOT NULL AND tempo<300 AND compositor<>'Bach';
SELECT composicao, tempo FROM musicas WHERE compositor='Mozart' OR compositor='Bach';
SELECT *FROM musicas ORDER BY id DESC;
SELECT *FROM musicas ORDER BY tempo DESC;
SELECT * FROM musicas ORDER BY tempo ASC LIMIT 5;
SELECT * FROM musicas ORDER BY tempo DESC LIMIT 10;
SELECT * FROM musicas ORDER by tempo ASC LIMIT 10 OFFSET 5
SELECT * FROM musicas  LIMIT 10 OFFSET 30;
SELECT * FROM musicas  LIMIT 12 OFFSET 60;
SELECT distinct compositor FROM musicas WHERE compositor IS NOT NULL;
SELECT distinct compositor,composicao FROM musicas;
SELECT * FROM musicas WHERE compositor LIKE 'Bra%';
SELECT * FROM musicas WHERE ritmo LIKE '%troppo';
SELECT * FROM musicas WHERE composicao ILIKE '%quartet%';
SELECT * FROM musicas WHERE composicao NOT ILIKE '%quintet%';
