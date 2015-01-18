package br.gov.mj.sislegis.app.service.ejbs;

import javax.ejb.Stateless;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

import br.gov.mj.sislegis.app.model.ReuniaoProposicao;
import br.gov.mj.sislegis.app.model.ReuniaoProposicaoPK;
import br.gov.mj.sislegis.app.service.AbstractPersistence;
import br.gov.mj.sislegis.app.service.ReuniaoProposicaoService;

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

	public void deleteById(Long idReuniao, Long idProposicao) {
		ReuniaoProposicaoPK pk = new ReuniaoProposicaoPK();
		pk.setIdReuniao(idReuniao);
		pk.setIdProposicao(idProposicao);
		
		ReuniaoProposicao reuniaoProposicao = em.find(ReuniaoProposicao.class, pk);
		em.remove(reuniaoProposicao);
	}
	
	public ReuniaoProposicao findById(Long idReuniao, Long idProposicao) {
		ReuniaoProposicaoPK pk = new ReuniaoProposicaoPK();
		pk.setIdReuniao(idReuniao);
		pk.setIdProposicao(idProposicao);
		
		return em.find(ReuniaoProposicao.class, pk);
	}
	

}
