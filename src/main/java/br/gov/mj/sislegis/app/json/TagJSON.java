package br.gov.mj.sislegis.app.json;

import java.io.Serializable;

public class TagJSON implements Serializable {

	private static final long serialVersionUID = -5488024476236712816L;

	public TagJSON(String tag){
		this.id = tag.hashCode();
		this.text=tag;
	}
	
	private Number id;
	
	public TagJSON(){}
	
	private String text;
	
	public String getText() {
		return text;
	}

	public void setText(String text) {
		this.text = text;
	}

	public Number getId() {
		return id;
	}

	public void setId(Number id) {
		this.id = id;
	}

}
