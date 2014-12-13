package br.gov.mj.sislegis.app.enumerated;

public enum ElaboracaoNormativaNorma {
    DECRETO_LEI("Decreto Lei"), MEDIDA_PROVISORIA("Medida Provisória");
    
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