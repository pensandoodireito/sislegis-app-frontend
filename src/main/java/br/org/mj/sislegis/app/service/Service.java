package br.org.mj.sislegis.app.service;

import java.util.List;

import javax.ejb.Local;


@Local
public interface Service<T> {

	public List<T> listAll();
	public T save(T entity);
	public T findById(Long id);
	public void deleteById(Long id);
	
}
