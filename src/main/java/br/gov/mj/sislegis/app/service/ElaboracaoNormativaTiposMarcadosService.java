package br.gov.mj.sislegis.app.service;

import javax.ejb.Local;

import br.gov.mj.sislegis.app.model.ElaboracaoNormativaTiposMarcados;

@Local
public interface ElaboracaoNormativaTiposMarcadosService extends Service<ElaboracaoNormativaTiposMarcados> {

	public void deleteElaboracaoNormativaTiposMarcado(Long id);
}
