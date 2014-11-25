package br.org.mj.sislegis.app.service.ejbs;

import java.util.List;

import javax.ejb.Stateless;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.TypedQuery;

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

}
