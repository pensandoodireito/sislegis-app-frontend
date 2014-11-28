--insert into Proposicao (id, ano, autor, dataApresentacao, idProposicao, numero, tipo, origem) values (1, '2014', 'Parlamentar 1', CURRENT_DATE, 464139, '6607', 'PL', 'CAMARA');
--insert into Proposicao (id, ano, autor, dataApresentacao, idProposicao, numero, tipo, origem) values (2, '2014', 'Parlamentar 2', CURRENT_DATE, 20918, '4491', 'PL', 'CAMARA');
--insert into Proposicao (id, ano, autor, dataApresentacao, idProposicao, numero, tipo, origem) values (3, '2014', 'Parlamentar 3', CURRENT_DATE, 529820, '2833', 'PL', 'CAMARA');

--insert into Reuniao (id, data) values (1, CURRENT_DATE);

--insert into ReuniaoProposicao(dataReuniao, siglaComissao, idProposicao, idReuniao) values (CURRENT_DATE, 'C_TESTE', 1, 1);

-- Posicionamentos
insert into Posicionamento (nome, id) values ('Acompanhar Relator', nextval ('hibernate_sequence'));
insert into Posicionamento (nome, id) values ('Acompanhar Substitutivo', nextval ('hibernate_sequence'));
insert into Posicionamento (nome, id) values ('Contrário', nextval ('hibernate_sequence'));
insert into Posicionamento (nome, id) values ('Contrário com Emendas', nextval ('hibernate_sequence'));
insert into Posicionamento (nome, id) values ('Contrário', nextval ('hibernate_sequence'));
insert into Posicionamento (nome, id) values ('Elaborar VTS', nextval ('hibernate_sequence'));
insert into Posicionamento (nome, id) values ('Favorável', nextval ('hibernate_sequence'));
insert into Posicionamento (nome, id) values ('Favorável com Emendas', nextval ('hibernate_sequence'));
insert into Posicionamento (nome, id) values ('Indiferente', nextval ('hibernate_sequence'));
insert into Posicionamento (nome, id) values ('Nada a opor', nextval ('hibernate_sequence'));
insert into Posicionamento (nome, id) values ('Não é tema do MJ', nextval ('hibernate_sequence'));
insert into Posicionamento (nome, id) values ('Previamente Contrário', nextval ('hibernate_sequence'));
insert into Posicionamento (nome, id) values ('Previamente Favorável', nextval ('hibernate_sequence'));
insert into Posicionamento (nome, id) values ('Previamente Indiferente', nextval ('hibernate_sequence'));
insert into Posicionamento (nome, id) values ('Previamente Nada a opor', nextval ('hibernate_sequence'));
insert into Posicionamento (nome, id) values ('Previamente Não é tema do MJ', nextval ('hibernate_sequence'));
insert into Posicionamento (nome, id) values ('Seguir pela Rejeição', nextval ('hibernate_sequence'));

-- Encaminhamentos
insert into Encaminhamento (nome, id) values ('Agendar Reunião', nextval ('hibernate_sequence'));
insert into Encaminhamento (nome, id) values ('Apenas Monitorar', nextval ('hibernate_sequence'));
insert into Encaminhamento (nome, id) values ('Cobrar Posicionamento', nextval ('hibernate_sequence'));
insert into Encaminhamento (nome, id) values ('Despachar Nota Técnica com o Secretário', nextval ('hibernate_sequence'));
insert into Encaminhamento (nome, id) values ('Elaborar Nota Técnica', nextval ('hibernate_sequence'));
insert into Encaminhamento (nome, id) values ('Elaborar VTS', nextval ('hibernate_sequence'));
insert into Encaminhamento (nome, id) values ('Enviar E-mail', nextval ('hibernate_sequence'));
insert into Encaminhamento (nome, id) values ('Fazer contato telefônico', nextval ('hibernate_sequence'));
insert into Encaminhamento (nome, id) values ('Incluir na Pauta Prioritária', nextval ('hibernate_sequence'));
insert into Encaminhamento (nome, id) values ('Pedir Retirada de Pauta', nextval ('hibernate_sequence'));
insert into Encaminhamento (nome, id) values ('Retirar da Pauta do MJ', nextval ('hibernate_sequence'));

