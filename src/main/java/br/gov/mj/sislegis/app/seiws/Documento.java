/**
 * Documento.java
 *
 * This file was auto-generated from WSDL
 * by the Apache Axis 1.4 Apr 22, 2006 (06:55:48 PDT) WSDL2Java emitter.
 */

package br.gov.mj.sislegis.app.seiws;

public class Documento  implements java.io.Serializable {
    private java.lang.String tipo;

    private java.lang.String idProcedimento;

    private java.lang.String idSerie;

    private java.lang.String numero;

    private java.lang.String data;

    private java.lang.String descricao;

    private br.gov.mj.sislegis.app.seiws.Remetente remetente;

    private br.gov.mj.sislegis.app.seiws.Interessado[] interessados;

    private br.gov.mj.sislegis.app.seiws.Destinatario[] destinatarios;

    private java.lang.String observacao;

    private java.lang.String nomeArquivo;

    private java.lang.String conteudo;

    private byte[] conteudoMTOM;

    private java.lang.String nivelAcesso;

    public Documento() {
    }

    public Documento(
           java.lang.String tipo,
           java.lang.String idProcedimento,
           java.lang.String idSerie,
           java.lang.String numero,
           java.lang.String data,
           java.lang.String descricao,
           br.gov.mj.sislegis.app.seiws.Remetente remetente,
           br.gov.mj.sislegis.app.seiws.Interessado[] interessados,
           br.gov.mj.sislegis.app.seiws.Destinatario[] destinatarios,
           java.lang.String observacao,
           java.lang.String nomeArquivo,
           java.lang.String conteudo,
           byte[] conteudoMTOM,
           java.lang.String nivelAcesso) {
           this.tipo = tipo;
           this.idProcedimento = idProcedimento;
           this.idSerie = idSerie;
           this.numero = numero;
           this.data = data;
           this.descricao = descricao;
           this.remetente = remetente;
           this.interessados = interessados;
           this.destinatarios = destinatarios;
           this.observacao = observacao;
           this.nomeArquivo = nomeArquivo;
           this.conteudo = conteudo;
           this.conteudoMTOM = conteudoMTOM;
           this.nivelAcesso = nivelAcesso;
    }


    /**
     * Gets the tipo value for this Documento.
     * 
     * @return tipo
     */
    public java.lang.String getTipo() {
        return tipo;
    }


    /**
     * Sets the tipo value for this Documento.
     * 
     * @param tipo
     */
    public void setTipo(java.lang.String tipo) {
        this.tipo = tipo;
    }


    /**
     * Gets the idProcedimento value for this Documento.
     * 
     * @return idProcedimento
     */
    public java.lang.String getIdProcedimento() {
        return idProcedimento;
    }


    /**
     * Sets the idProcedimento value for this Documento.
     * 
     * @param idProcedimento
     */
    public void setIdProcedimento(java.lang.String idProcedimento) {
        this.idProcedimento = idProcedimento;
    }


    /**
     * Gets the idSerie value for this Documento.
     * 
     * @return idSerie
     */
    public java.lang.String getIdSerie() {
        return idSerie;
    }


    /**
     * Sets the idSerie value for this Documento.
     * 
     * @param idSerie
     */
    public void setIdSerie(java.lang.String idSerie) {
        this.idSerie = idSerie;
    }


    /**
     * Gets the numero value for this Documento.
     * 
     * @return numero
     */
    public java.lang.String getNumero() {
        return numero;
    }


    /**
     * Sets the numero value for this Documento.
     * 
     * @param numero
     */
    public void setNumero(java.lang.String numero) {
        this.numero = numero;
    }


    /**
     * Gets the data value for this Documento.
     * 
     * @return data
     */
    public java.lang.String getData() {
        return data;
    }


    /**
     * Sets the data value for this Documento.
     * 
     * @param data
     */
    public void setData(java.lang.String data) {
        this.data = data;
    }


    /**
     * Gets the descricao value for this Documento.
     * 
     * @return descricao
     */
    public java.lang.String getDescricao() {
        return descricao;
    }


    /**
     * Sets the descricao value for this Documento.
     * 
     * @param descricao
     */
    public void setDescricao(java.lang.String descricao) {
        this.descricao = descricao;
    }


    /**
     * Gets the remetente value for this Documento.
     * 
     * @return remetente
     */
    public br.gov.mj.sislegis.app.seiws.Remetente getRemetente() {
        return remetente;
    }


