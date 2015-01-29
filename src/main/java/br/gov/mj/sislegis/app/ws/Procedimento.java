/**
 * Procedimento.java
 *
 * This file was auto-generated from WSDL
 * by the Apache Axis 1.4 Apr 22, 2006 (06:55:48 PDT) WSDL2Java emitter.
 */

package br.gov.mj.sislegis.app.ws;

public class Procedimento  implements java.io.Serializable {
    private java.lang.String idTipoProcedimento;

    private java.lang.String especificacao;

    private br.gov.mj.sislegis.app.ws.Assunto[] assuntos;

    private br.gov.mj.sislegis.app.ws.Interessado[] interessados;

    private java.lang.String observacao;

    private java.lang.String nivelAcesso;

    public Procedimento() {
    }

    public Procedimento(
           java.lang.String idTipoProcedimento,
           java.lang.String especificacao,
           br.gov.mj.sislegis.app.ws.Assunto[] assuntos,
           br.gov.mj.sislegis.app.ws.Interessado[] interessados,
           java.lang.String observacao,
           java.lang.String nivelAcesso) {
           this.idTipoProcedimento = idTipoProcedimento;
           this.especificacao = especificacao;
           this.assuntos = assuntos;
           this.interessados = interessados;
           this.observacao = observacao;
           this.nivelAcesso = nivelAcesso;
    }


    /**
     * Gets the idTipoProcedimento value for this Procedimento.
     * 
     * @return idTipoProcedimento
     */
    public java.lang.String getIdTipoProcedimento() {
        return idTipoProcedimento;
    }


    /**
     * Sets the idTipoProcedimento value for this Procedimento.
     * 
     * @param idTipoProcedimento
     */
    public void setIdTipoProcedimento(java.lang.String idTipoProcedimento) {
        this.idTipoProcedimento = idTipoProcedimento;
    }


    /**
     * Gets the especificacao value for this Procedimento.
     * 
     * @return especificacao
     */
    public java.lang.String getEspecificacao() {
        return especificacao;
    }


    /**
     * Sets the especificacao value for this Procedimento.
     * 
     * @param especificacao
     */
    public void setEspecificacao(java.lang.String especificacao) {
        this.especificacao = especificacao;
    }


    /**
     * Gets the assuntos value for this Procedimento.
     * 
     * @return assuntos
     */
    public br.gov.mj.sislegis.app.ws.Assunto[] getAssuntos() {
        return assuntos;
    }


    /**
     * Sets the assuntos value for this Procedimento.
     * 
     * @param assuntos
     */
    public void setAssuntos(br.gov.mj.sislegis.app.ws.Assunto[] assuntos) {
        this.assuntos = assuntos;
    }


    /**
     * Gets the interessados value for this Procedimento.
     * 
     * @return interessados
     */
    public br.gov.mj.sislegis.app.ws.Interessado[] getInteressados() {
        return interessados;
    }


    /**
     * Sets the interessados value for this Procedimento.
     * 
     * @param interessados
     */
    public void setInteressados(br.gov.mj.sislegis.app.ws.Interessado[] interessados) {
        this.interessados = interessados;
    }


    /**
     * Gets the observacao value for this Procedimento.
     * 
     * @return observacao
     */
    public java.lang.String getObservacao() {
        return observacao;
    }


    /**
     * Sets the observacao value for this Procedimento.
     * 
     * @param observacao
     */
    public void setObservacao(java.lang.String observacao) {
        this.observacao = observacao;
    }


    /**
     * Gets the nivelAcesso value for this Procedimento.
     * 
     * @return nivelAcesso
     */
    public java.lang.String getNivelAcesso() {
        return nivelAcesso;
    }


    /**
     * Sets the nivelAcesso value for this Procedimento.
     * 
     * @param nivelAcesso
     */
    public void setNivelAcesso(java.lang.String nivelAcesso) {
        this.nivelAcesso = nivelAcesso;
    }

    private java.lang.Object __equalsCalc = null;
    public synchronized boolean equals(java.lang.Object obj) {
        if (!(obj instanceof Procedimento)) return false;
        Procedimento other = (Procedimento) obj;
        if (obj == null) return false;
        if (this == obj) return true;
        if (__equalsCalc != null) {
            return (__equalsCalc == obj);
        }
        __equalsCalc = obj;
        boolean _equals;
        _equals = true && 
            ((this.idTipoProcedimento==null && other.getIdTipoProcedimento()==null) || 
             (this.idTipoProcedimento!=null &&
              this.idTipoProcedimento.equals(other.getIdTipoProcedimento()))) &&
            ((this.especificacao==null && other.getEspecificacao()==null) || 
             (this.especificacao!=null &&
              this.especificacao.equals(other.getEspecificacao()))) &&
            ((this.assuntos==null && other.getAssuntos()==null) || 
             (this.assuntos!=null &&
              java.util.Arrays.equals(this.assuntos, other.getAssuntos()))) &&
            ((this.interessados==null && other.getInteressados()==null) || 
             (this.interessados!=null &&
              java.util.Arrays.equals(this.interessados, other.getInteressados()))) &&
            ((this.observacao==null && other.getObservacao()==null) || 
             (this.observacao!=null &&
              this.observacao.equals(other.getObservacao()))) &&
            ((this.nivelAcesso==null && other.getNivelAcesso()==null) || 
             (this.nivelAcesso!=null &&
              this.nivelAcesso.equals(other.getNivelAcesso())));
        __equalsCalc = null;
        return _equals;
    }

