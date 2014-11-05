package br.org.mj.sislegis.app.service;

import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.criteria.CriteriaQuery;
import br.org.mj.sislegis.app.model.AbstractEntity;

/**
 * Classe resolve os métodos básicos de cadastro (CRUD) com API da
 * <code>JPA</code>.
 * 
 * @author raphael.santos
 */
public abstract class AbstractPersistence<T extends AbstractEntity, PK extends Number> {

	// Classe da entidade, necessário para o método
	// <code>EntityManager.find</code>.
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

	public void deleteById(Long id) {
		getEntityManager().remove(getEntityManager().find(entityClass, id));
	}

	public List<T> listAll() {
		CriteriaQuery cq = getEntityManager().getCriteriaBuilder()
				.createQuery();
		cq.select(cq.from(entityClass));
		return getEntityManager().createQuery(cq).getResultList();
	}

	// Exige a definição do <code>EntityManager</code> responsável pelas
	// operações de persistencia.
	protected abstract EntityManager getEntityManager();

}