    /**
     * Sets the remetente value for this Documento.
     * 
     * @param remetente
     */
    public void setRemetente(br.gov.mj.sislegis.app.seiws.Remetente remetente) {
        this.remetente = remetente;
    }


    /**
     * Gets the interessados value for this Documento.
     * 
     * @return interessados
     */
    public br.gov.mj.sislegis.app.seiws.Interessado[] getInteressados() {
        return interessados;
    }


    /**
     * Sets the interessados value for this Documento.
     * 
     * @param interessados
     */
    public void setInteressados(br.gov.mj.sislegis.app.seiws.Interessado[] interessados) {
        this.interessados = interessados;
    }


    /**
     * Gets the destinatarios value for this Documento.
     * 
     * @return destinatarios
     */
    public br.gov.mj.sislegis.app.seiws.Destinatario[] getDestinatarios() {
        return destinatarios;
    }


    /**
     * Sets the destinatarios value for this Documento.
     * 
     * @param destinatarios
     */
    public void setDestinatarios(br.gov.mj.sislegis.app.seiws.Destinatario[] destinatarios) {
        this.destinatarios = destinatarios;
    }


    /**
     * Gets the observacao value for this Documento.
     * 
     * @return observacao
     */
    public java.lang.String getObservacao() {
        return observacao;
    }


    /**
     * Sets the observacao value for this Documento.
     * 
     * @param observacao
     */
    public void setObservacao(java.lang.String observacao) {
        this.observacao = observacao;
    }


    /**
     * Gets the nomeArquivo value for this Documento.
     * 
     * @return nomeArquivo
     */
    public java.lang.String getNomeArquivo() {
        return nomeArquivo;
    }


    /**
     * Sets the nomeArquivo value for this Documento.
     * 
     * @param nomeArquivo
     */
    public void setNomeArquivo(java.lang.String nomeArquivo) {
        this.nomeArquivo = nomeArquivo;
    }


    /**
     * Gets the conteudo value for this Documento.
     * 
     * @return conteudo
     */
    public java.lang.String getConteudo() {
        return conteudo;
    }


    /**
     * Sets the conteudo value for this Documento.
     * 
     * @param conteudo
     */
    public void setConteudo(java.lang.String conteudo) {
        this.conteudo = conteudo;
    }


    /**
     * Gets the conteudoMTOM value for this Documento.
     * 
     * @return conteudoMTOM
     */
    public byte[] getConteudoMTOM() {
        return conteudoMTOM;
    }


    /**
     * Sets the conteudoMTOM value for this Documento.
     * 
     * @param conteudoMTOM
     */
    public void setConteudoMTOM(byte[] conteudoMTOM) {
        this.conteudoMTOM = conteudoMTOM;
    }


    /**
     * Gets the nivelAcesso value for this Documento.
     * 
     * @return nivelAcesso
     */
    public java.lang.String getNivelAcesso() {
        return nivelAcesso;
    }


    /**
     * Sets the nivelAcesso value for this Documento.
     * 
     * @param nivelAcesso
     */
    public void setNivelAcesso(java.lang.String nivelAcesso) {
        this.nivelAcesso = nivelAcesso;
    }

