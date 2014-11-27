package br.org.mj.sislegis.app.service.ejbs;

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
		elaboracaoNormativa.setTipo(ElaboracaoNormativaTipo.get(elaboracaoNormativa.getCodElaboracaoNormativaTipo()));
		elaboracaoNormativa.setIdentificacao(ElaboracaoNormativaIdentificacao.get(elaboracaoNormativa.getCodElaboracaoNormativaIdentificacao()));
		elaboracaoNormativa.setElaboracaoNormativaNorma(ElaboracaoNormativaNorma.get(elaboracaoNormativa.getCodElaboracaoNormativaNorma()));
		if(elaboracaoNormativa.getEquipe()!=null){
			elaboracaoNormativa.getEquipe().setListaEquipeUsuario(null);
		}
		save(elaboracaoNormativa);
	}

}