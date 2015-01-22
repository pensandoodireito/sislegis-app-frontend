package br.gov.mj.sislegis.app.enumerated;

public enum ElaboracaoNormativaSituacao {
	
    PENDENTE("Pendente"), 
    FINALIZADA("Finalizada");
    
    private String value;

    private ElaboracaoNormativaSituacao(String value) {
        this.value = value;
    }
    
	public String getValue() {
		return value;
	}
    
	public static ElaboracaoNormativaSituacao get(String id) {
		ElaboracaoNormativaSituacao elaboracaoNormativaSituacao = null; // Default
		for (ElaboracaoNormativaSituacao en : ElaboracaoNormativaSituacao.values()) {
			if (en.name().equals(id)) {
				elaboracaoNormativaSituacao = en;
				break;
			}
		}
		return elaboracaoNormativaSituacao;
	}    	

}
