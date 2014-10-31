--insert into Reuniao (id, data, version) values (1, CURRENT_DATE, 0);

--insert into Proposicao (id, ano, autor, dataApresentacao, ementa, idProposicao, numero, tipo, origem) values (1, '2014', 'Parlamentar 1', CURRENT_DATE, 'Determina a concessão de auxílio alimentação aos trabalhadores de empresas prestadoras de serviços terceirizados, reguladas por Enunciado do Tribunal Superior do Trabalho.', 464139, '6607', 'PL', 'C');
--insert into Proposicao (id, ano, autor, dataApresentacao, ementa, idProposicao, numero, tipo, origem) values (2, '2014', 'Parlamentar 2', CURRENT_DATE, 'Dispõe sobre o armazenamento de botijões de gás liquefeito de petróleo-GLP e de outras providências.', 20918, '4491', 'PL', 'C');
--insert into Proposicao (id, ano, autor, dataApresentacao, ementa, idProposicao, numero, tipo, origem) values (3, '2014', 'Parlamentar 3', CURRENT_DATE, 'Criminaliza condutas praticadas contra cães e gatos, e de outras providências.', 529820, '2833', 'PL', 'C');

--insert into Reuniao_Proposicao values (1, 1);
--insert into Reuniao_Proposicao values (1, 2);
--insert into Reuniao_Proposicao values (1, 3);

insert into Posicionamento (id, nome) values (1, 'Favoravel');
insert into Posicionamento (id, nome) values (2, 'Nao favoravel');
insert into Posicionamento (id, nome) values (3, 'Nao interessa');
insert into Posicionamento (id, nome) values (4, 'Outro posicionamento');