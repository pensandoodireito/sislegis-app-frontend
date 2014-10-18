package br.org.mj.sislegis.app.service.ejbs;

import java.net.URL;
import java.util.List;

import javax.ejb.Stateless;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

import com.thoughtworks.xstream.XStream;

import br.org.mj.sislegis.app.model.Comissao;
import br.org.mj.sislegis.app.parser.camara.ParserComissoesCamara;
import br.org.mj.sislegis.app.service.AbstractPersistence;
import br.org.mj.sislegis.app.service.ComissaoService;

@Stateless
public class ComissaoServiceEjb extends AbstractPersistence<Comissao, Long> 
implements ComissaoService {
	
	@PersistenceContext
    private EntityManager em;
	
	public ComissaoServiceEjb() {
		// TODO Auto-generated constructor stub
		super(Comissao.class);
	}

	@Override
	protected EntityManager getEntityManager() {
		// TODO Auto-generated method stub
		return em;
	}

	@Override
	public List<Comissao> listarComissoesCamara(Integer startPosition, Integer maxResult) throws Exception {
		// TODO Auto-generated method stub
		return new ParserComissoesCamara().getComissoes();
	}


}
