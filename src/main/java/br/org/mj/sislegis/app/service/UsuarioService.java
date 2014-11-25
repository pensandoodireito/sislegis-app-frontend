package br.org.mj.sislegis.app.service;

import java.util.List;

import javax.ejb.Local;

import br.org.mj.sislegis.app.model.Usuario;

@Local
public interface UsuarioService extends Service<Usuario> {

	List<Usuario> findByNome(String nome);
	

}
