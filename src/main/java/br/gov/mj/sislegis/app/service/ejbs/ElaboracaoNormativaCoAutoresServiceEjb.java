package br.gov.mj.sislegis.app.service.ejbs;

import javax.ejb.Stateless;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

import br.gov.mj.sislegis.app.model.ElaboracaoNormativaCoAutores;
import br.gov.mj.sislegis.app.model.ElaboracaoNormativaTiposMarcados;
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
	public void deleteElaboracaoNormativaCoAutoresServiceEjb(Long id) {
		getEntityManager().createNativeQuery("delete from ElaboracaoNormativaCoAutores "
				+ "where id  = :id", ElaboracaoNormativaCoAutores.class)
				.setParameter("id", id)
				.executeUpdate();
		
	}	

}
