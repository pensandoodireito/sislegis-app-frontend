package br.org.mj.sislegis.app.service;

import java.util.List;

import javax.ejb.Local;
import javax.ws.rs.core.UriInfo;

import br.org.mj.sislegis.app.model.EncaminhamentoProposicao;

@Local
public interface EncaminhamentoProposicaoService extends Service<EncaminhamentoProposicao> {

	EncaminhamentoProposicao salvarEncaminhamentoProposicao(EncaminhamentoProposicao encaminhamentoProposicao, UriInfo uriInfo);
	List<EncaminhamentoProposicao> findByProposicao(Long id);

}
