package br.gov.mj.sislegis.app.service.ejbs;

import javax.ejb.Stateless;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

import br.gov.mj.sislegis.app.model.ElaboracaoNormativaTiposMarcados;
import br.gov.mj.sislegis.app.service.AbstractPersistence;
import br.gov.mj.sislegis.app.service.ElaboracaoNormativaTiposMarcadosService;

@Stateless
public class ElaboracaoNormativaTiposMarcadosServiceEjb extends AbstractPersistence<ElaboracaoNormativaTiposMarcados, Long>
implements ElaboracaoNormativaTiposMarcadosService{
	
	@PersistenceContext
    private EntityManager em;
	
	public ElaboracaoNormativaTiposMarcadosServiceEjb() {
		super(ElaboracaoNormativaTiposMarcados.class);
	}
	
	@Override
	protected EntityManager getEntityManager() {
		return em;
	}
	

	@Override
	public void deleteElaboracaoNormativaTiposMarcado(Long id) {
		getEntityManager().createNativeQuery("delete from ElaboracaoNormativaTiposMarcados "
				+ "where id  = :id", ElaboracaoNormativaTiposMarcados.class)
				.setParameter("id", id)
				.executeUpdate();
	}



}
