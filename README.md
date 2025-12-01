# Gerenciador_de_Apps_Mobile_versao_mobile

- Este repositório contém os arquivos fonte do Projeto de Gerenciador_de_Apps_Mobile (é um CRUD basicamente) desenvolvido para celulares;
- Nele contém a pasta da API RestFUL (back_end) em JAVA + SPRING BOOT, e outra para o front-end desenvolvido em React Native + Expo Dev;
- Este projeto é referente a Prova2 da disciplina de Laboratório de Programação na Universidade Estadual de Londrina (UEL);
- OBS: para rodar no celular ou em um dispisitvo diferente do que está sendo rodado o Front e o Back, vá em config.js e leia as instruções.

## Tecnologias usadas:

- Java + Spring Boot no back-end.
- React Native + Expo no front-end.
- JPA/Hibernate + MySQL para persistência dos dados.
- GitHub para controle de versão.
- Tratamento de erros: exibição de mensagens de sucesso/erro no front-end. 
- Organização em camadas: model, repository, service, controller.
- Front-end: aplicação de estilos com StyleSheet e navegação com React Navigation.

## Como rodar

### Pré-requisito
- Você precisa ter o Node.js instalado no computador. (Para testar, digite node -v no terminal. Se aparecer um número, está tudo certo).

### Passo 1: Criar o Projeto (No Terminal)
Abra o terminal do VS Code (ou CMD) na pasta onde você quer guardar seus projetos.

Rode o seguinte comando:

```
npx create-expo-app NomeDoSeuApp
```

(Substitua NomeDoSeuApp pelo nome que você quer dar para a pasta do Front.

### Passo 2: Entrar na Pasta

O comando acima criou uma pasta nova. Você precisa entrar nela para trabalhar:

```
cd NomeDoSeuApp
```

## Passo 3: Instalar dependências

```
npx expo install @react-navigation/native @react-navigation/bottom-tabs react-native-screens react-native-safe-area-context @react-native-picker/picker expo-crypto react-native-toast-message
```


### Passo 4: Rodar o Projeto
Agora, para ligar o servidor do Expo e gerar o QR Code:

```
npx expo start
```


### Passo 5: Testar no Celular 
Baixe o aplicativo Expo Go na Play Store (Android) ou App Store (iOS).

Abra a câmera do celular e aponte para o QR Code que apareceu no terminal