    private boolean __hashCodeCalc = false;
    public synchronized int hashCode() {
        if (__hashCodeCalc) {
            return 0;
        }
        __hashCodeCalc = true;
        int _hashCode = 1;
        if (getIdTipoProcedimento() != null) {
            _hashCode += getIdTipoProcedimento().hashCode();
        }
        if (getEspecificacao() != null) {
            _hashCode += getEspecificacao().hashCode();
        }
        if (getAssuntos() != null) {
            for (int i=0;
                 i<java.lang.reflect.Array.getLength(getAssuntos());
                 i++) {
                java.lang.Object obj = java.lang.reflect.Array.get(getAssuntos(), i);
                if (obj != null &&
                    !obj.getClass().isArray()) {
                    _hashCode += obj.hashCode();
                }
            }
        }
        if (getInteressados() != null) {
            for (int i=0;
                 i<java.lang.reflect.Array.getLength(getInteressados());
                 i++) {
                java.lang.Object obj = java.lang.reflect.Array.get(getInteressados(), i);
                if (obj != null &&
                    !obj.getClass().isArray()) {
                    _hashCode += obj.hashCode();
                }
            }
        }
        if (getObservacao() != null) {
            _hashCode += getObservacao().hashCode();
        }
        if (getNivelAcesso() != null) {
            _hashCode += getNivelAcesso().hashCode();
        }
        __hashCodeCalc = false;
        return _hashCode;
    }

    // Type metadata
    private static org.apache.axis.description.TypeDesc typeDesc =
        new org.apache.axis.description.TypeDesc(Procedimento.class, true);

    static {
        typeDesc.setXmlType(new javax.xml.namespace.QName("Sei", "Procedimento"));
        org.apache.axis.description.ElementDesc elemField = new org.apache.axis.description.ElementDesc();
        elemField.setFieldName("idTipoProcedimento");
        elemField.setXmlName(new javax.xml.namespace.QName("", "IdTipoProcedimento"));
        elemField.setXmlType(new javax.xml.namespace.QName("http://www.w3.org/2001/XMLSchema", "string"));
        elemField.setNillable(false);
        typeDesc.addFieldDesc(elemField);
        elemField = new org.apache.axis.description.ElementDesc();
        elemField.setFieldName("especificacao");
        elemField.setXmlName(new javax.xml.namespace.QName("", "Especificacao"));
        elemField.setXmlType(new javax.xml.namespace.QName("http://www.w3.org/2001/XMLSchema", "string"));
        elemField.setMinOccurs(0);
        elemField.setNillable(false);
        typeDesc.addFieldDesc(elemField);
        elemField = new org.apache.axis.description.ElementDesc();
        elemField.setFieldName("assuntos");
        elemField.setXmlName(new javax.xml.namespace.QName("", "Assuntos"));
        elemField.setXmlType(new javax.xml.namespace.QName("Sei", "Assunto"));
        elemField.setNillable(false);
        typeDesc.addFieldDesc(elemField);
        elemField = new org.apache.axis.description.ElementDesc();
        elemField.setFieldName("interessados");
        elemField.setXmlName(new javax.xml.namespace.QName("", "Interessados"));
        elemField.setXmlType(new javax.xml.namespace.QName("Sei", "Interessado"));
        elemField.setNillable(false);
        typeDesc.addFieldDesc(elemField);
        elemField = new org.apache.axis.description.ElementDesc();
        elemField.setFieldName("observacao");
        elemField.setXmlName(new javax.xml.namespace.QName("", "Observacao"));
        elemField.setXmlType(new javax.xml.namespace.QName("http://www.w3.org/2001/XMLSchema", "string"));
        elemField.setNillable(false);
        typeDesc.addFieldDesc(elemField);
        elemField = new org.apache.axis.description.ElementDesc();
        elemField.setFieldName("nivelAcesso");
        elemField.setXmlName(new javax.xml.namespace.QName("", "NivelAcesso"));
        elemField.setXmlType(new javax.xml.namespace.QName("http://www.w3.org/2001/XMLSchema", "string"));
        elemField.setNillable(false);
        typeDesc.addFieldDesc(elemField);
    }

    /**
     * Return type metadata object
     */
    public static org.apache.axis.description.TypeDesc getTypeDesc() {
        return typeDesc;
    }

    /**
     * Get Custom Serializer
     */
    public static org.apache.axis.encoding.Serializer getSerializer(
           java.lang.String mechType, 
           java.lang.Class _javaType,  
           javax.xml.namespace.QName _xmlType) {
        return 
          new  org.apache.axis.encoding.ser.BeanSerializer(
            _javaType, _xmlType, typeDesc);
    }

    /**
     * Get Custom Deserializer
     */
    public static org.apache.axis.encoding.Deserializer getDeserializer(
           java.lang.String mechType, 
           java.lang.Class _javaType,  
           javax.xml.namespace.QName _xmlType) {
        return 
          new  org.apache.axis.encoding.ser.BeanDeserializer(
            _javaType, _xmlType, typeDesc);
    }

}
