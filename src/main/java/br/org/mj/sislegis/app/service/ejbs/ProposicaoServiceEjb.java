package br.org.mj.sislegis.app.service.ejbs;

import java.sql.SQLException;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashSet;
import java.util.List;
import java.util.Map;

import javax.ejb.Stateless;
import javax.inject.Inject;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;
import javax.sql.rowset.serial.SerialClob;

import br.org.mj.sislegis.app.model.Proposicao;
import br.org.mj.sislegis.app.model.ProposicaoJSON;
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
				
				Proposicao proposicao =null;
				if(p.getOrigem()=='C'){
					proposicao = detalharProposicaoCamaraWS(Long.valueOf(p.getIdProposicao()));
					proposicao.setEmentaClob(new SerialClob(proposicao.getEmenta().toCharArray()));
				}else if(p.getOrigem()=='S'){
					proposicao = detalharProposicaoSenadoWS(Long.valueOf(p.getIdProposicao()));
					proposicao.setEmentaClob(new SerialClob(proposicao.getEmenta().toCharArray()));
				}
				save(proposicao);
			} catch (SQLException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}catch (Exception e2) {
				// TODO: handle exception
			}
			
		}
	}

	@Override
	public List<ProposicaoJSON> listarTodos() {
		List<Proposicao> lista= listAll();
		
		List<ProposicaoJSON> listaProposicaoJSON = new ArrayList<ProposicaoJSON>();
		for(Proposicao proposicao: lista){
			ProposicaoJSON proposicaoJSON = populaProposicaoJSON(proposicao);
			listaProposicaoJSON.add(proposicaoJSON);
		}
		
		return listaProposicaoJSON;
	}

	public ProposicaoJSON populaProposicaoJSON(Proposicao proposicao) {
		ProposicaoJSON proposicaoJSON = new ProposicaoJSON();
		proposicaoJSON.setEmenta(proposicao.getEmentaClob()==null?proposicao.getEmenta():
					Conversores.clobToString(proposicao.getEmentaClob()));
		proposicaoJSON.setId(proposicao.getId());
		proposicaoJSON.setIdProposicao(proposicao.getIdProposicao());
		proposicaoJSON.setSigla(proposicao.getSigla());
		proposicaoJSON.setAutor(proposicao.getAutor());
		return proposicaoJSON;
	}

	@Override
	public ProposicaoJSON buscarPorId(Long id) {
		Proposicao proposicao = findById(id);
		return populaProposicaoJSON(proposicao);
	}

	@Override
	public List<ProposicaoJSON> buscarProposicoesPorDataReuniao(Date dataReuniao) {
		// TODO Auto-generated method stub
		Query q = em.createNativeQuery("SELECT  p.* "
	    		+ "FROM Proposicao p LEFT JOIN Reuniao_Proposicao rp on rp.listaProposicao_id = p.id "
	    		+ " LEFT JOIN Reuniao r on r.id = rp.listaReunioes_id "
	    		+ " ORDER BY p.id", Proposicao.class);
	    //q.setParameter("data", Conversores.dateToString(dataReuniao, "dd/mm/yyyy"));
        List<Object> listaProposicaos = q.getResultList();
        List<ProposicaoJSON> listaProposicaoJSON = new ArrayList<ProposicaoJSON>();
        for(Object obj: listaProposicaos){
        	Proposicao proposicao = (Proposicao)obj;
			ProposicaoJSON proposicaoJSON = populaProposicaoJSON(proposicao);
			listaProposicaoJSON.add(proposicaoJSON);
        }
        return listaProposicaoJSON;
        
	}
	

	
}
