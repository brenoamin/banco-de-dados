--Cria o banco de dados
CREATE DATABASE tabela_usuarios;
DROP TABLE IF EXISTS usuarios;
--1) Cria a tabela e adiciona os campos
CREATE TABLE usuarios(
	id serial,
  	nome text NOT NULL,
  	idade smallint,
  	email varchar(80),
  	senha varchar(8) NOT NULL
)
--2) Insere informações (Popula)
INSERT INTO usuarios (nome, idade, email, senha)
VALUES
('Aretha Montgomery', 30, 'augue.id.ante@odioAliquam.com','a0B13O3L'),
('Camden H. Bartlett', 15, 'turpis.vitae.purus@risusDuisa.ca','p3P96F3Q'),
('Raja W. Coffey', 30, 'raja.feugiat@nonummy.com','s5F51T7L'),
('Elton D. Olsen', 29, 'auctor@duiFuscediam.edu','k5X25B0R'),
('Shelley E. Frederick', 20, 'raja.feugiat@nonummy.com','u2D18F6E');


-- 3) Troca o nome do campo da tabela que apresenta o respectivo e-mail
UPDATE usuarios
SET nome='Raja W. Coffey Thomas' WHERE email='raja.feugiat@nonummy.com';
-- 4) Cria a condição para que o e-mail seja um campo único
ALTER TABLE usuarios
ADD CONSTRAINT restemail UNIQUE(email);
-- 4.1) Deleta a tabela onde id=5
DELETE FROM usuarios WHERE id=5;
-- 5) Insere informações (Popula)
INSERT INTO usuarios (nome, idade, email, senha)
VALUES
('Jermaine G. Sellers', 16, 'ligula.Nullam@tortordictum.co.uk','o2P56U9U'),
('James D. Kennedy', 23, 'amet@Nulladignissim.com','q6B78V3V'),
('Amelia S. Harris', 29, 'nec.metus.facilisis@vitaealiquet.edu','l4S64Y3A'),
('Joel M. Hartman', 18, 'montes.nascetur@odiotristique.co.uk','c4Q27D7O'),
('Elmo K. Greer', 18, 'risus.Duis@eget.ca','e3P92I7R');
-- 06 Adiciona uma nova coluna (situação) do tipo boolean na tabela usuarios *Caso não seja informado, por padrão é true;
ALTER TABLE usuarios
ADD COLUMN situacao boolean DEFAULT TRUE;
-- 07 Altera um dos campos da tabela usuarios;
UPDATE usuarios
SET situacao=false WHERE email='montes.nascetur@odiotristique.co.uk';
-- 08 Altera um dos campos da tabela usuarios;
UPDATE usuarios
SET senha='k9P31H1O' WHERE email='risus.Duis@eget.ca';
-- 09) Remove uma das colunas da tabela.  Cria uma tabela com o nome data_nascimento do tipo date
ALTER TABLE usuarios
DROP COLUMN idade;

ALTER TABLE usuarios
ADD COLUMN data_nascimento date;
-- 10) Altera um dos campos da tabela usuarios;
UPDATE usuarios
SET data_nascimento='1991-09-29' WHERE email='auctor@duiFuscediam.edu';

UPDATE usuarios
SET data_nascimento='1988-11-02' WHERE email='nec.metus.facilisis@vitaealiquet.edu';

-- 11) Deleta todas as linhas que apresentam o campo data_nascimento como NULO
DELETE FROM usuarios WHERE data_nascimento is NULL;

-- 12) Obriga a tabela data_nascimento não ser NULL
ALTER TABLE usuarios
ALTER COLUMN data_nascimento 
SET NOT NULL;
-- 13) Insere novos dados na tabela
INSERT INTO usuarios (nome, data_nascimento, email, senha)
VALUES
('Tate I. Dean', '1989-05-01',	'Nunc@etmagnis.edu', 'd3V25D6Y'),
('Arsenio K. Harmon', '1985-10-23',	'adipiscing.elit@turpis.com', 'm3T58S0C');