package br.org.mj.sislegis.app.service.ejbs;

import java.net.URL;
import java.util.List;

import javax.ejb.Stateless;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

import com.thoughtworks.xstream.XStream;

import br.org.mj.sislegis.app.model.Comissao;
import br.org.mj.sislegis.app.parser.camara.ParserComissoesCamara;
import br.org.mj.sislegis.app.parser.senado.ParserComissoesSenado;
import br.org.mj.sislegis.app.service.AbstractPersistence;
import br.org.mj.sislegis.app.service.ComissaoService;

@Stateless
public class ComissaoServiceEjb extends AbstractPersistence<Comissao, Long> 
implements ComissaoService {
	
	@PersistenceContext
    private EntityManager em;
	
	public ComissaoServiceEjb() {
		super(Comissao.class);
	}

	@Override
	protected EntityManager getEntityManager() {
		return em;
	}

	@Override
	public List<Comissao> listarComissoesCamara() throws Exception {
		return new ParserComissoesCamara().getComissoes();
	}

	@Override
	public List<Comissao> listarComissoesSenado() throws Exception {
		return new ParserComissoesSenado().getComissoes();
	}


}
