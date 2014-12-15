package br.gov.mj.sislegis.app.service.ejbs;

import java.sql.SQLException;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashSet;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.Objects;
import java.util.Set;

import javax.ejb.Stateless;
import javax.inject.Inject;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;
import javax.persistence.TypedQuery;
import javax.sql.rowset.serial.SerialClob;
import javax.sql.rowset.serial.SerialException;

import br.gov.mj.sislegis.app.enumerated.Origem;
import br.gov.mj.sislegis.app.json.ComentarioJSON;
import br.gov.mj.sislegis.app.json.ProposicaoJSON;
import br.gov.mj.sislegis.app.json.TagJSON;
import br.gov.mj.sislegis.app.model.EncaminhamentoProposicao;
import br.gov.mj.sislegis.app.model.Proposicao;
import br.gov.mj.sislegis.app.model.Reuniao;
import br.gov.mj.sislegis.app.model.ReuniaoProposicao;
import br.gov.mj.sislegis.app.model.ReuniaoProposicaoPK;
import br.gov.mj.sislegis.app.model.Tag;
import br.gov.mj.sislegis.app.model.TagProposicao;
import br.gov.mj.sislegis.app.model.TagProposicaoPK;
import br.gov.mj.sislegis.app.parser.camara.ParserPautaCamara;
import br.gov.mj.sislegis.app.parser.camara.ParserProposicaoCamara;
import br.gov.mj.sislegis.app.parser.senado.ParserPautaSenado;
import br.gov.mj.sislegis.app.parser.senado.ParserPlenarioSenado;
import br.gov.mj.sislegis.app.parser.senado.ParserProposicaoSenado;
import br.gov.mj.sislegis.app.service.AbstractPersistence;
import br.gov.mj.sislegis.app.service.ComentarioService;
import br.gov.mj.sislegis.app.service.EncaminhamentoProposicaoService;
import br.gov.mj.sislegis.app.service.ProposicaoService;
import br.gov.mj.sislegis.app.service.ReuniaoService;
import br.gov.mj.sislegis.app.service.TagService;
import br.gov.mj.sislegis.app.util.Conversores;
import br.gov.mj.sislegis.app.util.SislegisUtil;

@Stateless
public class ProposicaoServiceEjb extends AbstractPersistence<Proposicao, Long> implements ProposicaoService {

	@Inject
	private ParserPautaCamara parserPautaCamara;

	@Inject
	private ParserPautaSenado parserPautaSenado;

	@Inject
	private ParserProposicaoCamara parserProposicaoCamara;

	@Inject
	private ParserProposicaoSenado parserProposicaoSenado;
	
	@Inject
	private ParserPlenarioSenado parserPlenarioSenado;

	@Inject
	private ComentarioService comentarioService;
	
	@Inject
	private ReuniaoService reuniaoService;
	
	@Inject
	private EncaminhamentoProposicaoService encaminhamentoProposicaoService;
	
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
	public List<Proposicao> buscarProposicoesPautaCamaraWS(Map parametros) throws Exception {
		Long idComissao = (Long) parametros.get("idComissao");
		String dataIni = Conversores.dateToString((Date) parametros.get("data"), "yyyyMMdd");
		String dataFim = Conversores.dateToString(SislegisUtil.getFutureDate(), "yyyyMMdd");
		return parserPautaCamara.getProposicoes(idComissao, dataIni, dataFim);
	}

	@Override
	public List<Proposicao> buscarProposicoesPautaSenadoWS(Map parametros) throws Exception {
		String siglaComissao = (String) parametros.get("siglaComissao");
		String dataIni = Conversores.dateToString((Date) parametros.get("data"), "yyyyMMdd");
		
		if (siglaComissao.equals("PLEN")) {
			return parserPlenarioSenado.getProposicoes(dataIni);
		}
		
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
		List<Reuniao> listaReuniao = null;
		c:for (Proposicao p : lista) {
			try {
				Proposicao proposicao = buscarPorIdProposicao(p.getIdProposicao());
				
				if(Objects.isNull(listaReuniao))
					listaReuniao = reuniaoService.buscaReuniaoPorData(p.getReuniao().getData());
				
				for(Reuniao reuniao:listaReuniao){
					for(ReuniaoProposicao rp:reuniao.getListaReuniaoProposicoes()){
						if(rp.getProposicao().getIdProposicao().equals(p.getIdProposicao())){
							continue c;
						}
					}
				}
				
				if (Objects.isNull(proposicao)) {
					if (p.getOrigem().equals(Origem.CAMARA)) {
						proposicao = detalharProposicaoCamaraWS(Long.valueOf(p.getIdProposicao()));
					} else if (p.getOrigem().equals(Origem.SENADO)) {
						proposicao = detalharProposicaoSenadoWS(Long.valueOf(p.getIdProposicao()));
					}
				}
				popularProposicao(p, proposicao);

				save(proposicao);
			} catch (Exception e) {
				e.printStackTrace();
			}

		}
	}

