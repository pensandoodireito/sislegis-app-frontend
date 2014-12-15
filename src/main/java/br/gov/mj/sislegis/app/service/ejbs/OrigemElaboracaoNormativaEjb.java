package br.gov.mj.sislegis.app.service.ejbs;

import javax.ejb.Stateless;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

import br.gov.mj.sislegis.app.model.OrigemElaboracaoNormativa;
import br.gov.mj.sislegis.app.service.AbstractPersistence;
import br.gov.mj.sislegis.app.service.OrigemElaboracaoNormativaService;

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
