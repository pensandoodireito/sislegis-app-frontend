package br.org.mj.sislegis.app.service.ejbs;

import java.util.ArrayList;
import java.util.List;

import javax.ejb.Stateless;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.TypedQuery;

import br.org.mj.sislegis.app.json.ComentarioJSON;
import br.org.mj.sislegis.app.model.Comentario;
import br.org.mj.sislegis.app.model.Proposicao;
import br.org.mj.sislegis.app.service.AbstractPersistence;
import br.org.mj.sislegis.app.service.ComentarioService;

@Stateless
public class ComentarioServiceEjb extends AbstractPersistence<Comentario, Long>
		implements ComentarioService {

	@PersistenceContext
	private EntityManager em;

	public ComentarioServiceEjb() {
		super(Comentario.class);
	}

	@Override
	protected EntityManager getEntityManager() {
		return em;
	}

	public List<ComentarioJSON> findByProposicao(Long id) {
		List<ComentarioJSON> lista = new ArrayList<ComentarioJSON>();
		TypedQuery<Comentario> findByIdQuery = em
				.createQuery(
						"SELECT DISTINCT c FROM Comentario c "
								+ "INNER JOIN FETCH c.proposicao p WHERE p.id = :entityId",
						Comentario.class);
		findByIdQuery.setParameter("entityId", id);
		final List<Comentario> results = findByIdQuery.getResultList();
		for (Comentario comentario : results) {
			lista.add(new ComentarioJSON(
					comentario.getId(), comentario.getDescricao(),
					comentario.getAutor(), comentario.getDataCriacao(),
					comentario.getProposicao().getId()));

		}
		return lista;
	}

	@Override
	public void salvarComentario(ComentarioJSON comentarioJSON) {
		Comentario comentario = populaEntidadeComentario(comentarioJSON);
		save(comentario);
		
	}

	private Comentario populaEntidadeComentario(ComentarioJSON comentarioJSON) {
		Comentario comentario = new Comentario();
		Proposicao proposicao = new Proposicao();
		proposicao.setId(comentarioJSON.getIdProposicao());
		comentario.setAutor(comentarioJSON.getAutor());
		comentario.setDataCriacao(comentarioJSON.getDataCriacao());
		comentario.setId(comentarioJSON.getId());
		comentario.setDescricao(comentarioJSON.getDescricao());
		comentario.setProposicao(proposicao);
		return comentario;
	}
}
