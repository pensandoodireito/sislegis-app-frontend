package br.gov.mj.sislegis.app.service;

import java.util.List;

import javax.ejb.Local;

import br.gov.mj.sislegis.app.model.TagElaboracaoNormativa;

@Local
public interface TagElaboracaoNormativaService extends Service<TagElaboracaoNormativa> {
	
	public List<TagElaboracaoNormativa> buscaTagsElaboracaoNormativa(Long id);
	public void deleteTagElaboracaoNormativa(TagElaboracaoNormativa tagElaboracaoNormativa);

}
