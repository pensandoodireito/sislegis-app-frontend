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
import javax.sql.rowset.serial.SerialException;

import br.gov.mj.sislegis.app.enumerated.Origem;
import br.gov.mj.sislegis.app.json.ComentarioJSON;
import br.gov.mj.sislegis.app.json.EncaminhamentoProposicaoJSON;
import br.gov.mj.sislegis.app.json.ProposicaoJSON;
import br.gov.mj.sislegis.app.json.TagJSON;
import br.gov.mj.sislegis.app.model.ElaboracaoNormativa;
import br.gov.mj.sislegis.app.model.Proposicao;
import br.gov.mj.sislegis.app.model.Reuniao;
import br.gov.mj.sislegis.app.model.ReuniaoProposicao;
import br.gov.mj.sislegis.app.model.ReuniaoProposicaoPK;
import br.gov.mj.sislegis.app.model.Tag;
import br.gov.mj.sislegis.app.model.TagElaboracaoNormativa;
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
	public void salvarListaProposicao(List<Proposicao> listaProposicao) {
		Reuniao reuniao = null;
		// Cria/obtém a reuniao
		if (! listaProposicao.isEmpty()) {
			Proposicao proposicao = listaProposicao.get(0); // uma forma de obter a data da reuniao é através do objeto proposicao
			reuniao = reuniaoService.buscaReuniaoPorData(proposicao.getReuniao().getData());
			
			// a primeira vez, salva o objeto
			if (Objects.isNull(reuniao)) {
				reuniao = new Reuniao();
				reuniao.setData(proposicao.getReuniao().getData());
				reuniao = reuniaoService.save(reuniao);
			}
		}
		
		// Agora vamos salvar cada proposição
		for (Proposicao p : listaProposicao) {
			try {
				Proposicao proposicao = buscarPorIdProposicao(p.getIdProposicao());
				
				// Evita incluir proposicoes duplicadas na mesma reunião
				for (ReuniaoProposicao rp : reuniao.getListaReuniaoProposicoes()) {
					if (rp.getProposicao().getIdProposicao().equals(p.getIdProposicao())) {
						continue;
					}
				}
				
				if (Objects.isNull(proposicao)) {
					if (p.getOrigem().equals(Origem.CAMARA)) {
						proposicao = detalharProposicaoCamaraWS(Long.valueOf(p.getIdProposicao()));
					} else if (p.getOrigem().equals(Origem.SENADO)) {
						proposicao = detalharProposicaoSenadoWS(Long.valueOf(p.getIdProposicao()));
					}
				}
				
				popularProposicao(reuniao, p, proposicao);

				save(proposicao);
			} catch (Exception e) {
				e.printStackTrace();
			}

		}
	}

	private void popularProposicao(Reuniao reuniao, Proposicao p, Proposicao proposicao) throws SerialException, SQLException {
		String siglaComissao = isNull(p.getComissao()) ? proposicao.getComissao() : p.getComissao();
		Integer seqOrdemPauta = isNull(p.getSeqOrdemPauta()) ? proposicao.getSeqOrdemPauta() : p.getSeqOrdemPauta();
		String linkPauta = isNull(p.getLinkPauta()) ? proposicao.getLinkPauta() : p.getLinkPauta();
		for (ReuniaoProposicao rp : p.getListaReuniaoProposicoes()) {
			ReuniaoProposicaoPK reuniaoProposicaoPK = new ReuniaoProposicaoPK();
			rp.setReuniaoProposicaoPK(reuniaoProposicaoPK);
			rp.setSiglaComissao(siglaComissao);
			rp.setSeqOrdemPauta(seqOrdemPauta);
			rp.setLinkPauta(linkPauta);
			
			rp.setReuniao(reuniao);
			rp.setProposicao(proposicao);
		}
		proposicao.setEmenta(p.getEmenta());
		proposicao.setListaReuniaoProposicoes(p.getListaReuniaoProposicoes());
		proposicao.setOrigem(isNull(p.getOrigem()) ? proposicao.getOrigem() : p.getOrigem());
		proposicao.setSeqOrdemPauta(isNull(p.getSeqOrdemPauta()) ? proposicao.getSeqOrdemPauta() : p.getSeqOrdemPauta());
		proposicao.setAno(isNull(p.getAno()) ? proposicao.getAno() : p.getAno());
		proposicao.setComissao(isNull(p.getComissao()) ? proposicao.getComissao() : p.getComissao());
		proposicao.setAutor(isNull(p.getAutor()) ? proposicao.getAutor() : p.getAutor());
		proposicao.setLinkPauta(isNull(p.getLinkPauta()) ? proposicao.getLinkPauta() : p.getLinkPauta());
		proposicao.setLinkProposicao(isNull(p.getLinkProposicao()) ? proposicao.getLinkProposicao() : p.getLinkProposicao());
		proposicao.setNumero(isNull(p.getNumero()) ? proposicao.getNumero() : p.getNumero());
		proposicao.setTipo(isNull(p.getTipo()) ? proposicao.getTipo() : p.getTipo());
		proposicao.setLinkPauta(isNull(p.getLinkPauta()) ? proposicao.getLinkPauta() : p.getLinkPauta());
		proposicao.setLinkProposicao(isNull(p.getLinkProposicao()) ? proposicao.getLinkProposicao() : p.getLinkProposicao());
		proposicao.setResponsavel(isNull(p.getResponsavel()) ? proposicao.getResponsavel() : p.getResponsavel());
		proposicao.setResultadoASPAR(isNull(p.getResultadoASPAR()) ? proposicao.getResultadoASPAR() : p.getResultadoASPAR());
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
		ProposicaoJSON proposicaoJSON = new ProposicaoJSON(proposicao.getId(), 
				proposicao.getIdProposicao(), 
				proposicao.getTipo(), 
				proposicao.getAno(),
				proposicao.getNumero(), 
				proposicao.getAutor(), 
				proposicao.getEmenta(), 
				proposicao.getOrigem(), 
				proposicao.getSigla(),
				proposicao.getComissao(), 
				proposicao.getSeqOrdemPauta(), 
				proposicao.getLinkProposicao(), 
				proposicao.getLinkPauta(),
				proposicao.getResultadoASPAR(),
				comentarioService.findByProposicao(proposicao.getId()),
				encaminhamentoProposicaoService.findByProposicao(proposicao.getId()), 
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
		Reuniao reuniao = reuniaoService.buscaReuniaoPorData(dataReuniao);
		
		if (!Objects.isNull(reuniao)) {
			Set<ReuniaoProposicao> listaReuniaoProposicoes = reuniao.getListaReuniaoProposicoes();
			for (ReuniaoProposicao reuniaoProposicao : listaReuniaoProposicoes) {
				Proposicao proposicao = reuniaoProposicao.getProposicao();
				proposicao.setComissao(reuniaoProposicao.getSiglaComissao());
				proposicao.setSeqOrdemPauta(reuniaoProposicao.getSeqOrdemPauta());
				proposicao.setLinkPauta(reuniaoProposicao.getLinkPauta());
				
				ProposicaoJSON proposicaoJSON = populaProposicaoJSON(proposicao);
				populaComentarioProposicao(proposicao, proposicaoJSON);
				listaProposicaoJSON.add(proposicaoJSON);
			}
		}


		return listaProposicaoJSON;

	}

	private void populaComentarioProposicao(Proposicao proposicao, ProposicaoJSON proposicaoJSON) {
		proposicaoJSON.setListaComentario(comentarioService.findByProposicao(proposicao.getId()));
	}

	@Override
	public void atualizarProposicaoJSON(ProposicaoJSON proposicaoJSON) {
		processaExclusaoTagProposicao(proposicaoJSON);
		Proposicao proposicao = proposicaoJsonToProposicao(proposicaoJSON);
		
		save(proposicao);
	}
	
	private void processaExclusaoTagProposicao(ProposicaoJSON proposicaoJSON) {
		if(!Objects.isNull(proposicaoJSON.getId())){
			Query query = em.createNativeQuery("SELECT tp.* FROM TagProposicao tp WHERE tp.proposicao_id = :idProposicao",
					TagProposicao.class);
			query.setParameter("idProposicao", proposicaoJSON.getId());
			List<TagProposicao> listaTagsProposicao = query.getResultList();

			c:for(TagProposicao tagProposicao:listaTagsProposicao){
				for(TagJSON tagJSON:proposicaoJSON.getTags()){
					if(tagJSON.getText().equals(tagProposicao.getTag().getTag()))
						continue c;
				}
				 em.createNativeQuery("delete FROM TagProposicao tp WHERE "
				 		+ "tp.proposicao_id = :idProposicao "
				 		+ "and tp.tag_id = :tag",
							TagProposicao.class)
							.setParameter("idProposicao", tagProposicao.getProposicao().getId())
							.setParameter("tag", tagProposicao.getTag())
							.executeUpdate();
			}
		}
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
		proposicao.setResultadoASPAR(proposicaoJSON.getResultadoASPAR());
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
		List<EncaminhamentoProposicaoJSON> listaEnc = encaminhamentoProposicaoService.findByProposicao(id);
		for (Iterator<EncaminhamentoProposicaoJSON> iterator = listaEnc.iterator(); iterator.hasNext();) {
			EncaminhamentoProposicaoJSON ep = iterator.next();
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
