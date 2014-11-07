package br.org.mj.sislegis.app.service;

import java.util.List;

import javax.ejb.Local;

import br.org.mj.sislegis.app.model.EncaminhamentoProposicao;

@Local
public interface EncaminhamentoProposicaoService extends Service<EncaminhamentoProposicao> {

	List<EncaminhamentoProposicao> findByProposicao(Long id);

}
