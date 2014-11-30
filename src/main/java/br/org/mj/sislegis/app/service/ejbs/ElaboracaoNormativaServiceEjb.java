package br.org.mj.sislegis.app.service.ejbs;

import java.util.HashSet;
import java.util.Objects;
import java.util.Set;

import javax.ejb.Stateless;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

import br.org.mj.sislegis.app.enumerated.ElaboracaoNormativaIdentificacao;
import br.org.mj.sislegis.app.enumerated.ElaboracaoNormativaNorma;
import br.org.mj.sislegis.app.enumerated.ElaboracaoNormativaTipo;
import br.org.mj.sislegis.app.json.TagJSON;
import br.org.mj.sislegis.app.model.ElaboracaoNormativa;
import br.org.mj.sislegis.app.model.Tag;
import br.org.mj.sislegis.app.model.TagElaboracaoNormativa;
import br.org.mj.sislegis.app.model.TagElaboracaoNormativaPK;
import br.org.mj.sislegis.app.model.TagProposicao;
import br.org.mj.sislegis.app.model.TagProposicaoPK;
import br.org.mj.sislegis.app.service.AbstractPersistence;
import br.org.mj.sislegis.app.service.ElaboracaoNormativaService;

@Stateless
public class ElaboracaoNormativaServiceEjb extends AbstractPersistence<ElaboracaoNormativa, Long> implements ElaboracaoNormativaService {
	
	@PersistenceContext
    private EntityManager em;
	
	
	public ElaboracaoNormativaServiceEjb() {
		super(ElaboracaoNormativa.class);
	}
	
	@Override
	protected EntityManager getEntityManager() {
		return em;
	}

	@Override
	public void salvar(ElaboracaoNormativa elaboracaoNormativa) {
		// TODO Auto-generated method stub
		elaboracaoNormativa.setTipo(Objects.isNull(elaboracaoNormativa.getCodElaboracaoNormativaTipo())?null:ElaboracaoNormativaTipo.get(elaboracaoNormativa.getCodElaboracaoNormativaTipo()));
		elaboracaoNormativa.setIdentificacao(Objects.isNull(elaboracaoNormativa.getCodElaboracaoNormativaIdentificacao())?null:ElaboracaoNormativaIdentificacao.get(elaboracaoNormativa.getCodElaboracaoNormativaIdentificacao()));
		elaboracaoNormativa.setElaboracaoNormativaNorma(Objects.isNull(elaboracaoNormativa.getCodElaboracaoNormativaNorma())?null:ElaboracaoNormativaNorma.get(elaboracaoNormativa.getCodElaboracaoNormativaNorma()));
		if(!Objects.isNull(elaboracaoNormativa.getEquipe()))
			elaboracaoNormativa.getEquipe().setListaEquipeUsuario(null);
		elaboracaoNormativa.setTagsElaboracaoNormativa(populaTagsElaboracaoNormativa(elaboracaoNormativa));
		
		save(elaboracaoNormativa);
	}
	
	private Set<TagElaboracaoNormativa> populaTagsElaboracaoNormativa(ElaboracaoNormativa elaboracaoNormativa) {
		Set<TagElaboracaoNormativa> tagsElaboracaoNormativa = new HashSet<TagElaboracaoNormativa>();
		for (TagJSON tagJSON : elaboracaoNormativa.getTags()) {
			TagElaboracaoNormativaPK tagElaboracaoNormativaPK = new TagElaboracaoNormativaPK();
			TagElaboracaoNormativa tagElaboracaoNormativa = new TagElaboracaoNormativa();
			tagElaboracaoNormativaPK.setId(elaboracaoNormativa.getId());
			tagElaboracaoNormativaPK.setTag(tagJSON.getText());
			tagElaboracaoNormativa.setTagElaboracaoNormativaPK(tagElaboracaoNormativaPK);
			tagElaboracaoNormativa.setElaboracaoNormativa(elaboracaoNormativa);
			Tag tag = getEntityManager().find(Tag.class, tagJSON.getText());
			if(Objects.isNull(tag)){
				tag=new Tag();
				tag.setTag(tagJSON.getText());
			}
			tagElaboracaoNormativa.setTag(tag);
			tagsElaboracaoNormativa.add(tagElaboracaoNormativa);
		}
		return tagsElaboracaoNormativa;
	}

}