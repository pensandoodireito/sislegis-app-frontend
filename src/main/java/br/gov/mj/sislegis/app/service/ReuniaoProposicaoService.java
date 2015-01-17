package br.gov.mj.sislegis.app.service;


import javax.ejb.Local;

import br.gov.mj.sislegis.app.model.ReuniaoProposicao;

@Local
public interface ReuniaoProposicaoService extends Service<ReuniaoProposicao> {
	
	public void deleteById(Long idReuniao, Long idProposicao);

}
