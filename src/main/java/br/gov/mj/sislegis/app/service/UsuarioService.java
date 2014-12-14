package br.gov.mj.sislegis.app.service;

import java.util.List;

import javax.ejb.Local;

import br.gov.mj.sislegis.app.model.Usuario;

@Local
public interface UsuarioService extends Service<Usuario> {

	List<Usuario> findByNome(String nome);
	List<Usuario> findByIdEquipe(Long idEquipe);
	

}
