package br.gov.mj.sislegis.app.parser.camara;
import java.net.URL;
import java.util.List;

import br.gov.mj.sislegis.app.model.Comissao;

import com.thoughtworks.xstream.XStream;

public class ParserComissoesCamara {
	
	public static void main(String[] args) throws Exception {
		ParserComissoesCamara parser = new ParserComissoesCamara();
		System.out.println(parser.getComissoes().toString());
	}
	
	public List<Comissao> getComissoes() throws Exception {
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
}

class ListaComissoes {
	protected List<Comissao> comissoes;
	
	protected List<Comissao> getComissoes() {
		return comissoes;
	}
}
