/**
 * 
 */
package br.gov.mj.sislegis.app.enumerated;

/**
 * @author sislegis
 *
 */
public enum ElaboracaoNormativaBotao {
    MINUTA("Minuta"), 
    PROPOSTAOFICIAL("Proposta Oficial");
    
    private String value;
    private String nome;
	public String getValue() {
		return value;
	}
	
	public String getNome(){
		nome = this.name();
		return nome;
	}

    private ElaboracaoNormativaBotao(String value) {
        this.value = value;
    }
    
	public static ElaboracaoNormativaBotao get(String id) {
		ElaboracaoNormativaBotao elaboracaoNormativa = null; // Default
		for (ElaboracaoNormativaBotao en : ElaboracaoNormativaBotao.values()) {
			if (en.name().equals(id)) {
				elaboracaoNormativa = en;
				break;
			}
		}
		return elaboracaoNormativa;
	}
}
