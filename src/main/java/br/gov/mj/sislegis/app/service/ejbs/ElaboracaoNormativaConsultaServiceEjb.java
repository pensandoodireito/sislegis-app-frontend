package br.gov.mj.sislegis.app.service.ejbs;

import java.util.List;

import javax.ejb.Stateless;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;
import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Root;

import br.gov.mj.sislegis.app.model.ElaboracaoNormativaCoAutores;
import br.gov.mj.sislegis.app.model.ElaboracaoNormativaCoAutoresPK;
import br.gov.mj.sislegis.app.model.ElaboracaoNormativaConsulta;
import br.gov.mj.sislegis.app.service.AbstractPersistence;
import br.gov.mj.sislegis.app.service.ElaboracaoNormativaConsultaService;

@Stateless
public class ElaboracaoNormativaConsultaServiceEjb extends AbstractPersistence<ElaboracaoNormativaConsulta, Long> 
implements ElaboracaoNormativaConsultaService {
	
	@PersistenceContext
    private EntityManager em;

	public ElaboracaoNormativaConsultaServiceEjb(){
		super(ElaboracaoNormativaConsulta.class);
	}
	@Override
	public List<ElaboracaoNormativaConsulta> pesquisaElaboracaoNormativaConsutaPorIdElaboracaoNormativa(
			Long idElaboracaoNormativa) {
		CriteriaBuilder cb = em.getCriteriaBuilder();
	    CriteriaQuery<ElaboracaoNormativaConsulta> c = cb.createQuery(ElaboracaoNormativaConsulta.class);
	    Root<ElaboracaoNormativaConsulta> ten = c.from(ElaboracaoNormativaConsulta.class);
	    c.select(ten);
	    c.where(cb.equal(ten.get("elaboracaoNormativa"), idElaboracaoNormativa));
	    Query query = getEntityManager().createQuery(c);
		@SuppressWarnings("unchecked")
		List<ElaboracaoNormativaConsulta> result = query.getResultList();
		return result;
	}
	
	@Override
	public void deleteElaboracaoNormativaConsutaPorIdElaboracaoNormativa(Long id) {
		getEntityManager().createNativeQuery("delete from elaboracao_normativa_consulta "
				+ "where id  = :id ", ElaboracaoNormativaCoAutores.class)
				.setParameter("id", id)
				.executeUpdate();
		
	}	

	@Override
	protected EntityManager getEntityManager() {
		// TODO Auto-generated method stub
		return em;
	}

}
