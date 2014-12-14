package br.gov.mj.sislegis.app.json;

import java.io.Serializable;

public class TagJSON implements Serializable {

	public TagJSON(String tag){
		this.text=tag;
	}
	
	public TagJSON(){}
	
	private String text;
	
	public String getText() {
		return text;
	}

	public void setText(String text) {
		this.text = text;
	}

}
