package br.gov.mj.sislegis.app.service.ejbs;

import java.rmi.RemoteException;
import java.util.ArrayList;
import java.util.HashSet;
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
import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Join;
import javax.persistence.criteria.JoinType;
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Root;
import javax.persistence.criteria.Subquery;
import javax.xml.rpc.ServiceException;

import br.gov.mj.sislegis.app.enumerated.ElaboracaoNormativaNorma;
import br.gov.mj.sislegis.app.enumerated.ElaboracaoNormativaObjeto;
import br.gov.mj.sislegis.app.enumerated.ElaboracaoNormativaSituacao;
import br.gov.mj.sislegis.app.enumerated.ElaboracaoNormativaSubTipo;
import br.gov.mj.sislegis.app.enumerated.ElaboracaoNormativaTipo;
import br.gov.mj.sislegis.app.json.DropdownMultiselectSelecionadosJSON;
import br.gov.mj.sislegis.app.json.TagJSON;
import br.gov.mj.sislegis.app.model.AreaConsultada;
import br.gov.mj.sislegis.app.model.Comentario;
import br.gov.mj.sislegis.app.model.ElaboracaoNormativa;
import br.gov.mj.sislegis.app.model.ElaboracaoNormativaCoAutores;
import br.gov.mj.sislegis.app.model.ElaboracaoNormativaCoAutoresPK;
import br.gov.mj.sislegis.app.model.ElaboracaoNormativaConsulta;
import br.gov.mj.sislegis.app.model.ElaboracaoNormativaTiposMarcados;
import br.gov.mj.sislegis.app.model.Equipe;
import br.gov.mj.sislegis.app.model.Orgao;
import br.gov.mj.sislegis.app.model.StatusSidof;
import br.gov.mj.sislegis.app.model.Tag;
import br.gov.mj.sislegis.app.model.TagElaboracaoNormativa;
import br.gov.mj.sislegis.app.model.TagElaboracaoNormativaPK;
import br.gov.mj.sislegis.app.model.Usuario;
import br.gov.mj.sislegis.app.seiws.RetornoConsultaProcedimento;
import br.gov.mj.sislegis.app.seiws.SeiService;
import br.gov.mj.sislegis.app.seiws.SeiServiceLocator;
import br.gov.mj.sislegis.app.service.AbstractPersistence;
import br.gov.mj.sislegis.app.service.AreaConsultadaService;
import br.gov.mj.sislegis.app.service.ElaboracaoNormativaCoAutoresService;
import br.gov.mj.sislegis.app.service.ElaboracaoNormativaConsultaService;
import br.gov.mj.sislegis.app.service.ElaboracaoNormativaService;
import br.gov.mj.sislegis.app.service.ElaboracaoNormativaTiposMarcadosService;
import br.gov.mj.sislegis.app.service.OrgaoService;
import br.gov.mj.sislegis.app.service.OrigemElaboracaoNormativaService;
import br.gov.mj.sislegis.app.service.TagElaboracaoNormativaService;
import br.gov.mj.sislegis.app.service.TagService;
import br.gov.mj.sislegis.app.service.UsuarioService;
import br.gov.mj.sislegis.app.util.SislegisUtil;

@Stateless
public class ElaboracaoNormativaServiceEjb extends AbstractPersistence<ElaboracaoNormativa, Long> implements ElaboracaoNormativaService {
	
	@Inject
	public TagService tagService;
	
	@Inject
	public UsuarioService usuarioService;
	
	@Inject
	public AreaConsultadaService areaConsultadaService;
	
	@Inject
	public OrigemElaboracaoNormativaService origemElaboracaoNormativaService;
	
	@Inject
	public TagElaboracaoNormativaService tagElaboracaoNormativaService;
	
	@Inject
	public ElaboracaoNormativaTiposMarcadosService elaboracaoNormativaTiposMarcadosService;
	
	@Inject
	public OrgaoService orgaoService;
	
	@Inject
	public ElaboracaoNormativaCoAutoresService elaboracaoNormativaCoAutoresService;
	
