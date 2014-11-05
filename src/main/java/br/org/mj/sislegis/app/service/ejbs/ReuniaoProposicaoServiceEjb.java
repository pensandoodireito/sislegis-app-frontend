package br.org.mj.sislegis.app.service.ejbs;

import java.util.List;

import javax.ejb.Stateless;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;

import br.org.mj.sislegis.app.model.ReuniaoProposicao;
import br.org.mj.sislegis.app.model.ReuniaoProposicaoPK;
import br.org.mj.sislegis.app.service.AbstractPersistence;
import br.org.mj.sislegis.app.service.ReuniaoProposicaoService;
import br.org.mj.sislegis.app.util.Conversores;

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

	@Override
	public ReuniaoProposicao buscaReuniaoProposicaoPorId(
			ReuniaoProposicaoPK reuniaoProposicaoPK) {
		ReuniaoProposicao reuniaoProposicao =null;

		Query query = em
				.createNativeQuery("select rp.* from ReuniaoProposicao rp "
						+ "where rp.dataReuniao = :P_DATA "
						+ "and rp.siglaComissao = :P_SIGLA", ReuniaoProposicao.class);
		query.setParameter("P_DATA", Conversores.dateToString(reuniaoProposicaoPK.getDataReuniao(), "yyyy-MM-dd"));
		query.setParameter("P_SIGLA", reuniaoProposicaoPK.getSiglaComissao());
		List<ReuniaoProposicao> reuniaoProposicaos = query.getResultList();
		
		if(reuniaoProposicaos!=null 
				&& !reuniaoProposicaos.isEmpty())
			reuniaoProposicao = reuniaoProposicaos.get(0);
		
		return reuniaoProposicao;
	}
	
	

}
