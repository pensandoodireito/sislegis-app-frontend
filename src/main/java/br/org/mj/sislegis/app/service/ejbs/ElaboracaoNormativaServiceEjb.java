package br.org.mj.sislegis.app.service.ejbs;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Objects;
import java.util.Set;

import javax.ejb.Stateless;
import javax.inject.Inject;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;
import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Root;

import br.org.mj.sislegis.app.enumerated.ElaboracaoNormativaIdentificacao;
import br.org.mj.sislegis.app.enumerated.ElaboracaoNormativaNorma;
import br.org.mj.sislegis.app.enumerated.ElaboracaoNormativaTipo;
import br.org.mj.sislegis.app.json.TagJSON;
import br.org.mj.sislegis.app.model.ElaboracaoNormativa;
import br.org.mj.sislegis.app.model.Tag;
import br.org.mj.sislegis.app.model.TagElaboracaoNormativa;
import br.org.mj.sislegis.app.model.TagElaboracaoNormativaPK;
import br.org.mj.sislegis.app.service.AbstractPersistence;
import br.org.mj.sislegis.app.service.ElaboracaoNormativaService;
import br.org.mj.sislegis.app.service.TagService;

import com.sun.xml.bind.v2.runtime.property.Property;

@Stateless
public class ElaboracaoNormativaServiceEjb extends AbstractPersistence<ElaboracaoNormativa, Long> implements ElaboracaoNormativaService {
	
	@Inject
	public TagService tagService;
	
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
		elaboracaoNormativa.setListaElaboracaoNormativaConsulta(null);
		elaboracaoNormativa.setTags(new ArrayList<TagJSON>());
		for(TagElaboracaoNormativa tagElaboracaoNormativa:elaboracaoNormativa.getTagsElaboracaoNormativa()){
			TagJSON tagJSON = new TagJSON(tagElaboracaoNormativa.getTag().toString());
			elaboracaoNormativa.getTags().add(tagJSON);
		}
		elaboracaoNormativa.setTagsElaboracaoNormativa(null);
		elaboracaoNormativa.setCodElaboracaoNormativaIdentificacao(Objects.isNull(elaboracaoNormativa.getIdentificacao())?null:elaboracaoNormativa.getIdentificacao().name());
		elaboracaoNormativa.setCodElaboracaoNormativaNorma(Objects.isNull(elaboracaoNormativa.getElaboracaoNormativaNorma())?null:elaboracaoNormativa.getElaboracaoNormativaNorma().name());
		elaboracaoNormativa.setCodElaboracaoNormativaTipo(Objects.isNull(elaboracaoNormativa.getTipo())?null:elaboracaoNormativa.getTipo().name());
		return elaboracaoNormativa;
	}

	@Override
	public void salvar(ElaboracaoNormativa elaboracaoNormativa) {
		// TODO Auto-generated method stub
		elaboracaoNormativa.setTipo(Objects.isNull(elaboracaoNormativa.getCodElaboracaoNormativaTipo())?null:ElaboracaoNormativaTipo.get(elaboracaoNormativa.getCodElaboracaoNormativaTipo()));
		elaboracaoNormativa.setIdentificacao(Objects.isNull(elaboracaoNormativa.getCodElaboracaoNormativaIdentificacao())?null:ElaboracaoNormativaIdentificacao.get(elaboracaoNormativa.getCodElaboracaoNormativaIdentificacao()));
		elaboracaoNormativa.setElaboracaoNormativaNorma(Objects.isNull(elaboracaoNormativa.getCodElaboracaoNormativaNorma())?null:ElaboracaoNormativaNorma.get(elaboracaoNormativa.getCodElaboracaoNormativaNorma()));
		if(!Objects.isNull(elaboracaoNormativa.getEquipe()))
			elaboracaoNormativa.getEquipe().setListaEquipeUsuario(null);
		elaboracaoNormativa.setTagsElaboracaoNormativa(populaTagsElaboracaoNormativa(elaboracaoNormativa));
		
		save(elaboracaoNormativa);
	}
	
	private Set<TagElaboracaoNormativa> populaTagsElaboracaoNormativa(ElaboracaoNormativa elaboracaoNormativa) {
		Set<TagElaboracaoNormativa> tagsElaboracaoNormativa = new HashSet<TagElaboracaoNormativa>();
		for (TagJSON tagJSON : elaboracaoNormativa.getTags()) {
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
		cq.select(cb.construct(ElaboracaoNormativa.class, 
				en.get("id"), 
				en.get("dataRegistro"), 
				en.get("tipo"),
				en.get("nup"),
				en.get("identificacao"),
				en.get("autor"),
				en.get("coAutor"),
				en.get("origem"),
				en.get("ementa")
				));
		Query query = getEntityManager().createQuery(cq);
		@SuppressWarnings("unchecked")
		List<ElaboracaoNormativa> result = query.getResultList();
		
		return result;
	}

}