	@Inject
	public ElaboracaoNormativaConsultaService elaboracaoNormativaConsultaService;
	
	
	@PersistenceContext
    private EntityManager em;
	
	
	public ElaboracaoNormativaServiceEjb() {
		super(ElaboracaoNormativa.class);
	}
	
	@Override
	protected EntityManager getEntityManager() {
		return em;
	}
	
	
	public ElaboracaoNormativa buscaElaboracaoNormativaPorId(Long id){
		ElaboracaoNormativa elaboracaoNormativa = getEntityManager().find(ElaboracaoNormativa.class, id);
		elaboracaoNormativa.setTags(new ArrayList<TagJSON>());
		for(TagElaboracaoNormativa tagElaboracaoNormativa:elaboracaoNormativa.getTagsElaboracaoNormativa()){
			TagJSON tagJSON = new TagJSON(tagElaboracaoNormativa.getTag().toString());
			elaboracaoNormativa.getTags().add(tagJSON);
		}
		elaboracaoNormativa.setTagsElaboracaoNormativa(null);
		
		
		elaboracaoNormativa.setListaComentario(new ArrayList<Comentario>(elaboracaoNormativa.getListaComentario()));
		
		elaboracaoNormativa.setTipos(new ArrayList<ElaboracaoNormativaTipo>());
		for(ElaboracaoNormativaTiposMarcados elaboracaoNormativaTiposMarcados:elaboracaoNormativa.getListaElaboracaoNormativaTiposMarcados()){
			elaboracaoNormativa.getTipos().add(elaboracaoNormativaTiposMarcados.getTipo());
		}
		
		elaboracaoNormativa.setListaCoAutoresSelecionadosDropdown(new ArrayList<DropdownMultiselectSelecionadosJSON>());
		for(ElaboracaoNormativaCoAutores elaboracaoNormativaCoAutores:elaboracaoNormativa.getListaElaboracaoNormativaCoAutor()){
			DropdownMultiselectSelecionadosJSON dropdownMultiselectJSON = new DropdownMultiselectSelecionadosJSON();
			dropdownMultiselectJSON.setId(elaboracaoNormativaCoAutores.getElaboracaoNormativaCoAutoresPK().getIdOrgao());
			elaboracaoNormativa.getListaCoAutoresSelecionadosDropdown().add(dropdownMultiselectJSON);
		}
		elaboracaoNormativa.setListaElaboracaoNormativaCoAutor(null);
		
		if(!Objects.isNull(elaboracaoNormativa.getEquipe()))
			elaboracaoNormativa.setPareceristas(usuarioService.findByIdEquipe(elaboracaoNormativa.getEquipe().getId()));
		
		carregaLinkSei(elaboracaoNormativa);
		
		return elaboracaoNormativa;
	}

	private void carregaLinkSei(ElaboracaoNormativa elaboracaoNormativa) {
		if(!Objects.isNull(elaboracaoNormativa.getNup())
				&&!elaboracaoNormativa.getNup().equals("")){
			String link = consultaServicoWS(elaboracaoNormativa.getNup());
			
			if(!Objects.isNull(link))
				link =link.replaceAll("sei.mj", "seipreprod.mj");
			
			elaboracaoNormativa.setLinkSei(link);
		}
	}

	@Override
	public void salvar(ElaboracaoNormativa elaboracaoNormativa) {
		if(!Objects.isNull(elaboracaoNormativa.getEquipe()))
			elaboracaoNormativa.getEquipe().setListaEquipeUsuario(null);
		
		processaExclusaoTagElaboracaoNormativa(elaboracaoNormativa);
		
		elaboracaoNormativa.setTagsElaboracaoNormativa(populaTagsElaboracaoNormativa(elaboracaoNormativa));
		
		if(!Objects.isNull(elaboracaoNormativa.getOrigem())
				&&Objects.isNull(elaboracaoNormativa.getOrigem().getId())){
			Orgao orgao = orgaoService
					.findByProperty("nome", elaboracaoNormativa.getOrigem().getNome());
			elaboracaoNormativa.setOrigem(orgao);
		}
		
		processaExclusaoElaboracaoNormativaConsulta(elaboracaoNormativa);
		
		processaListaElaboracaoNormativaConsulta(elaboracaoNormativa);
		
		processaExclusaoElaboracaoNormativaCoAutores(elaboracaoNormativa);
		
		precessaListaElaboracaoNormativaCoAutores(elaboracaoNormativa);
		
		
		save(elaboracaoNormativa);
		
		carregaLinkSei(elaboracaoNormativa);
	}

