package br.org.mj.sislegis.app.service.ejbs;

import java.util.Objects;

import javax.ejb.Stateless;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

import br.org.mj.sislegis.app.enumerated.ElaboracaoNormativaIdentificacao;
import br.org.mj.sislegis.app.enumerated.ElaboracaoNormativaNorma;
import br.org.mj.sislegis.app.enumerated.ElaboracaoNormativaTipo;
import br.org.mj.sislegis.app.model.ElaboracaoNormativa;
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
		
		save(elaboracaoNormativa);
	}

}