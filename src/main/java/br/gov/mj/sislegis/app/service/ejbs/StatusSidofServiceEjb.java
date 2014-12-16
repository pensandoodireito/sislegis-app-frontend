package br.gov.mj.sislegis.app.service.ejbs;

import javax.ejb.Stateless;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

import br.gov.mj.sislegis.app.model.StatusSidof;
import br.gov.mj.sislegis.app.service.AbstractPersistence;
import br.gov.mj.sislegis.app.service.StatusSidofService;

@Stateless
public class StatusSidofServiceEjb extends AbstractPersistence<StatusSidof, Long>
implements StatusSidofService {

	@PersistenceContext
    private EntityManager em;
	
	public StatusSidofServiceEjb(){
		super(StatusSidof.class);
	}


	@Override
	protected EntityManager getEntityManager() {
		// TODO Auto-generated method stub
		return em;
	}

}
