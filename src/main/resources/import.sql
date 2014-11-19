--insert into Proposicao (id, ano, autor, dataApresentacao, idProposicao, numero, tipo, origem) values (1, '2014', 'Parlamentar 1', CURRENT_DATE, 464139, '6607', 'PL', 'CAMARA');
--insert into Proposicao (id, ano, autor, dataApresentacao, idProposicao, numero, tipo, origem) values (2, '2014', 'Parlamentar 2', CURRENT_DATE, 20918, '4491', 'PL', 'CAMARA');
--insert into Proposicao (id, ano, autor, dataApresentacao, idProposicao, numero, tipo, origem) values (3, '2014', 'Parlamentar 3', CURRENT_DATE, 529820, '2833', 'PL', 'CAMARA');

--insert into Reuniao (id, data) values (1, CURRENT_DATE);

--insert into ReuniaoProposicao(dataReuniao, siglaComissao, idProposicao, idReuniao) values (CURRENT_DATE, 'C_TESTE', 1, 1);

-- Posicionamentos
insert into Posicionamento (nome, id) values ('Acompanhar Relator', 100);
insert into Posicionamento (nome, id) values ('Acompanhar Substitutivo', 101);
insert into Posicionamento (nome, id) values ('Contrário', 102);
insert into Posicionamento (nome, id) values ('Contrário com Emendas', 103);
insert into Posicionamento (nome, id) values ('Contrário', 104);
insert into Posicionamento (nome, id) values ('Elaborar VTS', 105);
insert into Posicionamento (nome, id) values ('Favorável', 106);
insert into Posicionamento (nome, id) values ('Favorável com Emendas', 107);
insert into Posicionamento (nome, id) values ('Indiferente', 108);
insert into Posicionamento (nome, id) values ('Nada a opor', 109);
insert into Posicionamento (nome, id) values ('Não é tema do MJ', 110);
insert into Posicionamento (nome, id) values ('Previamente Contrário', 111);
insert into Posicionamento (nome, id) values ('Previamente Favorável', 112);
insert into Posicionamento (nome, id) values ('Previamente Indiferente', 113);
insert into Posicionamento (nome, id) values ('Previamente Nada a opor', 114);
insert into Posicionamento (nome, id) values ('Previamente Não é tema do MJ', 115);
insert into Posicionamento (nome, id) values ('Seguir pela Rejeição', 116);

-- Encaminhamentos
insert into Encaminhamento (nome, id) values ('Agendar Reunião', 100);
insert into Encaminhamento (nome, id) values ('Apenas Monitorar', 101);
insert into Encaminhamento (nome, id) values ('Cobrar Posicionamento', 102);
insert into Encaminhamento (nome, id) values ('Despachar Nota Técnica com o Secretário', 103);
insert into Encaminhamento (nome, id) values ('Elaborar Nota Técnica', 104);
insert into Encaminhamento (nome, id) values ('Elaborar VTS', 105);
insert into Encaminhamento (nome, id) values ('Enviar E-mail', 106);
insert into Encaminhamento (nome, id) values ('Fazer contato telefônico', 107);
insert into Encaminhamento (nome, id) values ('Incluir na Pauta Prioritária', 108);
insert into Encaminhamento (nome, id) values ('Pedir Retirada de Pauta', 109);
insert into Encaminhamento (nome, id) values ('Retirar da Pauta do MJ', 110);

-- Tags
insert into Tag (id) values('Ministério');
insert into Tag (id) values('Câmara');
insert into Tag (id) values('Senado');

-- Usuarios
insert into Usuario(id, nome, email) values (100, 'João', 'joao@joao.com');
insert into Usuario(id, nome, email) values (101, 'Maria', 'maria@maria.com');
insert into Usuario(id, nome, email) values (102, 'André', 'andre@andre.com');
insert into Usuario(id, nome, email) values (103, 'Marcos', 'marcos@marcos.com');
insert into Usuario(id, nome, email) values (104, 'Felipe', 'felipe@felipe.com');
insert into Usuario(id, nome, email) values (105, 'Paula', 'paula@paula.com');

-- equipe
insert into equipe(id, nome) values (100, 'Equipe 1');
insert into equipe(id, nome) values (101, 'Equipe 2');
insert into equipe(id, nome) values (102, 'Equipe 3');

-- equipe_usuario
insert into equipe_usuario(equipe_id, usuario_id, isCoordenador) values (100, 100, true);
insert into equipe_usuario(equipe_id, usuario_id, isCoordenador) values (100, 101, false);
insert into equipe_usuario(equipe_id, usuario_id, isCoordenador) values (100, 102, false);
insert into equipe_usuario(equipe_id, usuario_id, isCoordenador) values (100, 103, false);