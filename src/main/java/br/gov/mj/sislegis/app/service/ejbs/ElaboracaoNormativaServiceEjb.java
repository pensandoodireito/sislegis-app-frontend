package br.gov.mj.sislegis.app.service.ejbs;

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
import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Join;
import javax.persistence.criteria.JoinType;
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Root;

import br.gov.mj.sislegis.app.enumerated.ElaboracaoNormativaObjeto;
import br.gov.mj.sislegis.app.enumerated.ElaboracaoNormativaTipo;
import br.gov.mj.sislegis.app.json.TagJSON;
import br.gov.mj.sislegis.app.model.AreaConsultada;
import br.gov.mj.sislegis.app.model.ElaboracaoNormativa;
import br.gov.mj.sislegis.app.model.ElaboracaoNormativaConsulta;
import br.gov.mj.sislegis.app.model.OrigemElaboracaoNormativa;
import br.gov.mj.sislegis.app.model.Tag;
import br.gov.mj.sislegis.app.model.TagElaboracaoNormativa;
import br.gov.mj.sislegis.app.model.TagElaboracaoNormativaPK;
import br.gov.mj.sislegis.app.model.Usuario;
import br.gov.mj.sislegis.app.service.AbstractPersistence;
import br.gov.mj.sislegis.app.service.AreaConsultadaService;
import br.gov.mj.sislegis.app.service.ElaboracaoNormativaService;
import br.gov.mj.sislegis.app.service.OrigemElaboracaoNormativaService;
import br.gov.mj.sislegis.app.service.TagService;
import br.gov.mj.sislegis.app.service.UsuarioService;

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
		
		if(!Objects.isNull(elaboracaoNormativa.getEquipe()))
			elaboracaoNormativa.setPareceristas(usuarioService.findByIdEquipe(elaboracaoNormativa.getEquipe().getId()));
		
		return elaboracaoNormativa;
	}

	@Override
	public void salvar(ElaboracaoNormativa elaboracaoNormativa) {
		// TODO Auto-generated method stub
		if(!Objects.isNull(elaboracaoNormativa.getEquipe()))
			elaboracaoNormativa.getEquipe().setListaEquipeUsuario(null);
		
		elaboracaoNormativa.setTagsElaboracaoNormativa(populaTagsElaboracaoNormativa(elaboracaoNormativa));
		
		if(!Objects.isNull(elaboracaoNormativa.getOrigem())
				&&Objects.isNull(elaboracaoNormativa.getOrigem().getId())){
			OrigemElaboracaoNormativa origemElaboracaoNormativa = origemElaboracaoNormativaService
					.findByProperty("descricao", elaboracaoNormativa.getOrigem().getDescricao());
			elaboracaoNormativa.setOrigem(origemElaboracaoNormativa);
		}
		
		for(ElaboracaoNormativaConsulta elaboracaoNormativaConsulta:elaboracaoNormativa.getListaElaboracaoNormativaConsulta()){
			elaboracaoNormativaConsulta.setElaboracaoNormativa(elaboracaoNormativa);
			if(!Objects.isNull(elaboracaoNormativaConsulta.getAreaConsultada())
					&&Objects.isNull(elaboracaoNormativaConsulta.getAreaConsultada().getId())){
				AreaConsultada areaConsultada = areaConsultadaService
						.findByProperty("descricao", elaboracaoNormativaConsulta.getAreaConsultada().getDescricao());
				elaboracaoNormativaConsulta.setAreaConsultada(areaConsultada);
			}
		}
		
		save(elaboracaoNormativa);
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

	@Override
	public List<ElaboracaoNormativa> buscaPorParametros(
			Map<String, Object> mapaCampos) {
		
		CriteriaBuilder cb = getEntityManager().getCriteriaBuilder();
		CriteriaQuery<ElaboracaoNormativa> cq = cb.createQuery(ElaboracaoNormativa.class);
		Root<ElaboracaoNormativa> en = cq.from(ElaboracaoNormativa.class);
		Join<ElaboracaoNormativa, Usuario> a = en.join("autor", JoinType.LEFT);
		Join<ElaboracaoNormativa, OrigemElaboracaoNormativa> oen = en.join("origem", JoinType.LEFT);
		cq.select(cb.construct(ElaboracaoNormativa.class, 
				en.get("id"), 
				en.get("dataRegistro"), 
				en.get("tipo"),
				en.get("nup"),
				en.get("identificacao"),
				a.get("nome"),
				oen.get("descricao")
				));

		List<Predicate> predicates=new ArrayList<Predicate>();
		if(!Objects.isNull(mapaCampos.get("tipo"))){
			Predicate tipo =cb.equal(en.get("tipo"), ElaboracaoNormativaTipo.get((String)mapaCampos.get("tipo")));
			predicates.add(tipo);
		}
		if(!Objects.isNull(mapaCampos.get("nup"))
				&&!mapaCampos.get("nup").equals("")){
			Predicate nup =cb.equal(en.get("nup"), mapaCampos.get("nup"));
			predicates.add(nup);			
		}
		if(!Objects.isNull(mapaCampos.get("identificacao"))){
			Predicate identificacao =cb.equal(en.get("identificacao"), 
					ElaboracaoNormativaObjeto.get((String)mapaCampos.get("identificacao")));
			predicates.add(identificacao);			
		}
		if(!Objects.isNull(mapaCampos.get("autor"))){
			Predicate nup =cb.equal(a.get("id"), mapaCampos.get("autor"));
			predicates.add(nup);			
		}
		if(!Objects.isNull(mapaCampos.get("origem"))){
			Predicate nup =cb.equal(oen.get("id"), mapaCampos.get("origem"));
			predicates.add(nup);			
		}		
		
		cq.where(predicates.toArray(new Predicate[]{}));
		Query query = getEntityManager().createQuery(cq);
		List<ElaboracaoNormativa> result = query.getResultList();
		return result;
				
	}

}