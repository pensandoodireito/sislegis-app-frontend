package br.org.mj.sislegis.app.service.ejbs;

import java.sql.SQLException;
import java.util.Date;
import java.util.HashSet;
import java.util.List;
import java.util.Map;

import javax.ejb.Stateless;
import javax.inject.Inject;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.sql.rowset.serial.SerialClob;

import br.org.mj.sislegis.app.model.Proposicao;
import br.org.mj.sislegis.app.model.Reuniao;
import br.org.mj.sislegis.app.parser.camara.ParserPautaCamara;
import br.org.mj.sislegis.app.parser.camara.ParserProposicaoCamara;
import br.org.mj.sislegis.app.parser.senado.ParserPautaSenado;
import br.org.mj.sislegis.app.parser.senado.ParserProposicaoSenado;
import br.org.mj.sislegis.app.service.AbstractPersistence;
import br.org.mj.sislegis.app.service.ProposicaoService;
import br.org.mj.sislegis.app.util.Conversores;
import br.org.mj.sislegis.app.util.SislegisUtil;

@Stateless
public class ProposicaoServiceEjb extends AbstractPersistence<Proposicao, Long>
implements ProposicaoService{
	
	@Inject
	private ParserPautaCamara parserPautaCamara;
	
	@Inject
	private ParserPautaSenado parserPautaSenado;
	
	@Inject
	private ParserProposicaoCamara parserProposicaoCamara;
	
	@Inject
	private ParserProposicaoSenado parserProposicaoSenado;
	
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
	public List<Proposicao> buscarProposicoesPautaCamaraWS(Map parametros) throws Exception {
		Long idComissao = (Long)parametros.get("idComissao");
		String dataIni = Conversores.dateToString((Date)parametros.get("data"), "yyyyMMdd");
		String dataFim = Conversores.dateToString(SislegisUtil.getDate(), "yyyyMMdd");
		return parserPautaCamara.getProposicoes(idComissao, dataIni, dataFim);
	}

	@Override
	public List<Proposicao> buscarProposicoesPautaSenadoWS(Map parametros) throws Exception {
		String siglaComissao = (String)parametros.get("siglaComissao");
		String dataIni = Conversores.dateToString((Date)parametros.get("data"), "yyyyMMdd");
		return parserPautaSenado.getProposicoes(siglaComissao, dataIni);
	}


	@Override
	public Proposicao detalharProposicaoSenadoWS(Long id) throws Exception {
		return parserProposicaoSenado.getProposicao(id);
	}

	@Override
	public Proposicao detalharProposicaoCamaraWS(Long id) throws Exception {
		return parserProposicaoCamara.getProposicao(id);
	}

	@Override
	public void salvarListaProposicao(List<Proposicao> lista) {
		for(Proposicao p: lista){
			if(p.getListaReunioes()==null)
				p.setListaReunioes(new HashSet<Reuniao>());
			
			Reuniao reuniao = new Reuniao();
			reuniao.setData(SislegisUtil.getDate());
			
			try {
				p.getListaReunioes().add(reuniao);
				p.setEmentaClob(new SerialClob(p.getEmenta().toCharArray()));
				save(p);
			} catch (SQLException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
			
		}
	}
	
	

	
}
