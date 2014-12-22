package br.gov.mj.sislegis.app.service.ejbs;


import java.util.Date;

import javax.ejb.Stateless;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

import br.gov.mj.sislegis.app.model.Reuniao;
import br.gov.mj.sislegis.app.service.AbstractPersistence;
import br.gov.mj.sislegis.app.service.ReuniaoService;

@Stateless
public class ReuniaoServiceEjb extends AbstractPersistence<Reuniao, Long>
implements ReuniaoService{

	@PersistenceContext
    private EntityManager em;
	
	public ReuniaoServiceEjb(){
		super(Reuniao.class);
	}


	@Override
	protected EntityManager getEntityManager() {
		// TODO Auto-generated method stub
		return em;
	}

	@Override
	public Reuniao buscaReuniaoPorData(Date data) {
		try {
			return findByProperty("data", data);
		} catch (Exception ex) {
			return null;
		}
	}
}