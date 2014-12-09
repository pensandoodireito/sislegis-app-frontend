package br.org.mj.sislegis.app.service.ejbs;

import java.util.List;

import javax.ejb.Stateless;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;
import javax.persistence.TypedQuery;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Fetch;
import javax.persistence.criteria.Root;

import br.org.mj.sislegis.app.model.EquipeUsuario;
import br.org.mj.sislegis.app.model.Usuario;
import br.org.mj.sislegis.app.service.AbstractPersistence;
import br.org.mj.sislegis.app.service.UsuarioService;

@Stateless
public class UsuarioServiceEjb extends AbstractPersistence<Usuario, Long> implements UsuarioService {
	
	@PersistenceContext
    private EntityManager em;
	
	public UsuarioServiceEjb() {
		super(Usuario.class);
	}
	
	@Override
	protected EntityManager getEntityManager() {
		return em;
	}

	@Override
	public List<Usuario> findByNome(String nome) {
		TypedQuery<Usuario> findByIdQuery = em.createQuery("SELECT u FROM Usuario u WHERE upper(u.nome) like upper(:nome) ORDER BY u.nome ASC",
				Usuario.class);
		findByIdQuery.setParameter("nome", "%"+nome+"%");
		return findByIdQuery.getResultList();
	}

	@Override
	public List<Usuario> findByIdEquipe(Long idEquipe) {
		// TODO Auto-generated method stub
		
		Query query = em.createNativeQuery("SELECT u.* FROM Usuario u "
				+ " inner join equipe_usuario eu on u.id = eu.usuario_id "
				+ " inner join Equipe e on e.id = eu.equipe_id "
				+ "	WHERE e.id = :idEquipe ORDER BY u.nome ASC", Usuario.class);
		query.setParameter("idEquipe", idEquipe);
		List<Usuario> usuarios = query.getResultList();
		
		return usuarios;
	}

}
