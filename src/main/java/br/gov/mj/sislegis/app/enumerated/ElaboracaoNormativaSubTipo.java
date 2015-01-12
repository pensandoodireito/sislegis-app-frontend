/**
 * 
 */
package br.gov.mj.sislegis.app.enumerated;

/**
 * @author sislegis
 *
 */
public enum ElaboracaoNormativaSubTipo {
    MINUTA("Minuta"), 
    MINISTERIAL("Ministerial"), 
    INTERMINISTERIAL("Interministerial");
    
    private String value;

    private ElaboracaoNormativaSubTipo(String value) {
        this.value = value;
    }
    
	public String getValue() {
		return value;
	}
    
	public static ElaboracaoNormativaSubTipo get(String id) {
		ElaboracaoNormativaSubTipo elaboracaoNormativaSubTipo = null; // Default
		for (ElaboracaoNormativaSubTipo en : ElaboracaoNormativaSubTipo.values()) {
			if (en.name().equals(id)) {
				elaboracaoNormativaSubTipo = en;
				break;
			}
		}
		return elaboracaoNormativaSubTipo;
	}  
}