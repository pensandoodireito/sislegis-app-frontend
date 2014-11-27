package br.org.mj.sislegis.app.enumerated;

public enum ElaboracaoNormativaNorma {
    DECRETO_LEI(0), MEDIDA_PROVISORIA(1);
    
    private final int value;

    private ElaboracaoNormativaNorma(int value) {
        this.value = value;
    }
    
	public int getValue() {
		return value;
	}
	
	
	public static ElaboracaoNormativaNorma get(int id) {
		ElaboracaoNormativaNorma elaboracaoNormativaNorma = null; // Default
		for (ElaboracaoNormativaNorma en : ElaboracaoNormativaNorma.values()) {
			if (en.getValue()==id) {
				elaboracaoNormativaNorma = en;
				break;
			}
		}
		return elaboracaoNormativaNorma;
	}
}