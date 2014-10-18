package br.org.mj.sislegis.app.service.ejbs;

import java.util.Date;
import java.util.List;
import java.util.Map;

import javax.ejb.Stateless;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

import br.org.mj.sislegis.app.model.Proposicao;
import br.org.mj.sislegis.app.parser.camara.ParserPautaCamara;
import br.org.mj.sislegis.app.parser.senado.ParserPautaSenado;
import br.org.mj.sislegis.app.service.AbstractPersistence;
import br.org.mj.sislegis.app.service.ProposicaoService;
import br.org.mj.sislegis.app.util.Conversores;
import br.org.mj.sislegis.app.util.SislegisUtil;

@Stateless
public class ProposicaoServiceEjb extends AbstractPersistence<Proposicao, Long>
implements ProposicaoService{
	
	@PersistenceContext
    private EntityManager em;
	
	public ProposicaoServiceEjb() {
		super(Proposicao.class);
	}

	@Override
	protected EntityManager getEntityManager() {
		// TODO Auto-generated method stub
		return em;
	}

	@Override
	public List<Proposicao> buscarProposicoesPautaCamara(Map parametros) throws Exception {
		Long idComissao = (Long)parametros.get("idComissao");
		String dataIni = Conversores.dateToString((Date)parametros.get("data"));
		String dataFim = SislegisUtil.getDataAtual();
		
		return new ParserPautaCamara().getProposicoes(idComissao, dataIni, dataFim);
	}

	@Override
	public List<Proposicao> buscarProposicoesPautaSenado(Map parametros) throws Exception {
		String siglaComissao = (String)parametros.get("siglaComissao");
		String data = Conversores.dateToString((Date)parametros.get("data"));
		return new ParserPautaSenado().getProposicoes(siglaComissao, data);
	}

	
}
