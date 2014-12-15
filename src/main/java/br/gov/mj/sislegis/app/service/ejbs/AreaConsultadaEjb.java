package br.gov.mj.sislegis.app.service.ejbs;

import javax.ejb.Stateless;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

import br.gov.mj.sislegis.app.model.AreaConsultada;
import br.gov.mj.sislegis.app.service.AbstractPersistence;
import br.gov.mj.sislegis.app.service.AreaConsultadaService;

@Stateless
public class AreaConsultadaEjb extends AbstractPersistence<AreaConsultada, Long> implements AreaConsultadaService {
	
	@PersistenceContext
    private EntityManager em;
	
	public AreaConsultadaEjb() {
		super(AreaConsultada.class);
	}
	
	@Override
	protected EntityManager getEntityManager() {
		return em;
	}

}
