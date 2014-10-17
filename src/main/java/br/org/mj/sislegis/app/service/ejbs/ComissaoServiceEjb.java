package br.org.mj.sislegis.app.service.ejbs;

import java.net.MalformedURLException;
import java.net.URL;
import java.util.List;

import javax.ejb.Stateless;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

import com.thoughtworks.xstream.XStream;

import br.org.mj.sislegis.app.model.Comissao;
import br.org.mj.sislegis.app.service.AbstractPersistence;
import br.org.mj.sislegis.app.service.ComissaoService;

@Stateless
public class ComissaoServiceEjb extends AbstractPersistence<Comissao, Long> implements ComissaoService {
	
	@PersistenceContext
    private EntityManager em;
	
	public ComissaoServiceEjb() {
		// TODO Auto-generated constructor stub
		super(Comissao.class);
	}

	@Override
	public List<Comissao> listarComissoesCamara(Integer startPosition, Integer maxResult) throws Exception {
		// TODO Auto-generated method stub
		
		URL url = new URL("http://www.camara.gov.br/SitCamaraWS/Orgaos.asmx/ObterOrgaos");

		XStream xstream = new XStream();
		xstream.ignoreUnknownElements();
		
		ListaComissoes comissoes = new ListaComissoes();

		config(xstream);

		
		xstream.fromXML(url, comissoes);

		return comissoes.getComissoes();
	}
	
	private void config(XStream xstream) {
		xstream.alias("orgaos", ListaComissoes.class);
		xstream.alias("orgao", Comissao.class);
		
		xstream.addImplicitCollection(ListaComissoes.class, "comissoes");
		xstream.aliasAttribute(Comissao.class, "id", "id");
		xstream.aliasAttribute(Comissao.class, "sigla", "sigla");
	}	
	
	class ListaComissoes {
		protected List<Comissao> comissoes;
		
		protected List<Comissao> getComissoes() {
			return comissoes;
		}
	}	

	@Override
	protected EntityManager getEntityManager() {
		// TODO Auto-generated method stub
		return em;
	}

	@Override
	public List<Comissao> listAll() {
		// TODO Auto-generated method stub
		return null;
	}



}
