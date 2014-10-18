package br.org.mj.sislegis.app.parser.camara;

import java.net.URL;
import java.util.ArrayList;
import java.util.List;

import br.org.mj.sislegis.app.model.Proposicao;

import com.thoughtworks.xstream.XStream;

public class ParserPautaCamara {

	public static void main(String[] args) throws Exception {
		ParserPautaCamara parser = new ParserPautaCamara();

		// TODO: Informação que vem do filtro
		Integer idComissao = 2003;
		String datIni = "20130603";
		String datFim = "20130607";

		System.out.println(parser.getProposicoes(idComissao, datIni, datFim)
				.toString());
	}

	public List<Proposicao> getProposicoes(Integer idComissao, String datIni,
			String datFim) throws Exception {
		String wsURL = "http://www.camara.gov.br/SitCamaraWS/Orgaos.asmx/ObterPauta?IDOrgao="
				+ idComissao + "&datIni=" + datIni + "&datFim=" + datFim;
		URL url = new URL(wsURL);

		XStream xstream = new XStream();
		xstream.ignoreUnknownElements();
		
		PautaBean pauta = new PautaBean();

		config(xstream);

		xstream.fromXML(url, pauta);

		List<Proposicao> proposicoes = new ArrayList<Proposicao>();

		for (ReuniaoBean reuniao : pauta.getReunioes()) {
			proposicoes.addAll(reuniao.getProposicoes());
		}

		return proposicoes;
	}

	private void config(XStream xstream) {
		xstream.alias("pauta", PautaBean.class);
		xstream.alias("reuniao", ReuniaoBean.class);
		xstream.alias("proposicao", Proposicao.class);

		// Utilizamos o implicit quando os filhos já tem os dados que queremos
		// buscar. Ou seja, não tem um pai e vários filhos do mesmo tipo.
		xstream.addImplicitCollection(PautaBean.class, "reunioes");
		xstream.aliasAttribute(PautaBean.class, "orgao", "orgao");
		xstream.aliasAttribute(PautaBean.class, "dataInicial", "dataInicial");
		xstream.aliasAttribute(PautaBean.class, "dataFinal", "dataFinal");
	}
}

class PautaBean {
	protected String orgao;
	protected String dataInicial;
	protected String dataFinal;

	protected List<ReuniaoBean> reunioes;

	protected List<ReuniaoBean> getReunioes() {
		return reunioes;
	}
}

class ReuniaoBean {
	protected List<Proposicao> proposicoes;

	protected List<Proposicao> getProposicoes() {
		return proposicoes;
	}
}
