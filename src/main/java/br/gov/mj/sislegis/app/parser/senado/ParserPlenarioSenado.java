package br.gov.mj.sislegis.app.parser.senado;

import java.net.URL;
import java.util.ArrayList;
import java.util.List;

import br.gov.mj.sislegis.app.enumerated.Origem;
import br.gov.mj.sislegis.app.model.Proposicao;

import com.thoughtworks.xstream.XStream;

public class ParserPlenarioSenado {
	
	public static void main(String[] args) throws Exception {
		ParserPlenarioSenado parser = new ParserPlenarioSenado();
		
		// TODO: Informação que vem do filtro
		String datIni = "20140801";
		System.out.println(parser.getProposicoes(datIni).toString());
	}
	
	public List<Proposicao> getProposicoes(String datIni) throws Exception {
		List<Proposicao> proposicoes = new ArrayList<Proposicao>();
			
		XStream xstreamSessao = new XStream();
		xstreamSessao.ignoreUnknownElements();
		
		AgendaPlenario agendaPlenario = new AgendaPlenario();
		
		configAgendaPlenario(xstreamSessao);
		
		String wsURLPlenario = "http://legis.senado.leg.br/dadosabertos/plenario/agenda/mes/"+datIni;
		URL url = new URL(wsURLPlenario);
		
		xstreamSessao.fromXML(url, agendaPlenario);
		
		List<Sessao> sessoes = agendaPlenario.getSessoes();
		for (Sessao sessao : sessoes) {
			if (sessao.getProposicoes() != null) {
				
				for (Proposicao proposicao : sessao.getProposicoes()) {
					// TODO: qual comissao?
					proposicao.setComissao("PLEN");
					proposicao.setOrigem(Origem.SENADO);
					proposicao.setLinkProposicao("http://www.senado.leg.br/atividade/materia/detalhes.asp?p_cod_mate="+proposicao.getIdProposicao());
					// TODO: qual link da pauta? //proposicao.setLinkPauta("http://legis.senado.leg.br/comissoes/reuniao?reuniao="+getCodigo());
				}
				
				proposicoes.addAll(sessao.getProposicoes());
			}
		}
		
		return proposicoes;
	}
	
	private void configAgendaPlenario(XStream xstream) {
		xstream.alias("AgendaPlenario", AgendaPlenario.class);
		xstream.alias("Sessao", Sessao.class);
		xstream.alias("Materia", Proposicao.class);
		
		xstream.aliasField("Sessoes", AgendaPlenario.class, "sessoes");
		xstream.aliasField("Materias", Sessao.class, "proposicoes");
		
		xstream.aliasField("CodigoMateria", Proposicao.class, "idProposicao");
		xstream.aliasField("SiglaMateria", Proposicao.class, "tipo");
		xstream.aliasField("NumeroMateria", Proposicao.class, "numero");
		xstream.aliasField("AnoMateria", Proposicao.class, "ano");
		xstream.aliasField("Ementa", Proposicao.class, "ementa");
		
	}
	
}

class AgendaPlenario {
	protected List<Sessao> sessoes = new ArrayList<Sessao>();

	protected List<Sessao> getSessoes() {
		return sessoes;
	}
}

class Sessao {
	protected List<Proposicao> proposicoes = new ArrayList<Proposicao>();
	
	protected List<Proposicao> getProposicoes() {
		return proposicoes;
	}
}

