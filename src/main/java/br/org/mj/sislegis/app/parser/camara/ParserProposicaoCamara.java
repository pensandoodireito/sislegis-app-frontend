package br.org.mj.sislegis.app.parser.camara;

import java.net.URL;

import br.org.mj.sislegis.app.enumerated.Origem;
import br.org.mj.sislegis.app.model.Proposicao;

import com.thoughtworks.xstream.XStream;

public class ParserProposicaoCamara {
	
	public static void main(String[] args) throws Exception {
		ParserProposicaoCamara parser = new ParserProposicaoCamara();
		Long idProposicao = 562039L; // TODO: Informação que vem do filtro
		System.out.println(parser.getProposicao(idProposicao).toString());
	}
	
	public Proposicao getProposicao(Long idProposicao) throws Exception {
		String wsURL = "http://www.camara.gov.br/SitCamaraWS/Proposicoes.asmx/ObterProposicaoPorID?idProp="+idProposicao;
		URL url = new URL(wsURL);
		
		XStream xstream = new XStream();
		xstream.ignoreUnknownElements();
		
		Proposicao proposicao = new Proposicao();
		
		config(xstream);

		xstream.fromXML(url, proposicao);
		
		proposicao.setOrigem(Origem.CAMARA);
		proposicao.setLinkProposicao("http://www.camara.gov.br/proposicoesWeb/fichadetramitacao?idProposicao="+proposicao.getIdProposicao());
		
		return proposicao;
	}
	
	private static void config(XStream xstream) {
		xstream.alias("proposicao", Proposicao.class);

		xstream.aliasAttribute(Proposicao.class, "tipo", "tipo");
		xstream.aliasAttribute(Proposicao.class, "numero", "numero");
		xstream.aliasAttribute(Proposicao.class, "ano", "ano");
		
		xstream.aliasField("nomeProposicao", Proposicao.class, "sigla");
		xstream.aliasField("Ementa", Proposicao.class, "ementa");
		xstream.aliasField("Autor", Proposicao.class, "autor");
	}
}
