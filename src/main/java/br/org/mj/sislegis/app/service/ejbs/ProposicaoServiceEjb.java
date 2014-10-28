package br.org.mj.sislegis.app.service.ejbs;

import java.sql.SQLException;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Map;

import javax.ejb.Stateless;
import javax.inject.Inject;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;
import javax.sql.rowset.serial.SerialClob;
import javax.sql.rowset.serial.SerialException;

import br.org.mj.sislegis.app.enumerated.Origem;
import br.org.mj.sislegis.app.model.Proposicao;
import br.org.mj.sislegis.app.model.ProposicaoJSON;
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
		implements ProposicaoService {

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
	public List<Proposicao> buscarProposicoesPautaCamaraWS(Map parametros)
			throws Exception {
		Long idComissao = (Long) parametros.get("idComissao");
		String dataIni = Conversores.dateToString(
				(Date) parametros.get("data"), "yyyyMMdd");
		String dataFim = Conversores.dateToString(SislegisUtil.getDate(),
				"yyyyMMdd");
		return parserPautaCamara.getProposicoes(idComissao, dataIni, dataFim);
	}

	@Override
	public List<Proposicao> buscarProposicoesPautaSenadoWS(Map parametros)
			throws Exception {
		String siglaComissao = (String) parametros.get("siglaComissao");
		String dataIni = Conversores.dateToString(
				(Date) parametros.get("data"), "yyyyMMdd");
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
		for (Proposicao p : lista) {
			try {

				Proposicao proposicao = null;
				if (p.getOrigem().equals(Origem.CAMARA)) {
					proposicao = detalharProposicaoCamaraWS(Long.valueOf(p
							.getIdProposicao()));
					populaProposicao(p, proposicao);
				} else if (p.getOrigem().equals(Origem.SENADO)) {
					proposicao = detalharProposicaoSenadoWS(Long.valueOf(p
							.getIdProposicao()));
					populaProposicao(p, proposicao);
				}
				save(proposicao);
			} catch (SQLException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			} catch (Exception e2) {
				// TODO: handle exception
			}

		}
	}

	private void populaProposicao(Proposicao p, Proposicao proposicao)
			throws SerialException, SQLException {
		proposicao.setEmentaClob(new SerialClob(proposicao.getEmenta()
				.toCharArray()));
		proposicao.setListaReunioes(p.getListaReunioes());
		proposicao.setOrigem(p.getOrigem());
		proposicao.setSeqOrdemPauta(p.getSeqOrdemPauta());
		proposicao.setAno(p.getAno());
		proposicao.setComissao(p.getComissao());
		proposicao.setAutor(p.getAutor());
		proposicao.setDataApresentacao(p.getDataApresentacao());
		proposicao.setLinkPauta(p.getLinkPauta());
		proposicao.setLinkProposicao(p.getLinkProposicao());
		proposicao.setNumero(p.getNumero());
		proposicao.setTipo(p.getTipo());
	}

	@Override
	public List<ProposicaoJSON> listarTodos() {
		List<Proposicao> lista = listAll();

		List<ProposicaoJSON> listaProposicaoJSON = new ArrayList<ProposicaoJSON>();
		for (Proposicao proposicao : lista) {
			ProposicaoJSON proposicaoJSON = populaProposicaoJSON(proposicao);
			listaProposicaoJSON.add(proposicaoJSON);
		}

		return listaProposicaoJSON;
	}

	public ProposicaoJSON populaProposicaoJSON(Proposicao proposicao) {
		ProposicaoJSON proposicaoJSON = new ProposicaoJSON();
		proposicaoJSON
				.setEmenta(proposicao.getEmentaClob() == null ? proposicao
						.getEmenta() : Conversores.clobToString(proposicao
						.getEmentaClob()));
		proposicaoJSON.setId(proposicao.getId());
		proposicaoJSON.setIdProposicao(proposicao.getIdProposicao());
		proposicaoJSON.setSigla(proposicao.getSigla());
		proposicaoJSON.setAutor(proposicao.getAutor());
		proposicaoJSON.setOrigem(proposicao.getOrigem());
		proposicaoJSON.setComissao(proposicao.getComissao());
		proposicaoJSON.setSeqOrdemPauta(proposicao.getSeqOrdemPauta());
		return proposicaoJSON;
	}

	@Override
	public ProposicaoJSON buscarPorId(Long id) {
		Proposicao proposicao = findById(id);
		return populaProposicaoJSON(proposicao);
	}

	@Override
	public List<ProposicaoJSON> buscarProposicoesPorDataReuniao(Date dataReuniao) {

		List<ProposicaoJSON> listaProposicaoJSON = new ArrayList<ProposicaoJSON>();

		Query query = em
				.createNativeQuery("select p.* from Proposicao p "
						+ "inner join Reuniao_Proposicao rp "
						+ "on p.id = rp.PROPOSICAO_ID "
						+ "inner join Reuniao r on rp.REUNIAO_ID = r.id "
						+ "where r.data = :P_DATA", Proposicao.class);
		query.setParameter("P_DATA", Conversores.dateToString(dataReuniao, "yyyy-MM-dd"));  

		List<Proposicao> listaProposicoes = query.getResultList();
		for (Object obj : listaProposicoes) {
			Proposicao proposicao = (Proposicao)obj;
			ProposicaoJSON proposicaoJSON = populaProposicaoJSON(proposicao);
			listaProposicaoJSON.add(proposicaoJSON);
		}

		return listaProposicaoJSON;

	}

}
