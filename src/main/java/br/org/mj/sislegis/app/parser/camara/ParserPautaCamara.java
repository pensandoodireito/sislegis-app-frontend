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
		Long idComissao = 2003L;
		String datIni = "20140702";
		String datFim = "20140702";

		System.out.println(parser.getProposicoes(idComissao, datIni, datFim)
				.toString());
	}

	public List<Proposicao> getProposicoes(Long idComissao, String datIni,
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
			// adiciona dados da comissao
			int seqOrdemPauta = 1;
			for (Proposicao proposicao : reuniao.getProposicoes()) {
				proposicao.setSeqOrdemPauta(seqOrdemPauta++);
				proposicao.setComissao(pauta.getOrgao());
			}
			
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

	protected List<ReuniaoBean> reunioes = new ArrayList<ReuniaoBean>();

	protected List<ReuniaoBean> getReunioes() {
		return reunioes;
	}

	protected String getOrgao() {
		return orgao;
	}
}

class ReuniaoBean {
	protected List<Proposicao> proposicoes = new ArrayList<Proposicao>();

	protected List<Proposicao> getProposicoes() {
		return proposicoes;
	}
}
