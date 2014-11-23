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
insert into Usuario(id, nome, email) values (nextval ('hibernate_sequence'), 'João', 'joao@joao.com');
insert into Usuario(id, nome, email) values (nextval ('hibernate_sequence'), 'Maria', 'maria@maria.com');
insert into Usuario(id, nome, email) values (nextval ('hibernate_sequence'), 'André', 'andre@andre.com');
insert into Usuario(id, nome, email) values (nextval ('hibernate_sequence'), 'Marcos', 'marcos@marcos.com');
insert into Usuario(id, nome, email) values (nextval ('hibernate_sequence'), 'Felipe', 'felipe@felipe.com');
insert into Usuario(id, nome, email) values (nextval ('hibernate_sequence'), 'Paula', 'paula@paula.com');

-- equipe
insert into equipe(id, nome) values (nextval ('hibernate_sequence'), 'Equipe 1');
insert into equipe(id, nome) values (nextval ('hibernate_sequence'), 'Equipe 2');
insert into equipe(id, nome) values (nextval ('hibernate_sequence'), 'Equipe 3');