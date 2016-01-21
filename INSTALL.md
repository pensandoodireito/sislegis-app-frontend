Documento de instalação Sislegis-app-frontend
===================

Este documento descreve o processo para instalação do Sislegis-app-end.

----------


Pré-requisitos
-------------

Os seguintes pré-requisitos são necessários para deploy do Sislegis-app-frontend

 - Java 8+
 - WildFly 8.2.0.Final
 - KeyCloak 1.2.0 +
 - Postgresql 9.3+
 - Linux Debian / Ubuntu 14+

Para fazer o build dos Sislegis-app-frontend além dos itens acima são necessários:

 - npmjs - 2.11.3
 - bower - 1.7.2
 - gulp - 3.9.0 

Esses irão instalar as outras dependências.
 
Compilação
-------------

Para construir a aplicação execute 

    npm install
    bower install
    gulp

Para construir o sislegis-app-frontend é necessário ter a variável de ambiente KEYCLOAK_SERVER setada com o endereço do servidor do keycloak:

    export KEYCLOAK_SERVER=localhost
