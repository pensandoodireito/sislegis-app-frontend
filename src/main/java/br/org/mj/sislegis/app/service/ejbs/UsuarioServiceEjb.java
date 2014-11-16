package br.org.mj.sislegis.app.service.ejbs;

import javax.ejb.Stateless;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

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

}
