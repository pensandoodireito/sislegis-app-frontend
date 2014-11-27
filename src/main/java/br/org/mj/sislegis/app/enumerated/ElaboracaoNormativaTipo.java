package br.org.mj.sislegis.app.enumerated;

public enum ElaboracaoNormativaTipo {
    ANTEPROJETO(0), PRELIMINAR(1);
    
    private int value;
    private String nome;
	public int getValue() {
		return value;
	}
	
	public String getNome(){
		nome = this.name();
		return nome;
	}

    private ElaboracaoNormativaTipo(int value) {
        this.value = value;
    }
    
	public static ElaboracaoNormativaTipo get(int id) {
		ElaboracaoNormativaTipo elaboracaoNormativaTipo = null; // Default
		for (ElaboracaoNormativaTipo en : ElaboracaoNormativaTipo.values()) {
			if (en.getValue()==id) {
				elaboracaoNormativaTipo = en;
				break;
			}
		}
		return elaboracaoNormativaTipo;
	}
}