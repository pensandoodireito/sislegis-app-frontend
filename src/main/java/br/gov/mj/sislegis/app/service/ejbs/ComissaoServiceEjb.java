package br.gov.mj.sislegis.app.service.ejbs;

import java.util.List;

import javax.ejb.Stateless;
import javax.inject.Inject;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

import br.gov.mj.sislegis.app.model.Comissao;
import br.gov.mj.sislegis.app.parser.camara.ParserComissoesCamara;
import br.gov.mj.sislegis.app.parser.senado.ParserComissoesSenado;
import br.gov.mj.sislegis.app.service.AbstractPersistence;
import br.gov.mj.sislegis.app.service.ComissaoService;

@Stateless
public class ComissaoServiceEjb extends AbstractPersistence<Comissao, Long> 
implements ComissaoService {
	
	@PersistenceContext
    private EntityManager em;
	
	@Inject
	private ParserComissoesSenado parserComissoesSenado;
	
	@Inject
	private ParserComissoesCamara parserComissoesCamara;
	
	public ComissaoServiceEjb() {
		super(Comissao.class);
	}

	@Override
	protected EntityManager getEntityManager() {
		return em;
	}

	@Override
	public List<Comissao> listarComissoesCamara() throws Exception {
		return parserComissoesCamara.getComissoes();
	}

	@Override
	public List<Comissao> listarComissoesSenado() throws Exception {
		return parserComissoesSenado.getComissoes();
	}


}