    private java.lang.Object __equalsCalc = null;
    public synchronized boolean equals(java.lang.Object obj) {
        if (!(obj instanceof Documento)) return false;
        Documento other = (Documento) obj;
        if (obj == null) return false;
        if (this == obj) return true;
        if (__equalsCalc != null) {
            return (__equalsCalc == obj);
        }
        __equalsCalc = obj;
        boolean _equals;
        _equals = true && 
            ((this.tipo==null && other.getTipo()==null) || 
             (this.tipo!=null &&
              this.tipo.equals(other.getTipo()))) &&
            ((this.idProcedimento==null && other.getIdProcedimento()==null) || 
             (this.idProcedimento!=null &&
              this.idProcedimento.equals(other.getIdProcedimento()))) &&
            ((this.idSerie==null && other.getIdSerie()==null) || 
             (this.idSerie!=null &&
              this.idSerie.equals(other.getIdSerie()))) &&
            ((this.numero==null && other.getNumero()==null) || 
             (this.numero!=null &&
              this.numero.equals(other.getNumero()))) &&
            ((this.data==null && other.getData()==null) || 
             (this.data!=null &&
              this.data.equals(other.getData()))) &&
            ((this.descricao==null && other.getDescricao()==null) || 
             (this.descricao!=null &&
              this.descricao.equals(other.getDescricao()))) &&
            ((this.remetente==null && other.getRemetente()==null) || 
             (this.remetente!=null &&
              this.remetente.equals(other.getRemetente()))) &&
            ((this.interessados==null && other.getInteressados()==null) || 
             (this.interessados!=null &&
              java.util.Arrays.equals(this.interessados, other.getInteressados()))) &&
            ((this.destinatarios==null && other.getDestinatarios()==null) || 
             (this.destinatarios!=null &&
              java.util.Arrays.equals(this.destinatarios, other.getDestinatarios()))) &&
            ((this.observacao==null && other.getObservacao()==null) || 
             (this.observacao!=null &&
              this.observacao.equals(other.getObservacao()))) &&
            ((this.nomeArquivo==null && other.getNomeArquivo()==null) || 
             (this.nomeArquivo!=null &&
              this.nomeArquivo.equals(other.getNomeArquivo()))) &&
            ((this.conteudo==null && other.getConteudo()==null) || 
             (this.conteudo!=null &&
              this.conteudo.equals(other.getConteudo()))) &&
            ((this.conteudoMTOM==null && other.getConteudoMTOM()==null) || 
             (this.conteudoMTOM!=null &&
              java.util.Arrays.equals(this.conteudoMTOM, other.getConteudoMTOM()))) &&
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
        if (getTipo() != null) {
            _hashCode += getTipo().hashCode();
        }
        if (getIdProcedimento() != null) {
            _hashCode += getIdProcedimento().hashCode();
        }
        if (getIdSerie() != null) {
            _hashCode += getIdSerie().hashCode();
        }
        if (getNumero() != null) {
            _hashCode += getNumero().hashCode();
        }
        if (getData() != null) {
            _hashCode += getData().hashCode();
        }
        if (getDescricao() != null) {
            _hashCode += getDescricao().hashCode();
        }
        if (getRemetente() != null) {
            _hashCode += getRemetente().hashCode();
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
        if (getDestinatarios() != null) {
            for (int i=0;
                 i<java.lang.reflect.Array.getLength(getDestinatarios());
                 i++) {
                java.lang.Object obj = java.lang.reflect.Array.get(getDestinatarios(), i);
                if (obj != null &&
                    !obj.getClass().isArray()) {
                    _hashCode += obj.hashCode();
                }
            }
        }
        if (getObservacao() != null) {
            _hashCode += getObservacao().hashCode();
        }
        if (getNomeArquivo() != null) {
            _hashCode += getNomeArquivo().hashCode();
        }
        if (getConteudo() != null) {
            _hashCode += getConteudo().hashCode();
        }
        if (getConteudoMTOM() != null) {
            for (int i=0;
                 i<java.lang.reflect.Array.getLength(getConteudoMTOM());
                 i++) {
                java.lang.Object obj = java.lang.reflect.Array.get(getConteudoMTOM(), i);
                if (obj != null &&
                    !obj.getClass().isArray()) {
                    _hashCode += obj.hashCode();
                }
            }
        }
        if (getNivelAcesso() != null) {
            _hashCode += getNivelAcesso().hashCode();
        }
        __hashCodeCalc = false;
        return _hashCode;
    }

    // Type metadata
    private static org.apache.axis.description.TypeDesc typeDesc =
        new org.apache.axis.description.TypeDesc(Documento.class, true);

    static {
        typeDesc.setXmlType(new javax.xml.namespace.QName("Sei", "Documento"));
        org.apache.axis.description.ElementDesc elemField = new org.apache.axis.description.ElementDesc();
        elemField.setFieldName("tipo");
        elemField.setXmlName(new javax.xml.namespace.QName("", "Tipo"));
        elemField.setXmlType(new javax.xml.namespace.QName("http://www.w3.org/2001/XMLSchema", "string"));
        elemField.setNillable(false);
        typeDesc.addFieldDesc(elemField);
        elemField = new org.apache.axis.description.ElementDesc();
        elemField.setFieldName("idProcedimento");
        elemField.setXmlName(new javax.xml.namespace.QName("", "IdProcedimento"));
        elemField.setXmlType(new javax.xml.namespace.QName("http://www.w3.org/2001/XMLSchema", "string"));
        elemField.setNillable(false);
        typeDesc.addFieldDesc(elemField);
        elemField = new org.apache.axis.description.ElementDesc();
        elemField.setFieldName("idSerie");
        elemField.setXmlName(new javax.xml.namespace.QName("", "IdSerie"));
        elemField.setXmlType(new javax.xml.namespace.QName("http://www.w3.org/2001/XMLSchema", "string"));
        elemField.setNillable(false);
        typeDesc.addFieldDesc(elemField);
        elemField = new org.apache.axis.description.ElementDesc();
        elemField.setFieldName("numero");
        elemField.setXmlName(new javax.xml.namespace.QName("", "Numero"));
        elemField.setXmlType(new javax.xml.namespace.QName("http://www.w3.org/2001/XMLSchema", "string"));
        elemField.setNillable(false);
        typeDesc.addFieldDesc(elemField);
        elemField = new org.apache.axis.description.ElementDesc();
        elemField.setFieldName("data");
        elemField.setXmlName(new javax.xml.namespace.QName("", "Data"));
        elemField.setXmlType(new javax.xml.namespace.QName("http://www.w3.org/2001/XMLSchema", "string"));
        elemField.setNillable(false);
        typeDesc.addFieldDesc(elemField);
        elemField = new org.apache.axis.description.ElementDesc();
        elemField.setFieldName("descricao");
        elemField.setXmlName(new javax.xml.namespace.QName("", "Descricao"));
        elemField.setXmlType(new javax.xml.namespace.QName("http://www.w3.org/2001/XMLSchema", "string"));
        elemField.setNillable(false);
        typeDesc.addFieldDesc(elemField);
        elemField = new org.apache.axis.description.ElementDesc();
        elemField.setFieldName("remetente");
        elemField.setXmlName(new javax.xml.namespace.QName("", "Remetente"));
        elemField.setXmlType(new javax.xml.namespace.QName("Sei", "Remetente"));
        elemField.setNillable(false);
        typeDesc.addFieldDesc(elemField);
        elemField = new org.apache.axis.description.ElementDesc();
        elemField.setFieldName("interessados");
        elemField.setXmlName(new javax.xml.namespace.QName("", "Interessados"));
        elemField.setXmlType(new javax.xml.namespace.QName("Sei", "Interessado"));
        elemField.setNillable(false);
        typeDesc.addFieldDesc(elemField);
        elemField = new org.apache.axis.description.ElementDesc();
        elemField.setFieldName("destinatarios");
        elemField.setXmlName(new javax.xml.namespace.QName("", "Destinatarios"));
        elemField.setXmlType(new javax.xml.namespace.QName("Sei", "Destinatario"));
        elemField.setNillable(false);
        typeDesc.addFieldDesc(elemField);
        elemField = new org.apache.axis.description.ElementDesc();
        elemField.setFieldName("observacao");
        elemField.setXmlName(new javax.xml.namespace.QName("", "Observacao"));
        elemField.setXmlType(new javax.xml.namespace.QName("http://www.w3.org/2001/XMLSchema", "string"));
        elemField.setNillable(false);
        typeDesc.addFieldDesc(elemField);
        elemField = new org.apache.axis.description.ElementDesc();
        elemField.setFieldName("nomeArquivo");
        elemField.setXmlName(new javax.xml.namespace.QName("", "NomeArquivo"));
        elemField.setXmlType(new javax.xml.namespace.QName("http://www.w3.org/2001/XMLSchema", "string"));
        elemField.setNillable(false);
        typeDesc.addFieldDesc(elemField);
        elemField = new org.apache.axis.description.ElementDesc();
        elemField.setFieldName("conteudo");
        elemField.setXmlName(new javax.xml.namespace.QName("", "Conteudo"));
        elemField.setXmlType(new javax.xml.namespace.QName("http://www.w3.org/2001/XMLSchema", "string"));
        elemField.setNillable(false);
        typeDesc.addFieldDesc(elemField);
        elemField = new org.apache.axis.description.ElementDesc();
        elemField.setFieldName("conteudoMTOM");
        elemField.setXmlName(new javax.xml.namespace.QName("", "ConteudoMTOM"));
        elemField.setXmlType(new javax.xml.namespace.QName("http://www.w3.org/2001/XMLSchema", "base64Binary"));
        elemField.setMinOccurs(0);
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
