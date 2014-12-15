package br.gov.mj.sislegis.app.service;

import java.util.List;

import javax.ejb.Local;

import br.gov.mj.sislegis.app.model.EncaminhamentoProposicao;

@Local
public interface EncaminhamentoProposicaoService extends Service<EncaminhamentoProposicao> {

	EncaminhamentoProposicao salvarEncaminhamentoProposicao(EncaminhamentoProposicao encaminhamentoProposicao, String referer);
	List<EncaminhamentoProposicao> findByProposicao(Long id);

}
