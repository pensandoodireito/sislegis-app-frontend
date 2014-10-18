package br.org.mj.sislegis.app.service.ejbs;

import java.util.List;
import java.util.Map;

import javax.ejb.Stateless;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

import br.org.mj.sislegis.app.model.Proposicao;
import br.org.mj.sislegis.app.service.AbstractPersistence;
import br.org.mj.sislegis.app.service.ProposicaoService;

@Stateless
public class ProposicaoServiceEjb extends AbstractPersistence<Proposicao, Long>
implements ProposicaoService{
	
	@PersistenceContext
    private EntityManager em;
	
	public ProposicaoServiceEjb() {
		super(Proposicao.class);
	}

	@Override
	public List<Proposicao> buscarProposicoes(Map parametros) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	protected EntityManager getEntityManager() {
		// TODO Auto-generated method stub
		return em;
	}

	
}
