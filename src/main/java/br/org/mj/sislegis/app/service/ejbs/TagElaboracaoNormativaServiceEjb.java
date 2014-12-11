package br.org.mj.sislegis.app.service.ejbs;

import java.util.List;

import javax.ejb.Stateless;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

import br.org.mj.sislegis.app.model.TagElaboracaoNormativa;
import br.org.mj.sislegis.app.service.AbstractPersistence;
import br.org.mj.sislegis.app.service.TagElaboracaoNormativaService;

@Stateless
public class TagElaboracaoNormativaServiceEjb extends AbstractPersistence<TagElaboracaoNormativa, Long>
implements TagElaboracaoNormativaService {
	
	@PersistenceContext
    private EntityManager em;
	
	public TagElaboracaoNormativaServiceEjb() {
		super(TagElaboracaoNormativa.class);
	}


	@Override
	protected EntityManager getEntityManager() {
		return em;
	}

}
