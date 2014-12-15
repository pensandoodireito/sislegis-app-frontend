package br.org.mj.sislegis.app.enumerated;

public enum ElaboracaoNormativaObjeto {
    PROJETO_LEI("Projeto de Lei"), 
    DECRETO("Decreto"), 
    PORTARIA("Portaria"), 
    PORTARIA_INTERMINISTERIAL("Portaria Interministerial"),
    ACORDO("ACORDO"),
    MEDIDA_PROVISORIA("Medida Provisória"),
    PROPOSTA_EMENDA_CONSTITUICAO("Proposta de Emenda à Constituição"),
    SUBSIDIOS("Subsídios");
    
    private String value;

    private ElaboracaoNormativaObjeto(String value) {
        this.value = value;
    }
    
	public String getValue() {
		return value;
	}
    
	public static ElaboracaoNormativaObjeto get(String id) {
		ElaboracaoNormativaObjeto elaboracaoNormativaIdentificacao = null; // Default
		for (ElaboracaoNormativaObjeto en : ElaboracaoNormativaObjeto.values()) {
			if (en.name().equals(id)) {
				elaboracaoNormativaIdentificacao = en;
				break;
			}
		}
		return elaboracaoNormativaIdentificacao;
	}    
}