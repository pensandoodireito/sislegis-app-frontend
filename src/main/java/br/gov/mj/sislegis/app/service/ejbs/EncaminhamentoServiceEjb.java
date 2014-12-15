package br.gov.mj.sislegis.app.service.ejbs;

import javax.ejb.Stateless;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

import br.gov.mj.sislegis.app.model.Encaminhamento;
import br.gov.mj.sislegis.app.service.AbstractPersistence;
import br.gov.mj.sislegis.app.service.EncaminhamentoService;

@Stateless
public class EncaminhamentoServiceEjb extends AbstractPersistence<Encaminhamento, Long> implements EncaminhamentoService {
	
	@PersistenceContext
    private EntityManager em;
	
	public EncaminhamentoServiceEjb() {
		super(Encaminhamento.class);
	}
	
	@Override
	protected EntityManager getEntityManager() {
		return em;
	}

}
