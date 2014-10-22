package br.org.mj.sislegis.app.service.ejbs;


import javax.ejb.Stateless;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

import br.org.mj.sislegis.app.model.Reuniao;
import br.org.mj.sislegis.app.service.AbstractPersistence;
import br.org.mj.sislegis.app.service.Service;

@Stateless
public class ReunicaoServiceEjb extends AbstractPersistence<Reuniao, Long>
implements Service<Reuniao>{

	@PersistenceContext
    private EntityManager em;
	
	public ReunicaoServiceEjb(){
		super(Reuniao.class);
	}


	@Override
	protected EntityManager getEntityManager() {
		// TODO Auto-generated method stub
		return em;
	}
	
	
	

}
