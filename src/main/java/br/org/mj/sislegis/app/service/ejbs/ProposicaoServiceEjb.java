package br.org.mj.sislegis.app.service.ejbs;

import java.sql.SQLException;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;

import javax.ejb.Stateless;
import javax.inject.Inject;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;
import javax.sql.rowset.serial.SerialClob;
import javax.sql.rowset.serial.SerialException;

import br.org.mj.sislegis.app.enumerated.Origem;
import br.org.mj.sislegis.app.json.ProposicaoJSON;
import br.org.mj.sislegis.app.json.TagJSON;
import br.org.mj.sislegis.app.model.Proposicao;
import br.org.mj.sislegis.app.model.ReuniaoProposicao;
import br.org.mj.sislegis.app.model.ReuniaoProposicaoPK;
import br.org.mj.sislegis.app.model.Tag;
import br.org.mj.sislegis.app.model.TagProposicao;
import br.org.mj.sislegis.app.model.TagProposicaoPK;
import br.org.mj.sislegis.app.parser.camara.ParserPautaCamara;
import br.org.mj.sislegis.app.parser.camara.ParserProposicaoCamara;
import br.org.mj.sislegis.app.parser.senado.ParserPautaSenado;
import br.org.mj.sislegis.app.parser.senado.ParserProposicaoSenado;
import br.org.mj.sislegis.app.service.AbstractPersistence;
import br.org.mj.sislegis.app.service.ComentarioService;
import br.org.mj.sislegis.app.service.ProposicaoService;
import br.org.mj.sislegis.app.service.ReuniaoProposicaoService;
import br.org.mj.sislegis.app.service.TagService;
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

	@Inject
	private ReuniaoProposicaoService reuniaoProposicaoService;

	@Inject
	private ComentarioService comentarioService;
	
	@Inject
	private TagService tagService;

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
		c: for (Proposicao p : lista) {
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
				// Evita persistir Reunião Proposição já cadastrada.
				for (ReuniaoProposicao rp : proposicao
						.getListaReuniaoProposicoes()) {
					if (reuniaoProposicaoService.buscaReuniaoProposicaoPorId(rp
							.getReuniaoProposicaoPK()) != null)
						continue c;
				}

				save(proposicao);
			} catch (Exception e) {
			}

		}
	}

	private void populaProposicao(Proposicao p, Proposicao proposicao)
			throws SerialException, SQLException {
		proposicao.setEmentaClob(new SerialClob(proposicao.getEmenta()
				.toCharArray()));
		String siglaComissao = isNull(p.getSigla()) ? proposicao.getSigla() : p
				.getSigla();
		for (ReuniaoProposicao rp : p.getListaReuniaoProposicoes()) {
			ReuniaoProposicaoPK reuniaoProposicaoPK = new ReuniaoProposicaoPK();
			reuniaoProposicaoPK.setSiglaComissao(siglaComissao);
			reuniaoProposicaoPK.setDataReuniao(rp.getReuniao().getData());
			rp.setReuniaoProposicaoPK(reuniaoProposicaoPK);
			rp.setProposicao(proposicao);
		}
		proposicao.setListaReuniaoProposicoes(p.getListaReuniaoProposicoes());
		proposicao.setOrigem(isNull(p.getOrigem()) ? proposicao.getOrigem() : p
				.getOrigem());
		proposicao.setSeqOrdemPauta(isNull(p.getSeqOrdemPauta()) ? proposicao
				.getSeqOrdemPauta() : p.getSeqOrdemPauta());
		proposicao
				.setAno(isNull(p.getAno()) ? proposicao.getAno() : p.getAno());
		proposicao.setComissao(isNull(p.getComissao()) ? proposicao
				.getComissao() : p.getComissao());
		proposicao.setAutor(isNull(p.getAutor()) ? proposicao.getAutor() : p
				.getAutor());
		proposicao
				.setDataApresentacao(isNull(p.getDataApresentacao()) ? proposicao
						.getDataApresentacao() : p.getDataApresentacao());
		proposicao.setLinkPauta(isNull(p.getLinkPauta()) ? proposicao
				.getLinkPauta() : p.getLinkPauta());
		proposicao.setLinkProposicao(isNull(p.getLinkProposicao()) ? proposicao
				.getLinkProposicao() : p.getLinkProposicao());
		proposicao.setNumero(isNull(p.getNumero()) ? proposicao.getNumero() : p
				.getNumero());
		proposicao.setTipo(isNull(p.getTipo()) ? proposicao.getTipo() : p
				.getTipo());
		proposicao.setLinkPauta(isNull(p.getLinkPauta()) ? proposicao
				.getLinkPauta() : p.getLinkPauta());
		proposicao.setLinkProposicao(isNull(p.getLinkProposicao()) ? proposicao
				.getLinkProposicao() : p.getLinkProposicao());
	}

	public boolean isNull(Object obj) {
		return obj == null ? true : false;
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
		String ementa = proposicao.getEmentaClob() == null ? proposicao
				.getEmenta() : Conversores.clobToString(proposicao
				.getEmentaClob());
		
/*		List<TagJSON> listaTagsJSON =new ArrayList<TagJSON>();
		for(Tag tag:proposicao.getTags()){
			listaTagsJSON.add(new TagJSON(tag.toString()));
		}*/
		ProposicaoJSON proposicaoJSON = new ProposicaoJSON(proposicao.getId(),
				proposicao.getIdProposicao(), proposicao.getTipo(),
				proposicao.getAno(), proposicao.getNumero(),
				proposicao.getDataApresentacao(), proposicao.getAutor(),
				ementa, proposicao.getOrigem(), proposicao.getSigla(),
				proposicao.getComissao(), proposicao.getSeqOrdemPauta(),
				proposicao.getLinkProposicao(), proposicao.getLinkPauta(),
				comentarioService.findByProposicao(proposicao.getId()),
				proposicao.getPosicionamento(), tagService.populaListaTagsProposicaoJSON(proposicao.getTags()));
		

		return proposicaoJSON;
	}

	@Override
	public ProposicaoJSON buscarPorId(Long id) {
		Proposicao proposicao = findById(id);
		ProposicaoJSON proposicaoJSON = populaProposicaoJSON(proposicao);
		populaComentarioProposicao(proposicao, proposicaoJSON);
		return proposicaoJSON;
	}

	@Override
	public List<ProposicaoJSON> buscarProposicoesPorDataReuniao(Date dataReuniao) {

		List<ProposicaoJSON> listaProposicaoJSON = new ArrayList<ProposicaoJSON>();

		Query query = em.createNativeQuery("select p.* from Proposicao p "
				+ "inner join ReuniaoProposicao rp "
				+ "on p.id = rp.idProposicao "
				+ "where rp.dataReuniao = :P_DATA", Proposicao.class);
		query.setParameter("P_DATA",
				Conversores.dateToString(dataReuniao, "yyyy-MM-dd"));

		List<Proposicao> listaProposicoes = query.getResultList();
		for (Object obj : listaProposicoes) {
			Proposicao proposicao = (Proposicao) obj;
			ProposicaoJSON proposicaoJSON = populaProposicaoJSON(proposicao);
			populaComentarioProposicao(proposicao, proposicaoJSON);
			listaProposicaoJSON.add(proposicaoJSON);
		}

		return listaProposicaoJSON;

	}

	private void populaComentarioProposicao(Proposicao proposicao,
			ProposicaoJSON proposicaoJSON) {
		proposicaoJSON.setListaComentario(comentarioService
				.findByProposicao(proposicao.getId()));
	}

	@Override
	public void atualizaProposicaoJSON(ProposicaoJSON proposicaoJSON) {
		Proposicao proposicao = proposicaoJsonToProposicao(proposicaoJSON);
		save(proposicao);
	}

	private Proposicao proposicaoJsonToProposicao(ProposicaoJSON proposicaoJSON) {
		Proposicao proposicao = findById(proposicaoJSON.getId());
		proposicao.setAno(proposicaoJSON.getAno());
		proposicao.setIdProposicao(proposicaoJSON.getIdProposicao());
		proposicao.setNumero(proposicaoJSON.getNumero());
		proposicao.setSigla(proposicaoJSON.getSigla());
		proposicao.setAutor(proposicaoJSON.getAutor());
		proposicao.setOrigem(proposicaoJSON.getOrigem());
		proposicao.setComissao(proposicaoJSON.getComissao());
		proposicao.setSeqOrdemPauta(proposicaoJSON.getSeqOrdemPauta());
		proposicao.setPosicionamento(proposicaoJSON.getPosicionamento());
		Set<TagProposicao> tags = populaTagsProposicao(proposicaoJSON, proposicao);
		proposicao.setTags(tags);
		return proposicao;
	}

	private Set<TagProposicao> populaTagsProposicao(ProposicaoJSON proposicaoJSON,
			Proposicao proposicao) {
		Set<TagProposicao> tagsProposicao = new HashSet<TagProposicao>();
		for(TagJSON tagJSON:proposicaoJSON.getTags()){
			TagProposicaoPK tagProposicaoPK = new TagProposicaoPK();
			TagProposicao tagProposicao = new TagProposicao();
			Tag tag = new Tag();
			tagProposicaoPK.setIdProposicao(proposicaoJSON.getId());
			tagProposicaoPK.setTag(tagJSON.getText());
			tagProposicao.setTagProposicaoPK(tagProposicaoPK);
			tagProposicao.setProposicao(proposicao);
			tag.setTag(tagJSON.getText());
			tagProposicao.setTag(tag);
			tagsProposicao.add(tagProposicao);
		}
		return tagsProposicao;
	}

}
