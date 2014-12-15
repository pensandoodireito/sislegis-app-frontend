package br.gov.mj.sislegis.app.service.ejbs;


import java.util.Date;
import java.util.List;

import javax.ejb.Stateless;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;

import br.gov.mj.sislegis.app.model.Proposicao;
import br.gov.mj.sislegis.app.model.Reuniao;
import br.gov.mj.sislegis.app.service.AbstractPersistence;
import br.gov.mj.sislegis.app.service.ReuniaoService;
import br.gov.mj.sislegis.app.service.Service;
import br.gov.mj.sislegis.app.util.Conversores;

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
	public List<Reuniao> buscaReuniaoPorData(Date data) {
		// TODO Auto-generated method stub
		Query query = em.createNativeQuery("select r.* from Reuniao r "
				+ "where r.data = :P_DATA", Reuniao.class);
		query.setParameter("P_DATA", Conversores.dateToString(data, "yyyy-MM-dd"));
		
		List<Reuniao> lista = query.getResultList();
		return lista;
	}
	
	
	

}
