package br.gov.mj.sislegis.app.service.ejbs;

import java.util.List;
import java.util.Objects;

import javax.ejb.Stateless;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;
import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Root;

import br.gov.mj.sislegis.app.model.ElaboracaoNormativaCoAutores;
import br.gov.mj.sislegis.app.model.ElaboracaoNormativaCoAutoresPK;
import br.gov.mj.sislegis.app.model.TagElaboracaoNormativa;
import br.gov.mj.sislegis.app.service.AbstractPersistence;
import br.gov.mj.sislegis.app.service.ElaboracaoNormativaCoAutoresService;

@Stateless
public class ElaboracaoNormativaCoAutoresServiceEjb extends AbstractPersistence<ElaboracaoNormativaCoAutores, Long>
implements ElaboracaoNormativaCoAutoresService{

	@PersistenceContext
    private EntityManager em;
	
	public ElaboracaoNormativaCoAutoresServiceEjb(){
		super(ElaboracaoNormativaCoAutores.class);
	}
	
	@Override
	protected EntityManager getEntityManager() {
		// TODO Auto-generated method stub
		return em;
	}
	
	@Override
	public void deleteElaboracaoNormativaCoAutoresServiceEjb(ElaboracaoNormativaCoAutoresPK elaboracaoNormativaCoAutoresPK) {
		getEntityManager().createNativeQuery("delete from ElaboracaoNormativaCoAutores "
				+ "where elaboracaoNormativa_id  = :idElaboracaoNormativa "
				+ "and orgao_id = :idOrgao", ElaboracaoNormativaCoAutores.class)
				.setParameter("idElaboracaoNormativa", elaboracaoNormativaCoAutoresPK.getIdElaboracaoNormativa())
				.setParameter("idOrgao", elaboracaoNormativaCoAutoresPK.getIdOrgao())
				.executeUpdate();
		
	}	
	
	public ElaboracaoNormativaCoAutores pesquisaPorElaboracaoNormativaById(Long idElaboracaoNormativa, Long idOrgao){
		Object obj = getEntityManager().createNativeQuery("select * from ElaboracaoNormativaCoAutores "
					+ "where elaboracaoNormativa_id  = :idElaboracaoNormativa "
					+ "and orgao_id = :idOrgao", ElaboracaoNormativaCoAutores.class)
					.setParameter("idElaboracaoNormativa", idElaboracaoNormativa)
					.setParameter("idOrgao", idOrgao)
					.getSingleResult();
		
		return Objects.isNull(obj)?null:(ElaboracaoNormativaCoAutores)obj;
	}
	
	public List<ElaboracaoNormativaCoAutores> pesquisaPorElaboracaoNormativa(Long idElaboracaoNormativa){
		CriteriaBuilder cb = em.getCriteriaBuilder();
	    CriteriaQuery<ElaboracaoNormativaCoAutores> c = cb.createQuery(ElaboracaoNormativaCoAutores.class);
	    Root<ElaboracaoNormativaCoAutores> ten = c.from(ElaboracaoNormativaCoAutores.class);
	    c.select(ten);
	    c.where(cb.equal(ten.get("elaboracaoNormativa"), idElaboracaoNormativa));
	    Query query = getEntityManager().createQuery(c);
		@SuppressWarnings("unchecked")
		List<ElaboracaoNormativaCoAutores> result = query.getResultList();
		return result;
	}

}
