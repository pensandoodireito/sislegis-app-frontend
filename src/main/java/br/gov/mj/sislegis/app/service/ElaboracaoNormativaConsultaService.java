package br.gov.mj.sislegis.app.service;

import java.util.List;

import javax.ejb.Local;

import br.gov.mj.sislegis.app.model.ElaboracaoNormativaConsulta;

@Local
public interface ElaboracaoNormativaConsultaService extends Service<ElaboracaoNormativaConsulta> {

	public List<ElaboracaoNormativaConsulta> pesquisaElaboracaoNormativaConsutaPorIdElaboracaoNormativa(Long idElaboracaoNormativa);
	public void deleteElaboracaoNormativaConsutaPorIdElaboracaoNormativa(Long id);
	
}
