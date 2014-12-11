package br.org.mj.sislegis.app.service.ejbs;

import java.util.Date;
import java.util.List;

import javax.ejb.Stateless;
import javax.inject.Inject;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.TypedQuery;
import javax.ws.rs.core.UriInfo;

import br.org.mj.sislegis.app.enumerated.TipoTarefa;
import br.org.mj.sislegis.app.model.EncaminhamentoProposicao;
import br.org.mj.sislegis.app.model.Tarefa;
import br.org.mj.sislegis.app.service.AbstractPersistence;
import br.org.mj.sislegis.app.service.EncaminhamentoProposicaoService;
import br.org.mj.sislegis.app.service.TarefaService;

@Stateless
public class EncaminhamentoProposicaoServiceEjb extends AbstractPersistence<EncaminhamentoProposicao, Long> implements EncaminhamentoProposicaoService {
	
	
	@PersistenceContext
    private EntityManager em;
	
	@Inject
	private TarefaService tarefaService;
	
	public EncaminhamentoProposicaoServiceEjb(){
		super(EncaminhamentoProposicao.class);
	}

	@Override
	protected EntityManager getEntityManager() {
		return em;
	}
	
	@Override
	public EncaminhamentoProposicao salvarEncaminhamentoProposicao(EncaminhamentoProposicao encaminhamentoProposicao, UriInfo uriInfo) {
		EncaminhamentoProposicao savedEntity = this.save(encaminhamentoProposicao);
		
		// Caso uma tarefa já exista, significa que foi atualizada. Excluímos a antiga antes de atualizar.
		Tarefa tarefaPorEncaminhamentoProposicaoId = tarefaService.buscarPorEncaminhamentoProposicaoId(savedEntity.getId());
		if (tarefaPorEncaminhamentoProposicaoId != null) {
			tarefaService.deleteById(tarefaPorEncaminhamentoProposicaoId.getId());
		}
		
		// Criamos a nova tarefa
		Tarefa tarefa = new Tarefa();
		tarefa.setTipoTarefa(TipoTarefa.ENCAMINHAMENTO);
		tarefa.setData(new Date());
		tarefa.setUsuario(savedEntity.getResponsavel());
		tarefa.setEncaminhamentoProposicao(savedEntity);
		
		tarefaService.save(tarefa, uriInfo);
		
		return savedEntity;
	}

	public List<EncaminhamentoProposicao> findByProposicao(Long id) {
		TypedQuery<EncaminhamentoProposicao> findByIdQuery = em
				.createQuery(
						"SELECT c FROM EncaminhamentoProposicao c "
								+ "INNER JOIN FETCH c.proposicao p WHERE p.id = :entityId",
								EncaminhamentoProposicao.class);
		findByIdQuery.setParameter("entityId", id);
		final List<EncaminhamentoProposicao> results = findByIdQuery.getResultList();
		return results;
	}

	
}
