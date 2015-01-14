package br.gov.mj.sislegis.app.service;

import javax.ejb.Local;

import br.gov.mj.sislegis.app.model.ElaboracaoNormativaCoAutores;


@Local
public interface ElaboracaoNormativaCoAutoresService extends Service<ElaboracaoNormativaCoAutores> {
	public void deleteElaboracaoNormativaCoAutoresServiceEjb(Long id);

}
