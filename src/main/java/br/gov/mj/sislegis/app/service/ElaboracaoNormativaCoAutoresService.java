package br.gov.mj.sislegis.app.service;

import java.util.List;

import javax.ejb.Local;

import br.gov.mj.sislegis.app.model.ElaboracaoNormativaCoAutores;
import br.gov.mj.sislegis.app.model.ElaboracaoNormativaCoAutoresPK;


@Local
public interface ElaboracaoNormativaCoAutoresService extends Service<ElaboracaoNormativaCoAutores> {
	public void deleteElaboracaoNormativaCoAutoresServiceEjb(ElaboracaoNormativaCoAutoresPK elaboracaoNormativaCoAutoresPK);
	public ElaboracaoNormativaCoAutores pesquisaPorElaboracaoNormativaById(Long idElaboracaoNormativa, Long idOrgao);
	public List<ElaboracaoNormativaCoAutores> pesquisaPorElaboracaoNormativa(Long idElaboracaoNormativa);

}