	private void processaListaElaboracaoNormativaConsulta(
			ElaboracaoNormativa elaboracaoNormativa) {
		if(!Objects.isNull(elaboracaoNormativa.getListaElaboracaoNormativaConsulta())){
			for(ElaboracaoNormativaConsulta elaboracaoNormativaConsulta:elaboracaoNormativa.getListaElaboracaoNormativaConsulta()){
				elaboracaoNormativaConsulta.setElaboracaoNormativa(elaboracaoNormativa);
				if(!Objects.isNull(elaboracaoNormativaConsulta.getAreaConsultada())
						&&Objects.isNull(elaboracaoNormativaConsulta.getAreaConsultada().getId())){
					AreaConsultada areaConsultada = areaConsultadaService
							.findByProperty("descricao", elaboracaoNormativaConsulta.getAreaConsultada().getDescricao());
					elaboracaoNormativaConsulta.setAreaConsultada(areaConsultada);
				}
			}
		}
	}
	
	private void processaExclusaoElaboracaoNormativaConsulta(
			ElaboracaoNormativa elaboracaoNormativa) {

		List<ElaboracaoNormativaConsulta> lista = elaboracaoNormativaConsultaService
				.pesquisaElaboracaoNormativaConsutaPorIdElaboracaoNormativa(elaboracaoNormativa.getId());
		List<ElaboracaoNormativaConsulta> listaExclusao = new ArrayList<ElaboracaoNormativaConsulta>();
		c:for(ElaboracaoNormativaConsulta elaboracaoNormativaConsulta:lista){
			for(ElaboracaoNormativaConsulta elaboracaoNormativaConsulta2:elaboracaoNormativa.getListaElaboracaoNormativaConsulta()){
				if(elaboracaoNormativaConsulta.equals(elaboracaoNormativaConsulta2)){
					continue c;
				}
			}
			listaExclusao.add(elaboracaoNormativaConsulta);
		}
		
		for(ElaboracaoNormativaConsulta elaboracaoNormativaConsulta:listaExclusao){
			elaboracaoNormativaConsultaService.deleteElaboracaoNormativaConsutaPorIdElaboracaoNormativa(elaboracaoNormativaConsulta.getId());
		}
	}	

	private void precessaListaElaboracaoNormativaCoAutores(
			ElaboracaoNormativa elaboracaoNormativa) {
		elaboracaoNormativa.setListaElaboracaoNormativaCoAutor(elaboracaoNormativaCoAutoresService
				.pesquisaPorElaboracaoNormativa(elaboracaoNormativa.getId()));		
		c:for(DropdownMultiselectSelecionadosJSON dropdownMultiselectJSON:elaboracaoNormativa.getListaCoAutoresSelecionadosDropdown()){
			if(!Objects.isNull(elaboracaoNormativa.getListaElaboracaoNormativaCoAutor())){
				for(ElaboracaoNormativaCoAutores elaboracaoNormativaCoAutores:elaboracaoNormativa.getListaElaboracaoNormativaCoAutor()){
					if(dropdownMultiselectJSON.getId().equals(elaboracaoNormativaCoAutores.getOrgao().getId())){
						continue c;
					}
				}				
			}else{
				elaboracaoNormativa.setListaElaboracaoNormativaCoAutor(new ArrayList<ElaboracaoNormativaCoAutores>());
			}

			ElaboracaoNormativaCoAutores elaboracaoNormativaCoAutores = new ElaboracaoNormativaCoAutores();
			ElaboracaoNormativaCoAutoresPK elaboracaoNormativaCoAutoresPK = new ElaboracaoNormativaCoAutoresPK();
			elaboracaoNormativaCoAutores.setElaboracaoNormativaCoAutoresPK(elaboracaoNormativaCoAutoresPK);
			elaboracaoNormativaCoAutores.setOrgao(orgaoService.findById(dropdownMultiselectJSON.getId()));
			elaboracaoNormativaCoAutores.setElaboracaoNormativa(elaboracaoNormativa);
			elaboracaoNormativa.getListaElaboracaoNormativaCoAutor().add(elaboracaoNormativaCoAutores);
		}
	}

	
	