	private void popularProposicao(Proposicao p, Proposicao proposicao) throws SerialException, SQLException {
		proposicao.setEmentaClob(new SerialClob(proposicao.getEmenta().toCharArray()));
		String siglaComissao = isNull(p.getSigla()) ? proposicao.getSigla() : p.getSigla();
		for (ReuniaoProposicao rp : p.getListaReuniaoProposicoes()) {
			ReuniaoProposicaoPK reuniaoProposicaoPK = new ReuniaoProposicaoPK();
			rp.setReuniaoProposicaoPK(reuniaoProposicaoPK);
			rp.setSiglaComissao(siglaComissao);
			rp.setProposicao(proposicao);
		}
		proposicao.setListaReuniaoProposicoes(p.getListaReuniaoProposicoes());
		proposicao.setOrigem(isNull(p.getOrigem()) ? proposicao.getOrigem() : p.getOrigem());
		proposicao.setSeqOrdemPauta(isNull(p.getSeqOrdemPauta()) ? proposicao.getSeqOrdemPauta() : p.getSeqOrdemPauta());
		proposicao.setAno(isNull(p.getAno()) ? proposicao.getAno() : p.getAno());
		proposicao.setComissao(isNull(p.getComissao()) ? proposicao.getComissao() : p.getComissao());
		proposicao.setAutor(isNull(p.getAutor()) ? proposicao.getAutor() : p.getAutor());
		proposicao.setDataApresentacao(isNull(p.getDataApresentacao()) ? proposicao.getDataApresentacao() : p.getDataApresentacao());
		proposicao.setLinkPauta(isNull(p.getLinkPauta()) ? proposicao.getLinkPauta() : p.getLinkPauta());
		proposicao.setLinkProposicao(isNull(p.getLinkProposicao()) ? proposicao.getLinkProposicao() : p.getLinkProposicao());
		proposicao.setNumero(isNull(p.getNumero()) ? proposicao.getNumero() : p.getNumero());
		proposicao.setTipo(isNull(p.getTipo()) ? proposicao.getTipo() : p.getTipo());
		proposicao.setLinkPauta(isNull(p.getLinkPauta()) ? proposicao.getLinkPauta() : p.getLinkPauta());
		proposicao.setLinkProposicao(isNull(p.getLinkProposicao()) ? proposicao.getLinkProposicao() : p.getLinkProposicao());
		proposicao.setResponsavel(isNull(p.getResponsavel()) ? proposicao.getResponsavel() : p.getResponsavel());
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
		String ementa = proposicao.getEmentaClob() == null ? proposicao.getEmenta() : Conversores.clobToString(proposicao.getEmentaClob());

		/*
		 * List<TagJSON> listaTagsJSON =new ArrayList<TagJSON>(); for(Tag tag:proposicao.getTags()){ listaTagsJSON.add(new TagJSON(tag.toString())); }
		 */
		
		ProposicaoJSON proposicaoJSON = new ProposicaoJSON(proposicao.getId(), 
				proposicao.getIdProposicao(), 
				proposicao.getTipo(), 
				proposicao.getAno(),
				proposicao.getNumero(), 
				proposicao.getDataApresentacao(), 
				proposicao.getAutor(), 
				ementa, 
				proposicao.getOrigem(), 
				proposicao.getSigla(),
				proposicao.getComissao(), 
				proposicao.getSeqOrdemPauta(), 
				proposicao.getLinkProposicao(), 
				proposicao.getLinkPauta(),
				comentarioService.findByProposicao(proposicao.getId()), 
				proposicao.getPosicionamento(), 
				tagService.populaListaTagsProposicaoJSON(proposicao.getTags()),
				proposicao.getResponsavel());

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
				+ "on p.id = rp.proposicao_id "
				+ "inner join Reuniao r "
				+ "on r.id = rp.reuniao_id "
				+ "where r.data = :P_DATA", Proposicao.class);
		query.setParameter("P_DATA", Conversores.dateToString(dataReuniao, "yyyy-MM-dd"));

		List<Proposicao> listaProposicoes = query.getResultList();
		for (Object obj : listaProposicoes) {
			Proposicao proposicao = (Proposicao) obj;
			ProposicaoJSON proposicaoJSON = populaProposicaoJSON(proposicao);
			populaComentarioProposicao(proposicao, proposicaoJSON);
			listaProposicaoJSON.add(proposicaoJSON);
		}

		return listaProposicaoJSON;

	}

	private void populaComentarioProposicao(Proposicao proposicao, ProposicaoJSON proposicaoJSON) {
		proposicaoJSON.setListaComentario(comentarioService.findByProposicao(proposicao.getId()));
	}

	@Override
	public void atualizarProposicaoJSON(ProposicaoJSON proposicaoJSON) {
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
		proposicao.setResponsavel(proposicaoJSON.getResponsavel());
		Set<TagProposicao> tags = populaTagsProposicao(proposicaoJSON, proposicao);
		proposicao.setTags(tags);
		return proposicao;
	}

	private Set<TagProposicao> populaTagsProposicao(ProposicaoJSON proposicaoJSON, Proposicao proposicao) {
		Set<TagProposicao> tagsProposicao = new HashSet<TagProposicao>();
		for (TagJSON tagJSON : proposicaoJSON.getTags()) {
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

	@Override
	public Proposicao buscarPorIdProposicao(Integer idProposicao) {
		TypedQuery<Proposicao> findByIdQuery = em.createQuery("SELECT p FROM Proposicao p WHERE p.idProposicao = :idProposicao",
				Proposicao.class);
		findByIdQuery.setParameter("idProposicao", idProposicao);
		final List<Proposicao> results = findByIdQuery.getResultList();
		if(!Objects.isNull(results) && !results.isEmpty()){
			return results.get(0);
		}else{
			return null;
		}
	}

	@Override
	public void deleteById(Long id){
		List<EncaminhamentoProposicao> listaEnc = encaminhamentoProposicaoService.findByProposicao(id);
		for (Iterator<EncaminhamentoProposicao> iterator = listaEnc.iterator(); iterator.hasNext();) {
			EncaminhamentoProposicao ep = iterator.next();
			encaminhamentoProposicaoService.deleteById(ep.getId());
		}
		
		List<ComentarioJSON> listaCom = comentarioService.findByProposicao(id);
		for (Iterator<ComentarioJSON> iterator = listaCom.iterator(); iterator.hasNext();) {
			ComentarioJSON c = iterator.next();
			comentarioService.deleteById(c.getId());
		}
		
		super.deleteById(id);
	}
}
