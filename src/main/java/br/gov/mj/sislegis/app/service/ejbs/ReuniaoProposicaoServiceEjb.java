package br.gov.mj.sislegis.app.service.ejbs;

import java.util.List;

import javax.ejb.Stateless;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;

import br.gov.mj.sislegis.app.model.ReuniaoProposicao;
import br.gov.mj.sislegis.app.model.ReuniaoProposicaoPK;
import br.gov.mj.sislegis.app.service.AbstractPersistence;
import br.gov.mj.sislegis.app.service.ReuniaoProposicaoService;
import br.gov.mj.sislegis.app.util.Conversores;

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
