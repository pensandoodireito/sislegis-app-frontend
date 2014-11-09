package br.org.mj.sislegis.app.service.ejbs;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import java.util.Set;

import javax.ejb.Stateless;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

import br.org.mj.sislegis.app.json.TagJSON;
import br.org.mj.sislegis.app.model.Tag;
import br.org.mj.sislegis.app.model.TagProposicao;
import br.org.mj.sislegis.app.service.AbstractPersistence;
import br.org.mj.sislegis.app.service.TagService;

@Stateless
public class TagServiceEjb extends AbstractPersistence<Tag, Number>
implements TagService{
	
	@PersistenceContext
    private EntityManager em;
	
	public TagServiceEjb() {
		super(Tag.class);
	}

	@Override
	public Tag findById(Long id) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	protected EntityManager getEntityManager() {
		return em;
	}

	@Override
	public List<TagJSON> listarTodasTags() {
		List<TagJSON> listaTagsJson = populaListaTagsJSON(listAll());
		return listaTagsJson;
	}

	public List<TagJSON> populaListaTagsJSON(Collection<Tag> listaTags) {
		List<TagJSON> listaTagsJson = new ArrayList<TagJSON>();
		for(Tag tag :listaTags){
			listaTagsJson.add(new TagJSON(tag.toString()));
		}
		return listaTagsJson;
	}
	
	public List<TagJSON> populaListaTagsProposicaoJSON(Collection<TagProposicao> listaTags) {
		List<TagJSON> listaTagsJson = new ArrayList<TagJSON>();
		for(TagProposicao tp :listaTags){
			listaTagsJson.add(new TagJSON(tp.getTag().toString()));
		}
		return listaTagsJson;
	}

}
