package br.org.mj.sislegis.app.service.ejbs;

import java.util.List;

import javax.ejb.Stateless;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.TypedQuery;
import javax.ws.rs.PathParam;

import br.org.mj.sislegis.app.model.Comentario;
import br.org.mj.sislegis.app.service.AbstractPersistence;
import br.org.mj.sislegis.app.service.ComentarioService;

@Stateless
public class ComentarioServiceEjb extends AbstractPersistence<Comentario, Long> 
implements ComentarioService{

	@PersistenceContext
    private EntityManager em;
	
	public ComentarioServiceEjb(){
		super(Comentario.class);
	}

	@Override
	protected EntityManager getEntityManager() {
		return em;
	}
	
	public List<Comentario> findByProposicao(Long id) {
		TypedQuery<Comentario> findByIdQuery = em
				.createQuery(
						"SELECT DISTINCT c FROM Comentario c "
								+ "INNER JOIN c.proposicao p WHERE p.id = :entityId ORDER BY c.id",
						Comentario.class);
		findByIdQuery.setParameter("entityId", id);
		final List<Comentario> results = findByIdQuery.getResultList();
		return results;
	}
}
