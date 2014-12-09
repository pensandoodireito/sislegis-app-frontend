package br.org.mj.sislegis.app.service.ejbs;

import javax.ejb.Stateless;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

import br.org.mj.sislegis.app.model.OrigemElaboracaoNormativa;
import br.org.mj.sislegis.app.service.AbstractPersistence;
import br.org.mj.sislegis.app.service.OrigemElaboracaoNormativaService;

@Stateless
public class OrigemElaboracaoNormativaEjb extends AbstractPersistence<OrigemElaboracaoNormativa, Long> implements OrigemElaboracaoNormativaService {
	
	@PersistenceContext
    private EntityManager em;
	
	public OrigemElaboracaoNormativaEjb() {
		super(OrigemElaboracaoNormativa.class);
	}
	
	@Override
	protected EntityManager getEntityManager() {
		return em;
	}

}
