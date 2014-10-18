package br.org.mj.sislegis.app.service;

import java.util.List;

import javax.ejb.Local;

import br.org.mj.sislegis.app.model.Comissao;


@Local
public interface ComissaoService extends Service<Comissao> {
	
	public List<Comissao> listarComissoesCamara(Integer startPosition, Integer maxResult)throws Exception;

}
