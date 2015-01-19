package br.gov.mj.sislegis.app.service;


import javax.ejb.Local;

import br.gov.mj.sislegis.app.model.ReuniaoProposicao;

@Local
public interface ReuniaoProposicaoService extends Service<ReuniaoProposicao> {
	
	public ReuniaoProposicao findById(Long idReuniao, Long idProposicao);
	public void deleteById(Long idReuniao, Long idProposicao);
	
}
