package br.org.mj.sislegis.app.service;

import java.util.List;

import javax.ejb.Local;

import br.org.mj.sislegis.app.model.ElaboracaoNormativa;

@Local
public interface ElaboracaoNormativaService extends Service<ElaboracaoNormativa> {
	public void salvar(ElaboracaoNormativa elaboracaoNormativa);
	public ElaboracaoNormativa buscaElaboracaoNormativaPorId(Long id);
	public List<ElaboracaoNormativa> listarTodos();

}