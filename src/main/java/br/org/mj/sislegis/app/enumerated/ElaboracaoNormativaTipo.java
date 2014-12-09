package br.org.mj.sislegis.app.enumerated;

public enum ElaboracaoNormativaTipo {
    ANTEPROJETO("Ante Projeto"), PRELIMINAR("Preliminar");
    
    private String value;
    private String nome;
	public String getValue() {
		return value;
	}
	
	public String getNome(){
		nome = this.name();
		return nome;
	}

    private ElaboracaoNormativaTipo(String value) {
        this.value = value;
    }
    
	public static ElaboracaoNormativaTipo get(String id) {
		ElaboracaoNormativaTipo elaboracaoNormativaTipo = null; // Default
		for (ElaboracaoNormativaTipo en : ElaboracaoNormativaTipo.values()) {
			if (en.name().equals(id)) {
				elaboracaoNormativaTipo = en;
				break;
			}
		}
		return elaboracaoNormativaTipo;
	}
}