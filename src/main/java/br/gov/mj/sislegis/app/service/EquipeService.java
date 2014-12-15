package br.gov.mj.sislegis.app.service;

import javax.ejb.Local;

import br.gov.mj.sislegis.app.model.Equipe;

@Local
public interface EquipeService extends Service<Equipe> {
	
	public Equipe salvarEquipe(Equipe e);
	

}
