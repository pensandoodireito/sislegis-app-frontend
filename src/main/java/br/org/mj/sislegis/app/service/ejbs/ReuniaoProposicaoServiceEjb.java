package br.org.mj.sislegis.app.service.ejbs;

import javax.ejb.Stateless;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

import br.org.mj.sislegis.app.model.ReuniaoProposicao;
import br.org.mj.sislegis.app.service.AbstractPersistence;
import br.org.mj.sislegis.app.service.ReuniaoProposicaoService;

@Stateless
public class ReuniaoProposicaoServiceEjb extends AbstractPersistence<ReuniaoProposicao, Long> implements ReuniaoProposicaoService  {

	@PersistenceContext
    private EntityManager em;
	
	public ReuniaoProposicaoServiceEjb() {
		super(ReuniaoProposicao.class);
	}
	
	@Override
	protected EntityManager getEntityManager() {
		return em;
	}

}
