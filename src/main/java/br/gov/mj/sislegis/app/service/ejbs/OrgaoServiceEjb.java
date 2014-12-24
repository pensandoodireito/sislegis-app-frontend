package br.gov.mj.sislegis.app.service.ejbs;

import javax.ejb.Stateless;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

import br.gov.mj.sislegis.app.model.Orgao;
import br.gov.mj.sislegis.app.service.AbstractPersistence;
import br.gov.mj.sislegis.app.service.OrgaoService;

@Stateless
public class OrgaoServiceEjb extends AbstractPersistence<Orgao, Long> implements OrgaoService {
	
	@PersistenceContext
    private EntityManager em;
	
	public OrgaoServiceEjb() {
		super(Orgao.class);
	}
	
	@Override
	protected EntityManager getEntityManager() {
		return em;
	}

}