	private void processaExclusaoElaboracaoNormativaCoAutores(
			ElaboracaoNormativa elaboracaoNormativa) {
		elaboracaoNormativa.setListaElaboracaoNormativaCoAutor(elaboracaoNormativaCoAutoresService
				.pesquisaPorElaboracaoNormativa(elaboracaoNormativa.getId()));			
		List<ElaboracaoNormativaCoAutores> listaExclusao=null;
		if(!Objects.isNull(elaboracaoNormativa.getListaCoAutoresSelecionadosDropdown())){
			listaExclusao = new ArrayList<ElaboracaoNormativaCoAutores>();
			if(!Objects.isNull(elaboracaoNormativa.getListaElaboracaoNormativaCoAutor())){
				c:for(ElaboracaoNormativaCoAutores elaboracaoNormativaCoAutor: elaboracaoNormativa.getListaElaboracaoNormativaCoAutor()){
					for(DropdownMultiselectSelecionadosJSON dropdownMultiselectJSON: elaboracaoNormativa.getListaCoAutoresSelecionadosDropdown()){
						if(dropdownMultiselectJSON.getId().equals(elaboracaoNormativaCoAutor.getOrgao().getId())){
							continue c;
						}
					}
					listaExclusao.add(elaboracaoNormativaCoAutor);
				}
			}
			elaboracaoNormativa.setListaElaboracaoNormativaCoAutor(null);
		}
		
		if(!Objects.isNull(listaExclusao)){
			for(ElaboracaoNormativaCoAutores elaboracaoNormativaCoAutores:listaExclusao){
				elaboracaoNormativaCoAutoresService
					.deleteElaboracaoNormativaCoAutoresServiceEjb(elaboracaoNormativaCoAutores.getElaboracaoNormativaCoAutoresPK());
			}
		}
	}	

	

	private void processaExclusaoTagElaboracaoNormativa(
			ElaboracaoNormativa elaboracaoNormativa) {
		if(!Objects.isNull(elaboracaoNormativa.getId())){
			List<TagElaboracaoNormativa> lista = tagElaboracaoNormativaService.buscaTagsElaboracaoNormativa(elaboracaoNormativa.getId());
			c:for(TagElaboracaoNormativa tagElaboracaoNormativa:lista){
				for(TagJSON tagJSON:elaboracaoNormativa.getTags()){
					if(tagJSON.getText().equals(tagElaboracaoNormativa.getTag().getTag()))
						continue c;
				}
				tagElaboracaoNormativaService.deleteTagElaboracaoNormativa(tagElaboracaoNormativa);
			}
		}
	}
	
