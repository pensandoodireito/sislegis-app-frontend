package br.org.mj.sislegis.app.service;

import java.util.Date;
import java.util.List;
import java.util.Map;

import javax.ejb.Local;

import br.org.mj.sislegis.app.json.ProposicaoJSON;
import br.org.mj.sislegis.app.model.Proposicao;

@Local
public interface ProposicaoService extends Service<Proposicao> {

	public List<Proposicao> buscarProposicoesPautaCamaraWS(Map parametros)throws Exception;
	public List<Proposicao> buscarProposicoesPautaSenadoWS(Map parametros)throws Exception;
	public Proposicao detalharProposicaoCamaraWS(Long id)throws Exception;
	public Proposicao detalharProposicaoSenadoWS(Long id)throws Exception;
	public void salvarListaProposicao(List<Proposicao> lista);
	public List<ProposicaoJSON> listarTodos();
	public ProposicaoJSON buscarPorId(Long id);
	public List<ProposicaoJSON> buscarProposicoesPorDataReuniao(Date dataReuniao);
	public void atualizaProposicaoJSON(ProposicaoJSON proposicaoJSON);
	public Proposicao buscarPorIdProposicao(Integer idProposicao);
}
