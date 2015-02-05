package br.gov.mj.sislegis.app.service;

import java.util.List;
import java.util.Map;

import javax.ejb.Local;

import br.gov.mj.sislegis.app.model.ElaboracaoNormativa;
import br.gov.mj.sislegis.app.model.Proposicao;

@Local
public interface ElaboracaoNormativaService extends Service<ElaboracaoNormativa> {
	public void salvar(ElaboracaoNormativa elaboracaoNormativa);
	public ElaboracaoNormativa buscaElaboracaoNormativaPorId(Long id);
	public List<ElaboracaoNormativa> listarTodos();
	public List<ElaboracaoNormativa> buscaPorParametros(Map<String, Object> mapaCampos);
	public List<ElaboracaoNormativa> buscarPorSufixo(String sufixo);
	public String consultaServicoWS(String nup);

}