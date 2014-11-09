package br.org.mj.sislegis.app.service;

import java.util.Collection;
import java.util.List;

import javax.ejb.Local;

import br.org.mj.sislegis.app.json.TagJSON;
import br.org.mj.sislegis.app.model.Tag;
import br.org.mj.sislegis.app.model.TagProposicao;

@Local
public interface TagService extends Service<Tag> {
	public List<TagJSON> listarTodasTags();
	public List<TagJSON> populaListaTagsJSON(Collection<Tag> listaTags);
	public List<TagJSON> populaListaTagsProposicaoJSON(Collection<TagProposicao> listaTags);

}
