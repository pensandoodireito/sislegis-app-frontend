package br.gov.mj.sislegis.app.enumerated;

public enum ElaboracaoNormativaNorma {
    DECRETO_LEI("Decreto Lei"), 
    MEDIDA_PROVISORIA("Medida Provisória"),
    DECRETO_PESSOAL("Decreto pessoal"),
    DECRETO_SEM_NUMERO("Decreto sem número"),
    PROJETO_DE_LEI("Projeto de lei"),
    DECRETO_NORMATIVO("Decreto normativo"),
    LEI("Lei"),
    EM_PARA_MENSAGEM("EM para mensagem"),
    EM_PARA_DESPACHO("EM para despacho"),
    PORTARIA("Portaria"),
    PORTARIA_INTERMINISTERIAL("Portaria Interministerial"),
    PORTARIA_CONJUNTA("Portaria Conjunta"),
    INSTRUCAO_NORMATIVA("Instrução Normativa");
    
    private final String value;

    private ElaboracaoNormativaNorma(String value) {
        this.value = value;
    }
    
	public String getValue() {
		return value;
	}
	
	
	public static ElaboracaoNormativaNorma get(String id) {
		ElaboracaoNormativaNorma elaboracaoNormativaNorma = null; // Default
		for (ElaboracaoNormativaNorma en : ElaboracaoNormativaNorma.values()) {
			if (en.name().equals(id)) {
				elaboracaoNormativaNorma = en;
				break;
			}
		}
		return elaboracaoNormativaNorma;
	}
}