-- Tags
insert into Tag (id) values('Ministério');
insert into Tag (id) values('Câmara');
insert into Tag (id) values('Senado');

-- Usuarios
DELETE FROM Usuario;
INSERT INTO Usuario (id, nome, email) VALUES(1, 'Matheus Oliveira', 'matheus.neves@gmail.com');
INSERT INTO Usuario (id, nome, email) VALUES(2, 'Guilherme Alberto Almeida de Almeida', 'guialmeida@gmail.com');
INSERT INTO Usuario (id, nome, email) VALUES(3, 'Sabrina ', 'sabrina.marques@mj.gov.br');
INSERT INTO Usuario (id, nome, email) VALUES(4, 'Anna Claudia Pardini Vazzoler ', 'anna.pardini@mj.gov.br');
INSERT INTO Usuario (id, nome, email) VALUES(5, 'Patrick Mariano Gomes', 'patrick.gomes@mj.gov.br');
INSERT INTO Usuario (id, nome, email) VALUES(6, 'Márcio Lopes de Freitas Filho', 'marcio.freitas@mj.gov.br');
INSERT INTO Usuario (id, nome, email) VALUES(7, 'Ricardo Lobo da Luz', 'ricardo.luz@mj.gov.br');
INSERT INTO Usuario (id, nome, email) VALUES(8, 'Leandro Guedes', 'leandro.guedes@mj.gov.br');
INSERT INTO Usuario (id, nome, email) VALUES(9, 'Ricardo Horta', 'ricardo.horta@mj.gov.br');
INSERT INTO Usuario (id, nome, email) VALUES(10, 'Helena Romeu dos Anjos', 'helena.anjos@mj.gov.br');
INSERT INTO Usuario (id, nome, email) VALUES(11, 'Renata Cristina do Nascimento Antão', 'renata.antao@mj.gov.br');
INSERT INTO Usuario (id, nome, email) VALUES(12, 'Rodrigo  Barros de Souza', 'rodrigo.debarros@mj.gov.br');
INSERT INTO Usuario (id, nome, email) VALUES(13, 'Pedro Henrique Costa Godeiro Carlos', 'pedro.carlos@mj.gov.br');
INSERT INTO Usuario (id, nome, email) VALUES(14, 'Angelina Aparecida Dourado Santos', 'angelina.dsantos@mj.gov.br');
INSERT INTO Usuario (id, nome, email) VALUES(15, 'Emmanoele Monique de Souza da Luz', 'emmanoele.luz');
INSERT INTO Usuario (id, nome, email) VALUES(16, 'Sabrina Durigon Marques', 'sabrina.marques@mj.gov.br');
INSERT INTO Usuario (id, nome, email) VALUES(17, 'Ana Maria de Souza Serafim', 'ana.serafim@mj.gov.br');
INSERT INTO Usuario (id, nome, email) VALUES(18, 'Damiane Alves', 'damiane.alves@mj.gov.br');
INSERT INTO Usuario (id, nome, email) VALUES(19, 'Luciana Felix Ferreira', 'luciana.fferreira@mj.gov.br');
INSERT INTO Usuario (id, nome, email) VALUES(20, 'Carolina Amaral Venuto', 'carolina.venuto@mj.gov.br');
INSERT INTO Usuario (id, nome, email) VALUES(21, 'Nayara Leao', 'nayara.nunes@mj.gov.br');
INSERT INTO Usuario (id, nome, email) VALUES(22, 'Renata Souto Martins', 'renata.martins@mj.gov.br');
INSERT INTO Usuario (id, nome, email) VALUES(23, 'Guilherme Moraes-Rego', 'guilherme.moraesrego@mj.gov.br');
INSERT INTO Usuario (id, nome, email) VALUES(24, 'Marcelo Chilvarquer', 'marcelo.chilvarquer@mj.gov.br');
INSERT INTO Usuario (id, nome, email) VALUES(25, 'Natalia Dino', 'natalia.dino@mj.gov.br');
INSERT INTO Usuario (id, nome, email) VALUES(26, 'Vladimir Sampaio Soares de Lima', 'vladimir.lima@mj.gov.br');
INSERT INTO Usuario (id, nome, email) VALUES(27, 'Marcel Fortes de Oliveira Portela', 'marcel.portela@mj.gov.br');
INSERT INTO Usuario (id, nome, email) VALUES(28, 'Walter Barbosa Vitor', 'walter.vitor@mj.gov.br');
INSERT INTO Usuario (id, nome, email) VALUES(29, 'Paula  Lacerda Resende', 'paula.lacerda@mj.gov.br');
INSERT INTO Usuario (id, nome, email) VALUES(30, 'Ricardo Horta', 'ricardo.horta@mj.gov.br');
INSERT INTO Usuario (id, nome, email) VALUES(31, 'Lauana da Silva Fernandes', 'lauana.fernandes@mj.gov.br');
INSERT INTO Usuario (id, nome, email) VALUES(32, 'Ligia  Gonçalves Ramos', 'ligia.ramos@mj.gov.br');
INSERT INTO Usuario (id, nome, email) VALUES(33, 'Ivone  Marques de Oliveira', 'ivone.oliveira@mj.gov.br');
INSERT INTO Usuario (id, nome, email) VALUES(34, 'Nathalia  Alves Almeida', 'nathalia.aalmeida@mj.gov.br');
INSERT INTO Usuario (id, nome, email) VALUES(35, 'Marcos Aurélio  Nunes da Fonseca', 'marcos.fonseca@mj.gov.br');
INSERT INTO Usuario (id, nome, email) VALUES(36, 'Luiz Albuquerque Couto', 'dep.luizcouto@camara.gov.br');
INSERT INTO Usuario (id, nome, email) VALUES(37, 'Fernanda Mendes Soares', 'fernanda.msoares@mj.gov.br');
INSERT INTO Usuario (id, nome, email) VALUES(38, 'Antônia Silva', 'antonia.silva@mj.gov.br');
INSERT INTO Usuario (id, nome, email) VALUES(39, 'Elaine  Lopes Santana de Abreu', 'elaine.abreu@mj.gov.br');
INSERT INTO Usuario (id, nome, email) VALUES(40, 'Priscilla Seixas Costa', 'priscilla.seixascosta@gmail.com');
INSERT INTO Usuario (id, nome, email) VALUES(41, 'João Vitor Rodrigues Loureiro', 'joao.loureiro@mj.gov.br');
INSERT INTO Usuario (id, nome, email) VALUES(42, 'João Vitor Loureiro', 'joao.loureiro@mj.gov.br');
INSERT INTO Usuario (id, nome, email) VALUES(43, 'Tiago Toigo', 'tiagott@gmail.com');
INSERT INTO Usuario (id, nome, email) VALUES(44, 'Maria Eduarda Ribeiro Cintra', 'eduarda.cintra@mj.gov.br');
INSERT INTO Usuario (id, nome, email) VALUES(45, 'Hamilton Gomes', 'hamilton.gomes@mj.gov.br');
INSERT INTO Usuario (id, nome, email) VALUES(46, 'Rodrigo Mercante', 'rodrigo.mercante@mj.gov.br');
INSERT INTO Usuario (id, nome, email) VALUES(47, 'Eduardo Paiva', 'eduardo.paiva@mj.gov.br');
INSERT INTO Usuario (id, nome, email) VALUES(48, 'Bruna Mendes', 'bruna.mendes@mj.gov.br');
INSERT INTO Usuario (id, nome, email) VALUES(49, 'Marco Antonio Konopacki', 'marco.konopacki@mj.gov.br');
INSERT INTO Usuario (id, nome, email) VALUES(50, 'Bruna Piazzi', 'bruna.piazzi@mj.gov.br');
INSERT INTO Usuario (id, nome, email) VALUES(51, 'Edriene dos Santos Oliveira', 'edriene.oliveira@mj.gov.br');
INSERT INTO Usuario (id, nome, email) VALUES(52, 'Yara Campos Souto', 'yara.souto@mj.gov.br');

-- equipe
insert into equipe(id, nome) values (nextval ('hibernate_sequence'), 'Equipe 1');
insert into equipe(id, nome) values (nextval ('hibernate_sequence'), 'Equipe 2');
insert into equipe(id, nome) values (nextval ('hibernate_sequence'), 'Equipe 3');
