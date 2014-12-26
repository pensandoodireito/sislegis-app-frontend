package br.gov.mj.sislegis.app.service.ejbs;

import java.util.List;

import javax.ejb.Stateless;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;
import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Order;
import javax.persistence.criteria.Root;

import br.gov.mj.sislegis.app.model.TagElaboracaoNormativa;
import br.gov.mj.sislegis.app.service.AbstractPersistence;
import br.gov.mj.sislegis.app.service.TagElaboracaoNormativaService;

@Stateless
public class TagElaboracaoNormativaServiceEjb extends AbstractPersistence<TagElaboracaoNormativa, Long>
implements TagElaboracaoNormativaService {
	
	@PersistenceContext
    private EntityManager em;
	
	public TagElaboracaoNormativaServiceEjb() {
		super(TagElaboracaoNormativa.class);
	}


	@Override
	protected EntityManager getEntityManager() {
		return em;
	}


	@Override
	public List<TagElaboracaoNormativa> buscaTagsElaboracaoNormativa(Long id) {
		CriteriaBuilder cb = em.getCriteriaBuilder();
	    CriteriaQuery<TagElaboracaoNormativa> c = cb.createQuery(TagElaboracaoNormativa.class);
	    Root<TagElaboracaoNormativa> ten = c.from(TagElaboracaoNormativa.class);
	    c.select(ten);
	    c.where(cb.equal(ten.get("elaboracaoNormativa"), id));
	    Query query = getEntityManager().createQuery(c);
		List<TagElaboracaoNormativa> result = query.getResultList();
		return result;
	}


	@Override
	public void deleteTagElaboracaoNormativa(
			TagElaboracaoNormativa tagElaboracaoNormativa) {
		getEntityManager().createNativeQuery("delete from TagElaboracaoNormativa ten "
				+ "where ten.elaboracaoNormativa_id = :id and ten.tag_id =:idTag", TagElaboracaoNormativa.class)
				.setParameter("id", tagElaboracaoNormativa.getElaboracaoNormativa().getId())
				.setParameter("idTag", tagElaboracaoNormativa.getTag().getTag())
				.executeUpdate();
		
	}

}
