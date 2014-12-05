package br.org.mj.sislegis.app.service.ejbs;

import java.util.List;

import javax.ejb.Stateless;
import javax.inject.Inject;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.TypedQuery;

import br.org.mj.sislegis.app.model.Tarefa;
import br.org.mj.sislegis.app.service.AbstractPersistence;
import br.org.mj.sislegis.app.service.ProposicaoService;
import br.org.mj.sislegis.app.service.TarefaService;

@Stateless
public class TarefaServiceEjb extends AbstractPersistence<Tarefa, Long> implements TarefaService {
	
	@PersistenceContext
    private EntityManager em;
	
	public TarefaServiceEjb() {
		super(Tarefa.class);
	}
	
	@Override
	protected EntityManager getEntityManager() {
		return em;
	}

	@Override
	public List<Tarefa> buscarPorUsuario(Long idUsuario) {
		TypedQuery<Tarefa> findByIdQuery = em.createQuery("SELECT t FROM Tarefa t WHERE t.usuario.id = :idUsuario", Tarefa.class);
		findByIdQuery.setParameter("idUsuario", idUsuario);
		List<Tarefa> resultList = findByIdQuery.getResultList();
		// Carrega para evitar lazy exception
		for (Tarefa tarefa : resultList) {
			if (tarefa.getEncaminhamentoProposicao() != null) {
				tarefa.getEncaminhamentoProposicao().getProposicao();
			}
		}
		return resultList;
	}
	
	

}
