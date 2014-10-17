package br.org.mj.sislegis.app.service;

import javax.persistence.EntityManager;
import javax.ws.rs.PathParam;
import javax.ws.rs.core.Response;

import br.org.mj.sislegis.app.model.AbstractEntity;




/**
 * 
 * @author raphael.santos
 */
public abstract class AbstractPersistence<T extends AbstractEntity, PK extends Number> {

	private Class<T> entityClass;

	public AbstractPersistence(Class<T> entityClass) {
		this.entityClass = entityClass;
	}

	public T save(T e) {
		if (e.getId() != null)
			return getEntityManager().merge(e);
		else {
			getEntityManager().persist(e);
			return e;
		}
	}

	public void remove(T entity) {
		getEntityManager().remove(getEntityManager().merge(entity));
	}

	public T findById(PK id) {
		return getEntityManager().find(entityClass, id);
	}

	public void deleteById(Long id){
		getEntityManager().remove(getEntityManager().find(entityClass, id));
   }
	
	protected abstract EntityManager getEntityManager();
	

}
