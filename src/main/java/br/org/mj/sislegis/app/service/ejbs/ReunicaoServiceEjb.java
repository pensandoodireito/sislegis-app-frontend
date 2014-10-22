package br.org.mj.sislegis.app.service.ejbs;

import java.util.List;

import javax.ejb.Stateless;
import javax.persistence.EntityManager;

import br.org.mj.sislegis.app.model.Reuniao;
import br.org.mj.sislegis.app.service.AbstractPersistence;
import br.org.mj.sislegis.app.service.Service;

@Stateless
public class ReunicaoServiceEjb extends AbstractPersistence<Reuniao, Number>
implements Service<Reuniao>{

	
	public ReunicaoServiceEjb(){
		super(Reuniao.class);
	}

	@Override
	public Reuniao findById(Long id) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	protected EntityManager getEntityManager() {
		// TODO Auto-generated method stub
		return null;
	}
	
	
	

}