	@SuppressWarnings("unchecked")
	private Set<TagElaboracaoNormativa> populaTagsElaboracaoNormativa(ElaboracaoNormativa elaboracaoNormativa) {
		Set<TagElaboracaoNormativa> tagsElaboracaoNormativa = new HashSet<TagElaboracaoNormativa>();
		
		List<TagElaboracaoNormativa> lista =new ArrayList<TagElaboracaoNormativa>();
		if(!Objects.isNull(elaboracaoNormativa.getId())){
			lista = getEntityManager()
					.createNativeQuery("select ten.* from TagElaboracaoNormativa ten "
					+ "where ten.elaboracaoNormativa_id = :id", TagElaboracaoNormativa.class)
					.setParameter("id", elaboracaoNormativa.getId()).getResultList();
		}		c:for(DropdownMultiselectSelecionadosJSON dropdownMultiselectJSON:elaboracaoNormativa.getListaCoAutoresSelecionadosDropdown()){
			if(!Objects.isNull(elaboracaoNormativa.getListaElaboracaoNormativaCoAutor())){
				for(ElaboracaoNormativaCoAutores elaboracaoNormativaCoAutores:elaboracaoNormativa.getListaElaboracaoNormativaCoAutor()){
					if(dropdownMultiselectJSON.getId().equals(elaboracaoNormativaCoAutores.getOrgao().getId())){
						continue c;
					}
				}				
			}else{
				elaboracaoNormativa.setListaElaboracaoNormativaCoAutor(new ArrayList<ElaboracaoNormativaCoAutores>());
			}

			ElaboracaoNormativaCoAutores elaboracaoNormativaCoAutores = new ElaboracaoNormativaCoAutores();
			elaboracaoNormativaCoAutores.setOrgao(orgaoService.findById(dropdownMultiselectJSON.getId()));
			elaboracaoNormativaCoAutores.setElaboracaoNormativa(elaboracaoNormativa);
			elaboracaoNormativa.getListaElaboracaoNormativaCoAutor().add(elaboracaoNormativaCoAutores);
		}
		
		c: for (TagJSON tagJSON : elaboracaoNormativa.getTags()) {
			for(TagElaboracaoNormativa tagElaboracaoNormativa:lista){
				if(tagJSON.getText().equals(tagElaboracaoNormativa.getTag().toString())){
					continue c;
				}
			}
			TagElaboracaoNormativaPK tagElaboracaoNormativaPK = new TagElaboracaoNormativaPK();
			TagElaboracaoNormativa tagElaboracaoNormativa = new TagElaboracaoNormativa();
			tagElaboracaoNormativaPK.setId(elaboracaoNormativa.getId());
			tagElaboracaoNormativaPK.setTag(tagJSON.getText());
			tagElaboracaoNormativa.setTagElaboracaoNormativaPK(tagElaboracaoNormativaPK);
			tagElaboracaoNormativa.setElaboracaoNormativa(elaboracaoNormativa);
			Tag tag = getEntityManager().find(Tag.class, tagJSON.getText());
			if(Objects.isNull(tag)){
				tag=new Tag();
				tag.setTag(tagJSON.getText());
			}
			tagElaboracaoNormativa.setTag(tag);
			tagsElaboracaoNormativa.add(tagElaboracaoNormativa);
		}
		return tagsElaboracaoNormativa;
	}
	
	
	public List<ElaboracaoNormativa> listarTodos(){
		
		CriteriaBuilder cb = getEntityManager().getCriteriaBuilder();
		CriteriaQuery<ElaboracaoNormativa> cq = cb.createQuery(ElaboracaoNormativa.class);
		Root<ElaboracaoNormativa> en = cq.from(ElaboracaoNormativa.class);
		cq.select(en);
		Query query = getEntityManager().createQuery(cq);
		@SuppressWarnings("unchecked")
		List<ElaboracaoNormativa> result = query.getResultList();
		
		return result;
	}

