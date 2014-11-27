package br.org.mj.sislegis.app.service;

import javax.ejb.Local;

import br.org.mj.sislegis.app.model.ElaboracaoNormativa;

@Local
public interface ElaboracaoNormativaService extends Service<ElaboracaoNormativa> {
	public void salvar(ElaboracaoNormativa elaboracaoNormativa);

}