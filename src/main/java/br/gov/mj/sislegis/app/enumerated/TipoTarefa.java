package br.gov.mj.sislegis.app.enumerated;

public enum TipoTarefa {
	
	ENCAMINHAMENTO(0);
	    
    private int value;

    private TipoTarefa(int value) {
        this.value = value;
    }
    
	public int getValue() {
		return value;
	}
    
	public static TipoTarefa get(int id) {
		TipoTarefa tipoTarefa = null;
		for (TipoTarefa en : TipoTarefa.values()) {
			if (en.getValue()==id) {
				tipoTarefa = en;
				break;
			}
		}
		return tipoTarefa;
	}    
}
