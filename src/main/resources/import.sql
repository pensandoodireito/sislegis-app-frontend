insert into Reuniao (id, data, version) values (1, CURRENT_DATE, 0);

--insert into Proposicao (id, ano, autor, dataApresentacao, idProposicao, numero, tipo, origem) values (1, '2014', 'Parlamentar 1', CURRENT_DATE, 464139, '6607', 'PL', 'CAMARA');
--insert into Proposicao (id, ano, autor, dataApresentacao, idProposicao, numero, tipo, origem) values (2, '2014', 'Parlamentar 2', CURRENT_DATE, 20918, '4491', 'PL', 'CAMARA');
--insert into Proposicao (id, ano, autor, dataApresentacao, idProposicao, numero, tipo, origem) values (3, '2014', 'Parlamentar 3', CURRENT_DATE, 529820, '2833', 'PL', 'CAMARA');

--insert into Reuniao (id, data) values (1, CURRENT_DATE);

--insert into ReuniaoProposicao(dataReuniao, siglaComissao, idProposicao, idReuniao) values (CURRENT_DATE, 'C_TESTE', 1, 1);

-- Posicionamentos
insert into Posicionamento (nome, id) values ('Acompanhar Relator', 1);
insert into Posicionamento (nome, id) values ('Acompanhar Substitutivo', 2);
insert into Posicionamento (nome, id) values ('Contrário', 3);
insert into Posicionamento (nome, id) values ('Contrário com Emendas', 4);
insert into Posicionamento (nome, id) values ('Contrário', 5);
insert into Posicionamento (nome, id) values ('Elaborar VTS', 6);
insert into Posicionamento (nome, id) values ('Favorável', 7);
insert into Posicionamento (nome, id) values ('Favorável com Emendas', 8);
insert into Posicionamento (nome, id) values ('Indiferente', 9);
insert into Posicionamento (nome, id) values ('Nada a opor', 10);
insert into Posicionamento (nome, id) values ('Não é tema do MJ', 11);
insert into Posicionamento (nome, id) values ('Previamente Contrário', 12);
insert into Posicionamento (nome, id) values ('Previamente Favorável', 13);
insert into Posicionamento (nome, id) values ('Previamente Indiferente', 14);
insert into Posicionamento (nome, id) values ('Previamente Nada a opor', 15);
insert into Posicionamento (nome, id) values ('Previamente Não é tema do MJ', 16);
insert into Posicionamento (nome, id) values ('Seguir pela Rejeição', 17);

-- Encaminhamentos
insert into Encaminhamento (nome, id) values ('Agendar Reunião', 1);
insert into Encaminhamento (nome, id) values ('Apenas Monitorar', 2);
insert into Encaminhamento (nome, id) values ('Cobrar Posicionamento', 3);
insert into Encaminhamento (nome, id) values ('Despachar Nota Técnica com o Secretário', 4);
insert into Encaminhamento (nome, id) values ('Elaborar Nota Técnica', 5);
insert into Encaminhamento (nome, id) values ('Elaborar VTS', 6);
insert into Encaminhamento (nome, id) values ('Enviar E-mail', 7);
insert into Encaminhamento (nome, id) values ('Fazer contato telefônico', 8);
insert into Encaminhamento (nome, id) values ('Incluir na Pauta Prioritária', 9);
insert into Encaminhamento (nome, id) values ('Pedir Retirada de Pauta', 10);
insert into Encaminhamento (nome, id) values ('Retirar da Pauta do MJ', 11);

-- Tags
insert into Tag (id) values('Ministério');
insert into Tag (id) values('Câmara');
insert into Tag (id) values('Senado');

-- Usuarios
insert into Usuario(id, nome, email) values (1, 'João', 'joao@joao.com');
insert into Usuario(id, nome, email) values (2, 'Maria', 'maria@maria.com');
insert into Usuario(id, nome, email) values (3, 'André', 'andre@andre.com');
insert into Usuario(id, nome, email) values (4, 'Marcos', 'marcos@marcos.com');
insert into Usuario(id, nome, email) values (5, 'Felipe', 'felipe@felipe.com');
insert into Usuario(id, nome, email) values (6, 'Paula', 'paula@paula.com');