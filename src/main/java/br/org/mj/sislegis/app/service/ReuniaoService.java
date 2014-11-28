package br.org.mj.sislegis.app.service;

import java.util.Date;
import java.util.List;

import javax.ejb.Local;

import br.org.mj.sislegis.app.model.Reuniao;

@Local
public interface ReuniaoService extends Service<Reuniao> {
	
	public List<Reuniao> buscaReuniaoPorData(Date data);

}