	@SuppressWarnings("unchecked")
	@Override
	public List<ElaboracaoNormativa> buscaPorParametros(
			Map<String, Object> mapaCampos) {
		
		
		CriteriaBuilder cb = getEntityManager().getCriteriaBuilder();
		CriteriaQuery<ElaboracaoNormativa> cq = cb.createQuery(ElaboracaoNormativa.class);
		Root<ElaboracaoNormativa> en = cq.from(ElaboracaoNormativa.class);
		Join<ElaboracaoNormativa, Orgao> oen = en.join("origem", JoinType.LEFT);
		Join<ElaboracaoNormativa, Orgao> ca = en.join("coAutor", JoinType.LEFT);
		Join<ElaboracaoNormativa, StatusSidof> ss = en.join("statusSidof", JoinType.LEFT);
		Join<ElaboracaoNormativa, Equipe> eq = en.join("equipe", JoinType.LEFT);
		Join<ElaboracaoNormativa, Usuario> us = en.join("parecerista", JoinType.LEFT);
		cq.select(cb.construct(ElaboracaoNormativa.class, 
				en.get("id"), 
				en.get("tipo"),
				en.get("subTipo"),
				en.get("elaboracaoNormativaSituacao"),
				en.get("elaboracaoNormativaNorma"),
				en.get("ano"), 
				en.get("numero"),
				oen.get("nome"),
				ca.get("nome"),
				en.get("ementa"),
				ss.get("descricao"),
				en.get("identificacao"),
				eq.get("nome"),
				us.get("nome"),
				en.get("nup"),
				en.get("dataInclusaoSIDOF"),
				en.get("dataAssinaturaSIDOF"),
				en.get("ementaManifestacao"),
				en.get("dataManifestacao"),
				en.get("normaGeradaAno"),
				en.get("normaGeradaNumero")
				));
		
		List<Predicate> predicates=new ArrayList<Predicate>();
		if(!Objects.isNull(mapaCampos.get("ano"))
				&&!mapaCampos.get("ano").equals("")){
			Predicate ano =cb.equal(en.get("ano"), mapaCampos.get("ano"));
			predicates.add(ano);
		}
		if(!Objects.isNull(mapaCampos.get("numero"))
				&&!mapaCampos.get("numero").equals("")){
			Predicate numero =cb.equal(en.get("numero"), mapaCampos.get("numero"));
			predicates.add(numero);			
		}
		if(!Objects.isNull(mapaCampos.get("identificacao"))
				&&!mapaCampos.get("identificacao").equals("")){
			Predicate identificacao =cb.equal(en.get("identificacao"), 
					ElaboracaoNormativaObjeto.get((String)mapaCampos.get("identificacao")));
			predicates.add(identificacao);			
		}
		if(!Objects.isNull(mapaCampos.get("distribuicao"))
				&&((Long)mapaCampos.get("distribuicao")).compareTo(0L)!=0L){
			Predicate distribuicao =cb.equal(en.get("distribuicao"), mapaCampos.get("distribuicao"));
			predicates.add(distribuicao);			
		}	
		if(!Objects.isNull(mapaCampos.get("parecerista"))
				&&((Long)mapaCampos.get("parecerista")).compareTo(0L)!=0L){
			Predicate parecerista =cb.equal(en.get("parecerista"), mapaCampos.get("parecerista"));
			predicates.add(parecerista);			
		}				
		if(!Objects.isNull(mapaCampos.get("statusSidof"))
				&&((Long)mapaCampos.get("statusSidof")).compareTo(0L)!=0L){
			Predicate statusSidof =cb.equal(ss.get("id"), mapaCampos.get("statusSidof"));
			predicates.add(statusSidof);			
		}
		if(!Objects.isNull(mapaCampos.get("elaboracaoNormativaNorma"))
				&&!mapaCampos.get("elaboracaoNormativaNorma").equals("")){
			Predicate elaboracaoNormativaNorma =cb.equal(en.get("elaboracaoNormativaNorma"), 
					ElaboracaoNormativaNorma.get((String)mapaCampos.get("elaboracaoNormativaNorma")));
			predicates.add(elaboracaoNormativaNorma);			
		}		
		if(!Objects.isNull(mapaCampos.get("elaboracaoNormativaSituacao"))
				&&!mapaCampos.get("elaboracaoNormativaSituacao").equals("")){
			Predicate elaboracaoNormativaSituacao =cb.equal(en.get("elaboracaoNormativaSituacao"), 
					ElaboracaoNormativaSituacao.get((String)mapaCampos.get("elaboracaoNormativaSituacao")));
			predicates.add(elaboracaoNormativaSituacao);			
		}		
		if(!Objects.isNull(mapaCampos.get("tipo"))
				&&!mapaCampos.get("tipo").equals("")){
			Predicate tipo =cb.equal(en.get("tipo"), 
					ElaboracaoNormativaTipo.get((String)mapaCampos.get("tipo")));
			predicates.add(tipo);			
		}				
		if(!Objects.isNull(mapaCampos.get("subTipo"))
				&&!mapaCampos.get("subTipo").equals("")){
			Predicate subTipo =cb.equal(en.get("subTipo"), 
					ElaboracaoNormativaSubTipo.get((String)mapaCampos.get("subTipo")));
			predicates.add(subTipo);			
		}				
		
		if(!Objects.isNull(mapaCampos.get("ementa"))
				&&!mapaCampos.get("ementa").equals("")){
			Predicate ementa =cb.like(en.<String>get("ementa"), mapaCampos.get("ementa").toString());
			predicates.add(ementa);			
		}		
		
		if(!Objects.isNull(mapaCampos.get("listaOrigensSelecionadosDropdown"))
				&&!mapaCampos.get("listaOrigensSelecionadosDropdown").equals("")){
			List<String> lista = SislegisUtil.jsonArrayToList(mapaCampos.get("listaOrigensSelecionadosDropdown").toString());
			if(!lista.isEmpty()){
				Predicate listaOrigensSelecionadosDropdown =oen.get("id").in(lista);
				predicates.add(listaOrigensSelecionadosDropdown);			
			}
		}
		
		if(!Objects.isNull(mapaCampos.get("listaTagsSelecionadosDropdown"))
				&&!mapaCampos.get("listaTagsSelecionadosDropdown").equals("")){
			Subquery<TagElaboracaoNormativa> subqueryTags = cq.subquery(TagElaboracaoNormativa.class);
			@SuppressWarnings("rawtypes")
			Root fromTagElaboracaoNormativa = subqueryTags.from(TagElaboracaoNormativa.class);
			subqueryTags.select(fromTagElaboracaoNormativa.get("elaboracaoNormativa"));
			Join<TagElaboracaoNormativa, Tag> tag = fromTagElaboracaoNormativa.join("tag", JoinType.INNER);
			List<String> lista = SislegisUtil.jsonArrayToList(mapaCampos.get("listaTagsSelecionadosDropdown").toString());
			if(!lista.isEmpty()){
				subqueryTags.where(tag.get("tag").in(lista));
				predicates.add(en.get("id").in(subqueryTags));		
			}
		}	

		if(!Objects.isNull(mapaCampos.get("listaCoAutoresSelecionadosDropdown"))
				&&!mapaCampos.get("listaCoAutoresSelecionadosDropdown").equals("")){
			List<String> lista = SislegisUtil.jsonArrayToList(mapaCampos.get("listaCoAutoresSelecionadosDropdown").toString());
			if(!lista.isEmpty()){
				Predicate listaCoAutoresSelecionadosDropdown =ca.get("id").in(lista);
				predicates.add(listaCoAutoresSelecionadosDropdown);			
			}
		}

		cq.where(predicates.toArray(new Predicate[]{}));
		Query query = getEntityManager().createQuery(cq);
		List<ElaboracaoNormativa> result = query.getResultList();
		
		return result;
				
	}


	public List<ElaboracaoNormativa> buscarPorSufixo(String sufixo) {
		TypedQuery<ElaboracaoNormativa> findByIdQuery = getEntityManager().createQuery(
				"SELECT e FROM ElaboracaoNormativa e WHERE upper(e.nup) like upper(:sufixo)",
				ElaboracaoNormativa.class);
		findByIdQuery.setParameter("sufixo", "%"+sufixo+"%");
		return findByIdQuery.getResultList();
	}

	@Override
	public String consultaServicoWS(String nup) {
		RetornoConsultaProcedimento retorno =null;
		try {
			SeiServiceLocator locator = new SeiServiceLocator();
		    retorno = locator.getSeiPortService().consultarProcedimento("SISLEGIS", "sislegis",
			    null, nup, null, null, null, null, null, null, null, null, null);
		} catch (RemoteException | ServiceException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			return null;
		}
		return retorno.getLinkAcesso();
	}
}